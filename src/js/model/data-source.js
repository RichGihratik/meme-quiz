import { quizData } from "../data/quiz.data";

export class DataSource {
  getQuizData() {
    let result = [];
    for (let item of quizData) {
      result.push({...item});
    }
    return result;
  }
}