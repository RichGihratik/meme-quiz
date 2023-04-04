export const mainTemplate = `
    <div class="bg-upper-outline"> </div>

    <header class="main-page__header"> 
        <div class="logo"> 
        </div>
        <nav class="navbar">
            <div class="navbar__tab navbar__tab_active" id="game-tab"> 
                {{gameTab}}
            </div>
            <div class="navbar__tab" id="gallery-tab">
                {{galleryTab}}
            </div>
            <div class="navbar__tab" id="about-tab">
                {{aboutTab}}
            </div>
            <div class="navbar__button"> 
                <button class="btn settings" id="lang-btn"> 
                    <div class="settings__icon"></div> 
                </button>
            </div>
        </nav>
    </header>

    <main class="main-page__main" id="main-page-body"> 
        
    </main>

    <footer class="main-page__footer">
        <div class="copyright">
            <div class="year"> 2023 </div>
            <div class="name"> @RichGihratik </div>
        </div>
        <div class="github-link-wrap"> 
            <a class="main-page__link" href="https://github.com/RichGihratik">
                <div class="github-logo"> </div>
            </a>
        </div>
    </footer>

    <div class="mobile-navbar">
        <div class="mobile-navbar__tab mobile-navbar__tab_active" id="m-game-tab"> 
            <div class="tab-icon tab-icon_type_play"> </div>
        </div>
        <div class="mobile-navbar__tab" id="m-gallery-tab"> 
            <div class="tab-icon tab-icon_type_img"> </div>
        </div>
        <div class="mobile-navbar__tab" id="m-about-tab"> 
            <div class="tab-icon tab-icon_type_info"> </div>
        </div>
    </div>
`;

export const gameTabId = "game-tab";
export const galleryTabId = "gallery-tab";
export const aboutTabId = "about-tab";

export const langBtnId = "lang-btn"; 

export const m_gameTabId = "m-game-tab";
export const m_galleryTabId = "m-gallery-tab";
export const m_aboutTabId = "m-about-tab";

export const mainPageBodyId = "main-page-body";

export const blinkClass = 'blink-animation';