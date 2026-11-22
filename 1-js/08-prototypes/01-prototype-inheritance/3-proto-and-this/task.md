importance: 5

---

# เมธอด (method) เขียนค่าลงที่ไหน?

ในตัวอย่างนี้ ออบเจ็กต์ (object) ชื่อ `rabbit` สืบทอดจาก `animal`

เมื่อเรียก `rabbit.eat()` พร็อพเพอร์ตี้ (property) ชื่อ `full` จะไปอยู่ใน `animal` หรือ `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
