importance: 5

---
# ฟังก์ชันใน if

ดูโค้ดนี้ ผลลัพธ์ของการเรียกบรรทัดสุดท้ายจะเป็นอะไร?

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
