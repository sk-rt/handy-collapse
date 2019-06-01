# handy-collaps.js

A pure Javascript module for accordion/collapse UI without JQuery.  
[> examples](https://handy-collapse.netlify.com/)


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
| nameSpace         | String   | "hc"              | Set namespace both "toggleButtonAttr" & "toggleContentAttr"                                                    |
| toggleButtonAttr  | String   | "data-hc-control" | data attribute for Button Element                                                                              |
| toggleContentAttr | String   | "data-hc-content" | data attribute for Content Element                                                                             |
| activeClass       | String   | "is-active"       | Add class on opened Element                                                                                    |
| isAnimation        | Boolean  | true              | animation Slide                                                                                                |
| closeOthers       | Boolean  | true              | Close others Content                                                                                           |
| animationSpeed     | Number   | 400               | css transition duration(ms)                                                                                    |
| cssEasing         | String   | "ease-in-out"     | css transition easing (only isAnimation:true)                                                                   |
| onSlideStart      | Function | null              | Callback on Open/Close Animation Start <br> @param {Boolean} isOpen <br> @param {String} contentID \* Don't ID Attribute |
| onSlideEnd        | Function | null              | Callback on Open/Close Animation End <br>  @param {Boolean} isOpen <br> @param {String} contentID \* Don't ID Attribute                                                                               |


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
