
# เรียก async จากฟังก์ชันปกติ

มีฟังก์ชัน "ปกติ" ชื่อ `f` อยู่ จะเรียกใช้ `async` function `wait()` และนำผลลัพธ์มาใช้ใน `f` ได้ยังไง?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...เขียนอะไรที่นี่ดี?
  // เราต้องเรียก async wait() แล้วรอผลลัพธ์ที่เป็น 10
  // จำไว้ว่าใช้ "await" ไม่ได้
}
```

P.S. โจทย์นี้ง่ายมากในแง่เทคนิค แต่เป็นคำถามที่คนที่เพิ่งเริ่มเรียน async/await ถามบ่อยมาก
