importance: 5

---

# แปลงเป็นอาร์เรย์ของชื่อด้วย map

เรามีอาร์เรย์ของออบเจ็กต์ผู้ใช้ โดยอ่านชื่อของแต่ละคนได้จาก `user.name` ให้เขียนโค้ดที่แปลงอาร์เรย์นี้เป็นอาร์เรย์ของชื่อ

ตัวอย่าง:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = /* ... โค้ดของคุณ */

alert( names ); // John, Pete, Mary
```
