importance: 4

---

# จำเป็นต้องมี "else" หรือไม่?

ฟังก์ชั่นด้านล่างจะส่งคืนค่า `true` หากพารามิเตอร์์ `age` มีค่ามากกว่า `18`

มิเช่นนั้น ฟังก์ชั่น `confirm` จะทำงานแล้ว ส่งคืนผลลัพธ์ที่ผู้ใช้กรอกมา

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

ฟังก์ชั่นจะทำงานต่างออกไปหรือไม่หากไม่มี `else`

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

อะไรคือความต่างกันของทั้งสองตัว
