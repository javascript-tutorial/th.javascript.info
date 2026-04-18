importance: 3

---

# คูณค่า property ที่เป็นตัวเลขด้วย 2

เขียนฟังก์ชัน `multiplyNumeric(obj)` ที่คูณค่าของ property ทุกตัวใน `obj` ที่มี value เป็นตัวเลขด้วย `2`

เช่น:

```js
// ก่อนเรียกใช้ function
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// หลังเรียกใช้ function
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

หมายเหตุ: `multiplyNumeric` ไม่ต้องคืนค่าอะไร แค่เปลี่ยนค่าของ object ให้

ป.ล. ใช้ `typeof` เช็คว่าเป็นตัวเลขหรือเปล่า
