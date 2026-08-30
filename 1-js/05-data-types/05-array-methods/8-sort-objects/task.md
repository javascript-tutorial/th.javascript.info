importance: 5

---

# เรียงผู้ใช้ตามอายุ

เขียนฟังก์ชัน `sortByAge(users)` ซึ่งรับอาร์เรย์ของออบเจ็กต์ที่มีพร็อพเพอร์ตี้ `age` แล้วเรียงสมาชิกตามอายุ

ตัวอย่าง:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// ตอนนี้: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
