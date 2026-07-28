importance: 4

---

# ต้องมี "else" ไหม?

ฟังก์ชันต่อไปนี้จะคืนค่า `true` เมื่อพารามิเตอร์ `age` มากกว่า `18`

ถ้าไม่ใช่ ฟังก์ชันจะถามผู้ใช้ผ่าน `confirm` แล้วคืนค่าคำตอบนั้น

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

ถ้าเอา `else` ออก ฟังก์ชันจะทำงานต่างจากเดิมไหม?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

โค้ดสองแบบนี้มีพฤติกรรมต่างกันหรือไม่?
