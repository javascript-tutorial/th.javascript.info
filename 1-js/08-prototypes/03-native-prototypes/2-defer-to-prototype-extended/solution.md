

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// ทดสอบ
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // แสดง 3 หลังจาก 1 วินาที
```

เมื่อเรียก `f.defer(1000)` ค่า `this` ใน `defer` คือฟังก์ชัน (function) ที่เราต้องการหน่วงเวลา เราเก็บฟังก์ชันนั้นไว้ใน `f` แล้วคืนฟังก์ชันห่อหุ้ม (wrapper function) เมื่อถึงเวลา `f.apply(this, args)` จะเรียกฟังก์ชันตัวเดิม พร้อมส่งต่อทั้ง `this` และอาร์กิวเมนต์ (argument) ที่ฟังก์ชันห่อหุ้มได้รับ

การส่ง `this` ต่อมีผลเมื่อเราเรียกฟังก์ชันห่อหุ้มเป็นเมธอด (method) ของออบเจ็กต์ (object) เช่น เมื่อเรียก `user.sayHi()` ค่า `this` คือ `user` เมธอดเดิมจึงอ่าน `this.name` แล้วแสดง `John` ได้หลังจากผ่านไปหนึ่งวินาที

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
