importance: 5

---

# เรียก sayHi() สี่แบบ ได้ผลเหมือนกันไหม?

โค้ดนี้สร้างออบเจ็กต์ (object) ชื่อ `rabbit` ขึ้นมา

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

ถ้าเรียกเมธอด (method) `sayHi` ทั้งสี่แบบด้านล่าง แต่ละบรรทัดจะแสดงอะไร?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
