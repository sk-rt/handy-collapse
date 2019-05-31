/**
 * handyCollapse
 * https://github.com/sk-rt/handy-collapse
 * Copyright (c) 2018  Ryuta Sakai
 * Licensed under the MIT license.
 */
export interface Options {
    nameSpace?: string;
    toggleButtonAttr?: string;
    toggleContentAttr?: string;
    activeClass?: string;
    isAnimation?: boolean;
    closeOthers?: boolean;
    animationSpeed?: number;
    cssEasing?: string;
    onSlideStart?: (isOpen: boolean, id: string) => false;
    onSlideEnd?: (isOpen: boolean, id: string) => false;
}
export interface ItemStatus {
    [key: string]: {
        isOpen: boolean;
        isAnimating: boolean;
    };
}
export default class HandyCollapse {
    toggleBodyEls: NodeListOf<HTMLElement>;
    toggleButtomEls: NodeListOf<HTMLElement>;
    itemsStatus: ItemStatus;
    nameSpace: string;
    toggleButtonAttr: string;
    toggleContentAttr: string;
    activeClass: string;
    isAnimation: boolean;
    closeOthers: boolean;
    animationSpeed: number;
    cssEasing: string;
    onSlideStart: (isOpen: boolean, id: string) => undefined;
    onSlideEnd: (isOpen: boolean, id: string) => undefined;
    constructor(options: Options);
    private init;
    /**
     * init Param & show/hide items
     */
    private initItems;
    /**
     *
     * @param  element
     */
    private setItem;
    /**
     * Add toggleButton Listners
     */
    private setListner;
    /**
     * Set status object
     * @param id
     * @param isOpen
     */
    private setItemStatus;
    /**
     * button click listner
     * @param {string} id - accordion ID
     */
    toggleSlide(id: string, isRunCallback?: boolean): void;
    /**
     * Open accordion
     * @param {string} id - accordion ID
     */
    open(id: string, isRunCallback?: boolean, isAnimation?: boolean): void;
    /**
     * Close accordion
     * @param id - accordion ID
     */
    close(id: string, isRunCallback?: boolean, isAnimation?: boolean): void;
    /**
     * Get Elemet Height
     * @param targetEl - target Element
     * @return Height(px)
     */
    getTargetHeight(targetEl: HTMLElement): number;
}
