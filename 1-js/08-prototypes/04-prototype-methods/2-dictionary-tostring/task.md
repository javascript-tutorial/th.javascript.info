importance: 5

---

# เพิ่ม toString ให้ dictionary

มีออบเจ็กต์ `dictionary` ที่สร้างด้วย `Object.create(null)` สำหรับเก็บคู่ `key/value` อะไรก็ได้

ให้เพิ่มเมธอด `dictionary.toString()` ที่คืนค่ารายการ key คั่นด้วยจุลภาค โดย `toString` ต้องไม่โผล่ขึ้นมาเวลาวน `for..in` บนออบเจ็กต์

ตัวอย่างการทำงาน:

```js
let dictionary = Object.create(null);

*!*
// โค้ดของคุณที่เพิ่มเมธอด dictionary.toString
*/!*

// เพิ่มข้อมูล
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ เป็น key ธรรมดาในที่นี้

// มีแค่ apple กับ __proto__ ในลูป
for(let key in dictionary) {
  alert(key); // "apple" แล้วก็ "__proto__"
}

// toString ที่เราเขียนทำงาน
alert(dictionary); // "apple,__proto__"
```
