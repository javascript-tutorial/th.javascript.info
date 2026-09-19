importance: 5

---

# ออบเจ็กต์ (object) ตัวนับ

โค้ดด้านล่างใช้ฟังก์ชัน (function) ที่ทำหน้าที่เป็นคอนสตรักเตอร์ (constructor) เพื่อสร้างออบเจ็กต์ตัวนับ

ตัวนับนี้จะทำงานได้หรือไม่ และการเรียกแต่ละครั้งจะแสดงค่าอะไร?

```js
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

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```
