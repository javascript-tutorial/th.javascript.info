# Optional Chaining '?.'

[recent browser="new"]

Optional chaining `?.` เป็นวิธีที่ปลอดภัยในการเข้าถึงพร็อพเพอร์ตี้ที่ซ้อนกันหลายชั้นในออบเจ็กต์ แม้ว่าพร็อพเพอร์ตี้ระหว่างทางจะไม่มีอยู่ก็ตาม

## ปัญหา "พร็อพเพอร์ตี้ที่ไม่มีอยู่"

ถ้าเพิ่งเริ่มอ่านบทเรียนนี้ อาจยังไม่เคยเจอปัญหานี้ แต่จริงๆ แล้วเจอกันบ่อยมาก

สมมติว่าเรามีออบเจ็กต์ `user` ที่เก็บข้อมูลผู้ใช้ ผู้ใช้ส่วนใหญ่จะมีที่อยู่อยู่ใน `user.address` และมีชื่อถนนอยู่ใน `user.address.street` แต่บางคนอาจไม่ได้กรอกที่อยู่ไว้

ทีนี้พอลองเข้าถึง `user.address.street` ในกรณีที่ผู้ใช้ไม่มีที่อยู่ ก็จะเกิด error ทันที:

```js run
let user = {}; // ผู้ใช้ที่ไม่มีพร็อพเพอร์ตี้ "address"

alert(user.address.street); // Error!
```

นี่คือผลลัพธ์ปกติของ JavaScript เพราะ `user.address` เป็น `undefined` พอพยายามเข้าถึง `user.address.street` จึงพังทันที

แต่ในทางปฏิบัติ หลายครั้งเราอยากได้ `undefined` กลับมาแทน error มากกว่า (หมายถึง "ไม่มีถนน")

...อีกตัวอย่างหนึ่ง ในงาน Web development เราใช้ `document.querySelector('.elem')` เพื่อหา element ในหน้าเว็บ ซึ่งจะคืนค่า `null` ถ้าไม่เจอ element นั้น:

```js run
// document.querySelector('.elem') จะเป็น null ถ้าไม่เจอ element นั้น
let html = document.querySelector('.elem').innerHTML; // error ถ้าเป็น null
```

อีกครั้ง ถ้าไม่เจอ element ก็ถือเป็นเรื่องปกติ เราแค่อยากให้ `html = null` แทนที่จะเกิด error

แล้วจะทำยังไงดีล่ะ?

วิธีที่ชัดเจนที่สุดคือเช็คค่าก่อนด้วย `if` หรือ conditional operator `?` ก่อนจะเข้าถึงพร็อพเพอร์ตี้ เช่น:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

ใช้ได้นะ ไม่มี error... แต่ดูไม่สวยเลย เพราะ `"user.address"` ต้องเขียนซ้ำถึงสองครั้ง

ลองดูแบบเดียวกันกับ `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

จะเห็นว่า `document.querySelector('.elem')` ถูกเรียกซ้ำสองครั้งเลย ไม่ดีแน่นอน

ยิ่งพร็อพเพอร์ตี้ซ้อนลึกมากเท่าไร โค้ดก็ยิ่งน่าเกลียดมากขึ้นเท่านั้น ลองดูตัวอย่างการเข้าถึง `user.address.street.name`:

```js
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

แย่มากเลยใช่ไหม? แค่จะอ่านก็ปวดหัวแล้ว

อีกวิธีที่ดูดีกว่าหน่อยคือใช้ตัวดำเนินการ `&&`:

```js run
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert( user.address && user.address.street && user.address.street.name ); // undefined (ไม่เกิด error)
```

การใช้ AND ต่อกันตลอดทาง ช่วยให้แน่ใจว่าทุกส่วนมีอยู่จริง (ถ้าไม่มี จะหยุดประเมินทันที) แต่ก็ยังไม่ดีเท่าไร

จะเห็นว่าชื่อพร็อพเพอร์ตี้ยังต้องเขียนซ้ำอยู่ดี เช่น ในโค้ดข้างบน `user.address` ปรากฏถึงสามครั้ง

นี่แหละเป็นเหตุผลว่าทำไม optional chaining `?.` ถึงถูกเพิ่มเข้ามาในภาษา — เพื่อแก้ปัญหานี้ให้จบครั้งเดียว!

## Optional chaining

Optional chaining `?.` จะหยุดการประเมินทันที ถ้าค่าก่อนหน้า `?.` เป็น `undefined` หรือ `null` แล้วคืนค่า `undefined` กลับมา

**ในบทความนี้ เพื่อความกระชับ เราจะใช้คำว่า "มีอยู่" หมายถึงไม่เป็น `null` หรือ `undefined`**

พูดง่ายๆ ก็คือ `value?.prop`:
- ทำงานเหมือน `value.prop` ถ้า `value` มีอยู่
- แต่ถ้า `value` เป็น `undefined/null` จะคืนค่า `undefined` แทน

มาดูวิธีเข้าถึง `user.address.street` อย่างปลอดภัยโดยใช้ `?.` กัน:

```js run
let user = {}; // ผู้ใช้ไม่มีที่อยู่

alert( user?.address?.street ); // undefined (ไม่เกิด error)
```

โค้ดสั้น สะอาด ไม่มีการเขียนซ้ำเลย

ลองดูตัวอย่างกับ `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // จะเป็น undefined ถ้าไม่เจอ element
```

การอ่านค่าด้วย `user?.address` ยังใช้ได้แม้ว่าออบเจ็กต์ `user` จะไม่มีอยู่เลย:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

สังเกตนะว่า `?.` ทำให้เฉพาะค่าที่อยู่ข้างหน้ามันเป็น optional เท่านั้น ไม่ใช่ส่วนที่ตามมาทีหลัง

เช่น ใน `user?.address.street.name` ตัว `?.` อนุญาตให้ `user` เป็น `null/undefined` ได้ (และจะคืนค่า `undefined` ในกรณีนั้น) แต่ก็แค่สำหรับ `user` เท่านั้น ส่วนพร็อพเพอร์ตี้ที่ตามมาจะเข้าถึงแบบปกติ ถ้าอยากให้บางส่วนเป็น optional ด้วย ก็ต้องเปลี่ยน `.` เป็น `?.` เพิ่ม

```warn header="อย่าใช้ optional chaining มากเกินไป"
ควรใช้ `?.` เฉพาะตรงที่ยอมรับได้ว่าบางอย่างอาจไม่มีอยู่

เช่น ถ้าตามตรรกะของโปรแกรมแล้ว `user` ต้องมีอยู่แน่ๆ แต่ `address` อาจจะมีหรือไม่มีก็ได้ เราควรเขียน `user.address?.street` ไม่ใช่ `user?.address?.street`

เพราะถ้าใช้ `?.` มากเกินไป เวลาเกิด error จริงๆ อาจถูกซ่อนเงียบไป ทำให้ดีบั๊กยากมาก
```

````warn header="ตัวแปรก่อนหน้า `?.` ต้องประกาศไว้แล้ว"
ถ้าไม่มีตัวแปร `user` อยู่เลย `user?.anything` จะเกิด error:

```js run
// ReferenceError: user is not defined
user?.address;
```
ตัวแปรต้องประกาศไว้ก่อน (เช่น `let/const/var user` หรือเป็นพารามิเตอร์ของฟังก์ชัน) optional chaining ใช้ได้เฉพาะกับตัวแปรที่ประกาศไว้แล้วเท่านั้น
````

## Short-circuiting

อย่างที่บอกไปว่า `?.` จะหยุดการประเมิน ("short-circuit") ทันทีถ้าส่วนซ้ายไม่มีอยู่

ดังนั้นถ้ามีการเรียกฟังก์ชันหรือคำสั่งอื่นๆ ต่อทางขวาของ `?.` จะไม่ทำงานเลย

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // ไม่มี "user" จึงไม่ไปถึง sayHi และ x++

alert(x); // 0, ค่าไม่เพิ่มขึ้น
```

## รูปแบบอื่นๆ: ?.(), ?.[]

Optional chaining `?.` ไม่ใช่ตัวดำเนินการ แต่เป็นโครงสร้างไวยากรณ์พิเศษ ที่ใช้ได้กับฟังก์ชันและวงเล็บเหลี่ยมด้วย

เช่น `?.()` ใช้เรียกฟังก์ชันที่อาจไม่มีอยู่

ในโค้ดด้านล่าง ผู้ใช้บางคนมีเมธอด `admin` บางคนไม่มี:

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

สังเกตว่าทั้งสองบรรทัดเราใช้จุด (`.`) เพื่อเข้าถึงพร็อพเพอร์ตี้ `admin` ก่อน เพราะเรามั่นใจว่าออบเจ็กต์ `user` มีอยู่แน่ๆ จึงอ่านค่าได้อย่างปลอดภัย

จากนั้น `?.()` จะเช็คส่วนซ้าย — ถ้าฟังก์ชัน `admin` มีอยู่ก็จะรัน (เหมือน `userAdmin`) แต่ถ้าไม่มี (เหมือน `userGuest`) ก็หยุดเลยโดยไม่เกิด error

`?.[]` ก็ใช้ได้เช่นกัน ถ้าต้องการใช้วงเล็บเหลี่ยม `[]` เพื่อเข้าถึงพร็อพเพอร์ตี้แทนจุด `.`

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

นอกจากนี้ยังใช้ `?.` กับ `delete` ได้ด้วย:

```js run
delete user?.name; // ลบ user.name ถ้า user มีอยู่
```

````warn header="ใช้ `?.` ได้แค่อ่านและลบ ไม่ใช่เขียน"
Optional chaining `?.` ใช้ไม่ได้ทางด้านซ้ายของการกำหนดค่า

เช่น:
```js run
let user = null;

user?.name = "John"; // Error เพราะจะกลายเป็น undefined = "John"
```

````

## สรุป

Optional chaining `?.` มี 3 รูปแบบด้วยกัน:

1. `obj?.prop` — คืนค่า `obj.prop` ถ้า `obj` มีอยู่ ไม่งั้นคืน `undefined`
2. `obj?.[prop]` — คืนค่า `obj[prop]` ถ้า `obj` มีอยู่ ไม่งั้นคืน `undefined`
3. `obj.method?.()` — เรียก `obj.method()` ถ้า `obj.method` มีอยู่ ไม่งั้นคืน `undefined`

จะเห็นว่าทุกรูปแบบใช้งานง่ายมาก `?.` จะเช็คส่วนซ้ายว่าเป็น `null/undefined` หรือไม่ ถ้าไม่ใช่ก็ปล่อยให้ทำงานต่อไปตามปกติ

การต่อ `?.` หลายตัวเข้าด้วยกัน ช่วยให้เข้าถึงพร็อพเพอร์ตี้ที่ซ้อนกันหลายชั้นได้อย่างปลอดภัย

อย่างไรก็ตาม ควรใช้ `?.` อย่างระมัดระวัง เฉพาะตรงที่ตามตรรกะของโค้ดแล้วยอมรับได้ว่าส่วนซ้ายอาจไม่มีอยู่ เพื่อไม่ให้ error ที่ควรเกิดถูกซ่อนเงียบไปจนหาสาเหตุยาก
