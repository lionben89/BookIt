import { ChooseSettings } from "./../../../../store/actions/context.action";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"]
})
export class TutorialComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: any;

  public videosrc = "http://localhost:4200/assets/videos/bambookTutorial.mp4";

  constructor(private store: Store<fromStore.MainState>) { }
  getSrc(baseURI){
    if (baseURI==="http://localhost:4200/"){
      return "http://localhost:4200/assets/videos/bambookTutorial.mp4";
    }
    return "https://bookit-54033.firebaseapp.com/assets/videos/bambookTutorial.mp4"
  }
  ngOnInit() {
    this.videoplayer.nativeElement.play();
    
  }

  goToSettings() {
    this.store.dispatch(new fromStore.ChooseSettings());
  }

}
