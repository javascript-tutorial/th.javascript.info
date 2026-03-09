# แฟล็กและ descriptor ของพร็อพเพอร์ตี้

อย่างที่เรารู้กัน ออบเจ็กต์สามารถเก็บพร็อพเพอร์ตี้ต่างๆ ได้

ที่ผ่านมาเราเข้าใจว่าพร็อพเพอร์ตี้ก็แค่คู่ "key-value" ธรรมดาๆ แต่จริงๆ แล้วพร็อพเพอร์ตี้ของออบเจ็กต์มีความสามารถมากกว่านั้น

ในบทนี้เราจะมาเรียนรู้ตัวเลือกการตั้งค่าเพิ่มเติม และในบทถัดไปจะมาดูว่าเราเปลี่ยนพร็อพเพอร์ตี้ให้เป็นฟังก์ชัน getter/setter ได้อย่างไร

## แฟล็กของพร็อพเพอร์ตี้

พร็อพเพอร์ตี้ของออบเจ็กต์ นอกจากจะมี **`value`** แล้ว ยังมีแอตทริบิวต์พิเศษอีก 3 ตัว (เรียกว่า "แฟล็ก"):

- **`writable`** -- ถ้าเป็น `true` จะเปลี่ยนแปลงค่าได้ ไม่งั้นจะเป็นแบบอ่านอย่างเดียว
- **`enumerable`** -- ถ้าเป็น `true` จะถูกแสดงผลเมื่อวนลูป ไม่งั้นจะไม่แสดง
- **`configurable`** -- ถ้าเป็น `true` จะลบพร็อพเพอร์ตี้หรือแก้ไขแอตทริบิวต์เหล่านี้ได้ ไม่งั้นจะทำไม่ได้

ปกติเราจะไม่ค่อยเห็นแฟล็กเหล่านี้ เพราะเวลาสร้างพร็อพเพอร์ตี้ "แบบปกติ" แฟล็กทั้งหมดจะเป็น `true` โดยอัตโนมัติ แต่เราสามารถเปลี่ยนค่าแฟล็กเหล่านี้ได้ตลอดเวลา

มาดูกันว่าจะดึงค่าแฟล็กเหล่านี้ได้อย่างไร

เมธอด [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) ใช้สำหรับดูข้อมูล*ทั้งหมด*ของพร็อพเพอร์ตี้

รูปแบบการใช้งานคือ:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: ออบเจ็กต์ที่ต้องการดูข้อมูล

`propertyName`
: ชื่อของพร็อพเพอร์ตี้

ค่าที่ได้กลับมาเรียกว่า "property descriptor" ซึ่งเป็นออบเจ็กต์ที่เก็บทั้ง value และแฟล็กทั้งหมด

ตัวอย่าง:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

ถ้าต้องการเปลี่ยนแฟล็ก เราใช้ [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

รูปแบบการใช้งานคือ:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: ออบเจ็กต์และชื่อพร็อพเพอร์ตี้ที่ต้องการกำหนด descriptor

`descriptor`
: ออบเจ็กต์ property descriptor ที่ต้องการนำไปใช้

ถ้าพร็อพเพอร์ตี้นั้นมีอยู่แล้ว `defineProperty` จะอัพเดตแฟล็กให้ แต่ถ้ายังไม่มีจะสร้างพร็อพเพอร์ตี้ใหม่ด้วยค่าและแฟล็กที่กำหนด โดยถ้าไม่ได้ระบุแฟล็กไหนไว้ จะถือว่าเป็น `false`

ตัวอย่างนี้สร้างพร็อพเพอร์ตี้ `name` โดยแฟล็กทุกตัวเป็น falsy:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

ลองเปรียบเทียบกับ `user.name` ที่สร้าง "แบบปกติ" ด้านบน จะเห็นว่าตอนนี้แฟล็กทุกตัวเป็น falsy ถ้าไม่ต้องการแบบนั้น ก็ต้องกำหนดให้เป็น `true` เองใน `descriptor`

ทีนี้มาดูกันว่าแต่ละแฟล็กมีผลอย่างไรบ้าง

## Non-writable

มาลองทำให้ `user.name` เป็นแบบ non-writable (เปลี่ยนค่าไม่ได้) โดยเปลี่ยนแฟล็ก `writable`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

ตอนนี้ไม่มีใครเปลี่ยนชื่อของ user ได้แล้ว ยกเว้นจะเรียก `defineProperty` มาเขียนทับ descriptor ของเรา

```smart header="error จะแสดงเฉพาะใน strict mode เท่านั้น"
ในโหมดที่ไม่ใช่ strict mode การเขียนค่าลงในพร็อพเพอร์ตี้ที่เป็น non-writable จะไม่ฟ้อง error แต่ก็จะไม่สำเร็จเช่นกัน การกระทำที่ฝ่าฝืนแฟล็กจะถูกเพิกเฉยอย่างเงียบๆ ในโหมดที่ไม่ใช่ strict
```

นี่คือตัวอย่างเดียวกัน แต่สร้างพร็อพเพอร์ตี้ขึ้นมาใหม่ตั้งแต่ต้น:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // สำหรับพร็อพเพอร์ตี้ใหม่ ต้องระบุว่าแฟล็กไหนเป็น true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Non-enumerable

คราวนี้มาลองเพิ่ม `toString` แบบกำหนดเองให้ `user` กัน

ปกติ `toString` ที่มากับออบเจ็กต์จะเป็น non-enumerable คือไม่แสดงใน `for..in` แต่ถ้าเราเพิ่ม `toString` ของเราเอง โดยปกติมันจะแสดงใน `for..in` แบบนี้:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// ปกติพร็อพเพอร์ตี้ของเราจะแสดงทั้งคู่:
for (let key in user) alert(key); // name, toString
```

ถ้าไม่ต้องการ ก็ตั้งค่า `enumerable:false` แล้ว `toString` จะไม่แสดงในลูป `for..in` เหมือนกับ `toString` ตัวเดิมที่มากับออบเจ็กต์:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// ตอนนี้ toString ของเราหายไปแล้ว:
*/!*
for (let key in user) alert(key); // name
```

พร็อพเพอร์ตี้ที่เป็น non-enumerable จะไม่แสดงใน `Object.keys` ด้วยเช่นกัน:

```js
alert(Object.keys(user)); // name
```

## Non-configurable

แฟล็ก non-configurable (`configurable:false`) บางครั้งถูกตั้งค่ามาล่วงหน้าสำหรับออบเจ็กต์และพร็อพเพอร์ตี้ที่มีอยู่แล้วในภาษา

พร็อพเพอร์ตี้ที่เป็น non-configurable จะลบไม่ได้ และแก้ไขแอตทริบิวต์ไม่ได้

ยกตัวอย่าง `Math.PI` ที่เป็นทั้ง non-writable, non-enumerable และ non-configurable:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
เพราะฉะนั้นจะเปลี่ยนค่าของ `Math.PI` หรือเขียนทับไม่ได้เลย

```js run
Math.PI = 3; // Error เพราะ writable: false

// delete Math.PI ก็ทำไม่ได้เช่นกัน
```

เราเปลี่ยน `Math.PI` ให้กลับมาเป็น `writable` อีกครั้งก็ไม่ได้:

```js run
// Error เพราะ configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

ไม่มีทางทำอะไรกับ `Math.PI` ได้เลย

การตั้งค่าพร็อพเพอร์ตี้ให้เป็น non-configurable เป็นทางเดียว ไม่สามารถเปลี่ยนกลับด้วย `defineProperty` ได้

**สิ่งที่ควรรู้: `configurable: false` ป้องกันการเปลี่ยนแฟล็กและการลบพร็อพเพอร์ตี้ แต่ยังเปลี่ยนค่า value ได้**

ตัวอย่างนี้ `user.name` เป็น non-configurable แต่ยังเปลี่ยนค่าได้ (เพราะยังเป็น writable):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // ทำได้ปกติ
delete user.name; // Error
```

ตัวอย่างนี้เราทำให้ `user.name` กลายเป็นค่าคงที่ถาวร คล้ายกับ `Math.PI`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// จะเปลี่ยน user.name หรือแฟล็กของมันไม่ได้อีกแล้ว
// ทั้งหมดนี้ทำไม่ได้:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="ข้อยกเว้นเดียวคือ: เปลี่ยน writable จาก true เป็น false ได้"
มีข้อยกเว้นเล็กน้อยเกี่ยวกับการเปลี่ยนแฟล็ก

สำหรับพร็อพเพอร์ตี้ที่เป็น non-configurable เราสามารถเปลี่ยน `writable: true` เป็น `false` ได้ เพื่อเพิ่มชั้นการป้องกันอีกขั้น แต่จะเปลี่ยนจาก `false` กลับเป็น `true` ไม่ได้
```

## Object.defineProperties

มีเมธอด [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) ที่ช่วยให้กำหนดหลายพร็อพเพอร์ตี้พร้อมกันได้

รูปแบบการใช้งานคือ:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

ตัวอย่าง:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

จึงสามารถกำหนดหลายพร็อพเพอร์ตี้ได้ในครั้งเดียว

## Object.getOwnPropertyDescriptors

ถ้าต้องการดึง property descriptor ของทุกพร็อพเพอร์ตี้พร้อมกัน ใช้เมธอด [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)

เมื่อใช้ร่วมกับ `Object.defineProperties` จะเป็นวิธีโคลนออบเจ็กต์ที่ "รักษาแฟล็กไว้ครบ":

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

ปกติเวลาโคลนออบเจ็กต์ เราใช้การ assign เพื่อคัดลอกพร็อพเพอร์ตี้แบบนี้:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...แต่วิธีนี้ไม่ได้คัดลอกแฟล็กไปด้วย ถ้าต้องการโคลนที่ "สมบูรณ์กว่า" ต้องใช้ `Object.defineProperties`

อีกจุดที่ต่างกันคือ `for..in` จะข้ามพร็อพเพอร์ตี้ที่เป็น symbolic และ non-enumerable แต่ `Object.getOwnPropertyDescriptors` จะคืนค่า descriptor ของ*ทุก*พร็อพเพอร์ตี้ รวมถึง symbolic และ non-enumerable ด้วย

## การล็อกออบเจ็กต์ทั้งตัว

Property descriptor ทำงานในระดับพร็อพเพอร์ตี้แต่ละตัว

แต่ยังมีเมธอดที่จำกัดการเข้าถึง*ออบเจ็กต์ทั้งตัว*ด้วย:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: ห้ามเพิ่มพร็อพเพอร์ตี้ใหม่เข้าไปในออบเจ็กต์

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: ห้ามเพิ่ม/ลบพร็อพเพอร์ตี้ และตั้งค่า `configurable: false` ให้พร็อพเพอร์ตี้ทุกตัว

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: ห้ามเพิ่ม/ลบ/เปลี่ยนพร็อพเพอร์ตี้ และตั้งค่า `configurable: false, writable: false` ให้พร็อพเพอร์ตี้ทุกตัว

นอกจากนี้ยังมีเมธอดสำหรับตรวจสอบด้วย:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: คืนค่า `false` ถ้าห้ามเพิ่มพร็อพเพอร์ตี้ใหม่ ไม่งั้นคืนค่า `true`

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: คืนค่า `true` ถ้าห้ามเพิ่ม/ลบพร็อพเพอร์ตี้ และพร็อพเพอร์ตี้ทุกตัวมีค่า `configurable: false`

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: คืนค่า `true` ถ้าห้ามเพิ่ม/ลบ/เปลี่ยนพร็อพเพอร์ตี้ และพร็อพเพอร์ตี้ทุกตัวมีค่า `configurable: false, writable: false`

เมธอดเหล่านี้ไม่ค่อยได้ใช้ในงานจริงสักเท่าไหร่
