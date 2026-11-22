importance: 5

---

# ลำดับการค้นหาพร็อพเพอร์ตี้ (property)

โจทย์นี้มีสองส่วน

เริ่มจากออบเจ็กต์ (object) สี่ตัวต่อไปนี้

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

1. ใช้ `__proto__` กำหนดโปรโตไทป์ (prototype) ให้การค้นหาพร็อพเพอร์ตี้เริ่มจาก `pockets` แล้วไล่ไปยัง `bed`, `table` และ `head` ตามลำดับ ตัวอย่างเช่น `pockets.pen` ต้องได้ `3` จาก `table` และ `bed.glasses` ต้องได้ `1` จาก `head`
2. เปรียบเทียบการอ่าน `pockets.glasses` กับ `head.glasses` แบบไหนเร็วกว่ากัน? จะลองวัดเวลาดูก็ได้
