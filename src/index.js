/***********************************


handyCollapse


************************************/
/**
 * @constructor handyCollapse
 * @param {Object} options
 */
class HandyCollapse {
	constructor(options = {}) {
		Object.assign(
			this,
			{
				//default options
				nameSpace: "hc",
				toggleButtonAttr: `data-${options.nameSpace || "hc"}-control`,
				toggleContentAttr: `data-${options.nameSpace || "hc"}-content`,
				activeClass: "is-active",
				isAimation: true,
				closeOthers: true,
				animatinSpeed: 400,
				cssEasing: "ease-in-out",
				onSlideStart: () => false,
				onSlideEnd: () => false
			},
			options
		);
		this.toggleBodyEls = document.querySelectorAll(`[${this.toggleContentAttr}]`);
		this.toggleButtomEls = document.querySelectorAll(`[${this.toggleButtonAttr}]`);
		this.itemsStatus = {};
		this.init();
	}
	init() {
		if (this.toggleBodyEls) {
			this.setItem();
		}
		if (this.toggleButtomEls) {
			this.setListner();
		}
	}
	/**
	 * init Param & show/hide items
	 */
	setItem() {
		this.itemsStatus = {};
		Array.prototype.slice.call(this.toggleBodyEls).forEach(contentEl => {
			contentEl.style.overflow = "hidden";
			contentEl.style.maxHeight = "none";
			let isOpen = contentEl.classList.contains(this.activeClass);
			let id = contentEl.getAttribute(this.toggleContentAttr);
			this.setItemStetus(id, isOpen);

			if (!isOpen) {
				this.close(id, false, false);
			} else {
				this.open(id, false, false);
			}
		});
	}
	/**
	 * Add toggleButton Listners
	 */
	setListner() {
		Array.prototype.slice.call(this.toggleButtomEls).forEach((buttonEl, index) => {
			// event
			let id = buttonEl.getAttribute(this.toggleButtonAttr);
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
	 * @param {String} id
	 * @param {Boolian} isOpen
	 */
	setItemStetus(id, isOpen) {
		this.itemsStatus[id] = {
			isOpen: isOpen
		};
	}

	/**
	 * button click listner
	 * @param {String} id - accordion ID
	 */
	toggleSlide(id, isRunCallback = true) {
		if (this.itemsStatus[id].isOpen === false) {
			this.open(id, isRunCallback, this.isAimation);
		} else {
			this.close(id, isRunCallback, this.isAimation);
		}
	}
	/**
	 * Open accordion
	 * @param {String} id - accordion ID
	 */
	open(id, isRunCallback = true, isAimation = true) {
		if (!id) return;

		//Close Others
		if (this.closeOthers) {
			Array.prototype.slice.call(this.toggleBodyEls).forEach((contentEl, index) => {
				let closeId = contentEl.getAttribute(this.toggleContentAttr);
				if (closeId !== id) this.close(closeId, false, isAimation);
			});
		}
		if (isRunCallback !== false) this.onSlideStart(true, id);

		let toggleBody = document.querySelector(`[${this.toggleContentAttr}='${id}']`);
		let clientHeight = this.getTargetHeight(toggleBody);
		toggleBody.classList.add(this.activeClass);

		let toggleButton = document.querySelectorAll(`[${this.toggleButtonAttr}='${id}']`);
		if (toggleButton.length > 0 ) {
			Array.prototype.slice.call(toggleButton).forEach((button, index) => {
				button.classList.add(this.activeClass)
			});
		}

		if (isAimation) {
			toggleBody.style.overflow = "hidden";
			toggleBody.style.transition = `${this.animatinSpeed}ms ${this.cssEasing}`;
			toggleBody.style.maxHeight = (clientHeight || "1000") + "px";
			setTimeout(() => {
				if (isRunCallback !== false) this.onSlideEnd(true, id);
				toggleBody.style.maxHeight = "none";
				toggleBody.style.transition = "";
				toggleBody.style.overflow = "";
			}, this.animatinSpeed);
		} else {
			toggleBody.style.maxHeight = "none";
			toggleBody.style.overflow = "";
		}
		if (this.itemsStatus.hasOwnProperty(id)) {
			this.itemsStatus[id].isOpen = true;
		}
	}
	/**
	 * Close accordion
	 * @param {String} id - accordion ID
	 */
	close(id, isRunCallback = true, isAimation = true) {
		if (!id) return;

		if (isRunCallback !== false) this.onSlideStart(false, id);
		let toggleBody = document.querySelector(`[${this.toggleContentAttr}='${id}']`);
		toggleBody.style.overflow = "hidden";
		toggleBody.classList.remove(this.activeClass);
		toggleBody.style.maxHeight = toggleBody.clientHeight + "px";
		setTimeout(() => {
			toggleBody.style.maxHeight = "0px";
		}, 1);
		let toggleButton = document.querySelectorAll(`[${this.toggleButtonAttr}='${id}']`);
		if (toggleButton.length > 0 ) {
			Array.prototype.slice.call(toggleButton).forEach((button, index) => {
				button.classList.remove(this.activeClass)
			});
		}

		if (isAimation) {
			toggleBody.style.transition = `${this.animatinSpeed}ms ${this.cssEasing}`;
			setTimeout(() => {
				if (isRunCallback !== false) this.onSlideEnd(false, id);
				toggleBody.style.transition = "";
			}, this.animatinSpeed);
		} else {
			this.onSlideEnd(false, id);
		}
		if (this.itemsStatus.hasOwnProperty(id)) {
			this.itemsStatus[id].isOpen = false;
		}
	}
	/**
	 * Get Elemet Height
	 * @param {Element} targetEl - target Element
	 * @return {Number} Height
	 */
	getTargetHeight(targetEl) {
		if (!targetEl) return;
		let cloneEl = targetEl.cloneNode(true);
		let parentEl = targetEl.parentNode;
		cloneEl.style.maxHeight = "none";
		cloneEl.style.opacity = "0";
		parentEl.appendChild(cloneEl);
		let clientHeight = cloneEl.clientHeight;
		parentEl.removeChild(cloneEl);
		return clientHeight;
	}
}
if (typeof module === "object") {
	module.exports = HandyCollapse;
}
