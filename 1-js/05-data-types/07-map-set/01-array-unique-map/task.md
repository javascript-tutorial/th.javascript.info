importance: 5

---

# กรองอาร์เรย์ (array) ให้เหลือค่าที่ไม่ซ้ำกัน

กำหนดให้ `arr` เป็นอาร์เรย์

เขียนฟังก์ชัน (function) `unique(arr)` ที่คืนค่าอาร์เรย์ซึ่งมีค่าจาก `arr` โดยเก็บแต่ละค่าไว้เพียงครั้งเดียว

ตัวอย่าง:

```js
function unique(arr) {
  /* เขียนโค้ดของคุณที่นี่ */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

ตัวอย่างนี้ใช้สตริง (string) แต่ฟังก์ชันต้องใช้กับค่าชนิดใดก็ได้

ให้ใช้ `Set` เพื่อเก็บค่าที่ไม่ซ้ำกัน
