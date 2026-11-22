importance: 5

---

# โปรโตไทป์ (prototype) กับการลบพร็อพเพอร์ตี้ (property)

โค้ดนี้สร้างออบเจ็กต์ (object) สองตัว คือ `animal` และ `rabbit` แล้วอ่าน `rabbit.jumps` สามครั้ง ครั้งแรกอ่านก่อนลบ ครั้งที่สองอ่านหลังลบ `rabbit.jumps` และครั้งสุดท้ายอ่านหลังลบ `animal.jumps`

แต่ละครั้งที่เรียก `alert(rabbit.jumps)` จะแสดงค่าอะไร?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

ตอบทั้งสามค่าตามลำดับ `(1)`, `(2)` และ `(3)`
