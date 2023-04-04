export const quizTemplate = `
<header class="quiz-page__header">
      <div class="score">
        <span class="score__heading">{{score}}:</span>
        <span class="score__number" id="score">0</span>
      </div>

      <div class="navbar__button">
        <button class="btn settings" id="lang-btn">
          <div class="settings__icon settings__icon_lang_rus"></div>
        </button>
      </div>
    </header>

    <main class="quiz-page__main">
      <div id="question-list">
        
      </div>

      <div class="question-info">
        <section class="question-info">
          <section id="question"> </section>
        </section>

        <section class="answer-wrap">
          <div id="answer-list"> 

          </div>

          <div id="selected-answer">
            
          </div>
        </section>

        <section class="next-btn-wrap">
          <button class="btn btn-common" id="next-btn">{{next}}</button>
        </section>
      </div>
    </main>
`;

export const nextId = "next-btn";
export const langId = "lang-btn";
export const scoreId = "score";

export const questionListId = "question-list";
export const questionId = "question";
export const answerListId = "answer-list";
export const answerId = "selected-answer";