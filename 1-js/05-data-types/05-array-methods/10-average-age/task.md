importance: 4

---

# หาอายุเฉลี่ย

เขียนฟังก์ชัน `getAverageAge(users)` ซึ่งรับอาร์เรย์ของออบเจ็กต์ที่มีพร็อพเพอร์ตี้ `age` แล้วคืนค่าอายุเฉลี่ย

สูตรคำนวณค่าเฉลี่ยคือ `(age1 + age2 + ... + ageN) / N`

ตัวอย่าง:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
