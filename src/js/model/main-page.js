export class MainPageModel {
    #loc = undefined;
    #dataSource = undefined;

    init(localisation, dataSource) {
        this.#dataSource = dataSource;
        this.#loc = localisation;
    }

    getLang() {
        return this.#loc.lang;
    }

    getLoc() {
        return this.#loc.getMainLoc();
    }

    getGallery() {
        let result = this.#loc.applyLocToAnswers(
          this.#dataSource.getQuizData()
        );
        return result;
    }

    toggleLang() {
        this.#loc.toggleLang();
    }
}