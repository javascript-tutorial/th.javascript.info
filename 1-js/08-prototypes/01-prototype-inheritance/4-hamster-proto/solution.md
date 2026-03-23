มาดูกันให้ละเอียดว่าเกิดอะไรขึ้นตอนเรียก `speedy.eat("apple")`

1. เมธอด `speedy.eat` ถูกค้นพบในโปรโตไทป์ (`=hamster`) แล้วรันด้วย `this=speedy` (ออบเจ็กต์ที่อยู่หน้าจุด)

2. จากนั้น `this.stomach.push()` ต้องหาพร็อพเพอร์ตี้ `stomach` เพื่อเรียก `push` โดยไปหาใน `this` (`=speedy`) ก่อน แต่ไม่เจอ

3. จึงไล่ตามห่วงโซ่โปรโตไทป์ขึ้นไป แล้วเจอ `stomach` ใน `hamster`

4. จากนั้นเรียก `push` ซึ่งก็คือเพิ่มอาหารเข้าไปใน *stomach ของโปรโตไทป์*

แฮมสเตอร์ทุกตัวจึงใช้ stomach เดียวกัน!

ไม่ว่าจะเป็น `lazy.stomach.push(...)` หรือ `speedy.stomach.push()` พร็อพเพอร์ตี้ `stomach` ล้วนถูกค้นพบในโปรโตไทป์ (เพราะไม่ได้อยู่ในตัวออบเจ็กต์เอง) แล้วข้อมูลใหม่ก็ถูก push เข้าไปในนั้น

สังเกตว่าปัญหานี้จะไม่เกิดขึ้น ถ้าใช้การ assign ตรงๆ แบบ `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // ใช้ assign แทน this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// ตัวเร็วหาอาหารเจอ
speedy.eat("apple");
alert( speedy.stomach ); // apple

// ตัวขี้เกียจท้องยังว่าง
alert( lazy.stomach ); // <ไม่มีอะไร>
```

ตอนนี้ทำงานถูกต้องแล้ว เพราะ `this.stomach=` ไม่ได้ไปค้นหา `stomach` จากโปรโตไทป์ แต่เขียนค่าลงในตัว `this` โดยตรง

อีกวิธีหนึ่งคือกำหนดให้แฮมสเตอร์แต่ละตัวมี stomach ของตัวเอง:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// ตัวเร็วหาอาหารเจอ
speedy.eat("apple");
alert( speedy.stomach ); // apple

// ตัวขี้เกียจท้องยังว่าง
alert( lazy.stomach ); // <ไม่มีอะไร>
```

โดยทั่วไป พร็อพเพอร์ตี้ที่เก็บสถานะเฉพาะของแต่ละออบเจ็กต์ เช่น `stomach` ข้างต้น ควรประกาศไว้ในตัวออบเจ็กต์นั้นเลย จะได้ไม่เกิดปัญหาแบบนี้
