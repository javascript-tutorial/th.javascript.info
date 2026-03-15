importance: 5

---

# เขียนค่าลงที่ไหน?

เรามี `rabbit` สืบทอดจาก `animal`

ถ้าเรียก `rabbit.eat()` ออบเจ็กต์ไหนจะได้รับพร็อพเพอร์ตี้ `full`: `animal` หรือ `rabbit`?

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
