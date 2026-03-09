# Getter และ Setter ของพร็อพเพอร์ตี้

พร็อพเพอร์ตี้ของออบเจ็กต์มีอยู่ 2 ชนิดด้วยกัน

ชนิดแรกคือ *data property* ที่เราใช้กันมาตลอดจนถึงตอนนี้

ชนิดที่สองเป็นสิ่งใหม่ เรียกว่า *accessor property* ซึ่งจริงๆ แล้วก็คือฟังก์ชันที่ทำงานตอนอ่านหรือกำหนดค่า แต่ภายนอกดูเหมือนพร็อพเพอร์ตี้ธรรมดา

## Getter และ setter

Accessor property แสดงผลผ่านเมธอด "getter" และ "setter" โดยใน object literal จะใช้คำว่า `get` และ `set` นำหน้า:

```js
let obj = {
  *!*get propName()*/!* {
    // getter ทำงานเมื่ออ่านค่า obj.propName
  },

  *!*set propName(value)*/!* {
    // setter ทำงานเมื่อกำหนดค่า obj.propName = value
  }
};
```

getter ทำงานเมื่ออ่านค่า `obj.propName` ส่วน setter ทำงานเมื่อกำหนดค่าให้

ยกตัวอย่างเช่น เรามีออบเจ็กต์ `user` ที่มี `name` และ `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

ทีนี้เราอยากเพิ่มพร็อพเพอร์ตี้ `fullName` ที่ได้ค่าเป็น `"John Smith"` แน่นอนว่าเราไม่อยากก็อปข้อมูลที่มีอยู่แล้วมาซ้ำ ก็เลยสร้างเป็น accessor แทน:

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

จากภายนอก accessor property จะดูเหมือนพร็อพเพอร์ตี้ปกติ นี่แหละคือแนวคิดของมัน เราไม่ได้ *เรียก* `user.fullName` แบบฟังก์ชัน แต่ *อ่าน* ค่าตามปกติ โดย getter จะทำงานอยู่เบื้องหลัง

ตอนนี้ `fullName` มีแค่ getter เท่านั้น ถ้าลองกำหนดค่า `user.fullName=` จะเกิด error:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (พร็อพเพอร์ตี้นี้มีแค่ getter)
*/!*
```

มาแก้ปัญหานี้ด้วยการเพิ่ม setter ให้ `user.fullName` กัน:

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

// setter fullName ทำงานด้วยค่าที่กำหนดให้
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

ผลลัพธ์คือเราได้พร็อพเพอร์ตี้ "เสมือน" ชื่อ `fullName` ที่ทั้งอ่านและเขียนค่าได้

## Accessor descriptor

Descriptor ของ accessor property จะแตกต่างจาก data property

โดย accessor property จะไม่มี `value` หรือ `writable` แต่จะมีฟังก์ชัน `get` และ `set` แทน

กล่าวคือ accessor descriptor ประกอบด้วย:

- **`get`** -- ฟังก์ชันที่ไม่รับอาร์กิวเมนต์ ทำงานเมื่อมีการอ่านค่าพร็อพเพอร์ตี้
- **`set`** -- ฟังก์ชันที่รับอาร์กิวเมนต์ 1 ตัว ทำงานเมื่อมีการกำหนดค่า
- **`enumerable`** -- เหมือนกับ data property
- **`configurable`** -- เหมือนกับ data property

ยกตัวอย่างเช่น ถ้าจะสร้าง accessor `fullName` ด้วย `defineProperty` เราก็ส่ง descriptor ที่มี `get` กับ `set` เข้าไป:

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

for(let key in user) alert(key); // name, surname
```

สิ่งที่ควรรู้คือ พร็อพเพอร์ตี้จะเป็นได้แค่อย่างใดอย่างหนึ่ง — จะเป็น accessor (มีเมธอด `get/set`) หรือเป็น data property (มี `value`) ก็ได้ แต่เป็นทั้งสองอย่างพร้อมกันไม่ได้

ถ้าพยายามใส่ทั้ง `get` และ `value` ใน descriptor เดียวกัน จะเกิด error:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Getter/setter ที่ฉลาดขึ้น

เราสามารถใช้ getter/setter เป็นตัวห่อหุ้ม (wrapper) พร็อพเพอร์ตี้ตัวจริง เพื่อควบคุมการอ่านเขียนค่าได้มากขึ้น

ยกตัวอย่างเช่น ถ้าอยากห้ามไม่ให้ตั้งชื่อ `user` สั้นเกินไป เราก็สร้าง setter สำหรับ `name` แล้วเก็บค่าจริงไว้ในพร็อพเพอร์ตี้ `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("ชื่อสั้นเกินไป ต้องมีอย่างน้อย 4 ตัวอักษร");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // ชื่อสั้นเกินไป...
```

ค่าจริงจะเก็บอยู่ในพร็อพเพอร์ตี้ `_name` ส่วนการเข้าถึงจากภายนอกทำผ่าน getter กับ setter

ในทางเทคนิค โค้ดภายนอกยังเข้าถึงค่าได้โดยตรงผ่าน `user._name` แต่มีธรรมเนียมที่รู้กันดีว่า พร็อพเพอร์ตี้ที่ขึ้นต้นด้วยเครื่องหมาย `"_"` ถือเป็นของภายในออบเจ็กต์ ไม่ควรเรียกใช้จากข้างนอก


## การใช้งานเพื่อความเข้ากันได้

ประโยชน์ที่ดีมากอย่างหนึ่งของ accessor คือ ช่วยให้เราเปลี่ยน data property ธรรมดาให้เป็น getter/setter ได้ทุกเมื่อ โดยไม่ต้องแก้โค้ดเก่าที่ใช้งานอยู่

สมมติว่าเราเริ่มสร้างออบเจ็กต์ user โดยใช้ data property `name` กับ `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...แต่ต่อมาเราเปลี่ยนใจ อยากเก็บ `birthday` แทน `age` เพราะแม่นยำและสะดวกกว่า:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

แล้วโค้ดเก่าที่ยังใช้พร็อพเพอร์ตี้ `age` อยู่จะทำยังไงดี?

เราอาจลองไปแก้โค้ดทุกจุดที่ใช้ `age` ก็ได้ แต่เสียเวลาและทำยากถ้ามีคนอื่นใช้โค้ดนี้เยอะ แถม `age` ก็ยังเป็นพร็อพเพอร์ตี้ที่มีประโยชน์ใน `user` อยู่ดี จริงไหม?

งั้นก็เก็บไว้เลย

แค่เพิ่ม getter สำหรับ `age` ก็แก้ปัญหาได้:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // คำนวณ age จากวันเกิดกับวันที่ปัจจุบัน
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // ดูวันเกิดได้
alert( john.age );      // ดูอายุได้ด้วย
```

แค่นี้โค้ดเก่าก็ยังใช้งานได้ แถมยังได้พร็อพเพอร์ตี้เพิ่มมาอีกด้วย
