เราใช้ wrapper ตั้งเวลาให้เรียกฟังก์ชัน (function) เดิมได้ดังนี้:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // แสดง "test" หลังจาก 1000ms
```

ฟังก์ชันที่ส่งให้ `setTimeout` เป็น arrow function ซึ่งไม่มี `this` และ `arguments` ของตัวเอง ดังนั้น `f.apply(this, arguments)` จึงใช้ `this` และอาร์กิวเมนต์ (argument) จาก wrapper ที่ครอบอยู่

ถ้าเปลี่ยน arrow function ตรงนี้เป็นฟังก์ชันปกติ `setTimeout` ในเบราว์เซอร์ (browser) จะเรียกฟังก์ชันนั้นโดยไม่มีอาร์กิวเมนต์และให้ `this` เป็น `window` จึงไม่ได้ค่าจากการเรียก wrapper ตามที่เราต้องการ

อีกวิธีคือเก็บ `this` ของ wrapper ไว้ในตัวแปร (variable) และใช้ rest parameters รับอาร์กิวเมนต์ไว้ก่อน แล้วนำทั้งสองอย่างไปใช้เมื่อถึงเวลาเรียก `f`:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // เก็บ this ไว้ในตัวแปรตัวกลาง
    setTimeout(function() {
      f.apply(savedThis, args); // แล้วเอามาใช้ตรงนี้
    }, ms);
  };

}
```
