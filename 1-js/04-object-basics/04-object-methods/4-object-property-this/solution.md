**คำตอบ: เกิด error**

ลองรันดู:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

สาเหตุคือค่าของ `this` ไม่ได้ขึ้นอยู่กับว่าเราเขียนออบเจ็กต์ไว้ตรงไหน แต่ขึ้นอยู่กับวิธีเรียกฟังก์ชัน

ในตัวอย่างนี้ `makeUser()` ถูกเรียกแบบฟังก์ชันทั่วไป ไม่ใช่แบบเมธอดที่มีออบเจ็กต์อยู่หน้าจุด ดังนั้น `this` ภายใน `makeUser()` จึงเป็น `undefined`

`this` มีค่าเดียวกันตลอดการทำงานของฟังก์ชัน บล็อกโค้ดและ object literal ที่อยู่ข้างในไม่ได้ทำให้ค่าเปลี่ยนไป

เพราะฉะนั้น `ref: this` จึงนำค่า `this` ปัจจุบันของฟังก์ชันมาเก็บไว้ ซึ่งก็คือ `undefined`

ถ้าเขียนฟังก์ชันใหม่ให้คืนค่า `this` ตรง ๆ ก็จะได้ `undefined` เหมือนกัน:

```js run
function makeUser(){
  return this; // คราวนี้ไม่มี object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
จะเห็นว่า `alert( makeUser().name )` ให้ผลเหมือนกับ `alert( user.ref.name )` ในตัวอย่างก่อนหน้า

ทีนี้ลองเปลี่ยน `ref` ให้เป็นเมธอด:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

คราวนี้โค้ดทำงานได้ เพราะ `user.ref()` เป็นการเรียกเมธอด ค่า `this` จึงเป็นออบเจ็กต์ที่อยู่หน้าจุด `.` หรือก็คือ `user`
