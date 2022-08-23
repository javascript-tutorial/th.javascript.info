importance: 5

---

# ตรวจสอบ object ว่าง

เขียน function `isEmpty(obj)` ที่จะตอบกลับ `true` เมื่อ object ไม่มี property ใดๆ เลย ตอบกลับ `false` หากเป็นอย่างอื่น

ควรทำงานได้ทำนองนี้:

```js
let schedule = {};

alert( isEmpty(schedule) ); // ตอบ true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // ตอบ false
```
