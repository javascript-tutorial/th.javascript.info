วิธีนี้ใช้ได้เมื่อพร็อพเพอร์ตี้ (property) ชื่อ `constructor` ที่อ่านจากออบเจ็กต์ (object) ยังชี้ไปที่คอนสตรักเตอร์ (constructor) ที่เราใช้สร้างออบเจ็กต์นั้น

ตัวอย่างเช่น ถ้าใช้ `User.prototype` ตามค่าเริ่มต้น เราก็ใช้ `user.constructor` สร้างออบเจ็กต์อีกตัวได้

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (ทำงานได้!)
```

เมื่ออ่าน `user.constructor` เราจะได้ `User.prototype.constructor` ซึ่งชี้ไปที่ `User` ดังนั้น `User` จึงทำงานอีกครั้งและกำหนด `name` ของ `user2` เป็น `"Pete"`

แต่ถ้าเราแทนที่ `User.prototype` ด้วยออบเจ็กต์ใหม่ แล้วไม่ได้กำหนด `constructor` ให้ชี้กลับไปที่ `User` การอ่าน `user.constructor` จะได้ค่าอื่น

ลองดูผลเมื่อกำหนด `User.prototype = {}` ก่อนสร้าง `user`

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

ลองไล่ดูว่า `new user.constructor('Pete')` หาคอนสตรักเตอร์จากที่ไหน

1. JavaScript หา `constructor` บน `user` เองก่อน แต่ไม่พบ
2. จากนั้นจึงหาบนโปรโตไทป์ (prototype) ของ `user` นั่นคือออบเจ็กต์ว่างที่เรากำหนดให้ `User.prototype` ออบเจ็กต์นี้ก็ไม่มี `constructor` ของตัวเอง
3. ออบเจ็กต์ว่างนั้นมี `Object.prototype` เป็นโปรโตไทป์ จึงค้นหาต่อที่ `Object.prototype`
4. ที่นี่มี `Object.prototype.constructor` ซึ่งชี้ไปที่ `Object` จึงได้ `Object` เป็นคอนสตรักเตอร์

บรรทัดที่สร้าง `user2` จึงให้ผลเหมือนเขียน `let user2 = new Object('Pete')`

คอนสตรักเตอร์ `User` ไม่ได้ทำงาน จึงไม่มีการกำหนดพร็อพเพอร์ตี้ `name` ให้ `user2` เมื่ออ่าน `user2.name` จึงได้ `undefined`

ในตัวอย่างนี้ `new Object('Pete')` แปลงอาร์กิวเมนต์ (argument) `'Pete'` ให้เป็นออบเจ็กต์ ในการเขียนโปรแกรมทั่วไปเราแทบไม่ได้ใช้ `new Object` เพื่อแปลงค่าหรือสร้างออบเจ็กต์แบบนี้
