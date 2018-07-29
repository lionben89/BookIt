import { ChooseSettings } from "./../../../../store/actions/context.action";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../../store";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"]
})
export class TutorialComponent implements OnInit {
  videoplayer: any;

  videosrc = "./../../../../../../src/assets/videos/bambookTutorial.mp4";

  constructor(private store: Store<fromStore.MainState>) {}

  ngOnInit() {
    this.videoplayer.nativeElement.play();
  }

  goToSettings() {
    this.store.dispatch(new fromStore.ChooseSettings());
  }
}
