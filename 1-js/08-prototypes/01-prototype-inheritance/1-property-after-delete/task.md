importance: 5

---

# ทดลองใช้โปรโตไทป์

โค้ดด้านล่างสร้างออบเจ็กต์ขึ้นมาคู่หนึ่ง แล้วแก้ไขมัน

ในแต่ละขั้นตอน ค่าที่แสดงจะเป็นอะไร?

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

ต้องตอบให้ได้ 3 ข้อ
