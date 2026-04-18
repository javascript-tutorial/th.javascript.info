importance: 5

---

# เช็คว่า object ว่างไหม

เขียนฟังก์ชัน `isEmpty(obj)` ที่คืนค่า `true` เมื่อ object ไม่มี property อะไรเลย ถ้ามีอย่างน้อย 1 ตัวให้คืน `false`

ควรใช้งานได้แบบนี้:

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```
