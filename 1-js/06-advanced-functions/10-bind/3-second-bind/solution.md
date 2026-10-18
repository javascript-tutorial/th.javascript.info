คำตอบคือ **John**

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

ค่าที่ `f.bind(...)` คืนมาเป็น [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) หรือฟังก์ชัน (function) ที่ผูกค่าไว้ ภายในเป็นออบเจ็กต์ (object) ชนิดพิเศษที่เรียกว่า exotic object ซึ่งจำค่า `this` และอาร์กิวเมนต์ (argument) ที่กำหนดไว้ตอนสร้าง

เราเรียก `bind` ซ้ำเพื่อสร้าง bound function อีกตัวได้ แต่เปลี่ยน `this` ที่ตัวแรกผูกไว้ไม่ได้ การเรียกในตัวอย่างจึงยังส่งออบเจ็กต์ที่มี `name: "John"` ให้ฟังก์ชันเดิม
