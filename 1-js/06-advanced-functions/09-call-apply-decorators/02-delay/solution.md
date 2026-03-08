คำตอบ:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // แสดง "test" หลังจาก 1000ms
```

สังเกตว่าตรงนี้ใช้ arrow function เพราะอย่างที่เรารู้กัน arrow function ไม่มี `this` และ `arguments` เป็นของตัวเอง ดังนั้น `f.apply(this, arguments)` จะดึง `this` และ `arguments` มาจาก wrapper ภายนอก

ถ้าเราส่งฟังก์ชันปกติเข้าไปแทน `setTimeout` จะเรียกฟังก์ชันนั้นโดยไม่มีอาร์กิวเมนต์ และ `this=window` (ในกรณีที่อยู่บนเบราว์เซอร์)

เราก็ยังส่ง `this` ที่ถูกต้องได้โดยใช้ตัวแปรตัวกลาง แต่โค้ดจะยุ่งยากกว่าหน่อย:

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
