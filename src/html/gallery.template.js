export const galleryTemlate = `
    <section class="gallery">
        <div class="gallery__btn">
          <button class="btn page-btn" id="gallery-prev">
            <div class="page-btn__icon page-btn__icon_type_prev"></div>
          </button>
        </div>

        <div class="gallery__body">
          <div class="meme-item">
            <h1 class="meme-item__heading">
              <span class="meme-item__name"> </span>
              <span class="meme-item__theme"> </span>
            </h1>
            <div class="meme-item__media">
              <div class="meme-item__img-wrap">
                <img
                  class="meme-item__img"
                  src=""
                />
              </div>
              <aside class="meme-item__aside">
                <div class="meme-item__origin">
                  <span class='meme-item__origin-name'> </span>
                </div>

                <div class="meme-item__audio">
                  <div class="gallery-player"></div>
                </div>
              </aside>
            </div>
            <div class="meme-item__desc">

            </div>
          </div>
        </div>

        <div class="gallery__btn">
          <button class="btn page-btn" id="gallery-next">
            <div class="page-btn__icon page-btn__icon_type_next"></div>
          </button>
        </div>
      </section>
`; 

export const prevId = "gallery-prev";
export const nextId = "gallery-next";

export const audioClass = "gallery-player";

export const nameClass = "meme-item__name";
export const themeClass = "meme-item__theme";

export const imgClass = "meme-item__img";

export const originClass = "meme-item__origin-name";

export const descClass = "meme-item__desc";