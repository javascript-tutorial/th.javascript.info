importance: 5

---

# เรียงข้อมูลผู้ใช้ตามอายุ

เขียนฟังก์ชัน (function) `sortByAge(users)` ที่รับอาร์เรย์ (array) ของออบเจ็กต์ (object) ซึ่งแต่ละตัวมีพร็อพเพอร์ตี้ (property) `age` แล้วเรียงตาม `age` จากน้อยไปมาก

ตัวอย่าง:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// ตอนนี้ได้: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
