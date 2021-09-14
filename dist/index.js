/**
 * handyCollapse
 * https://github.com/sk-rt/handy-collapse
 * Copyright (c) 2019  Ryuta Sakai
 * Licensed under the MIT license.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var HandyCollapse = /** @class */ (function () {
    function HandyCollapse(_options) {
        if (_options === void 0) { _options = {}; }
        this.itemsState = {};
        var nameSpace = typeof _options === "object" && "nameSpace" in _options ? _options.nameSpace : "hc";
        var defaultOptions = {
            nameSpace: "hc",
            toggleButtonAttr: "data-" + nameSpace + "-control",
            toggleContentAttr: "data-" + nameSpace + "-content",
            activeClass: "is-active",
            isAnimation: true,
            closeOthers: true,
            animationSpeed: 400,
            cssEasing: "ease-in-out",
            onSlideStart: function () {
            },
            onSlideEnd: function () {
            }
        };
        this.options = __assign(__assign({}, defaultOptions), _options);
        this.toggleContentEls = [].slice.call(document.querySelectorAll("[" + this.options.toggleContentAttr + "]"));
        this.toggleButtonEls = [].slice.call(document.querySelectorAll("[" + this.options.toggleButtonAttr + "]"));
        if (this.toggleContentEls.length !== 0) {
            this.initContentsState(this.toggleContentEls);
        }
        if (this.toggleButtonEls.length !== 0) {
            this.handleButtonsEvent(this.toggleButtonEls);
        }
    }
    /**
     * init Param & show/hide items
     */
    HandyCollapse.prototype.initContentsState = function (contentEls) {
        var _this_1 = this;
        this.itemsState = {};
        contentEls.forEach(function (contentEl) {
            contentEl.style.overflow = "hidden";
            contentEl.style.maxHeight = "none";
            var isOpen = contentEl.classList.contains(_this_1.options.activeClass);
            var id = contentEl.getAttribute(_this_1.options.toggleContentAttr);
            if (!id)
                return;
            _this_1.setItemState(id, isOpen);
            if (!isOpen) {
                _this_1.close(id, false, false);
            }
            else {
                _this_1.open(id, false, false);
            }
        });
    };
    /**
     * Add toggleButton Listners
     */
    HandyCollapse.prototype.handleButtonsEvent = function (buttonElement) {
        var _this_1 = this;
        buttonElement.forEach(function (buttonEl) {
            var id = buttonEl.getAttribute(_this_1.options.toggleButtonAttr);
            if (id) {
                buttonEl.addEventListener("click", function (e) {
                    e.preventDefault();
                    _this_1.toggleSlide(id, true);
                }, false);
            }
        });
    };
    /**
     * Set state
     */
    HandyCollapse.prototype.setItemState = function (id, isOpen) {
        this.itemsState[id] = {
            isOpen: isOpen,
            isAnimating: false
        };
    };
    /**
     * button click listner
     * @param  id - accordion ID
     */
    HandyCollapse.prototype.toggleSlide = function (id, isRunCallback) {
        var _a, _b;
        if (isRunCallback === void 0) { isRunCallback = true; }
        if ((_a = this.itemsState[id]) === null || _a === void 0 ? void 0 : _a.isAnimating)
            return;
        if (((_b = this.itemsState[id]) === null || _b === void 0 ? void 0 : _b.isOpen) === false) {
            this.open(id, isRunCallback, this.options.isAnimation);
        }
        else {
            // Nested Close others if opened
            if (this.options.closeOthers) {
                if (document.querySelector("[data-nested-close-content='" + id + "']")) {
                    var currentElement = document.querySelector("[data-nested-close-content='" + id + "']");
                    var _this = this;
                    if (currentElement.getAttribute('closeOthers') === 'false') {
                        [].slice.call(_this.toggleContentEls).forEach(function (contentEl) {
                            var closeId = contentEl.getAttribute(_this.options.toggleContentAttr);
                            if (closeId && closeId !== id)
                                _this.close(closeId, false, _this.options.isAnimation);
                        });
                    }
                }
            }
            this.close(id, isRunCallback, this.options.isAnimation);
        }
    };
    /**
     * Open accordion
     * @param  id - accordion ID
     */
    HandyCollapse.prototype.open = function (id, isRunCallback, isAnimation) {
        var _this_1 = this;
        if (isRunCallback === void 0) { isRunCallback = true; }
        if (isAnimation === void 0) { isAnimation = true; }
        if (!id)
            return;
        if (!Object.prototype.hasOwnProperty.call(this.itemsState, id)) {
            this.setItemState(id, false);
        }
        var toggleBody = document.querySelector("[" + this.options.toggleContentAttr + "='" + id + "']");
        if (!toggleBody) {
            return;
        }
        this.itemsState[id].isAnimating = true;
        // Nested Close Others if opened
        if (this.options.closeOthers) {
            [].slice.call(this.toggleContentEls).forEach(function (contentEl) {
                if (contentEl.getAttribute('closeOthers') !== 'false') {
                    var closeId = contentEl.getAttribute(_this_1.options.toggleContentAttr);
                    if (closeId && closeId !== id)
                        _this_1.close(closeId, false, isAnimation);
                }
            });
        }
        var currentElement = document.querySelector("[data-nested-close-content='" + id + "']");
        if (currentElement) {
            if (currentElement.getAttribute('closeOthers') === 'false') {
                [].slice.call(this.toggleContentEls).forEach(function (contentEl) {
                    var closeId = contentEl.getAttribute(_this_1.options.toggleContentAttr);
                    if (closeId && closeId !== id)
                        _this_1.close(closeId, false, isAnimation);
                });
            }
        }
        if (isRunCallback !== false)
            this.options.onSlideStart(true, id);
        //Content : Set getHeight, add activeClass
        var clientHeight = this.getTargetHeight(toggleBody);
        toggleBody.style.visibility = "visible";
        toggleBody.classList.add(this.options.activeClass);
        //Button : Add activeClass
        var toggleButton = document.querySelectorAll("[" + this.options.toggleButtonAttr + "='" + id + "']");
        if (toggleButton.length > 0) {
            [].slice.call(toggleButton).forEach(function (button) {
                button.classList.add(_this_1.options.activeClass);
                if (button.hasAttribute("aria-expanded")) {
                    button.setAttribute("aria-expanded", "true");
                }
            });
        }
        if (isAnimation) {
            //Slide Animation
            toggleBody.style.overflow = "hidden";
            toggleBody.style.transition = this.options.animationSpeed + "ms " + this.options.cssEasing;
            toggleBody.style.maxHeight = (clientHeight || "1000") + "px";
            setTimeout(function () {
                if (isRunCallback !== false)
                    _this_1.options.onSlideEnd(true, id);
                toggleBody.style.maxHeight = "none";
                toggleBody.style.transition = "";
                toggleBody.style.overflow = "";
                _this_1.itemsState[id].isAnimating = false;
            }, this.options.animationSpeed);
        }
        else {
            //No Animation
            toggleBody.style.maxHeight = "none";
            toggleBody.style.overflow = "";
            this.itemsState[id].isAnimating = false;
        }
        this.itemsState[id].isOpen = true;
        if (toggleBody.hasAttribute("aria-hidden")) {
            toggleBody.setAttribute("aria-hidden", "false");
        }
    };
    /**
     * Close accordion
     * @param id - accordion ID
     */
    HandyCollapse.prototype.close = function (id, isRunCallback, isAnimation) {
        var _this_1 = this;
        if (isRunCallback === void 0) { isRunCallback = true; }
        if (isAnimation === void 0) { isAnimation = true; }
        if (!id)
            return;
        if (!Object.prototype.hasOwnProperty.call(this.itemsState, id)) {
            this.setItemState(id, false);
        }
        this.itemsState[id].isAnimating = true;
        if (isRunCallback !== false)
            this.options.onSlideStart(false, id);
        //Content : Set getHeight, remove activeClass
        var toggleBody = document.querySelector("[" + this.options.toggleContentAttr + "='" + id + "']");
        toggleBody.style.overflow = "hidden";
        toggleBody.classList.remove(this.options.activeClass);
        toggleBody.style.maxHeight = toggleBody.clientHeight + "px";
        setTimeout(function () {
            toggleBody.style.maxHeight = "0px";
        }, 5);
        //Buttons : Remove activeClass
        var toggleButton = document.querySelectorAll("[" + this.options.toggleButtonAttr + "='" + id + "']");
        if (toggleButton.length > 0) {
            [].slice.call(toggleButton).forEach(function (button) {
                button.classList.remove(_this_1.options.activeClass);
                if (button.hasAttribute("aria-expanded")) {
                    button.setAttribute("aria-expanded", "false");
                }
            });
        }
        if (isAnimation) {
            //Slide Animation
            toggleBody.style.transition = this.options.animationSpeed + "ms " + this.options.cssEasing;
            setTimeout(function () {
                if (isRunCallback !== false)
                    _this_1.options.onSlideEnd(false, id);
                toggleBody.style.transition = "";
                _this_1.itemsState[id].isAnimating = false;
                toggleBody.style.visibility = "hidden";
            }, this.options.animationSpeed);
        }
        else {
            //No Animation
            this.options.onSlideEnd(false, id);
            this.itemsState[id].isAnimating = false;
            toggleBody.style.visibility = "hidden";
        }
        if (Object.prototype.hasOwnProperty.call(this.itemsState, id)) {
            this.itemsState[id].isOpen = false;
        }
        if (toggleBody.hasAttribute("aria-hidden")) {
            toggleBody.setAttribute("aria-hidden", "true");
        }
    };
    /**
     * Get Elemet Height
     * @param targetEl - target Element
     * @return Height(px)
     */
    HandyCollapse.prototype.getTargetHeight = function (targetEl) {
        if (!targetEl)
            return;
        var cloneEl = targetEl.cloneNode(true);
        var parentEl = targetEl.parentNode;
        if (!parentEl)
            return;
        // bugfix: Radio button being unchecked when collapsed
        var inputElements = [].slice.call(cloneEl.querySelectorAll("input[name]"));
        if (inputElements.length !== 0) {
            var suffix_1 = "-" + new Date().getTime();
            inputElements.forEach(function (input) {
                input.name += suffix_1;
            });
        }
        cloneEl.style.maxHeight = "none";
        cloneEl.style.opacity = "0";
        parentEl.appendChild(cloneEl);
        var clientHeight = cloneEl.clientHeight;
        parentEl.removeChild(cloneEl);
        return clientHeight;
    };
    return HandyCollapse;
}());
export default HandyCollapse;
//# sourceMappingURL=index.js.map