importance: 5

---

# แปลงเป็นออบเจ็กต์ (object) ชุดใหม่

กำหนดให้มีอาร์เรย์ (array) ของออบเจ็กต์ `user` ซึ่งแต่ละตัวมี `name`, `surname` และ `id`

เขียนโค้ดแปลงข้อมูลนี้เป็นอาร์เรย์ใหม่ โดยแต่ละออบเจ็กต์มี `id` และ `fullName` ซึ่งได้จากการนำ `name` กับ `surname` มารวมกัน

ตัวอย่าง:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... เขียนโค้ดตรงนี้ ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

โจทย์นี้จึงเป็นการแปลงอาร์เรย์ของออบเจ็กต์ชุดหนึ่งไปเป็นอีกชุดหนึ่ง ลองใช้ `=>` ดู มีจุดที่ต้องระวังอยู่เล็กน้อย