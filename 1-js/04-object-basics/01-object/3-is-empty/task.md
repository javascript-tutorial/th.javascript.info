importance: 5

---

# ตรวจว่าออบเจ็กต์ว่างหรือไม่

เขียนฟังก์ชัน `isEmpty(obj)` ให้คืนค่า `true` เมื่อออบเจ็กต์ไม่มีพร็อพเพอร์ตี้เลย และคืนค่า `false` ในกรณีอื่น

ฟังก์ชันควรทำงานแบบนี้:

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```
