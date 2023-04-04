import { quizLocData } from "../data/quiz.data.loc";
import { themeLoc } from "../data/theme.loc";

import { mainPageLoc } from "../data/main-page.loc";
import { quizPageLoc } from "../data/quiz-page.loc";
import { finishPageLoc } from "../data/finish.loc";

export class LocDataSource {
  init() {};

  getQuizLocData() {
    let result = [];
    for (let item of quizLocData) {
      result.push({ ...item });
    }
    return result;
  }

  getThemeLocData() {
    let result = [];
    for (let item of themeLoc) {
      result.push({ ...item });
    }
    return result;
  }

  getMainPageLoc() {
    return mainPageLoc;
  }

  getFinishLoc() {
    return finishPageLoc;
  }

  getQuizPageLoc() {
    return quizPageLoc;
  }
}
  