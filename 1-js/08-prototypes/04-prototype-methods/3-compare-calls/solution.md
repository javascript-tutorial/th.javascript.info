
ค่า `this` ขึ้นอยู่กับออบเจ็กต์ (object) ที่อยู่หน้าจุดตอนเรียกเมธอด (method) สำหรับ `rabbit.sayHi()` ออบเจ็กต์นั้นคือ `rabbit` ส่วนอีกสามบรรทัด ออบเจ็กต์หน้าจุดคือตัวเดียวกันทั้งหมด นั่นคือ `Rabbit.prototype`

การเรียกครั้งแรกจึงอ่าน `name` จาก `rabbit` แล้วแสดง `Rabbit` ส่วน `Rabbit.prototype` ไม่มีพร็อพเพอร์ตี้ (property) ชื่อ `name` ทั้งบนตัวมันเองและบนโปรโตไทป์ (prototype) ของมัน ทั้งสามครั้งที่เหลือจึงแสดง `undefined`

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
