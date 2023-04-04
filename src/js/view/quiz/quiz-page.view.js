import {
  quizTemplate,

  nextId,
  langId,
  scoreId,

  questionListId,
  questionId,
  answerListId,
  answerId,
} from "../../../html/quiz.template";

import { Event } from "../../common/event";

import { AnswerListView } from './answer-list.view';
import { AnswerView } from './answer.view';
import { QuestionView } from './question.view';
import { QuestionListView } from "./question-list.view"

export class QuizPageView {
  #loc = undefined;

  #lang = "eng";

  #score = 0;

  #answerList = new AnswerListView();
  #answer = new AnswerView();
  #question = new QuestionView();
  #questionList = new QuestionListView();

  #questionItem = undefined;

  langBtnClickEvent = new Event();

  nextBtnClickEvent = new Event();

  get answerClickEvent() {
    return this.#answerList.answerSelected;
  } 

  #created = false;

  get created() {
    return this.#created;
  }

  set question(question) {
    this.#questionItem = question;
    this.update();
  }

  set score(score) {
    this.#score = score;
    this.update();
  }

  set lang(lang) {
    if (this.#created) {
      let langBtn = document
        .getElementById(langId)
        .querySelector("." + "settings__icon");

      if (lang === "eng") {
        langBtn.classList.remove("settings__icon_lang_rus");
        langBtn.classList.add("settings__icon_lang_eng");
      } else if (lang === "rus") {
        langBtn.classList.remove("settings__icon_lang_eng");
        langBtn.classList.add("settings__icon_lang_rus");
      }

      this.#lang = lang;
    }
  }

  setLocalisation(loc, question, lang) {
    this.#loc = loc;
    this.#questionItem = question;
    this.#lang = lang;

    this.updateFull();
  }

  createView(loc, question, lang) {
    if (this.#created) throw new Error("View already created!");

    this.#loc = loc;
    this.#questionItem = question;
    this.#lang = lang;

    this.#created = true;

    this.updateFull();
  }

  updateFull() {
    if (this.#created) {
      if (this.#answer.created) this.#answer.removeView();
      if (this.#question.created) this.#question.removeView();
      if (this.#answerList.created) this.#answerList.removeView();
      if (this.#questionList.created) this.#questionList.removeView();

      document.body.textContent = "";

      let regex = /{{([^{}]*)}}/g;

      let template = quizTemplate.replace(regex, (match, tagName) => {
        let component = this.#loc[tagName];
        if (component !== undefined) return component;
        else return `<strong> TAG "${tagName}" NOT FOUND! </strong>`;
      });

      document.body.insertAdjacentHTML("beforeend", template);

      let theme = this.#questionItem.themes[this.#questionItem.index];
      this.#answer.createView(document.getElementById(answerId), theme.desc);

      this.#answerList.createView(
        document.getElementById(answerListId),
        this.#questionItem.answers
      );

      this.#question.createView(
        document.getElementById(questionId),
        this.#questionItem.question
      );

      this.#questionList.createView(
        document.getElementById(questionListId),
        this.#questionItem.themes
      );


      document.getElementById(langId).onclick = () =>
        this.langBtnClickEvent.invoke();

      document.getElementById(nextId).onclick = () =>
        this.nextBtnClickEvent.invoke();
    
      this.update();
    }
  }

  updateAudio() {
    this.#question.audio = this.#questionItem.question;
  }

  update() {
    if (this.#created) {
      document.getElementById(scoreId).textContent = this.#score;
      document.getElementById(nextId).disabled =
        this.#questionItem.realAnswer === undefined;
      
      if (this.#questionItem.realAnswer !== undefined) {
        this.#question.img = this.#questionItem.realAnswer.img;
        this.#question.name = this.#questionItem.realAnswer.name;
      }
      else {
        this.#question.img = undefined;
        this.#question.name = undefined;
      }
      
      this.#questionList.active = this.#questionItem.index;
      
      this.#answerList.answers = this.#questionItem.answers;
      this.#answer.answer = this.#questionItem.pickedAnswer;
      this.#answer.themeDesc =
        this.#questionItem.themes[this.#questionItem.index].desc;

      this.lang = this.#lang;
    }
  }

  removeView() {
    if (!this.#created) throw new Error("View does not exist!");
    this.#created = false;

    this.#answerList.removeView();
    this.#answer.removeView();
    this.#question.removeView();
    this.#questionList.removeView();
    document.body.textContent = "";
  }
}
