# Optional Chaining '?.'

[recent browser="new"]

Optional chaining หรือ `?.` เป็นวิธีที่ปลอดภัยในการเข้าถึงคุณสมบัติแบบซ้อนของออบเจ็กต์ แม้ว่าคุณสมบัติระหว่างทางจะไม่มีอยู่ก็ตาม

## ปัญหาเมื่อเข้าถึงคุณสมบัติที่ไม่มีอยู่

ยกตัวอย่างเช่น สมมติเรามีออบเจ็กต์ `user` ที่เก็บข้อมูลผู้ใช้ โดยผู้ใช้ส่วนใหญ่มีที่อยู่อยู่ใน `user.address` ซึ่งภายในมี `user.address.street` เก็บชื่อถนน แต่ผู้ใช้บางคนอาจไม่ได้ระบุที่อยู่ไว้

เมื่อเราพยายามเข้าถึง `user.address.street` โดยที่ผู้ใช้ไม่มีที่อยู่ จะเกิดข้อผิดพลาดแบบนี้:

```js run
let user = {}; // ผู้ใช้ที่ไม่มีคุณสมบัติ "address"

alert(user.address.street); // เกิด Error!
```

นั่นคือผลลัพธ์ปกติของ JavaScript เพราะ `user.address` เป็น `undefined` การเข้าถึง `user.address.street` จึงล้มเหลว

ในความเป็นจริง หลายครั้งเราอาจต้องการให้คืนค่า `undefined` กลับมาแทนข้อผิดพลาด (เช่น หมายถึง "ไม่มีถนน") 

อีกตัวอย่างคือเมื่อเรียกใช้ `document.querySelector('.elem')` เพื่อหาองค์ประกอบใน HTML ถ้าไม่เจอจะคืนค่า `null` กลับมา แล้วเมื่อเราพยายามเข้าถึง property ของมัน อย่าง `.innerHTML` ก็จะเกิด error เช่นกัน:

```js run
// document.querySelector('.elem') จะเป็น null ถ้าไม่เจอ element นั้น
let html = document.querySelector('.elem').innerHTML; // เกิด Error ถ้าเป็น null 
```

อีกครั้ง ในหลายกรณีที่ไม่เจอ element ก็ถือเป็นเรื่องปกติ เราอาจต้องการให้คืนค่า `html` เป็น `null` แทนที่จะเกิด error

## วิธีแก้ไขเดิมก่อนมี Optional Chaining

ก่อนที่จะมี optional chaining `?.` เราต้องเช็คค่าด้วย `if` หรือ `&&` ก่อนที่จะเข้าถึง property ต่อๆ ไป เช่น:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

หรือในกรณี `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

ใช้ได้ แต่ดูยุ่งเหยิงและต้องเช็คซ้ำๆ โดยเฉพาะกับ property ที่ซ้อนกันหลายชั้น เช่น `user.address.street.name`

```js
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

อีกวิธีที่ดูดีกว่าเล็กน้อยคือใช้ `&&`:

```js run
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert( user.address && user.address.street && user.address.street.name ); // undefined (ไม่เกิด error)
```

แต่ก็ยังต้องเช็ค property ซ้ำๆ อยู่ดี

นี่จึงเป็นที่มาของ optional chaining `?.` เพื่อแก้ปัญหานี้ครั้งเดียวจบ!
