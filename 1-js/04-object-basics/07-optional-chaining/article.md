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

<<<<<<< HEAD
อีกครั้ง ในหลายกรณีที่ไม่เจอ element ก็ถือเป็นเรื่องปกติ เราอาจต้องการให้คืนค่า `html` เป็น `null` แทนที่จะเกิด error
=======
Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` property of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

## วิธีแก้ไขเดิมก่อนมี Optional Chaining

ก่อนที่จะมี optional chaining `?.` เราต้องเช็คค่าด้วย `if` หรือ `&&` ก่อนที่จะเข้าถึง property ต่อๆ ไป เช่น:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

<<<<<<< HEAD
หรือในกรณี `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

ใช้ได้ แต่ดูยุ่งเหยิงและต้องเช็คซ้ำๆ โดยเฉพาะกับ property ที่ซ้อนกันหลายชั้น เช่น `user.address.street.name`
=======
It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code.

Here's how the same would look for `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

We can see that the element search `document.querySelector('.elem')` is actually called twice here. Not good.

For more deeply nested properties, it becomes even uglier, as more repetitions are required.

E.g. let's get `user.address.street.name` in a similar fashion.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

<<<<<<< HEAD
อีกวิธีที่ดูดีกว่าเล็กน้อยคือใช้ `&&`:
=======
That's just awful, one may even have problems understanding such code.

There's a little better way to write it, using the `&&` operator:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

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

<<<<<<< HEAD
กับตัวอย่าง `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // จะเป็น undefined ถ้าไม่เจอ element
```

แม้แต่ในกรณีที่ไม่มีตัวแปร `user` เลย ก็ยังใช้ `?.` ได้อย่างปลอดภัย:
=======
Here's an example with `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there's no element
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

โปรดสังเกตว่า `?.` ทำให้ส่วนทางซ้ายมันเป็น optional ได้ แต่ไม่ใช่ส่วนถัดไป

ใน `user?.address.street.name` ตัว `?.` อนุญาตให้ `user` เป็น `null/undefined` แต่ส่วนที่เหลือ (`address`, `street`, `name`) จะถูกเข้าถึงแบบปกติ ถ้าเราอยากให้ส่วนอื่นเป็น optional ด้วย ต้องแทน `.` ด้วย `?.` เพิ่มเติม

```warn header="ใช้ ?. อย่างพอดี"
เราควรใช้ `?.` เฉพาะในกรณีที่ยอมรับได้หากบางอย่างไม่มีอยู่

<<<<<<< HEAD
เช่น ถ้าตามตรรกะของโปรแกรมแล้ว `user` ต้องมีอยู่ แต่ `address` เป็น optional ได้ เราควรเขียน `user.address?.street` แต่ไม่ใช่ `user?.address?.street`

มิฉะนั้น ถ้าใช้ `?.` มากเกินไป เวลามีข้อผิดพลาดขึ้นมาจริงๆ มันอาจถูกซ่อนเงียบไว้ ทำให้ยากต่อการดีบั๊กในภายหลัง
=======
For example, if according to our code logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

Then, if `user` happens to be undefined, we'll see a programming error about it and fix it. Otherwise, if we overuse `?.`, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
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

<<<<<<< HEAD
`?.` จะหยุดการทำงานทันทีถ้าส่วนซ้ายไม่มีอยู่ (เป็น `null/undefined`) ดังนั้นถ้ามีการเรียก function หรือคำสั่งอื่นๆ ทางขวาของ `?.` จะไม่ถูกรันเลย
=======
As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or operations to the right of `?.`, they won't be made.

For instance:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // ไม่มี "user" จึงไม่ถึงการเรียก sayHi และ x++
=======
user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

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

<<<<<<< HEAD
*!*  
userGuest.admin?.(); // ไม่มีอะไรเกิดขึ้น (ไม่มี method admin)
*/!*
```

สังเกตว่าเราใช้ `.` เพื่อเข้าถึง `admin` ก่อน เพราะเรามั่นใจว่าตัวแปร `user` มีอยู่แน่ๆ จากนั้นจึงตามด้วย `?.()`

## Optional Chaining กับ [] : `?.[]`
=======
*!*
userGuest.admin?.(); // nothing happens (no such method)
*/!*
```

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the `user` object exists, so it's safe read from it.

Then `?.()` checks the left part: if the `admin` function exists, then it runs (that's so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

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

<<<<<<< HEAD
````warn header="ใช้ ?. ได้แค่อ่านและลบ ไม่ใช่การเขียน"
Optional chaining `?.` ไม่ใช้ในด้านซ้ายของการกำหนดค่า
=======
````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use on the left side of an assignment.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let user = null;

<<<<<<< HEAD
user?.name = "John"; // Error เพราะจะประเมินเป็น undefined = "John"
```
=======
user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"
```

>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
````

## สรุป

ไวยากรณ์ Optional chaining `?.` มี 3 รูปแบบ:

1. `obj?.prop` -- คืนค่า `obj.prop` ถ้า `obj` มีอยู่ ไม่งั้นคืน `undefined`
2. `obj?.[prop]` -- คืนค่า `obj[prop]` ถ้า `obj` มีอยู่ ไม่งั้นคืน `undefined` 
3. `obj.method?.()` -- เรียก `obj.method()` ถ้า `obj.method` มีอยู่ ไม่งั้นคืน `undefined`

`?.` จะเช็ค `null/undefined` ทางด้านซ้าย และอนุญาตให้เข้าถึงต่อไปได้ถ้าไม่ใช่

การเรียงต่อกันหลายตัวของ `?.` ทำให้เข้าถึง property ที่ซ้อนกันได้อย่างปลอดภัย

<<<<<<< HEAD
อย่างไรก็ตาม ควรใช้ `?.` อย่างระมัดระวัง เฉพาะในกรณีที่ยอมรับได้หากบางอย่างไม่มีอยู่จริง เพื่อไม่ให้ข้อผิดพลาดที่ควรเกิดถูกซ่อนเงียบไป
=======
Still, we should apply `?.` carefully, only where it's acceptable, according to our code logic, that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
