# กำหนดวิธีอ่านและเขียนค่าด้วย getter และ setter

พร็อพเพอร์ตี้ (property) ของออบเจ็กต์ (object) มีสองชนิด ชนิดแรกเก็บค่าโดยตรง เรียกว่า *data property* เช่น ถ้า `user` เก็บชื่อไว้ใน `name` และนามสกุลไว้ใน `surname` เมื่ออ่าน `user.name` เราก็ได้ชื่อที่เก็บไว้

ทีนี้ถ้าอยากอ่าน `user.fullName` แล้วได้ชื่อเต็ม เราจะเอาชื่อกับนามสกุลมาต่อกันตอนที่อ่านเลยได้ไหม? JavaScript มีพร็อพเพอร์ตี้อีกชนิดที่ทำแบบนี้ได้ เรียกว่า *accessor property* เราเขียนฟังก์ชัน (function) ไว้กำหนดวิธีอ่านหรือเขียนค่า ส่วนคนที่ใช้ยังอ่านและเขียนพร็อพเพอร์ตี้ได้ด้วยวิธีเดิม

## เมื่อไร JavaScript จะเรียก getter หรือ setter [#getter--setter]

เวลาเขียนออบเจ็กต์ในรูป `{...}` (object literal) เราใส่ `get` หน้าชื่อเมธอด (method) ที่จะคืนค่าเมื่อมีการอ่านพร็อพเพอร์ตี้ เมธอดนี้เรียกว่า *getter* ส่วนเมธอดที่รับค่าใหม่เมื่อมีการเขียนเรียกว่า *setter* เราใส่ `set` หน้าชื่อเมธอดนั้น

```js
let obj = {
  *!*get propName()*/!* {
    // เมื่ออ่าน obj.propName โค้ดใน getter นี้จะทำงาน
  },

  *!*set propName(value)*/!* {
    // เมื่อเขียนค่าให้ obj.propName เราอ่านค่าใหม่ได้จาก value
  }
};
```

ทั้งสองเมธอดใช้ชื่อ `propName` เหมือนกัน JavaScript เลือกให้ตามวิธีที่เราใช้พร็อพเพอร์ตี้ เมื่ออ่าน `obj.propName` จะเรียก getter เมื่อเขียน `obj.propName = value` จะส่งค่าทางขวาของ `=` ให้ setter

กลับมาที่ตัวอย่างชื่อเต็ม ตอนนี้ `user` มีข้อมูลอยู่สองส่วน

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

เรามีทั้ง `"John"` และ `"Smith"` อยู่แล้ว ลองเขียน getter ชื่อ `fullName` ให้ต่อชื่อกับนามสกุลโดยเว้นวรรคตรงกลาง

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

ดูบรรทัด `alert(user.fullName)` เราเพียง*อ่าน*ชื่อเต็มโดยไม่ต้องเติม `()` หลัง `fullName` การอ่านครั้งนี้ทำให้ JavaScript *เรียก* getter ให้เอง ภายใน getter นั้น `this` คือ `user` ค่าที่คืนให้ `alert` จึงเป็น `"John Smith"`

ตอนนี้ `fullName` มีเพียง getter เราจึงอ่านชื่อเต็มได้ แต่ยังกำหนดชื่อใหม่ผ่าน `fullName` ไม่ได้ ถ้าลองเขียนค่าในโหมดเข้มงวด (strict mode) จะเกิด `TypeError` คอมเมนต์ยกข้อความผิดพลาดจาก Chrome

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test";
// TypeError: Cannot set property fullName of #<Object> which has only a getter
*/!*
```

ถ้าอยากเขียน `user.fullName = "Alice Cooper"` เพื่อเปลี่ยนทั้งชื่อและนามสกุล เราเพิ่ม setter ชื่อ `fullName` คู่กับ getter เดิมได้

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// setter รับ "Alice Cooper" แล้วแยกชื่อกับนามสกุล
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

คราวนี้ setter ได้รับ `"Alice Cooper"` ใน `value` เมธอด `split(" ")` แยกชื่อตรงช่องว่าง แล้ว setter นำ `"Alice"` ไปเก็บใน `name` และ `"Cooper"` ไปเก็บใน `surname`

จากมุมของคนใช้ เรามี `fullName` ให้อ่านและเขียนได้เหมือนพร็อพเพอร์ตี้ทั่วไป ส่วนใน `user` เราเก็บข้อมูลไว้เพียงสองที่เดิม เวลาอ่าน getter จะประกอบชื่อเต็มให้ เวลาเขียน setter จะแยกชื่อกลับไปเก็บ

## เพิ่ม getter และ setter ด้วย Object.defineProperty [#accessor-descriptor]

ถ้า `user` มีอยู่แล้ว เราเพิ่ม `fullName` ทีหลังได้ด้วย `Object.defineProperty` เมธอดนี้รับออบเจ็กต์ที่บอกรายละเอียดของพร็อพเพอร์ตี้ เรียกว่า *property descriptor*

สำหรับพร็อพเพอร์ตี้ที่เก็บค่าโดยตรง เราใช้ `value` ระบุค่าที่จะเก็บ และใช้ `writable` กำหนดว่าจะเขียนทับได้ไหม ส่วนพร็อพเพอร์ตี้ที่อ่านหรือเขียนผ่านฟังก์ชันใช้รายละเอียดอีกแบบ เรียกว่า *accessor descriptor* ซึ่งไม่มี `value` หรือ `writable` สิ่งที่เราระบุได้มีดังนี้

- **`get`** ฟังก์ชันที่คืนค่าเมื่อมีการอ่านพร็อพเพอร์ตี้ JavaScript เรียกฟังก์ชันนี้โดยไม่ส่งอาร์กิวเมนต์ (argument)
- **`set`** ฟังก์ชันที่รับค่าเมื่อมีการเขียนพร็อพเพอร์ตี้ JavaScript ส่งค่าใหม่ให้เป็นอาร์กิวเมนต์หนึ่งตัว
- **`enumerable`** ถ้าเป็น `true` เราจะเห็นชื่ออย่าง `fullName` เมื่อใช้ `for..in` เหมือนกับพร็อพเพอร์ตี้ที่เก็บค่าโดยตรง
- **`configurable`** ยังใช้กำหนดว่าจะลบพร็อพเพอร์ตี้หรือแก้การตั้งค่าได้ไหม เช่น เปลี่ยนไปใช้ getter ตัวอื่น

ลองสร้าง `fullName` โดยระบุเฉพาะ `get` กับ `set` แล้วดูว่าเราอ่านอะไรได้บ้างจาก `user`

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key);
// name
// surname
```

`alert(user.fullName)` ยังแสดง `John Smith` ได้ แต่พอไล่ดูชื่อด้วย `for..in` เรากลับเห็นแค่ `name` กับ `surname` เพราะเมื่อสร้าง `fullName` ด้วย `Object.defineProperty` ครั้งนี้ เราไม่ได้ระบุ `enumerable` จึงได้ค่าเริ่มต้นเป็น `false`

พร็อพเพอร์ตี้แต่ละตัวเป็นได้ทีละชนิด ในตัวอย่างถัดไป `get` บอกให้เรียกฟังก์ชันเพื่ออ่านค่า แต่ `value: 2` บอกให้เก็บค่าไว้โดยตรง เมื่อเราเรียก `Object.defineProperty` ด้วย descriptor ที่ระบุทั้งสองอย่าง JavaScript จึงรายงาน `TypeError`

```js run
*!*
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## ให้ setter ตรวจชื่อก่อนเก็บ [#getter-setter-]

ถ้าอยากกันชื่อที่สั้นเกินไป เรายังให้โค้ดภายนอกอ่านและเขียนชื่อผ่าน `user.name` ได้เหมือนเดิม ส่วน setter จะตรวจ `value.length` ก่อน ถ้าได้ค่าน้อยกว่า 4 ก็ไม่รับชื่อนั้น ถ้าผ่านจึงเก็บชื่อไว้ใน `_name` ให้ getter อ่าน

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short, need at least 4 characters
```

ชื่อ `"Pete"` ยาว 4 ตัวอักษรพอดี เงื่อนไข `value.length < 4` จึงเป็น `false` และ setter เก็บชื่อนี้ไว้ใน `_name` พอบรรทัดถัดมาอ่าน `user.name` ตัว getter ก็คืนค่า `"Pete"` ให้

พอลองกำหนดชื่อเป็น `""` เงื่อนไขเดียวกันกลับเป็น `true` คราวนี้ setter แสดงข้อความ `Name is too short, need at least 4 characters` แล้วออกจากฟังก์ชันตรง `return` ชื่อที่เก็บไว้จึงยังเป็น `"Pete"`

ขีดล่าง `_` หน้าชื่อเป็นข้อตกลงว่าพร็อพเพอร์ตี้นั้นมีไว้ใช้ภายในออบเจ็กต์ โค้ดภายนอกยังอ่านและเขียน `user._name` ได้โดยตรง ถ้าเขียน `user._name = ""` ชื่อว่างจะถูกเก็บทันที เพราะ setter ของ `name` ไม่ได้ทำงาน เวลาใช้งานจึงควรอ่านและเขียนชื่อผ่าน `user.name`

## เปลี่ยนมาเก็บวันเกิด แต่ยังอ่านอายุได้ [#using-for-compatibility]

บางครั้งเราอยากเปลี่ยนข้อมูลที่เก็บในออบเจ็กต์ ทั้งที่โค้ดส่วนอื่นยังใช้พร็อพเพอร์ตี้เดิมอยู่ การเปลี่ยนพร็อพเพอร์ตี้ที่เคยเก็บค่าโดยตรงให้มี getter หรือ setter ช่วยให้เราเปลี่ยนวิธีอ่านหรือเขียนค่าภายใต้ชื่อเดิมได้

ลองดู `User` รุ่นแรก ตอนสร้าง `john` เราส่งอายุ `25` เข้าไปให้เก็บไว้ใน `age` บรรทัด `alert(john.age)` จึงแสดง `25`

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

อายุเปลี่ยนไปทุกปี ส่วนวันเกิดยังเป็นวันเดิม เราจึงเลือกเก็บวันเกิดใน `birthday` แทน เมื่อต้องการทราบอายุค่อยคำนวณจากวันเกิดได้

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

เมื่อเก็บ `birthday` แทน `age` อย่างในตัวอย่างนี้ การอ่าน `john.age` จะได้ `undefined` เพราะ `john` ไม่มีพร็อพเพอร์ตี้ชื่อ `age` แล้ว การตามไปแก้ทุกจุดที่อ่านอายุต้องใช้เวลา โดยเฉพาะถ้ามีคนอื่นนำ `User` ไปใช้ด้วย

เรายังเก็บชื่อ `age` ไว้ให้โค้ดเดิมอ่านได้ โดยเพิ่ม getter ที่คำนวณอายุจาก `birthday` ทุกครั้งที่อ่าน

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // เมื่ออ่าน age ให้คำนวณจากปีปัจจุบันลบด้วยปีเกิด
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // แสดงวันเกิดตามเขตเวลาของเครื่อง
alert( john.age );      // แสดงอายุที่จะครบในปีที่รันโค้ด
```

โค้ดที่ต้องการวันเกิดอ่าน `john.birthday` ได้โดยตรง ส่วนโค้ดเดิมที่อ่าน `john.age` จะได้ค่าจาก getter ตัวอย่างนี้นำปีปัจจุบันลบด้วยปีเกิด จึงได้อายุที่จะครบในปีนั้น ถ้ายังไม่ถึงวันเกิด ค่าที่ได้จะมากกว่าอายุเต็มอยู่หนึ่งปี
