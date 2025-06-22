class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-header-overlay]',
        burgerButton: '[data-js-header-burger]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        isSticky: 'is-sticky', // 💡 Новый класс для липкости
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.overlayElement = document.querySelector(this.selectors.overlay);
        this.burgerButtonElement = document.querySelector(this.selectors.burgerButton);

        // Хранение высоты первого экрана
        this.firstScreenHeight = 0;
        this.onScrollHandler = this.handleScroll.bind(this);

        this.calculateFirstScreenHeight();
        this.bindEvents();
    }

    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
        window.addEventListener('scroll', this.onScrollHandler);
        window.addEventListener('resize', this.calculateFirstScreenHeight.bind(this));
    }

    calculateFirstScreenHeight() {
        const firstScreen = document.querySelector('.hero'); // Или какой у тебя первый экран
        if (firstScreen) {
            this.firstScreenHeight = firstScreen.offsetHeight;
        }
    }

    handleScroll() {
        const isSticky = window.scrollY > this.firstScreenHeight; // Можно использовать 0, если хочешь "липкость" сразу после начала скролла

        this.rootElement.classList.toggle(this.stateClasses.isSticky, isSticky);

        if (isSticky) {
            if (!this.rootElement.classList.contains('header--light')) {
                this.rootElement.classList.add('header--light');
                this.rootElement.dataset.stickyLight = 'dynamic';
            }
        } else {
            if (this.rootElement.dataset.stickyLight === 'dynamic') {
                this.rootElement.classList.remove('header--light');
                delete this.rootElement.dataset.stickyLight;
            }
        }
    }
}

export default Header;