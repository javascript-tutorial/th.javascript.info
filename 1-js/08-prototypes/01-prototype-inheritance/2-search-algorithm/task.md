importance: 5

---

# อัลกอริทึมการค้นหา

โจทย์นี้มี 2 ส่วน

กำหนดออบเจ็กต์ต่อไปนี้:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. ใช้ `__proto__` กำหนดโปรโตไทป์ให้การค้นหาพร็อพเพอร์ตี้ไล่ตามลำดับ: `pockets` -> `bed` -> `table` -> `head` เช่น `pockets.pen` ควรเป็น `3` (หาเจอใน `table`) และ `bed.glasses` ควรเป็น `1` (หาเจอใน `head`)
2. ตอบคำถาม: ระหว่าง `pockets.glasses` กับ `head.glasses` อันไหนเร็วกว่ากัน? ลอง benchmark ดูถ้าจำเป็น
