
# หน่วงเวลาด้วย promise

ฟังก์ชัน `setTimeout` ในตัวใช้ callback ลองสร้างอีกแบบที่ใช้ promise แทน

ฟังก์ชัน `delay(ms)` ควรคืน promise โดย promise นั้นจะ resolve หลังจากผ่านไป `ms` มิลลิวินาที เพื่อให้เราต่อ `.then` ได้ แบบนี้:

```js
function delay(ms) {
  // โค้ดของเรา
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
