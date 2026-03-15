importance: 5

---

# ความแตกต่างระหว่างการเรียก

สร้างออบเจ็กต์ `rabbit` ขึ้นมาใหม่:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

การเรียกเหล่านี้ให้ผลลัพธ์เหมือนกันหรือไม่?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
