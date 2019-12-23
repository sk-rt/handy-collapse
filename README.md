# handy-collaps.js

A pure Javascript module for accordion/collapse UI without JQuery.  
[> examples](https://handy-collapse.netlify.com/)

[![NPM](https://nodei.co/npm/handy-collapse.png?compact=true)](https://nodei.co/npm/handy-collapse/)


[![npm version](https://badge.fury.io/js/handy-collapse.svg)](https://badge.fury.io/js/handy-collapse) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/339e9248-8aae-456a-8a3b-345a01138f98/deploy-status)](https://app.netlify.com/sites/handy-collapse/deploys)


## Usage

### Install

Using npm, install handy-collapse  
[> npm](https://www.npmjs.com/package/handy-collapse)

```bash
$ npm install handy-collapse --save
```

### Import

```javascript
import HandyCollapse from "handy-collapse";
```
or html
```html
<script src="path/to/handy-collapse.js"></script>
```
### Initialize

```javascript
new HandyCollapse(options);
```
### Markup

```html
<!-- 
    Add data attribute, button/content element.
    Control Button:  data-{namespase}-control="{ID}" * multiple elements
    Toggle Content:  data-{namespase}-content="{ID}" * only one element
 -->
<button type="button" data-hc-control="uniqID">
    Show/Hide Content
</button>

<div data-hc-content="uniqID">
    Toggle Content
</div>
```
## Options

| Option Name       | Type     | Default           | Desc                                                                                                           |
| ----------------- | -------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| nameSpace         | string   | "hc"              | Set namespace both "toggleButtonAttr" & "toggleContentAttr"                                                    |
| toggleButtonAttr  | string   | "data-hc-control" | data attribute for Button Element                                                                              |
| toggleContentAttr | string   | "data-hc-content" | data attribute for Content Element                                                                             |
| activeClass       | string   | "is-active"       | Add class on opened Element                                                                                    |
| isAnimation        | boolean  | true              | animation Slide                                                                                                |
| closeOthers       | boolean  | true              | Close others Content                                                                                           |
| animationSpeed     | number   | 400               | css transition duration(ms)                                                                                    |
| cssEasing         | string   | "ease-in-out"     | css transition easing (only isAnimation:true)                                                                   |
| onSlideStart      | (isOpen:boolean,contentID:string)=> void | () => void              | Callback on Open/Close Animation Start <br> @param {Boolean} isOpen <br> @param {String} contentID \* Don't ID Attribute |
| onSlideEnd        | (isOpen:boolean,contentID:string)=> void | () => void              | Callback on Open/Close Animation End <br>  @param {Boolean} isOpen <br> @param {String} contentID \* Don't ID Attribute                                                                               |


## Methods

Open/Close Content
```javascript
handyCollapse.open(contentID,[isRunCallback,isAnimation])
```
```javascript
handyCollapse.close(contentID,[isRunCallback,isAnimation])
```

## Sample
[examples](https://handy-collapse.netlify.com/)  

### JS
```javascript

//Default Options
const myAccrodion = new HandyCollapse();

//Full Options
const myAccrodionCustom = new HandyCollapse({
    nameSpace: "hc",
    activeClass: "is-active",
    isAnimation: true,
    closeOthers: true,
    animationSpeed: 400,
    cssEasing: "ease",
    onSlideStart: (isOpen, contentID) => {
        console.log(isOpen);
        const buttonEl = document.querySelectorAll(`[data-hc-control='${contentID}']`);
        console.log(buttonEl);
    },
    onSlideEnd: (isOpen, contentID) => {
        console.log(isOpen);
        const contentEl = document.querySelector(`[data-hc-content='${contentID}']`);
        console.log(contentEl);
    }
});

// Open by Js
myAccrodion.open("content01")

// Close by Js
myAccrodion.close("content01")
```
### HTML
```html
<!-- 
    BUTTON :  data-{namespase}-control="{ID}" * multiple element
    CONTENT:  data-{namespase}-content="{ID}" * only one element
 -->
<!-- basic -->
<button type="button" data-hc-control="content01">
    Show/Hide Content 01
</button>
<div data-hc-content="content01">
    ...
    Content 01
    ...
</div>

<!-- if add activeClass(def: "is-active"), Opened on init. -->
<button type="button" class="is-active"　data-hc-control="content02">
    Show/Hide Content 02
</button>
<div class="is-active" data-hc-content="content02">
    ...
    Content 02
    ...
</div>

<!-- can use nested accordion -->
<button type="button"　data-hc-control="parentContent">
    Show/Hide parent content
</button>
<div data-hc-content="parentContent">
    ...
    parent content
    ...
    <button type="button"　data-hc-control="childContent">
        Show/Hide child content
    </button>
    <div data-hc-content="childContent">
        ...
        child content
        ...
    </div>
</div>
```

## License

[MIT](./LICENSE.txt)
