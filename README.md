# handy-collaps.js

A pure Javascript module for accordion/collapse UI without JQuery.

## Usage

### Install

Using npm, install handy-collaps

```bash
$ npm install handy-collapse --save
```

### Import

```es6
import HandyCollapse from "handy-collapse";
```
or html
```html
<script src="path/to/handy-collapse.js"></script>
```
### initialize

```es6
new HandyCollapse(options);
```

## Options

| Option Name       | Type     | Default           | Desc                                                                                                           |
| ----------------- | -------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| nameSpace         | String   | "hc"              | Set namespace both "toggleButtonAttr" & "toggleContentAttr"                                                    |
| toggleButtonAttr  | String   | "data-hc-control" | data attribute for Button Element                                                                              |
| toggleContentAttr | String   | "data-hc-content" | data attribute for Content Element                                                                             |
| activeClass       | String   | "is-active"       | Add class on opened Element                                                                                    |
| isAimation        | Boolean  | true              | animation Slide                                                                                                |
| closeOthers       | Boolean  | true              | Close others Content                                                                                           |
| animatinSpeed     | Number   | 400               | css transition duration(ms)                                                                                    |
| cssEasing         | String   | "ease-in-out"     | css transition easing (only isAimation:true)                                                                   |
| onSlideStart      | Function | null              | Callback on Open/Close Start <br> @param {Boolean} isOpen <br> @param {String} contentID \* Don't ID Attribute |
| onSlideEnd        | Function | null              | Callback on Open/Close End <br>                                                                                |


## Methods

Open/Close Content
```es6
open(contentID,[isRunCallback,isAimation])
```
```es6
close(contentID,[isRunCallback,isAimation])
```

## Sample
[More example is here](https://github.com/sk-rt/handy-collapse/tree/master/sample)
### JS
```es6
//Full Options
let myAccrodion = new HandyCollapse({
    nameSpace: "hc",
    activeClass: "is-active",
    closeOthers: true,
    animatinSpeed: 500,
    cssEasing: "ease",
    onSlideStart: (isOpen, contentID) => {
        console.log(isOpen);
        let buttonEl = document.querySelector(`[data-callback-control='${contentID}']`);
        console.log(buttonEl);
    },
     onSlideStart: (isOpen, contentID) => {
        console.log(isOpen);
        let buttonEl = document.querySelector(`[data-callback-control='${contentID}']`);
        console.log(buttonEl);
    }
});
// Open by Js
myAccrodion.open("content01")

```
### HTML
```html
<!-- 
    BUTTON:  data-{namespase}-control="{ID}"
    CONTENT:  data-{namespase}-content="{ID}"
 -->

<button type="button" data-hc-control="content01">
    Show/Hide Content 01
</button>
<div  data-hc-content="content01">
    ...
    Content 01
    ...
</div>
<!-- if add activeClass(def: "is-active"), Opened on init. -->
<button  type="button" class="is-active"　data-hc-control="content02">
    Show/Hide Content 02
</button>
<div class="is-active" data-hc-content="content02">
    ...
    Content 01
    ...
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT)
