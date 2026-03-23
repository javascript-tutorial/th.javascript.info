importance: 5

---

# instanceof ที่ดูแปลกๆ

ในโค้ดด้านล่าง ทำไม `instanceof` ถึงคืนค่า `true`? ทั้งๆ ที่ `a` ไม่ได้ถูกสร้างจาก `B()` เลย

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
