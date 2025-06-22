// src/modules/Lightbox.js
import GLightbox from 'glightbox';

export default class Lightbox {
    constructor() {
        this.init();
    }

    init() {
        this.lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
            width: "90vw",
            height: "90vh",
        });
    }
}