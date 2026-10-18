libs:
  - lodash

---

# การผูกฟังก์ชัน (function binding)

เมื่อส่งเมธอด (method) ของออบเจ็กต์ (object) ไปเป็นคอลแบ็ก (callback) เช่น ส่งให้ `setTimeout` ฟังก์ชัน (function) ที่ถูกเรียกอาจไม่ได้รับ `this` เป็นออบเจ็กต์เดิม ปัญหานี้มักเรียกกันว่า "`this` หาย"

บทนี้เราจะดูวิธีส่งเมธอดไปใช้ที่อื่น โดยยังให้ `this` อ้างถึงออบเจ็กต์ที่ต้องการ

## this หายได้อย่างไร [#this-]

จากบทก่อน เรารู้ว่าการแยกเมธอดออกมาเป็นค่าฟังก์ชันไม่ได้เก็บออบเจ็กต์เจ้าของเมธอดติดมาด้วย ค่า `this` จึงขึ้นอยู่กับวิธีเรียกฟังก์ชันนั้น

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

ผลที่ได้คือ `Hello, undefined!` เพราะ `this.firstName` ไม่ได้อ่านชื่อจาก `user` ตามที่เราคาดไว้

ตอนส่ง `user.sayHi` ให้ `setTimeout` เราส่งเฉพาะค่าฟังก์ชัน ไม่ได้เรียกผ่าน `user` บรรทัดสุดท้ายจึงเทียบได้กับการเขียนแบบนี้:

```js
let f = user.sayHi;
setTimeout(f, 1000); // สูญเสีย context ของ user
```

ในเบราว์เซอร์ (browser) `setTimeout` เรียกฟังก์ชันนี้โดยให้ `this` เป็น `window` จึงอ่าน `window.firstName` ซึ่งไม่ได้กำหนดไว้ในตัวอย่าง ส่วนใน Node.js คอลแบ็กจะได้รับ `this` เป็นออบเจ็กต์ของ timer แทน ทั้งสองกรณีไม่ได้ใช้ `user` เป็น `this` ส่วนถ้าแยก `user.sayHi` มาเรียกโดยตรงใน strict mode จะได้ `this` เป็น `undefined`

สิ่งที่เราต้องการคือส่งเมธอดให้ส่วนอื่นของโปรแกรมเรียกใช้ แต่ยังคงให้ `this` หรือ context ของการเรียกเป็นออบเจ็กต์ที่ต้องการ

## วิธีที่ 1: ครอบการเรียกด้วย wrapper [#-1--wrapper-function]

วิธีแรกคือสร้าง wrapper หรือฟังก์ชันอีกตัวมาครอบการเรียก `user.sayHi()`:

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

เมื่อถึงเวลา wrapper จะอ่านตัวแปร (variable) `user` จาก Lexical Environment ภายนอก แล้วเรียก `user.sayHi()` ตามปกติ การเรียกผ่านออบเจ็กต์แบบนี้ทำให้ `this` เป็น `user`

เราใช้ arrow function เพื่อเขียน wrapper ให้สั้นลงได้:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

แต่ wrapper อ่านค่าของ `user` ตอนที่มันทำงาน ไม่ใช่ตอนตั้งเวลา ถ้าเราเปลี่ยนให้ `user` อ้างถึงออบเจ็กต์อื่นภายในช่วงหนึ่งวินาทีที่รออยู่ wrapper ก็จะเรียกเมธอดของออบเจ็กต์ใหม่:


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

ถ้าต้องการให้เรียกเมธอดกับออบเจ็กต์เดิม แม้ตัวแปร `user` จะเปลี่ยนค่าไปแล้ว เราใช้วิธีถัดไปได้

## วิธีที่ 2: ผูก this ด้วย bind [#-2-bind]

ฟังก์ชันมีเมธอด [bind](mdn:js/Function/bind) สำหรับสร้างฟังก์ชันใหม่ที่ผูกค่า `this` ไว้ล่วงหน้า

รูปแบบเบื้องต้นคือ:

```js
// ไวยากรณ์แบบเต็มจะอธิบายทีหลัง
let boundFunc = func.bind(context);
```

`func.bind(context)` คืนฟังก์ชันที่ผูกค่าไว้แล้ว หรือ *bound function* เมื่อเรียก `boundFunc` ก็จะส่งต่อไปยัง `func` โดยใช้ `context` เป็น `this` ภายใน JavaScript ค่านี้เป็นออบเจ็กต์ชนิดพิเศษที่เรียกว่า *exotic object* ซึ่งเรียกใช้งานได้เหมือนฟังก์ชัน

เช่น `funcUser` ด้านล่างส่งต่อการเรียกไปยัง `func` โดยให้ `this` เป็น `user`:

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

ถึงจะเรียก `funcUser()` โดยไม่ได้เขียน `user` ไว้ก่อนจุด `func` ก็ยังได้รับ `this` เป็นออบเจ็กต์ที่เราผูกไว้ จึงอ่านชื่อ `John` ได้

อาร์กิวเมนต์ (argument) ที่ส่งให้ bound function จะถูกส่งต่อไปยัง `func` ด้วย เช่น:

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

ทีนี้นำ `bind` มาใช้กับเมธอดของออบเจ็กต์:


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

บรรทัด `(*)` ผูกเมธอด `user.sayHi` เข้ากับออบเจ็กต์ `user` แล้วเก็บ bound function ไว้ใน `sayHi` เราจึงเรียก `sayHi()` โดยตรงหรือส่งให้ `setTimeout` ได้ แม้ต่อมาจะเปลี่ยนค่าของตัวแปร `user` แล้ว `sayHi` ก็ยังจำออบเจ็กต์เดิมไว้ จึงแสดง `Hello, John!` ทั้งสองครั้ง

ตัวอย่างถัดไปผูกเฉพาะ `this` ส่วนอาร์กิวเมนต์ยังส่งให้ฟังก์ชันได้ตามปกติ:

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

````smart header="ผูกหลายเมธอดด้วย `bindAll`"
ถ้าออบเจ็กต์มีหลายเมธอดที่ต้องส่งไปใช้ที่อื่นบ่อย ๆ เราใช้ลูป (loop) ผูกแต่ละเมธอดเข้ากับออบเจ็กต์ได้:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

ไลบรารี (library) JavaScript เช่น Lodash มีตัวช่วยสำหรับงานนี้ด้วย อย่าง [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) ที่ผูกเมธอดตามชื่อที่ระบุเข้ากับออบเจ็กต์
````

## กำหนดอาร์กิวเมนต์ล่วงหน้า [#partial-functions]

ที่ผ่านมาเราใช้ `bind` ผูกเฉพาะ `this` แต่ยังใช้กำหนดอาร์กิวเมนต์บางตัวไว้ล่วงหน้าได้ด้วย แม้จะใช้ไม่บ่อยเท่าการผูก `this` แต่ก็ช่วยให้เรียกฟังก์ชันบางแบบสะดวกขึ้น

รูปแบบเต็มของ `bind` คือ:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

ค่าตัวแรกกำหนด context หรือ `this` ส่วนค่าถัดไปกำหนดอาร์กิวเมนต์ตัวแรก ๆ ที่จะส่งให้ฟังก์ชันเดิม

สมมติว่าเรามีฟังก์ชันคูณเลข `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

เราใช้ `bind` สร้างฟังก์ชัน `double` ที่คูณด้วยสองได้ โดยกำหนดอาร์กิวเมนต์ตัวแรกของ `mul` เป็น `2` ไว้ก่อน:

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

`mul.bind(null, 2)` สร้างฟังก์ชันใหม่ `double` โดยผูก `null` เป็น context และ `2` เป็นอาร์กิวเมนต์ตัวแรก เมื่อเรียก `double(3)` ค่า `3` จะถูกส่งต่อจาก `2` จึงเท่ากับเรียก `mul(2, 3)` และได้ `6`

เทคนิคนี้เรียกว่า [partial function application](https://en.wikipedia.org/wiki/Partial_application) คือการสร้างฟังก์ชันใหม่จากฟังก์ชันเดิม โดยกำหนดอาร์กิวเมนต์บางตัวไว้ล่วงหน้า

ในตัวอย่าง `mul` ไม่ได้ใช้ `this` แต่ถ้าจะกำหนดอาร์กิวเมนต์ด้วย `bind` ก็ยังต้องใส่ค่าในตำแหน่ง context ก่อน เราจึงใช้ `null` ในตำแหน่งนั้น

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

ประโยชน์คือเราได้ฟังก์ชันที่มีชื่อบอกหน้าที่ชัดเจนอย่าง `double` และ `triple` และไม่ต้องส่งอาร์กิวเมนต์ตัวแรกซ้ำทุกครั้ง เพราะกำหนดไว้ด้วย `bind` แล้ว

partial application จึงช่วยนำฟังก์ชันที่ใช้ได้หลายกรณีมาสร้างเป็นฟังก์ชันสำหรับงานเฉพาะ เพื่อให้เรียกใช้ง่ายขึ้น

เช่น ถ้ามีฟังก์ชัน `send(from, to, text)` เราอาจสร้าง `sendTo(to, text)` สำหรับออบเจ็กต์ `user` โดยกำหนด `from` เป็นผู้ใช้ปัจจุบันไว้ล่วงหน้า เวลาเรียกจึงส่งเพียงผู้รับกับข้อความ

## กำหนดอาร์กิวเมนต์โดยไม่ผูก this [#-partial--context]

บางครั้งเราต้องการกำหนดอาร์กิวเมนต์ล่วงหน้า แต่ยังให้ `this` เปลี่ยนไปตามวิธีเรียก เช่น เมธอดของออบเจ็กต์

`bind` ทำแบบนี้ไม่ได้ เพราะไม่สามารถข้ามการผูก context แล้วกำหนดเฉพาะอาร์กิวเมนต์ได้

เราเขียนฟังก์ชัน `partial` เพื่อกำหนดเฉพาะอาร์กิวเมนต์ได้ดังนี้:

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

`partial(func[, arg1, arg2...])` คืน wrapper ที่บรรทัด `(*)` เมื่อเรียก wrapper นี้ มันจะเรียก `func` โดย:

- ส่ง `this` ที่ตัวเองได้รับต่อไป ในการเรียก `user.sayNow("Hello")` ค่านี้คือ `user`
- ส่งอาร์กิวเมนต์ที่กำหนดไว้ตอนเรียก `partial` ผ่าน `...argsBound` ก่อน ในตัวอย่างคือข้อความเวลา เช่น `"10:00"`
- ตามด้วยอาร์กิวเมนต์ที่เพิ่งส่งให้ wrapper ผ่าน `...args` ในตัวอย่างคือ `"Hello"`

spread syntax ช่วยกระจายค่าจาก `argsBound` และ `args` เป็นอาร์กิวเมนต์ตามลำดับนี้ โดยยังส่ง `this` ของการเรียกปัจจุบันผ่าน `call` ได้

ไลบรารี Lodash มี [_.partial](https://lodash.com/docs#partial) สำหรับกำหนดอาร์กิวเมนต์ล่วงหน้าแบบนี้เช่นกัน

## สรุป [#summary]

เมธอด `func.bind(context, ...args)` คืน bound function ที่ส่งต่อการเรียกไปยัง `func` โดยผูก `this` ไว้กับ `context` และกำหนดอาร์กิวเมนต์ตัวแรก ๆ ไว้ล่วงหน้าหากส่ง `args` มาด้วย

การใช้งานที่พบบ่อยคือผูก `this` ให้เมธอด ก่อนส่งเมธอดนั้นไปให้ส่วนอื่นเรียกใช้ เช่น ส่งให้ `setTimeout`

เมื่อกำหนดอาร์กิวเมนต์บางตัวของฟังก์ชันเดิมไว้ล่วงหน้า ฟังก์ชันที่ได้เรียกว่า *partially applied function* หรือเรียกสั้น ๆ ว่า *partial*

partial ช่วยให้ไม่ต้องส่งอาร์กิวเมนต์เดิมซ้ำทุกครั้ง เช่น ถ้าใช้ `send(from, to)` โดยมี `from` เป็นค่าเดิมตลอดในงานนั้น เราก็กำหนด `from` ไว้ก่อน แล้วเรียกฟังก์ชันใหม่โดยส่งเพียง `to`
