importance: 5

---

# เขียน `if..else` ใหม่ด้วย `?`

เขียน `if..else` ต่อไปนี้ใหม่ด้วยตัวดำเนินการแบบมีเงื่อนไข `?` หลายตัว

เพื่อให้อ่านง่าย แนะนำให้แบ่งโค้ดเป็นหลายบรรทัด

```js
let message;

if (login == 'Employee') {
  message = 'สวัสดี';
} else if (login == 'Director') {
  message = 'ยินดีต้อนรับ';
} else if (login == '') {
  message = 'ไม่ได้กรอกข้อมูลล็อกอิน';
} else {
  message = '';
}
```
