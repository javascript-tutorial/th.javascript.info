importance: 4

---

# สร้างออบเจ็กต์ (object) จากอาร์เรย์ (array) โดยใช้ id เป็นคีย์ (key)

สมมติว่าเราได้รับอาร์เรย์ข้อมูลผู้ใช้ โดยแต่ละตัวมีรูปแบบ `{id:..., name:..., age:... }`

เขียนฟังก์ชัน (function) `groupById(arr)` ที่แปลงอาร์เรย์นี้เป็นออบเจ็กต์ โดยใช้ `id` ของสมาชิก (element) แต่ละตัวเป็นคีย์ และใช้สมาชิกตัวนั้นเป็นค่าของคีย์

ตัวอย่าง:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// หลังเรียกฟังก์ชันควรได้ผลลัพธ์ดังนี้:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

ฟังก์ชันลักษณะนี้มีประโยชน์เวลาทำงานกับข้อมูลจากเซิร์ฟเวอร์ (server)

ในโจทย์นี้ให้ถือว่า `id` ของสมาชิกแต่ละตัวไม่ซ้ำกัน

ให้ใช้เมธอด (method) `.reduce` ของอาร์เรย์ในการแก้โจทย์นี้
