ทำได้

ถ้าฟังก์ชันคืนออบเจ็กต์ การเรียกด้วย `new` จะคืนออบเจ็กต์นั้นแทน `this`

ตัวอย่างหนึ่งคือให้ทั้งสองฟังก์ชันคืนออบเจ็กต์ `obj` ตัวเดียวกัน ซึ่งประกาศไว้นอกฟังก์ชัน:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
