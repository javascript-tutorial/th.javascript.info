importance: 5

---

# ตัวนับแต่ละตัวเป็นอิสระจากกันไหม?

เราสร้างตัวนับ 2 ตัว คือ `counter` กับ `counter2` จากฟังก์ชัน `makeCounter` ตัวเดียวกัน

แต่ละตัวเป็นอิสระจากกันไหม? ตัวนับตัวที่สองจะแสดงค่าอะไร? `0,1` หรือ `2,3` หรืออย่างอื่น?

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

