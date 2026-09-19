ทำงานได้ โดยแสดง **`1`, `2` และ `1`** ตามลำดับ

ฟังก์ชัน (function) ที่ซ้อนอยู่ทั้งสองตัวมี Lexical Environment ชั้นนอกตัวเดียวกัน จึงเข้าถึงตัวแปร (variable) `count` ตัวเดียวกัน เมื่อฟังก์ชันหนึ่งเปลี่ยนค่า อีกฟังก์ชันก็จะอ่านได้ค่าที่เปลี่ยนแล้ว:

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };

  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
