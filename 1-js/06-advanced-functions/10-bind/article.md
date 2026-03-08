libs:
  - lodash

---

# การผูกฟังก์ชัน (Function binding)

เวลาส่งเมธอดของออบเจ็กต์ไปเป็นคอลแบ็ก เช่น ส่งให้ `setTimeout` จะมีปัญหาที่เจอบ่อยอย่างหนึ่งคือ "this หาย"

ในบทนี้เราจะมาดูวิธีแก้ปัญหานี้กัน

## this หายได้อย่างไร

เราเคยเห็นตัวอย่างที่ `this` หายไปมาก่อนแล้ว พอส่งเมธอดออกไปจากออบเจ็กต์ `this` ก็จะหายตามไปด้วย

ลองดูตัวอย่างกับ `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

จะเห็นว่าผลลัพธ์ไม่ได้แสดง "John" อย่างที่คาดหวัง แต่กลับได้ `undefined` แทน!

ทั้งนี้เพราะ `setTimeout` ได้รับแค่ฟังก์ชัน `user.sayHi` ไปลอยๆ โดยไม่ได้ผูกกับออบเจ็กต์ บรรทัดสุดท้ายเขียนใหม่ได้แบบนี้:

```js
let f = user.sayHi;
setTimeout(f, 1000); // สูญเสีย context ของ user
```

เมธอด `setTimeout` ในเบราว์เซอร์มีพฤติกรรมพิเศษอยู่อย่างหนึ่ง คือจะตั้งค่า `this=window` ให้กับฟังก์ชันที่เรียก (ส่วน Node.js จะได้ timer object แทน แต่ไม่สำคัญในตอนนี้) ดังนั้น `this.firstName` จึงพยายามดึง `window.firstName` ซึ่งไม่มีอยู่จริง กรณีอื่นๆ ที่คล้ายกัน `this` มักจะกลายเป็น `undefined` ไปเลย

โจทย์แบบนี้เจอได้บ่อย คือเราอยากส่งเมธอดของออบเจ็กต์ไปให้ที่อื่น (ในที่นี้คือ scheduler) เรียกใช้ แล้วจะทำยังไงให้ context ถูกต้อง?

## วิธีที่ 1: ใช้ wrapper function

วิธีง่ายที่สุดคือครอบด้วยฟังก์ชัน:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

ทีนี้ก็ใช้ได้แล้ว เพราะฟังก์ชันที่ครอบไว้จะเข้าถึง `user` จาก Lexical Environment ภายนอก แล้วเรียกเมธอดตามปกติ

เขียนสั้นลงด้วย arrow function ก็ได้:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

ดูดีแล้ว แต่มีจุดอ่อนอยู่นิดหนึ่ง

ถ้า `user` เปลี่ยนค่าก่อนที่ `setTimeout` จะทำงาน (มีดีเลย์ 1 วินาทีนะ!) ก็จะเรียกผิดออบเจ็กต์ไปเลย!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...ค่าของ user เปลี่ยนภายใน 1 วินาที
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```

วิธีถัดไปจะช่วยป้องกันปัญหานี้ได้

## วิธีที่ 2: bind

ฟังก์ชันมีเมธอดในตัวชื่อ [bind](mdn:js/Function/bind) ที่ช่วยล็อก `this` ไว้ได้

ไวยากรณ์เบื้องต้น:

```js
// ไวยากรณ์แบบเต็มจะอธิบายทีหลัง
let boundFunc = func.bind(context);
```

ผลลัพธ์จาก `func.bind(context)` คือ "exotic object" พิเศษที่เรียกใช้ได้เหมือนฟังก์ชัน โดยจะส่งต่อการเรียกไปยัง `func` พร้อมตั้ง `this=context` ให้

พูดง่ายๆ คือ เรียก `boundFunc` ก็เหมือนเรียก `func` แต่ `this` ถูกล็อกไว้แล้ว

ยกตัวอย่าง `funcUser` จะส่งต่อการเรียกไปยัง `func` พร้อมตั้ง `this=user`:

```js run
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John
*/!*
```

ตรงนี้ `func.bind(user)` สร้าง "เวอร์ชันที่ผูกแล้ว" ของ `func` โดยล็อก `this=user` ไว้

อาร์กิวเมนต์ทั้งหมดจะถูกส่งต่อไปยัง `func` ตามเดิม เช่น:

```js run
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// ผูก this ไว้กับ user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (อาร์กิวเมนต์ "Hello" ถูกส่งต่อ และ this=user)
*/!*
```

ทีนี้มาลองกับเมธอดของออบเจ็กต์ดู:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// เรียกได้โดยไม่ต้องมีออบเจ็กต์
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// ถึง user จะเปลี่ยนค่าภายใน 1 วินาที
// sayHi ก็ยังใช้ค่าที่ผูกไว้ตั้งแต่แรก ซึ่งอ้างอิงไปยังออบเจ็กต์ user ตัวเดิม
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

ที่บรรทัด `(*)` เราดึงเมธอด `user.sayHi` มาแล้วผูกกับ `user` ด้วย `bind` ตัว `sayHi` ที่ได้จึงเป็นฟังก์ชันที่ "ผูก" ไว้แล้ว จะเรียกเดี่ยวๆ หรือส่งให้ `setTimeout` ก็ได้ context จะถูกต้องเสมอ

ตัวอย่างนี้แสดงให้เห็นว่าอาร์กิวเมนต์ถูกส่งต่อตามเดิม มีแค่ `this` เท่านั้นที่ `bind` ล็อกไว้:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John! (อาร์กิวเมนต์ "Hello" ถูกส่งให้ say)
say("Bye"); // Bye, John! ("Bye" ถูกส่งให้ say)
```

````smart header="เมธอดสะดวก: `bindAll`"
ถ้าออบเจ็กต์มีหลายเมธอดและเราจะส่งออบเจ็กต์นี้ไปใช้ที่อื่นบ่อยๆ ก็ผูกทุกเมธอดด้วยลูปได้เลย:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

ไลบรารี JavaScript อย่าง lodash ก็มีฟังก์ชันสำหรับผูกเมธอดทีเดียวหลายตัว เช่น [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll)
````

## Partial functions

ที่ผ่านมาเราพูดถึงแค่การผูก `this` ทีนี้มาดูเรื่องที่ลึกขึ้นอีกนิดกัน

เราสามารถผูกไม่ใช่แค่ `this` แต่ยังผูกอาร์กิวเมนต์ได้ด้วย ไม่ค่อยได้ใช้บ่อย แต่บางทีก็มีประโยชน์

ไวยากรณ์แบบเต็มของ `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

ช่วยให้เราผูกทั้ง context (`this`) และอาร์กิวเมนต์ตัวแรกๆ ของฟังก์ชันได้

ยกตัวอย่าง สมมติมีฟังก์ชันคูณเลข `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

มาลองใช้ `bind` สร้างฟังก์ชัน `double` จากฟังก์ชัน `mul`:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

`mul.bind(null, 2)` สร้างฟังก์ชันใหม่ `double` ที่ส่งต่อการเรียกไปยัง `mul` โดยล็อก `null` เป็น context และ `2` เป็นอาร์กิวเมนต์ตัวแรก อาร์กิวเมนต์ที่เหลือจะส่งต่อตามเดิม

เทคนิคนี้เรียกว่า [partial function application](https://en.wikipedia.org/wiki/Partial_application) คือการสร้างฟังก์ชันใหม่โดยกำหนดพารามิเตอร์บางตัวของฟังก์ชันเดิมไว้ล่วงหน้า

สังเกตว่าตรงนี้เราไม่ได้ใช้ `this` เลย แต่ `bind` บังคับให้ใส่ จึงต้องส่ง `null` ไปแทน

ฟังก์ชัน `triple` ด้านล่างนี้ทำหน้าที่คูณค่าด้วย 3:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

ทำไมถึงนิยมสร้าง partial function?

ข้อดีคือเราได้ฟังก์ชันแยกออกมาพร้อมชื่อที่อ่านเข้าใจง่าย (`double`, `triple`) เรียกใช้ได้เลยโดยไม่ต้องส่งอาร์กิวเมนต์ตัวแรกทุกครั้ง เพราะ `bind` ล็อกไว้ให้แล้ว

นอกจากนี้ partial application ยังมีประโยชน์ตอนที่เรามีฟังก์ชันกว้างๆ แล้วอยากสร้างเวอร์ชันเฉพาะทางที่ใช้สะดวกกว่า

เช่น สมมติมีฟังก์ชัน `send(from, to, text)` ถ้าอยู่ในออบเจ็กต์ `user` เราอาจสร้าง partial เป็น `sendTo(to, text)` ที่ล็อก `from` เป็นผู้ใช้ปัจจุบันไว้เลย

## สร้าง partial โดยไม่ผูก context

จะทำยังไงถ้าอยากล็อกแค่อาร์กิวเมนต์บางตัว แต่ไม่ต้องการผูก context (`this`)? เช่น กรณีที่ใช้กับเมธอดของออบเจ็กต์

`bind` ตัวเดิมทำไม่ได้ เพราะเราไม่สามารถข้ามพารามิเตอร์ context ไปใส่แค่อาร์กิวเมนต์ได้

แต่เราเขียนฟังก์ชัน `partial` ที่ผูกแค่อาร์กิวเมนต์อย่างเดียวได้ไม่ยาก:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// การใช้งาน:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// เพิ่มเมธอด partial ที่ล็อกเวลาไว้แล้ว
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// ผลลัพธ์ประมาณนี้:
// [10:00] John: Hello!
```

ผลลัพธ์จาก `partial(func[, arg1, arg2...])` คือ wrapper `(*)` ที่เรียก `func` โดย:
- ใช้ `this` เดียวกับที่ได้รับ (กรณีเรียก `user.sayNow` ก็คือ `user`)
- จากนั้นส่ง `...argsBound` ซึ่งเป็นอาร์กิวเมนต์จากตอนเรียก `partial` (เช่น `"10:00"`)
- แล้วก็ส่ง `...args` ซึ่งเป็นอาร์กิวเมนต์ที่ส่งให้ wrapper (เช่น `"Hello"`)

ใช้ spread syntax ทำได้ง่ายเลยใช่ไหม?

นอกจากนี้ไลบรารี lodash ก็มี [_.partial](https://lodash.com/docs#partial) ให้ใช้ได้เลยเช่นกัน

## สรุป

เมธอด `func.bind(context, ...args)` คืนค่า "เวอร์ชันที่ผูกแล้ว" ของฟังก์ชัน `func` โดยล็อก `this` และอาร์กิวเมนต์ตัวแรกๆ ไว้ (ถ้ามีการระบุ)

โดยทั่วไปเราใช้ `bind` เพื่อล็อก `this` ให้เมธอดของออบเจ็กต์ เพื่อจะได้ส่งไปใช้ที่อื่นได้ เช่น ส่งให้ `setTimeout`

เมื่อเราล็อกอาร์กิวเมนต์บางตัวของฟังก์ชันเดิมไว้ ฟังก์ชันที่ได้จะเรียกว่า *partially applied* หรือ *partial*

Partial มีประโยชน์ตอนที่เราไม่อยากส่งอาร์กิวเมนต์ตัวเดิมซ้ำแล้วซ้ำอีก เช่น ถ้ามีฟังก์ชัน `send(from, to)` และ `from` ควรเป็นค่าเดิมเสมอ ก็สร้าง partial แล้วใช้ต่อได้เลย
