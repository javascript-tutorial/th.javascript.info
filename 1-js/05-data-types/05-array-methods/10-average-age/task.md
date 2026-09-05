importance: 4

---

# หาอายุเฉลี่ย

เขียนฟังก์ชัน (function) `getAverageAge(users)` ที่รับอาร์เรย์ (array) ของออบเจ็กต์ (object) ซึ่งแต่ละตัวมีพร็อพเพอร์ตี้ (property) `age` แล้วคืนค่าอายุเฉลี่ย

คำนวณค่าเฉลี่ยด้วยสูตร `(age1 + age2 + ... + ageN) / N`

ตัวอย่าง:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
