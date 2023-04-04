import { aboutTemplate, bodyTemplate } from "../../../html/about.template";

export class AboutView {
  #element = undefined;

  #locFiles = undefined;

  set locFiles(locFiles) {
    this.#locFiles = locFiles;
    this.updateView();
  }

  get created() {
    return this.#element !== undefined;
  }

  createView(element, locFiles) {
    if (this.#element !== undefined) throw new Error("View already created!");
    this.#element = element;
    this.#locFiles = locFiles;

    this.updateView();
  }

  updateView() {
    if (this.#element !== undefined) {
      this.#element.textContent = "";

      let regex = /{{([^{}]*)}}/g;

      let template = aboutTemplate.replace(regex, (match, tagName) => {
        let loc = this.#locFiles[tagName];
        if (tagName === bodyTemplate) {
          loc = loc.replace(
            /\/\/([^\/]*)\/\//g,
            (match, tag) => `<span class="spoiler">` + tag + `</span>`
          );
          loc = loc
            .split("\n")
            .map((item) => `<p class="about__p">` + item + `</p>`)
            .join("");
        }
        let component = loc;
        if (component !== undefined) return component;
        else return `<strong> TAG "${tagName}" NOT FOUND! </strong>`;
      });

      this.#element.insertAdjacentHTML("beforeend", template);
    }
  }

  removeView() {
    if (this.#element === undefined) throw new Error("View does not exist!");
    this.#element.textContent = "";
    this.#element = undefined;
  }
}