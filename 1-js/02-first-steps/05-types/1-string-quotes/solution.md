
Backtick ใส่นิพจน์ (expression) อะไรก็ได้ลงไปใน `${...}`

```js run
let name = "Ilya";

// นิพจน์เป็นตัวเลข 1
alert( `hello ${1}` ); // hello 1

// นิพจน์เป็นสตริง "name"
alert( `hello ${"name"}` ); // hello name

// นิพจน์เป็นตัวแปร แทรกค่าลงไป
alert( `hello ${name}` ); // hello Ilya
```
