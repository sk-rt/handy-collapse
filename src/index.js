/***********************************


handyCollapse


************************************/
/**
 * @constructor HandyCollapse
 * @param {Object} options
 */
class HandyCollapse {
    constructor(options = {}) {
        const defaultOptions = {
            nameSpace: "hc",
            toggleButtonAttr: `data-${options.nameSpace || "hc"}-control`,
            toggleContentAttr: `data-${options.nameSpace || "hc"}-content`,
            activeClass: "is-active",
            isAnimation: true,
            closeOthers: true,
            animationSpeed: 400,
            cssEasing: "ease-in-out",
            onSlideStart: () => false,
            onSlideEnd: () => false
        };
        Object.assign(this, defaultOptions, options);
        this.toggleBodyEls = document.querySelectorAll(`[${this.toggleContentAttr}]`);
        this.toggleButtomEls = document.querySelectorAll(`[${this.toggleButtonAttr}]`);
        this.itemsStatus = {};
        this.init();
    }
    init() {
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
    initItems() {
        this.itemsStatus = {};
        Array.prototype.slice.call(this.toggleBodyEls).forEach(contentEl => {
           this.setItem(contentEl);
        });
    }
    /**
     * 
     * @param {HtmlElement} element 
     */
    setItem(element) {
        element.style.overflow = "hidden";
        element.style.maxHeight = "none";
        const isOpen = element.classList.contains(this.activeClass);
        const id = element.getAttribute(this.toggleContentAttr);
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
    setListner() {
        Array.prototype.slice.call(this.toggleButtomEls).forEach(buttonEl => {
            // event
            const id = buttonEl.getAttribute(this.toggleButtonAttr);
            if (id) {
                buttonEl.addEventListener(
                    "click",
                    e => {
                        e.preventDefault();
                        this.toggleSlide(id, buttonEl);
                    },
                    false
                );
            }
        });
    }
    /**
     * Set status object
     * @param {string} id
     * @param {boolian} isOpen
     */
    setItemStatus(id, isOpen) {
        this.itemsStatus[id] = {
            isOpen: isOpen,
            isAnimating: false
        };
    }

    /**
     * button click listner
     * @param {string} id - accordion ID
     */
    toggleSlide(id, isRunCallback = true) {
        if (this.itemsStatus[id].isAnimating) return;
        if (this.itemsStatus[id].isOpen === false) {
            this.open(id, isRunCallback, this.isAnimation);
        } else {
            this.close(id, isRunCallback, this.isAnimation);
        }
    }
    /**
     * Open accordion
     * @param {string} id - accordion ID
     */
    open(id, isRunCallback = true, isAnimation = true) {
        if (!id) return;
        if (!this.itemsStatus.hasOwnProperty(id)) {
            this.setItemStatus(id, false);
        }
        this.itemsStatus[id].isAnimating = true;

        //Close Others
        if (this.closeOthers) {
            Array.prototype.slice.call(this.toggleBodyEls).forEach((contentEl, index) => {
                let closeId = contentEl.getAttribute(this.toggleContentAttr);
                if (closeId !== id) this.close(closeId, false, isAnimation);
            });
        }
        if (isRunCallback !== false) this.onSlideStart(true, id);

        //Content : Set getHeight, add activeClass
        const toggleBody = document.querySelector(`[${this.toggleContentAttr}='${id}']`);
        const clientHeight = this.getTargetHeight(toggleBody);
        toggleBody.classList.add(this.activeClass);

        //Button : Add activeClass
        const toggleButton = document.querySelectorAll(`[${this.toggleButtonAttr}='${id}']`);
        if (toggleButton.length > 0) {
            Array.prototype.slice.call(toggleButton).forEach((button, index) => {
                button.classList.add(this.activeClass);
            });
        }

        if (isAnimation) {
            //Slide Animation
            toggleBody.style.overflow = "hidden";
            toggleBody.style.transition = `${this.animationSpeed}ms ${this.cssEasing}`;
            toggleBody.style.maxHeight = (clientHeight || "1000") + "px";
            setTimeout(() => {
                if (isRunCallback !== false) this.onSlideEnd(true, id);
                toggleBody.style.maxHeight = "none";
                toggleBody.style.transition = "";
                toggleBody.style.overflow = "";
                this.itemsStatus[id].isAnimating = false;
            }, this.animationSpeed);
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
     * @param {string} id - accordion ID
     */
    close(id, isRunCallback = true, isAnimation = true) {
        if (!id) return;
        if (!this.itemsStatus.hasOwnProperty(id)) {
            this.setItemStatus(id, false);
        }
        this.itemsStatus[id].isAnimating = true;
        if (isRunCallback !== false) this.onSlideStart(false, id);

        //Content : Set getHeight, remove activeClass
        const toggleBody = document.querySelector(`[${this.toggleContentAttr}='${id}']`);
        toggleBody.style.overflow = "hidden";
        toggleBody.classList.remove(this.activeClass);
        toggleBody.style.maxHeight = toggleBody.clientHeight + "px";
        setTimeout(() => {
            toggleBody.style.maxHeight = "0px";
        }, 5);

        //Buttons : Remove activeClass
        const toggleButton = document.querySelectorAll(`[${this.toggleButtonAttr}='${id}']`);
        if (toggleButton.length > 0) {
            Array.prototype.slice.call(toggleButton).forEach((button, index) => {
                button.classList.remove(this.activeClass);
            });
        }

        if (isAnimation) {
            //Slide Animation
            toggleBody.style.transition = `${this.animationSpeed}ms ${this.cssEasing}`;
            setTimeout(() => {
                if (isRunCallback !== false) this.onSlideEnd(false, id);
                toggleBody.style.transition = "";
                this.itemsStatus[id].isAnimating = false;
            }, this.animationSpeed);
        } else {
            //No Animation
            this.onSlideEnd(false, id);
            this.itemsStatus[id].isAnimating = false;
        }
        if (this.itemsStatus.hasOwnProperty(id)) {
            this.itemsStatus[id].isOpen = false;
        }
    }
    /**
     * Get Elemet Height
     * @param {Element} targetEl - target Element
     * @return {number} Height(px)
     */
    getTargetHeight(targetEl) {
        if (!targetEl) return;
        const cloneEl = targetEl.cloneNode(true);
        const parentEl = targetEl.parentNode;
        cloneEl.style.maxHeight = "none";
        cloneEl.style.opacity = "0";
        parentEl.appendChild(cloneEl);
        const clientHeight = cloneEl.clientHeight;
        parentEl.removeChild(cloneEl);
        return clientHeight;
    }
}
if (typeof module === "object") {
    module.exports = HandyCollapse;
}
