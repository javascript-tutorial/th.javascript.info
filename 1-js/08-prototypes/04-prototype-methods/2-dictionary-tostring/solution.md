
เมธอดนี้สามารถดึง key ที่เป็น enumerable ทั้งหมดด้วย `Object.keys` แล้วแสดงผลเป็นรายการ

เพื่อให้ `toString` ไม่เป็น enumerable ก็กำหนดด้วย property descriptor ซึ่ง `Object.create` รับ descriptor เป็นอาร์กิวเมนต์ตัวที่สองได้เลย

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

เมื่อสร้างพร็อพเพอร์ตี้ด้วย descriptor แฟล็กทั้งหมดจะเป็น `false` โดยปริยาย ดังนั้นในโค้ดด้านบน `dictionary.toString` จึงไม่เป็น enumerable

ทบทวนเพิ่มเติมได้ในบท [](info:property-descriptors)
