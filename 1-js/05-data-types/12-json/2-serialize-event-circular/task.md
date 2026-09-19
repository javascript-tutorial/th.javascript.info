importance: 5

---

# ตัดการอ้างอิงที่วนกลับมา

ถ้ามีการอ้างอิงวนกลับ (circular reference) ที่ไม่ซับซ้อน เราอาจตรวจจากชื่อพร็อพเพอร์ตี้ (property) แล้วข้ามพร็อพเพอร์ตี้ที่ทำให้เกิดปัญหานั้นขณะแปลงเป็น JSON ได้

แต่บางครั้ง พร็อพเพอร์ตี้ที่ทำให้เกิดการอ้างอิงวนกลับอาจมีชื่อเดียวกับพร็อพเพอร์ตี้อื่นที่เราต้องการเก็บไว้ ถ้าตรวจจากชื่ออย่างเดียวก็จะแยกไม่ออก ในกรณีนี้เราเลือกตรวจจากค่าของพร็อพเพอร์ตี้แทนได้

เขียนฟังก์ชัน (function) `replacer` เพื่อแปลงข้อมูลทั้งหมดเป็น JSON โดยข้ามพร็อพเพอร์ตี้ที่อ้างอิงกลับมาที่ `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// การอ้างอิงวนกลับ
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* เติมโค้ดตรงนี้ */
}));

/* ผลลัพธ์ที่ควรได้:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
