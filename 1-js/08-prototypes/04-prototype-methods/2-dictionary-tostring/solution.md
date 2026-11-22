
ภายในเมธอด (method) `toString` ใช้ `Object.keys(this)` เพื่อดึงชื่อพร็อพเพอร์ตี้ (property) ของออบเจ็กต์ (object) นี้เอง เฉพาะชื่อที่เป็นสตริง (string) และเปิดให้ไล่ชื่อได้ (enumerable) จากนั้น `join()` จะรวมชื่อเหล่านั้นเป็นสตริงเดียวโดยคั่นด้วยจุลภาค

วิธีนี้กำหนด `toString` ตั้งแต่ตอนสร้าง `dictionary` อาร์กิวเมนต์ (argument) ตัวที่สองของ `Object.create` เป็นออบเจ็กต์ที่จับคู่ชื่อพร็อพเพอร์ตี้กับรายละเอียดของชื่อนั้น (property descriptor) สำหรับชื่อ `toString` ตัว descriptor คือออบเจ็กต์ชั้นในที่กำหนด `value` ให้เป็นฟังก์ชัน (function)

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // กำหนดพร็อพเพอร์ตี้ toString
    value() { // ค่าเป็นฟังก์ชัน
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple กับ __proto__ อยู่ในลูป
for(let key in dictionary) {
  alert(key); // "apple" แล้วก็ "__proto__"
}

// รายการพร็อพเพอร์ตี้คั่นด้วยจุลภาค จาก toString
alert(dictionary); // "apple,__proto__"
```

เมื่อสร้างพร็อพเพอร์ตี้ด้วย descriptor แฟล็ก (flag) ที่ไม่ได้ระบุจะมีค่าเริ่มต้นเป็น `false` ในตัวอย่างนี้ `enumerable` ของ `toString` จึงเป็น `false` ทั้ง `for..in` และ `Object.keys` จึงข้ามชื่อนี้ไป

ทบทวนเรื่องแฟล็กได้ในบท [](info:property-descriptors)
