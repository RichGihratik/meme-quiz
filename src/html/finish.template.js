export const finishTemplate = `
    <main class="main-results"> 
      <div class="result"> 
        <div class="results__heading"> 
          {{heading}}
        </div>
        <div class="score"> 
          {{score}}: <span id=score>25</span>
        </div>
        <button class="btn btn-common" id="play-again-btn">{{playAgain}}</button>
        <button class="btn btn-common" id="back-btn">{{back}}</button>
       </div>
    </main>
`;

export const scoreId = "score";
export const playAgainId = "play-again-btn";
export const backId = "back-btn";