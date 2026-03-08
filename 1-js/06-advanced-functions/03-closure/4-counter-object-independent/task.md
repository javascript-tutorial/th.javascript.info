importance: 5

---

# ออบเจ็กต์ตัวนับ

ตัวนับด้านล่างสร้างจากคอนสตรักเตอร์ฟังก์ชัน

มันจะทำงานได้ไหม? จะแสดงอะไร?

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

