import {
  mainTemplate,
  gameTabId,
  m_gameTabId,
  aboutTabId,
  m_aboutTabId,
  galleryTabId,
  m_galleryTabId,
  mainPageBodyId,
  langBtnId,
  blinkClass
} from "../../../html/main.template";

import { StartView } from "./start.view";
import { AboutView } from "./about.view";
import { GalleryView } from "./gallery.view";

import { Event } from "../../common/event";

export class MainPageView {
  #mainBody = undefined;

  #lang = '';

  tabMap = {
    game: {
      view: new StartView(),
      tab: gameTabId,
      m_tab: m_gameTabId,
    },
    about: {
      view: new AboutView(),
      tab: aboutTabId,
      m_tab: m_aboutTabId,
    },
    gallery: {
      view: new GalleryView(),
      tab: galleryTabId,
      m_tab: m_galleryTabId,
    },
  };

  langBtnClickEvent = new Event();

  #loc = undefined;
  #item = undefined;

  #created = false;

  createView(loc, item, lang) {
    this.#created = true;
    this.#item = item;
    this.#loc = loc;
    this.#lang = lang;
    this.#currentView = this.tabMap[this.#currentTab].view;
    this.updateFull();
  }

  playAnim() {
    document.body.classList.add(blinkClass);
  }

  stopAnim() {
    document.body.classList.remove(blinkClass);
  }

  removeView() {
    if (this.#created) {
        for (let key in this.tabMap) {
            if (this.tabMap[key].view.created) 
              this.tabMap[key].view.removeView();
        }
        document.body.textContent = "";
        this.#created = false;
    }
  }

  set lang(lang) {
    if (this.#created) {
      let langBtn = document
        .getElementById(langBtnId)
        .querySelector('.'+"settings__icon");

      if (lang === 'eng') {
        langBtn.classList.remove("settings__icon_lang_rus");
        langBtn.classList.add("settings__icon_lang_eng");
      }
      else if (lang === 'rus') {
        langBtn.classList.remove("settings__icon_lang_eng");
        langBtn.classList.add("settings__icon_lang_rus");
      }

      this.#lang = lang;
    }
  }

  updateFull() {
    if (this.#created) {
      if (this.#currentView.created) 
        this.#currentView.removeView();
      document.body.textContent = "";

      let regex = /{{([^{}]*)}}/g;

      let template = mainTemplate.replace(regex, (match, tagName) => {
        let component = this.#loc[tagName];
        if (component !== undefined) return component;
        else return `<strong> TAG "${tagName}" NOT FOUND! </strong>`;
      });

      document.body.insertAdjacentHTML("beforeend", template);

      this.#mainBody = document.getElementById(mainPageBodyId);

      document.getElementById(langBtnId).onclick = () =>
        this.langBtnClickEvent.invoke();

      this.updateTabs();
      this.update();
      this.lang = this.#lang;
    }
  }

  updateTabs() {
    for (let key in this.tabMap) {
      let tab = document.getElementById(this.tabMap[key].tab);

      tab.classList.remove("navbar__tab_active");
      tab.onclick = () => {
        this.tab = key;
      };

      let m_tab = document.getElementById(this.tabMap[key].m_tab);
      m_tab.classList.remove("mobile-navbar__tab_active");
      m_tab.onclick = () => {
        this.tab = key;
      };
    }

    let tab = document.getElementById(this.tabMap[this.#currentTab].tab);
    tab.classList.add("navbar__tab_active");
    tab.onclick = () => {};

    let m_tab = document.getElementById(this.tabMap[this.#currentTab].m_tab);
    m_tab.classList.add("mobile-navbar__tab_active");
    m_tab.onclick = () => {};
  }

  update() {
    if (
      this.tabMap[this.#currentTab].view !== this.#currentView &&
      this.#currentView.created
    ) {

      this.#currentView.removeView();
      this.#currentView = this.tabMap[this.#currentTab].view;
      
      if (this.#currentTab === "gallery")
        this.#currentView.createView(this.#mainBody, this.#item);
      else this.#currentView.createView(this.#mainBody, this.#loc);

    } else if (this.#currentView.created) {
      if (this.#currentTab === "gallery") this.updateGallery();
      else this.#currentView.locFiles = this.#loc;
    }
    else {
        if (this.#currentTab === "gallery")
          this.#currentView.createView(this.#mainBody, this.#item);
        else this.#currentView.createView(this.#mainBody, this.#loc);
    }
  }

  updateGallery() {
    this.#currentView.item = this.#item;
  }

  #currentTab = "game";
  #currentView = undefined;

  set item(item) {
    this.#item = item;
    if (this.#currentTab === "gallery") this.updateGallery();
  }

  setLocalisation(loc, item, lang) {
    this.#loc = loc;
    this.#item = item;
    this.#lang = lang;
    this.updateFull();
  }

  set tab(tabName) {
    if (this.tabMap[tabName] === undefined)
      throw new Error("Trying to set non existent tab!");

    this.#currentTab = tabName;
    this.updateTabs();
    this.update();
  }
}
