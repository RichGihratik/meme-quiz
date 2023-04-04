/**
 * Base class for events
 */
export class Event {
    #eventListeners = [];

    /**
     * Callback function, when listener subscribe to this event
     * @type {Function} 
     */
    onSubscribe = null;

    /**
     * Attach event listener
     * @param {Function} listener Callback when event fires 
     */
    addEventListener(listener) {
        this.#eventListeners.push(listener);
        if (this.onSubscribe !== null) this.onSubscribe();
    }

    /**
     * Remove attached event listener
     * @param {Function} listener Callback to remove
     */
    removeEventListener(listener) {
        let index = this.#eventListeners.indexOf(listener);
        if (index !== -1) this.#eventListeners.splice(index, 1);
    }

    /**
     * Remove attached event listener
     * @params Event parameters
     */
    invoke() {
        for (let listener of this.#eventListeners) {
            listener(...arguments);
        }
    }

    clear() {
        this.#eventListeners.clear();
    }
}