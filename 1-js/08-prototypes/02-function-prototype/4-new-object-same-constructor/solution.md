วิธีนี้ใช้ได้ก็ต่อเมื่อเรามั่นใจว่าพร็อพเพอร์ตี้ `"constructor"` ชี้ไปยังค่าที่ถูกต้อง

ยกตัวอย่าง ถ้าเราไม่ไปแตะ `"prototype"` เริ่มต้น โค้ดนี้ก็จะทำงานได้:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (ทำงานได้!)
```

ทำงานได้เพราะ `User.prototype.constructor == User`

..แต่ถ้ามีใครไปเขียนทับ `User.prototype` แล้วลืมกำหนด `constructor` ให้ชี้กลับไปที่ `User` โค้ดก็จะพังทันที

ยกตัวอย่าง:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

ทำไม `user2.name` ถึงเป็น `undefined`?

มาดูกันว่า `new user.constructor('Pete')` ทำงานอย่างไร:

1. แรกสุดจะหา `constructor` ใน `user` ก่อน -- ไม่เจอ
2. จากนั้นก็ไล่ขึ้นไปตาม prototype chain โปรโตไทป์ของ `user` คือ `User.prototype` ซึ่งก็ไม่มี `constructor` เช่นกัน (เพราะเรา "ลืม" กำหนดไว้)
3. ไล่ขึ้นไปอีก `User.prototype` เป็นออบเจ็กต์ธรรมดา ซึ่งโปรโตไทป์คือ `Object.prototype` ที่มีมาในตัว
4. สุดท้ายก็ไปเจอ `Object.prototype.constructor == Object` จึงใช้ตัวนี้แทน

สรุปแล้วสิ่งที่เกิดขึ้นคือ `let user2 = new Object('Pete')`

ซึ่งไม่ใช่สิ่งที่เราต้องการ เราอยากสร้าง `new User` ไม่ใช่ `new Object` ทั้งหมดนี้เกิดจากการที่ `constructor` หายไป

(เกร็ดเล็กๆ: `new Object(...)` จะแปลงอาร์กิวเมนต์ให้เป็นออบเจ็กต์ แต่เป็นแค่ความรู้ทางทฤษฎี ในทางปฏิบัติไม่มีใครเรียก `new Object` โดยส่งค่าเข้าไป และโดยทั่วไปเราก็ไม่ใช้ `new Object` ในการสร้างออบเจ็กต์อยู่แล้ว)
