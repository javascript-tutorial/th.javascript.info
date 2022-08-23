importance: 3

---

# คูณค่าของ property ทุกตัวที่มี value ป็นค่าเชิงตัวเลขด้วย 2

สร้าง function `multiplyNumeric(obj)` ที่จะทำการคูณค่าของ property ทุกตัวใน `obj` ที่มี value เป็นค่าเชิงตัวเลขด้วย `2`

ตัวอย่างเช่น:

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

โปรดทราบว่า `multiplyNumeric` ไม่จำเป็นต้องตอบกลับ แต่ทำการเปลี่ยนค่าของ object

ป.ล. ใช้ `typeof` เพื่อทดสอบว่าเป็นค่าเชิงตัวเลข
