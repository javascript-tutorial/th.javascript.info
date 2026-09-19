importance: 5

---

# ตัวนับแต่ละตัวเป็นอิสระจากกันไหม?

เราสร้างตัวนับ 2 ตัว คือ `counter` กับ `counter2` โดยเรียกฟังก์ชัน (function) `makeCounter` ตัวเดียวกัน

ตัวนับทั้งสองทำงานแยกกันหรือไม่? เมื่อเรียก `counter2` สองครั้ง จะแสดง `0,1`, `2,3` หรือค่าอื่น?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```
