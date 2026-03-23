importance: 3

---

# Class extends Object?

อย่างที่เราทราบ ออบเจ็กต์ทุกตัวจะสืบทอดจาก `Object.prototype` โดยปกติ ทำให้เข้าถึงเมธอดทั่วไปของออบเจ็กต์ได้ เช่น `hasOwnProperty` เป็นต้น

ตัวอย่าง:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// เมธอด hasOwnProperty มาจาก Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

แต่ถ้าเราเขียนแบบระบุชัดเจนว่า `"class Rabbit extends Object"` ผลลัพธ์จะต่างจาก `"class Rabbit"` ธรรมดาไหม?

ต่างกันตรงไหน?

ลองดูตัวอย่างโค้ดนี้ (ซึ่งใช้ไม่ได้ -- ทำไม? แก้ยังไง?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
