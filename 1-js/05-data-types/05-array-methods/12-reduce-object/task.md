importance: 4

---

# สร้างออบเจ็กต์ที่ใช้ id เป็นคีย์จากอาร์เรย์

สมมติว่าเราได้รับอาร์เรย์ของผู้ใช้ในรูปแบบ `{id:..., name:..., age:... }`

สร้างฟังก์ชัน `groupById(arr)` ซึ่งนำอาร์เรย์นี้มาสร้างเป็นออบเจ็กต์ โดยใช้ `id` เป็นคีย์ และใช้สมาชิกแต่ละตัวของอาร์เรย์เป็นค่า

ตัวอย่าง:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// หลังเรียกฟังก์ชัน เราควรได้ค่าแบบนี้:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

ฟังก์ชันแบบนี้มีประโยชน์มากเวลาเราทำงานกับข้อมูลจากเซิร์ฟเวอร์

โจทย์ข้อนี้กำหนดให้ `id` ไม่ซ้ำกัน จึงไม่มีสมาชิกสองตัวที่ใช้ `id` เดียวกัน

ให้ใช้เมธอด `.reduce` ของอาร์เรย์ในคำตอบ
