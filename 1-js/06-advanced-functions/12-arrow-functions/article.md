# รู้จัก arrow function ให้มากขึ้น

เราเคยใช้ arrow function เพื่อเขียนฟังก์ชัน (function) ให้สั้นลงมาแล้ว แต่ arrow function ยังมีพฤติกรรมเฉพาะที่ต่างจากฟังก์ชันทั่วไปด้วย

ในการเขียน JavaScript เรามักสร้างฟังก์ชันสั้น ๆ แล้วส่งให้โค้ดส่วนอื่นเรียกใช้ เช่น:

- `arr.forEach(func)` -- `forEach` เรียก `func` กับสมาชิกแต่ละตัวของอาร์เรย์ (array)
- `setTimeout(func)` -- ให้ระบบตั้งเวลาเรียก `func` ภายหลัง
- ...และอีกหลายกรณี

การส่งฟังก์ชันให้ส่วนอื่นเรียกใช้เป็นรูปแบบที่พบได้บ่อยใน JavaScript และหลายครั้งเรายังต้องการใช้บริบท (context) เดิมภายในฟังก์ชันนั้น เช่น ค่า `this` จากโค้ดที่ครอบอยู่ arrow function ช่วยให้เขียนแบบนี้ได้สะดวก

## arrow function ไม่มี this ของตัวเอง [#arrow-function--this]

จากบท <info:object-methods> เรารู้แล้วว่า arrow function ไม่มี `this` เป็นของตัวเอง เมื่อใช้ `this` ภายใน arrow function จึงได้ค่าจากสโคป (scope) ภายนอกที่ครอบอยู่

ตัวอย่างนี้ใช้ arrow function ภายในเมธอด (method) ของออบเจ็กต์ (object) เพื่อแสดงรายชื่อนักเรียน:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

เมื่อเรียก `group.showList()` ค่า `this` ภายใน `showList` จะเป็น `group` และ arrow function ที่ส่งให้ `forEach` ก็ใช้ `this` เดียวกัน ดังนั้น `this.title` จึงเป็น `group.title` ซึ่งมีค่า `"Our Group"` ทุกครั้งที่แสดงชื่อนักเรียน

แต่ถ้าเปลี่ยนคอลแบ็ก (callback) ของ `forEach` เป็นฟังก์ชันทั่วไป ตัวอย่างนี้จะเกิดข้อผิดพลาด:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
*/!*
  }
};

group.showList();
```

ในตัวอย่างนี้ `forEach` ส่ง `undefined` เป็นค่า `this` ให้คอลแบ็กตามค่าเริ่มต้น และโค้ดทำงานใน strict mode จึงมี `this === undefined` ภายในคอลแบ็ก การอ่าน `this.title` จึงเท่ากับอ่าน `undefined.title` ซึ่งทำให้เกิดข้อผิดพลาด

ส่วน arrow function ไม่มี `this` เป็นของตัวเอง จึงใช้ค่าจาก `showList` ต่อไป ไม่เปลี่ยนตามค่า `this` ที่ `forEach` ส่งให้

```warn header="arrow function ใช้กับ `new` ไม่ได้"
นอกจากจะไม่มี `this` ของตัวเองแล้ว arrow function ยังใช้เป็นคอนสตรักเตอร์ (constructor) ไม่ได้ จึงเรียกด้วย `new` ไม่ได้
```

```smart header="arrow function กับ bind ต่างกันอย่างไร"
แม้ arrow function `=>` กับฟังก์ชันทั่วไปที่ใช้ `.bind(this)` จะช่วยให้ใช้ `this` เดิมได้ แต่ทำงานต่างกัน:

- `.bind(this)` สร้างฟังก์ชันใหม่ที่ผูกค่า `this` ไว้แล้ว
- arrow function `=>` ไม่มี `this` ของตัวเอง จึงค้นหา `this` ใน Lexical Environment ภายนอก เหมือนกับการค้นหาตัวแปร (variable)
```

## arrow function ไม่มี arguments ของตัวเอง [#arrow-function--arguments]

arrow function ไม่มีตัวแปร `arguments` ของตัวเองเช่นกัน เมื่อใช้ `arguments` ภายใน จึงอ้างถึง `arguments` ของฟังก์ชันภายนอกที่ครอบอยู่

จุดนี้มีประโยชน์ในการเขียน decorator เมื่อต้องส่งต่อการเรียกฟังก์ชัน พร้อมค่า `this` และอาร์กิวเมนต์ (argument) ที่ได้รับมา

`defer(f, ms)` ด้านล่างรับฟังก์ชัน `f` แล้วคืนฟังก์ชันที่ครอบการเรียกไว้ หรือ *wrapper* เมื่อเรียก wrapper นี้ จะเลื่อนการเรียก `f` ออกไปตามเวลาหน่วง `ms` มิลลิวินาที:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John หลังจากผ่านไป 2 วินาที
```

arrow function ภายใน `setTimeout` ใช้ `this` และ `arguments` จาก wrapper ที่ครอบอยู่ เมื่อถึงเวลาจึงเรียก `f.apply(this, arguments)` เพื่อส่งค่าเหล่านั้นต่อให้ `f` ในตัวอย่าง `sayHiDeferred("John")` จึงแสดง `Hello, John` หลังหน่วงเวลา 2 วินาที

ถ้าใช้ฟังก์ชันทั่วไปแทน arrow function เราเขียนได้แบบนี้:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

`...args` รวบรวมอาร์กิวเมนต์ที่ wrapper ได้รับไว้ในอาร์เรย์ `args` ส่วน `ctx` เก็บค่า `this` ของ wrapper คอลแบ็กใน `setTimeout` จึงใช้สองค่านี้เรียก `f` ได้ แม้คอลแบ็กจะมี `this` และ `arguments` ของตัวเองก็ตาม

## สรุป [#summary]

arrow function:

- ไม่มี `this` ของตัวเอง
- ไม่มี `arguments` ของตัวเอง
- เรียกด้วย `new` ไม่ได้
- ไม่มี `super` ของตัวเองเช่นกัน เราจะเรียนเรื่องนี้ในบท <info:class-inheritance>

ลักษณะเหล่านี้ทำให้ arrow function เหมาะกับฟังก์ชันสั้น ๆ ที่ต้องใช้บริบทของโค้ดรอบนอก แทนการมีบริบทของตัวเอง
