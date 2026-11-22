importance: 5

---

# เพิ่ม toString ให้พจนานุกรม (dictionary)

เรามีออบเจ็กต์ (object) ชื่อ `dictionary` ที่สร้างด้วย `Object.create(null)` เพื่อเก็บข้อมูลเป็นคู่ โดยใช้คีย์ (key) แต่ละชื่อค้นหาค่าที่เก็บไว้

ให้เพิ่มเมธอด (method) `dictionary.toString()` ที่คืนชื่อคีย์เป็นสตริง (string) คั่นแต่ละชื่อด้วยจุลภาค เมื่อใช้ `for..in` วนดูคีย์ในพจนานุกรม ต้องได้เฉพาะคีย์ของข้อมูลที่เพิ่มเข้าไป โดยไม่มี `toString` ปนมาด้วย

เมื่อลองกับข้อมูลด้านล่าง โค้ดควรแสดงผลตามคอมเมนต์

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
