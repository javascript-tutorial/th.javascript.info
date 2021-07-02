importance: 5

---

# เขียน 'if..else' ให้เป็น '?'

เขียน `if..else` นี้ใหม่โดยใช้ตัวดำเนินการตามเงื่อนไข `'?'`

เพื่อให้โค้ดอ่านง่ายขึ้น ขอแนะนำให้แยกโค้ดออกเป็นหลายบรรทัด

```js
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
```
