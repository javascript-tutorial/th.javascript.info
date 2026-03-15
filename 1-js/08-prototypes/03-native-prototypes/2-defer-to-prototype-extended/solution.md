

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

สังเกตว่าเราใช้ `this` ใน `f.apply` เพื่อให้ decorator ทำงานได้ถูกต้องกับเมธอดของออบเจ็กต์ด้วย

ถ้าฟังก์ชัน wrapper ถูกเรียกในฐานะเมธอดของออบเจ็กต์ `this` จะถูกส่งต่อไปยังฟังก์ชันตัวเดิม `f` ด้วย

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
