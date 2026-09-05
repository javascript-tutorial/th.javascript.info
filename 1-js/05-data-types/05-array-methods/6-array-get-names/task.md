importance: 5

---

# แปลงข้อมูลผู้ใช้เป็นรายชื่อ

กำหนดให้มีอาร์เรย์ (array) ของออบเจ็กต์ (object) `user` ซึ่งแต่ละตัวมี `user.name` ให้เขียนโค้ดแปลงอาร์เรย์นี้เป็นอาร์เรย์ของชื่อผู้ใช้

ตัวอย่าง:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = /* ... เขียนโค้ดตรงนี้ */

alert( names ); // John, Pete, Mary
```
