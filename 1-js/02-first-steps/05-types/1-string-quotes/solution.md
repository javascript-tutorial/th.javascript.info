เมื่อใช้ backtick JavaScript จะคำนวณนิพจน์ใน `${...}` แล้วนำผลลัพธ์มาแทรกในสตริง

```js run
let name = "Ilya";

// นิพจน์คือเลข 1
alert( `hello ${1}` ); // hello 1

// นิพจน์คือสตริง "name"
alert( `hello ${"name"}` ); // hello name

// นิพจน์คือตัวแปร จึงนำค่าของตัวแปรมาแทรก
alert( `hello ${name}` ); // hello Ilya
```
