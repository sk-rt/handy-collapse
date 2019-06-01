/**
 * handyCollapse
 * https://github.com/sk-rt/handy-collapse
 * Copyright (c) 2018  Ryuta Sakai
 * Licensed under the MIT license.
 */

export interface Options {
    nameSpace: string;
    toggleButtonAttr: string;
    toggleContentAttr: string;
    activeClass: string;
    isAnimation: boolean;
    closeOthers: boolean;
    animationSpeed: number;
    cssEasing: string;
    onSlideStart: (isOpen: boolean, id: string) => void;
    onSlideEnd: (isOpen: boolean, id: string) => void;
}
interface ItemStatus {
    [key: string]: {
        isOpen: boolean;
        isAnimating: boolean;
    };
}
export default class HandyCollapse {
    toggleBodyEls: NodeListOf<HTMLElement>;
    toggleButtomEls: NodeListOf<HTMLElement>;
    private itemsStatus: ItemStatus = {};
    options: Options;
    constructor(_options: Partial<Options> = {}) {
        const nameSpace = typeof _options === "object" && "nameSpace" in _options ? _options.nameSpace : "hc";
        const defaultOptions = {
            nameSpace: "hc",
            toggleButtonAttr: `data-${nameSpace}-control`,
            toggleContentAttr: `data-${nameSpace}-content`,
            activeClass: "is-active",
            isAnimation: true,
            closeOthers: true,
            animationSpeed: 400,
            cssEasing: "ease-in-out",
            onSlideStart: () => {},
            onSlideEnd: () => {}
        };
        this.options = {
            ...defaultOptions,
            ..._options
        };
        this.toggleBodyEls = document.querySelectorAll(`[${this.options.toggleContentAttr}]`);
        this.toggleButtomEls = document.querySelectorAll(`[${this.options.toggleButtonAttr}]`);
        this.init();
    }
    private init() {
        if (this.toggleBodyEls) {
            this.initItems();
        }
        if (this.toggleButtomEls) {
            this.setListner();
        }
    }
    /**
     * init Param & show/hide items
     */
    private initItems() {
        this.itemsStatus = {};
        [].slice.call(this.toggleBodyEls).forEach(contentEl => {
            this.setItem(contentEl);
        });
    }
    /**
     * @param  element
     */
    private setItem(element: HTMLElement) {
        element.style.overflow = "hidden";
        element.style.maxHeight = "none";
        const isOpen = element.classList.contains(this.options.activeClass);
        const id = element.getAttribute(this.options.toggleContentAttr);
        if (!id) return;
        this.setItemStatus(id, isOpen);
        if (!isOpen) {
            this.close(id, false, false);
        } else {
            this.open(id, false, false);
        }
    }
    /**
     * Add toggleButton Listners
     */
    private setListner() {
        [].slice.call(this.toggleButtomEls).forEach((buttonEl: HTMLElement) => {
            // event
            const id = buttonEl.getAttribute(this.options.toggleButtonAttr);
            if (id) {
                buttonEl.addEventListener(
                    "click",
                    e => {
                        e.preventDefault();
                        this.toggleSlide(id, !!buttonEl);
                    },
                    false
                );
            }
        });
    }
    /**
     * Set status object
     * @param id
     * @param isOpen
     */
    private setItemStatus(id: string, isOpen: boolean) {
        this.itemsStatus[id] = {
            isOpen: isOpen,
            isAnimating: false
        };
    }

    /**
     * button click listner
     * @param  id - accordion ID
     */
    toggleSlide(id: string, isRunCallback = true) {
        if (this.itemsStatus[id].isAnimating) return;
        if (this.itemsStatus[id].isOpen === false) {
            this.open(id, isRunCallback, this.options.isAnimation);
        } else {
            this.close(id, isRunCallback, this.options.isAnimation);
        }
    }
    /**
     * Open accordion
     * @param  id - accordion ID
     */
    open(id: string, isRunCallback = true, isAnimation = true) {
        if (!id) return;
        if (!this.itemsStatus.hasOwnProperty(id)) {
            this.setItemStatus(id, false);
        }
        this.itemsStatus[id].isAnimating = true;

        //Close Others
        if (this.options.closeOthers) {
            [].slice.call(this.toggleBodyEls).forEach((contentEl: HTMLElement) => {
                const closeId = contentEl.getAttribute(this.options.toggleContentAttr);
                if (closeId && closeId !== id) this.close(closeId, false, isAnimation);
            });
        }
        if (isRunCallback !== false) this.options.onSlideStart(true, id);

        //Content : Set getHeight, add activeClass
        const toggleBody = document.querySelector(`[${this.options.toggleContentAttr}='${id}']`) as HTMLElement;
        const clientHeight = this.getTargetHeight(toggleBody);
        toggleBody.classList.add(this.options.activeClass);

        //Button : Add activeClass
        const toggleButton = document.querySelectorAll(`[${this.options.toggleButtonAttr}='${id}']`);
        if (toggleButton.length > 0) {
            [].slice.call(toggleButton).forEach((button: HTMLElement) => {
                button.classList.add(this.options.activeClass);
            });
        }

        if (isAnimation) {
            //Slide Animation
            toggleBody.style.overflow = "hidden";
            toggleBody.style.transition = `${this.options.animationSpeed}ms ${this.options.cssEasing}`;
            toggleBody.style.maxHeight = (clientHeight || "1000") + "px";
            setTimeout(() => {
                if (isRunCallback !== false) this.options.onSlideEnd(true, id);
                toggleBody.style.maxHeight = "none";
                toggleBody.style.transition = "";
                toggleBody.style.overflow = "";
                this.itemsStatus[id].isAnimating = false;
            }, this.options.animationSpeed);
        } else {
            //No Animation
            toggleBody.style.maxHeight = "none";
            toggleBody.style.overflow = "";
            this.itemsStatus[id].isAnimating = false;
        }
        this.itemsStatus[id].isOpen = true;
    }
    /**
     * Close accordion
     * @param id - accordion ID
     */
    close(id: string, isRunCallback = true, isAnimation = true) {
        if (!id) return;
        if (!this.itemsStatus.hasOwnProperty(id)) {
            this.setItemStatus(id, false);
        }
        this.itemsStatus[id].isAnimating = true;
        if (isRunCallback !== false) this.options.onSlideStart(false, id);

        //Content : Set getHeight, remove activeClass
        const toggleBody = document.querySelector(`[${this.options.toggleContentAttr}='${id}']`) as HTMLElement;
        toggleBody.style.overflow = "hidden";
        toggleBody.classList.remove(this.options.activeClass);
        toggleBody.style.maxHeight = toggleBody.clientHeight + "px";
        setTimeout(() => {
            toggleBody.style.maxHeight = "0px";
        }, 5);

        //Buttons : Remove activeClass
        const toggleButton = document.querySelectorAll(`[${this.options.toggleButtonAttr}='${id}']`);
        if (toggleButton.length > 0) {
            [].slice.call(toggleButton).forEach((button: HTMLElement) => {
                button.classList.remove(this.options.activeClass);
            });
        }

        if (isAnimation) {
            //Slide Animation
            toggleBody.style.transition = `${this.options.animationSpeed}ms ${this.options.cssEasing}`;
            setTimeout(() => {
                if (isRunCallback !== false) this.options.onSlideEnd(false, id);
                toggleBody.style.transition = "";
                this.itemsStatus[id].isAnimating = false;
            }, this.options.animationSpeed);
        } else {
            //No Animation
            this.options.onSlideEnd(false, id);
            this.itemsStatus[id].isAnimating = false;
        }
        if (this.itemsStatus.hasOwnProperty(id)) {
            this.itemsStatus[id].isOpen = false;
        }
    }
    /**
     * Get Elemet Height
     * @param targetEl - target Element
     * @return Height(px)
     */
    getTargetHeight(targetEl: HTMLElement): number | void {
        if (!targetEl) return;
        const cloneEl = targetEl.cloneNode(true) as HTMLElement;
        const parentEl = targetEl.parentNode;
        if (!parentEl) return;
        cloneEl.style.maxHeight = "none";
        cloneEl.style.opacity = "0";
        parentEl.appendChild(cloneEl);
        const clientHeight = cloneEl.clientHeight;
        parentEl.removeChild(cloneEl);
        return clientHeight;
    }
}
