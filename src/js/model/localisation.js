const prop = 'lang';

export class LocalisationModel {
  #currentLang = "eng";
  #dataSource = undefined;
  #dataLoader = undefined;

  init(langDataSource, dataLoader) {
    this.#dataSource = langDataSource;
    this.#dataLoader = dataLoader;
    this.#currentLang = dataLoader.getProperty(prop) ?? "eng";
  }

  getMainLoc() {
    return this.#dataSource.getMainPageLoc()[this.#currentLang];
  }

  getQuizLoc() {
    return this.#dataSource.getQuizPageLoc()[this.#currentLang];
  }

  getFinishLoc() {
    return this.#dataSource.getFinishLoc()[this.#currentLang];
  }

  get lang() {
    return this.#currentLang;
  }

  applyLocToAnswers(answers) {
    let result = [];
    let data = this.#dataSource.getQuizLocData();

    let findAnswerId = (id) => {
      for (let item of data) {
        if (item.id === id) {
          return item;
        }
      }
      throw new Error("Answer not found in quiz data!");
    };

    for (let answer of answers) {
      let item = findAnswerId(answer.id);
      let theme = this.applyLocToTheme(answer.theme);

      let newAnswer = {
        ...answer,
        ...item[this.#currentLang],
        theme: theme.name,
      };

      newAnswer.id = undefined;
      result.push(newAnswer);
    }

    return result;
  }

  applyLocToThemes(themes) {
    let result = [];

    for (let item of themes) {
      result.push(this.applyLocToTheme(item));
    }

    return result;
  }

  applyLocToTheme(themeId) {
    let values = this.#dataSource.getThemeLocData();
    for (let loc of values) {
      if (loc.id === themeId)
        return {
          name: loc[this.#currentLang],
          desc: loc[this.#currentLang + "_desc"],
        };
    }
    throw new Error("Theme not found!");
  }

  toggleLang() {
    this.#currentLang = this.#currentLang === "eng" ? "rus" : "eng";
    this.#saveLangToStorage();
  }

  #saveLangToStorage() {
    this.#dataLoader.setProperty(prop, this.#currentLang);
  }
}