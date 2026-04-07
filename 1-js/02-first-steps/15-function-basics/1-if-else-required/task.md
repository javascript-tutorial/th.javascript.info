importance: 4

---

# จำเป็นต้องมี "else" ไหม?

ฟังก์ชันข้างล่างจะคืน `true` ถ้าพารามิเตอร์ `age` มากกว่า `18`

ถ้าไม่ใช่ ก็จะเรียก `confirm` แล้วคืนผลที่ผู้ใช้กดมา

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

ฟังก์ชันจะทำงานต่างออกไปหรือเปล่าถ้าไม่มี `else`?

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

สองแบบนี้ต่างกันยังไง?
