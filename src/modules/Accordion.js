export default class Accordion {
    selectors = {
        root: '[data-js-accordion]',
        item: '.accordion__item',
        trigger: '.accordion__header',
        content: '.accordion__content',
    };

    stateClasses = {
        isActive: 'is-active',
    };

    constructor() {
        this.rootElements = document.querySelectorAll(this.selectors.root);

        this.rootElements.forEach(root => {
            this.bindEvents(root);
        });
    }
    

    bindEvents(root) {
        const items = root.querySelectorAll(this.selectors.item);

        // Инициализируем каждую вкладку
        items.forEach((item, index) => {
            const content = item.querySelector(this.selectors.content);
            if (content && !content.style.maxHeight) {
                content.style.maxHeight = '0px';
            }

            item.addEventListener('click', this.onItemClick);
        });

        // Открываем первую вкладку по умолчанию
        if (items.length > 0) {
            this.openItem(items[0]);
        }
    }

    openItem(item) {
        const content = item.querySelector(this.selectors.content);
        const trigger = item.querySelector(this.selectors.trigger);
        const icon = trigger ? trigger.querySelector('.accordion__icon') : null;

        // Добавляем классы
        if (trigger) {
            trigger.classList.add(this.stateClasses.isActive);
        }
        if (icon) {
            icon.classList.add('accordion__icon--active');
        }
        content.classList.add(this.stateClasses.isActive);

        // Устанавливаем maxHeight
        content.style.maxHeight = `${content.scrollHeight}px`;
    }


    onItemClick = (event) => {
        const item = event.currentTarget;
        const content = item.querySelector(this.selectors.content);

        const isActive = content.classList.contains(this.stateClasses.isActive);

        const trigger = item.querySelector(this.selectors.trigger);
        const icon = trigger ? trigger.querySelector('.accordion__icon') : null;

        if (isActive) {
            // Закрываем
            if (trigger) trigger.classList.remove(this.stateClasses.isActive);
            if (icon) icon.classList.remove('accordion__icon--active');
            content.classList.remove(this.stateClasses.isActive);
            content.style.maxHeight = '0px';
        } else {
            // Открываем
            if (trigger) trigger.classList.add(this.stateClasses.isActive);
            if (icon) icon.classList.add('accordion__icon--active');
            content.classList.add(this.stateClasses.isActive);
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    };

    onTriggerClick = (event) => {
        const trigger = event.currentTarget;
        const item = trigger.closest(this.selectors.item);
        const content = item.querySelector(this.selectors.content);

        const isActive = content.classList.contains(this.stateClasses.isActive);

        // Переключаем классы
        trigger.classList.toggle(this.stateClasses.isActive);
        content.classList.toggle(this.stateClasses.isActive);

        // Обновляем maxHeight для анимации
        if (isActive) {
            content.style.maxHeight = '0px';
        } else {
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    };
}