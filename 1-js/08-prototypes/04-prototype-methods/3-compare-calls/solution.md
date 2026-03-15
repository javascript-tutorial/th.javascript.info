
การเรียกครั้งแรก `this == rabbit` แต่การเรียกที่เหลือทั้งหมด `this` จะเท่ากับ `Rabbit.prototype` เพราะเป็นออบเจ็กต์ที่อยู่หน้าจุด

ดังนั้นเฉพาะการเรียกครั้งแรกเท่านั้นที่แสดง `Rabbit` ส่วนที่เหลือแสดง `undefined`:

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
