importance: 5

---
# ฟังก์ชัน (function) ใน if

ลองดูโค้ดนี้ การเรียก `sayHi()` ในบรรทัดสุดท้ายจะให้ผลอย่างไร?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
