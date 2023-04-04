export const audioPlayerTemplate = `
    <div class="audio-player__wrap">
        <button class="btn audio-player__play-btn">
                        <div class="btn__icon btn__icon_img_play"></div>
                      </button>

                      <div class="audio-player__seekbar-wrap">
                        <input
                          class="audio-player__seekbar"
                          type="range"
                          min="0"
                          value="0"
                          step="0.001"
                          disabled
                        />

                        <div class="audio-player__time">
                          <span class="timer audio-player__current">
                            <span class="timer__minutes">00</span>:<span
                              class="timer__seconds"
                              >00</span
                            >
                          </span>
                          /
                          <span class="timer audio-player__duration">
                            <span class="timer__minutes">00</span>:<span
                              class="timer__seconds"
                              >00</span
                            >
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="volume">
                      <span class="volume__icon"> </span>
                      <input
                        class="volume__bar"
                        type="range"
                        min="0"
                        max="1"
                        value="1"
                        step="0.1"
                        disabled
                      />
                    </div>
`;

export const audioClass = 'audio-player';

export const buttonClass = "audio-player__play-btn";

export const iconClass = "btn__icon";
export const playClass = "btn__icon_img_play";
export const pauseClass = "btn__icon_img_pause";

export const seekbarClass = "audio-player__seekbar";

export const durationClass = "audio-player__duration";
export const currentClass = "audio-player__current";

export const volumeClass = "volume__bar";
