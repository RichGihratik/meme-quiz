export const aboutTemplate = `
    <article class="about">  
            <h3 class="about__heading"> {{aboutTab}} </h4>

            <section class="disclaimer"> 
                <h4 class="disclaimer__heading"> {{disclaimerHeading}} </h4>
                <div class="disclaimer__body"> 
                    {{disclaimerBody}}
                </div>
            </section>

            <section class="about__body"> 
                {{aboutInfo}}
            </section>
            
            <section class="about__quote-wrap">
                <div class="quote"> 
                    <div class="quote__body">
                        "{{quote}}"
                    </div>
                    <div class="quote__author">
                        - {{quoteAuthor}}
                    </div>
                </div>
            </section>
        </article>
`;

export const bodyTemplate = "aboutInfo";