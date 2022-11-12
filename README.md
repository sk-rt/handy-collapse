# handy-collaps.js

A pure Javascript module for accordion/collapse UI without jQuery.  
[🔗 Demo](https://handy-collapse.netlify.com/)

[![NPM](https://nodei.co/npm/handy-collapse.png?compact=true)](https://nodei.co/npm/handy-collapse/)

[![npm version](https://badge.fury.io/js/handy-collapse.svg)](https://badge.fury.io/js/handy-collapse)
[![Netlify Status](https://api.netlify.com/api/v1/badges/339e9248-8aae-456a-8a3b-345a01138f98/deploy-status)](https://app.netlify.com/sites/handy-collapse/deploys)


## Install

## Use from NPM registry

Using npm or yarn, install handy-collapse.  
[🔗 NPM](https://www.npmjs.com/package/handy-collapse)

```sh
# npm
npm install handy-collapse

# yarn
yarn add handy-collapse
```

Then import and init it.

```javascript
import HandyCollapse from "handy-collapse";

new HandyCollapse({ 
    //... 
});
```

## Use from CDN

[🔗 UNPKG](https://unpkg.com/browse/handy-collapse/)

```html
<script src="https://unpkg.com/browse/handy-collapse/dist/handy-collapse.iife.js" defer>
```

Then init.

```javascript
new HandyCollapse({ 
    //... 
});
```

## Usage
### 1.Markup

With minimum markup

```html
<!-- 
    Add data attribute, button/content element.
    Control Button:  data-{namespase}-control="{ID}" * multiple elements
    Collapsible element:  data-{namespase}-content="{ID}" * only one element
 -->
<button type="button" data-hc-control="uniqContentID">Show/Hide Content</button>

<div data-hc-content="uniqContentID">Toggle Content</div>
```

With `aria-*` attribute for accessibility

```html
<button type="button" data-hc-control="uniqContentID" aria-expanded="false" aria-controls="theID">
  Show/Hide Content
</button>

<div id="theID" data-hc-content="uniqContentID" aria-hidden="true">Toggle Content</div>
```
### 2.Initialize

```js
 const myAccrodion = new HandyCollapse();
```
## Options

| Option Name       | Type                                     | Default           | Desc                                                                                                                     |
| ----------------- | ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| __nameSpace__         | `string`                                   | `"hc"`              | Set namespace both `toggleButtonAttr` & `toggleContentAttr`                                                              |
| __toggleButtonAttr__  | `string`                                   | `` `data-${nameSpace}-control` `` | Attribute name for Controller button element                                                                                        |
| __toggleContentAttr__ | `string`                                   | `` `data-${nameSpace}-content` `` | Attribute name for Content element                                                                                       |
| __activeClass__       | `string`                                   | `"is-active"`       | A class on opened element                                                                                              |
| __isAnimation__       | `boolean`                                  | `true`              | With animation Slide                                                                                                          |
| __closeOthers__       | `boolean`                                  | `true`              | Close others Content                                                                                                     |
| __animationSpeed__    | `number`                                   | `400`               | CSS transition duration (ms) *only `isAnimation:true`                                                                                               |
| __cssEasing__         | `string`                                   | `"ease-in-out"`     | CSS transition easing *only `isAnimation:true`                                                                            |
| __onSlideStart__      | `(isOpen: boolean, contentId: string) => void` | `() => void`        | Callback on Open/Close Animation Start <br> @param isOpen <br> @param {String} contentId \* Don't ID Attribute |
| __onSlideEnd__        | `(isOpen: boolean, contentId: string) => void` | `() => void`        | Callback on Open/Close Animation End <br> @param isOpen <br> @param contentId \* Don't ID Attribute   |

## Methods

|Method name|type|desc|
|--|--|--|
|__open(contentId, runCallback, isAnimation)__| `(contentId: string, runCallback: boolean = true, isAnimation: boolean = true) => void`|Open the content|
|__close(contentId, runCallback, isAnimation)__| `(contentId: string, runCallback: boolean = true, isAnimation: boolean = true) => void`|Close the content|


```javascript
const myAccrodion = new HandyCollapse();

 // Open the content with `data-${namespace}-content="contentId"` attribute.
myAccrodion.open("contentId");

// Do not hook callbacks, and no animtion.
myAccrodion.open("contentId", false, false);
```

## Examples

[🔗 Demo](https://handy-collapse.netlify.com/)

### JS

```javascript
//Default Options
const myAccrodion = new HandyCollapse();

//Full Options
const myAccrodionCustom = new HandyCollapse({
  nameSpace: "hc", // Note: Be sure to set different names when creating multiple instances
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
myAccrodion.open("content01");

// Close by Js
myAccrodion.close("content01");
```

### HTML

```html
<!-- 
    BUTTON :  data-{namespase}-control="{ID}" * multiple element
    CONTENT:  data-{namespase}-content="{ID}" * only one element
 -->
<!-- basic -->
<button type="button" data-hc-control="content01" aria-expanded="false" aria-controls="basicContent01">
  Show/Hide Content 01
</button>
<div id="basicContent01" data-hc-content="content01" aria-hidden="true">... Content 01 ...</div>

<!-- if add activeClass(def: "is-active"), Opened on init. -->
<button
  type="button"
  class="is-active"
  　
  data-hc-control="content02"
  aria-expanded="true"
  aria-controls="basicContent02"
>
  Show/Hide Content 02
</button>
<div id="basicContent02" class="is-active" data-hc-content="content02" aria-hidden="false">... Content 02 ...</div>

<!-- Can use nested accordion -->
<!-- Note: the `closeOthers` parameter must be set to `false` -->
<button type="button" data-hc-control="parentContent" aria-expanded="true" aria-controls="netstedParantContent">
  Show/Hide parent content
</button>
<div id="netstedParantContent" data-hc-content="parentContent" aria-hidden="true">
  ... parent content ...
  <button type="button" 　 data-hc-control="childContent" aria-expanded="true" aria-controls="netstedChiledContent">
    Show/Hide child content
  </button>
  <div id="netstedChiledContent" data-hc-content="childContent" aria-hidden="true">... child content ...</div>
</div>
```

## License

[MIT](./LICENSE.txt)
