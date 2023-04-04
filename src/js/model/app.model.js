import { DataLoader } from "./data-loader";
import { LocDataSource } from "./loc-source";
import { LocalisationModel } from "./localisation";
import { MainPageModel } from "./main-page";
import { DataSource } from "./data-source";
import { QuizPageModel } from "./quiz-page";
import { AudioPlayer } from "./audio";
import { FinishPageModel } from "./finish-page";

export class AppModel {
  // MODULES
  // =============

  dataLoader = new DataLoader();
  locSource = new LocDataSource();
  localisation = new LocalisationModel();
  dataSource = new DataSource();
  audio = new AudioPlayer();

  mainModel = new MainPageModel();
  quizModel = new QuizPageModel();
  finishModel = new FinishPageModel();

  init() {
    this.dataLoader.init();
    this.locSource.init();
    this.localisation.init(this.locSource, this.dataLoader);
    this.mainModel.init(this.localisation, this.dataSource);
    this.quizModel.init(this.dataSource, this.localisation, this.audio);
    this.finishModel.init(this.localisation, this.quizModel);
  }
}