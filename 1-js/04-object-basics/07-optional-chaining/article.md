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

## Optional Chaining กับ Property: `?.`

Optional chaining `?.` จะหยุดการทำงานทันที ถ้าค่าทางซ้ายของ `?.` เป็น `undefined` หรือ `null` และจะคืนค่า `undefined` กลับมา

**ในบทความนี้ เพื่อความกระชับ เราจะใช้คำว่า "มีอยู่" หมายถึงไม่เป็น `null` หรือ `undefined`**

กล่าวคือ `value?.prop`:
- จะทำงานเหมือน `value.prop` ถ้า `value` มีอยู่
- ถ้า `value` เป็น `undefined/null` จะคืนค่า `undefined`

ตัวอย่างการใช้ `?.` เพื่อเข้าถึง `user.address.street`:

```js run
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert( user?.address?.street ); // undefined (ไม่เกิด error)
```

โค้ดสั้นลง และไม่มีการเช็คซ้ำๆ

กับตัวอย่าง `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // จะเป็น undefined ถ้าไม่เจอ element
```

แม้แต่ในกรณีที่ไม่มีตัวแปร `user` เลย ก็ยังใช้ `?.` ได้อย่างปลอดภัย:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

โปรดสังเกตว่า `?.` ทำให้ส่วนทางซ้ายมันเป็น optional ได้ แต่ไม่ใช่ส่วนถัดไป

ใน `user?.address.street.name` ตัว `?.` อนุญาตให้ `user` เป็น `null/undefined` แต่ส่วนที่เหลือ (`address`, `street`, `name`) จะถูกเข้าถึงแบบปกติ ถ้าเราอยากให้ส่วนอื่นเป็น optional ด้วย ต้องแทน `.` ด้วย `?.` เพิ่มเติม

```warn header="ใช้ ?. อย่างพอดี"
เราควรใช้ `?.` เฉพาะในกรณีที่ยอมรับได้หากบางอย่างไม่มีอยู่

เช่น ถ้าตามตรรกะของโปรแกรมแล้ว `user` ต้องมีอยู่ แต่ `address` เป็น optional ได้ เราควรเขียน `user.address?.street` แต่ไม่ใช่ `user?.address?.street`

มิฉะนั้น ถ้าใช้ `?.` มากเกินไป เวลามีข้อผิดพลาดขึ้นมาจริงๆ มันอาจถูกซ่อนเงียบไว้ ทำให้ยากต่อการดีบั๊กในภายหลัง
```

````warn header="ตัวแปรทางซ้ายของ ?. ต้องถูกประกาศก่อน"
ถ้าไม่มีตัวแปรนั้นเลย เช่น `user?.anything` จะเกิด error:

```js run
// ReferenceError: user is not defined
user?.address;
```
ตัวแปรจะต้องถูกประกาศก่อน จากนั้น optional chaining จึงจะใช้งานได้
````

## Short-Circuiting

`?.` จะหยุดการทำงานทันทีถ้าส่วนซ้ายไม่มีอยู่ (เป็น `null/undefined`) ดังนั้นถ้ามีการเรียก function หรือคำสั่งอื่นๆ ทางขวาของ `?.` จะไม่ถูกรันเลย

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // ไม่มี "user" จึงไม่ถึงการเรียก sayHi และ x++

alert(x); // 0, ค่า x ไม่ถูกเพิ่ม
```

## Optional Chaining กับ Function: `?.()`  

`?.()` ใช้เพื่อเรียก function ที่อาจจะไม่มีอยู่

ตัวอย่างเช่นในโค้ดด้านล่าง ผู้ใช้บางคนมี method `admin` บางคนไม่มี:

```js run
let userAdmin = {
  admin() {
    alert("ฉันคือ admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // ฉันคือ admin
*/!*

*!*  
userGuest.admin?.(); // ไม่มีอะไรเกิดขึ้น (ไม่มี method admin)
*/!*
```

สังเกตว่าเราใช้ `.` เพื่อเข้าถึง `admin` ก่อน เพราะเรามั่นใจว่าตัวแปร `user` มีอยู่แน่ๆ จากนั้นจึงตามด้วย `?.()`

## Optional Chaining กับ [] : `?.[]`

ถ้าเราต้องการใช้ `[]` เพื่อเข้าถึง property แทนที่จะใช้ `.` ก็ใช้ `?.[]` ได้

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

และสามารถใช้กับ `delete` ได้ด้วย:

```js run
delete user?.name; // ลบ user.name ถ้า user มีอยู่
```

````warn header="ใช้ ?. ได้แค่อ่านและลบ ไม่ใช่การเขียน"
Optional chaining `?.` ไม่ใช้ในด้านซ้ายของการกำหนดค่า

```js run
let user = null;

user?.name = "John"; // Error เพราะจะประเมินเป็น undefined = "John"
```
````