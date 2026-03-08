# ทบทวนเรื่อง Arrow function

มาทบทวนเรื่อง arrow function กันอีกครั้ง

Arrow function ไม่ได้เป็นแค่ "ชื่อย่อ" สำหรับเขียนฟังก์ชันสั้นๆ เท่านั้น แต่ยังมีคุณลักษณะเฉพาะตัวที่น่าสนใจอีกด้วย

JavaScript เต็มไปด้วยสถานการณ์ที่เราต้องเขียนฟังก์ชันเล็กๆ แล้วส่งไปทำงานที่อื่น

ยกตัวอย่างเช่น:

- `arr.forEach(func)` -- `func` จะถูกเรียกโดย `forEach` สำหรับทุกสมาชิกในอาร์เรย์
- `setTimeout(func)` -- `func` จะถูกเรียกโดยตัวจัดกำหนดเวลาที่มีอยู่ในตัว
- ...และอื่นๆ อีกมาก

การสร้างฟังก์ชันแล้วส่งไปใช้ที่อื่นถือเป็นหัวใจสำคัญของ JavaScript เลยก็ว่าได้

และในฟังก์ชันเหล่านั้น เรามักไม่อยากให้บริบท (context) เปลี่ยนไป นี่แหละคือจุดที่ arrow function เข้ามาช่วยได้อย่างดี

## Arrow function ไม่มี "this"

อย่างที่เราจำได้จากบท <info:object-methods> ว่า arrow function ไม่มี `this` เป็นของตัวเอง ถ้ามีการเข้าถึง `this` จะไปดึงค่ามาจากสโคปภายนอกแทน

ลองดูตัวอย่างการใช้งานภายในเมธอดของออบเจ็กต์:

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

ใน `forEach` ตรงนี้ เราใช้ arrow function ทำให้ `this.title` ข้างในอ้างอิงไปยัง `this` ตัวเดียวกับเมธอด `showList` ภายนอก ซึ่งก็คือ `group.title` นั่นเอง

แต่ถ้าเราใช้ฟังก์ชันแบบปกติ จะเกิด error ขึ้น:

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

error เกิดขึ้นเพราะ `forEach` จะรันฟังก์ชันโดยกำหนด `this=undefined` เป็นค่าเริ่มต้น จึงเกิดการเข้าถึง `undefined.title` ขึ้น

แต่ arrow function ไม่ได้รับผลกระทบ เพราะไม่มี `this` เป็นของตัวเองตั้งแต่แรก

```warn header="Arrow function ใช้กับ `new` ไม่ได้"
เนื่องจาก arrow function ไม่มี `this` จึงไม่สามารถใช้เป็นคอนสตรักเตอร์ได้ ดังนั้นจึงเรียกด้วย `new` ไม่ได้
```

```smart header="Arrow function กับ bind ต่างกันอย่างไร"
มีความแตกต่างเล็กน้อยระหว่าง arrow function `=>` กับฟังก์ชันปกติที่เรียกผ่าน `.bind(this)`:

- `.bind(this)` สร้าง "เวอร์ชันที่ผูก this ไว้แล้ว" ของฟังก์ชัน
- Arrow function `=>` ไม่ได้สร้างการผูกใดๆ ทั้งสิ้น ฟังก์ชันนี้ไม่มี `this` เป็นของตัวเอง การค้นหา `this` จะทำเหมือนกับการค้นหาตัวแปรทั่วไป คือไล่หาใน lexical environment ภายนอก
```

## Arrow function ไม่มี "arguments"

Arrow function ไม่มีตัวแปร `arguments` เช่นกัน

สิ่งนี้มีประโยชน์มากสำหรับ decorator เพราะเราสามารถส่งต่อการเรียกพร้อมกับ `this` และ `arguments` ของบริบทปัจจุบันได้เลย

ยกตัวอย่าง `defer(f, ms)` รับฟังก์ชันเข้ามาแล้วคืนค่า wrapper ที่หน่วงเวลาการเรียกไป `ms` มิลลิวินาที:

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

ถ้าเขียนแบบเดียวกันโดยไม่ใช้ arrow function จะได้แบบนี้:

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

สังเกตว่าเราต้องสร้างตัวแปร `args` และ `ctx` เพิ่มเพื่อให้ฟังก์ชันใน `setTimeout` เข้าถึงค่าเหล่านี้ได้

## สรุป

Arrow function:

- ไม่มี `this`
- ไม่มี `arguments`
- เรียกด้วย `new` ไม่ได้
- ไม่มี `super` เช่นกัน แต่เรายังไม่ได้เรียนเรื่องนี้ จะได้เรียนในบท <info:class-inheritance>

ทั้งหมดนี้เป็นเพราะ arrow function ถูกออกแบบมาสำหรับโค้ดสั้นๆ ที่ไม่ต้องการ "บริบท" เป็นของตัวเอง แต่ใช้บริบทจากที่ที่มันอยู่แทน และ arrow function ก็ทำหน้าที่นี้ได้ดีมากจริงๆ
