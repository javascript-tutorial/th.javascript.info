importance: 5

---

# แปลงเป็นอาร์เรย์ของออบเจ็กต์ด้วย map

เรามีอาร์เรย์ของออบเจ็กต์ผู้ใช้ แต่ละออบเจ็กต์มี `name`, `surname` และ `id`

ให้เขียนโค้ดเพื่อสร้างอาร์เรย์ใหม่ที่มีออบเจ็กต์ซึ่งประกอบด้วย `id` และ `fullName` โดยนำ `name` กับ `surname` มารวมกันเป็น `fullName`

ตัวอย่าง:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... โค้ดของคุณ ... */
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

สรุปคือเราต้องแปลงอาร์เรย์ของออบเจ็กต์ชุดหนึ่งเป็นอีกชุดหนึ่ง ลองใช้ `=>` ดู แต่มีจุดที่ต้องระวังนิดหน่อย