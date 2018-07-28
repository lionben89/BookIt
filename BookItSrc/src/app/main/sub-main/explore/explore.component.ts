
import { getUsersNearBy } from './../../../store/reducers/index';
import { Component, OnInit, Output, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { Book, Loadable, UserSettingsState, UserUpdateType, Location } from './../../../data_types/states.model';
import { IconsService } from '../../../icons.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from "@angular/material";
import { DialogOneButtonComponent } from "../settings/dialog-one-button/dialog-one-button.component";
import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [IconsService],
})
export class ExploreComponent implements OnInit {
  public userSettings: UserSettingsState;
  public userLocations: Array<Location>;
  public usersNearBy = [];
  public booksNearBy = [];
  public IsAllowToRequest;

  private userSettingsSubscription;
  private userLocationsSubscription;
  private usersNearBySubscription;
  private booksNearBySubscription;
  private messegeSubscription;
  private IsAllowToRequestSubscription;

  public usersMinimumDistance = {};
  public numCols;
  public bookNavBarEnabled: boolean;
  public bookSelected: Book;
  public status: Loadable;
  categories = {};
  categoriesNames;
  currentCategory;


  constructor(private store: Store<fromStore.MainState>, iconService: IconsService, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }
  showBookNavbar(book: Book) {
    this.bookNavBarEnabled = true;
    this.bookSelected = book;
    document.body.style.overflow="hidden";
  }
  hideBookNavbar(book: Book) {
    if (book === this.bookSelected) {
      this.bookNavBarEnabled = false;
      this.bookSelected = undefined;
      document.body.style.overflow="scroll";
    }
  }
  isBookEquale = (book1, book2) => {
    let eq = true;
    let keys = Object.keys(book1);
    for (let key of keys) {
      if (book1[key] !== book2[key]) {
        eq = false;
        break;
      }
    }
    return eq;
  }

  goToPrevCategory() {
    let c = (this.currentCategory - 1);
    if (c < 0) {
      c = this.categoriesNames.length - 1;
    }
    this.store.dispatch(new fromStore.ChooseCurrentCategory(c));
  }
  goToNextCategory() {
    let c = (this.currentCategory + 1);
    if (c === this.categoriesNames.length) {
      c = 0;
    }
    this.store.dispatch(new fromStore.ChooseCurrentCategory(c));
  }

  bookInfo() {
    console.log(this.bookSelected.description);
  }

  requestBook(book) {
    if (this.IsAllowToRequest) {
      this.store.dispatch(new fromStore.RequestBook(book));
      this.hideBookNavbar(book);
    } else {
      let dialogRef = this.dialog.open(DialogOneButtonComponent,
        {
          width: '250px',
          data: "You reached the maximum requests number, please share more books or return the others"
        }
      );

      dialogRef.disableClose = true; // disable default close operation
    }
  }

  onResize() { // TODO add font resize
    if (window.innerWidth <= 400) {
      this.numCols = 3;
    } else if (window.innerWidth > 400 && window.innerWidth < 800) {
      this.numCols = 4;
    } else {
      this.numCols = 6;
    }
  }

  sortBooksByCategories(books) {
    this.categories = {};
    this.categories["All Books"] = books;
    books.forEach((book: Book) => {
      book.categories.forEach((cat) => {
        if (this.categories && this.categories[cat]) {
          this.categories[cat].push(book);
        } else {
          let ex = false;
          if (this.userSettings && this.userSettings.favoriteCategories && this.userSettings.favoriteCategories.categories) {
            this.userSettings.favoriteCategories.categories.forEach((c) => {
              if (cat === c.name && c.active) {
                ex = true;
              }
            });
          }

          if (ex) {
            this.categories[cat] = [];
            this.categories[cat].push(book);
          }
        }
      });
    });

    this.categoriesNames = Object.keys(this.categories);
  }

  getAutoCompleteValue(bookSelected) {
    if (bookSelected && bookSelected.title) {
      return bookSelected;
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.bookNavBarEnabled = false;
    this.onResize();

    this.userSettingsSubscription = this.store.select<any>(fromStore.getUserSettings).subscribe(state => {
      this.userSettings = state;
    });

    this.userLocationsSubscription = this.store.select<any>(fromStore.getUserLocations).subscribe(state => {
      this.userLocations = new Array<Location>();
      for (var location of state) {
        if (location.active) {
          this.userLocations.push(location);
        }
      }
      this.fillMinDists();
    });

    this.booksNearBySubscription = this.store.select<any>(fromStore.getBooksNearBy).subscribe(state => {
      this.sortBooksByCategories(state);
      if (!(this.userSettings && this.userSettings.favoriteCategories) && (state.length > 0)) {
        let bookCategories = [];
        state.forEach((book: Book) => {
          book.categories.forEach((cat) => {
            let ex = false;
            bookCategories.forEach((c) => {
              if (c.name === cat){
                ex = true;
              }
            });

            if (!ex) {
              bookCategories.push({ name: book.categories[0], active: true });
            }
          });
        });
        
        this.store.dispatch(new fromStore.UpdateUserInfo(UserUpdateType.CATEGORIES, bookCategories));
      }
    });

    this.usersNearBySubscription = this.store.select<any>(fromStore.getUsersNearBy).subscribe(state => {
      this.usersNearBy = state;
      let nearbyUserIDs = Object.keys(this.usersNearBy);

      this.fillMinDists();

      this.store.dispatch(new fromStore.LoadBooksFromUsersNearBy(nearbyUserIDs));
    });

    this.store.select(fromStore.getExploreStatus).subscribe(state => { this.status = state; });
    this.messegeSubscription = this.store.select(fromStore.getMessege).subscribe((state) => {
      if (state && state !== '') {
        this.snackBar.open(state, null, { duration: 3000 });
        setTimeout(this.store.dispatch(new fromStore.ShowMessege('')), 0);
      }
    });

    this.store.select(fromStore.getContextCurrentCategory).subscribe(state => {
      this.currentCategory = state;
    });

    this.IsAllowToRequestSubscription = this.store.select(fromStore.IsAllowToRequest).subscribe(
      (state) => { this.IsAllowToRequest = state; }
    );
  }

  ngOnDestroy() {
    this.userSettingsSubscription.unsubscribe();
    this.userLocationsSubscription.unsubscribe();
    this.usersNearBySubscription.unsubscribe();
    this.booksNearBySubscription.unsubscribe();
    this.messegeSubscription.unsubscribe();
    this.IsAllowToRequestSubscription.unsubscribe();
  }

  fillMinDists() {
    this.usersMinimumDistance = {};

    let nearbyUserIDs = Object.keys(this.usersNearBy);
    for (var userID of nearbyUserIDs) {
      let coordinatesArray = this.usersNearBy[userID];
      for (var coordinates of coordinatesArray) {
        let dists = this.userLocations.map(elem => {
          let dist = {
            label: elem.label, 
            distance: this.distance(coordinates.lat, coordinates.long, elem.lat, elem.long)
          };
          return dist;
        });
        let minDist = dists.reduce((acc, elem) => acc.distance <= elem.distance ? acc : elem);
        this.usersMinimumDistance[userID] = minDist;
      }
    }
  }

  deg2rad(deg) {
    return deg * Math.PI / 180.0;
  }

  rad2deg(rad) {
    return rad * 180 / Math.PI;
  }

  distance(lat1, lon1, lat2, lon2) {
    let theta = lon1 - lon2;
    let dist =   Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) 
               + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.cos(this.deg2rad(theta));

    dist = Math.acos(dist);
    dist = this.rad2deg(dist);
    dist *= 60 * 1.1515 * 1.609344;
    return dist;
  }

  distanceText(nameAndDist) {
    let name = nameAndDist.label;
    let dist = nameAndDist.distance;
    let distTxt = "";
    if(dist < 1) {
      let m = dist.toFixed(2);
      distTxt = m.substring(m.indexOf(".") + 1) + "0 m";
    } else {
        distTxt = dist.toFixed(2) + " km";
    }
    return distTxt + " from " + name;
};

}
