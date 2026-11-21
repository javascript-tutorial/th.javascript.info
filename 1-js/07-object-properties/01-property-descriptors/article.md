# กำหนดพฤติกรรมของพร็อพเพอร์ตี้ (property) ด้วยแฟล็ก (flag) และ descriptor

เราเปลี่ยน `user.name` จาก `"John"` เป็น `"Pete"` ได้ด้วยเครื่องหมาย `=` แต่พอใช้วิธีเดียวกันกับ `Math.PI` ค่าของ `PI` กลับไม่เปลี่ยน ทั้งสองเป็นพร็อพเพอร์ตี้ของออบเจ็กต์ (object) เหมือนกัน แล้ว JavaScript รู้ได้อย่างไรว่าค่าไหนเขียนทับได้?

คำตอบอยู่ที่แฟล็กของพร็อพเพอร์ตี้แต่ละตัว เราจะลองอ่านแฟล็กของ `name` แล้วเปลี่ยนให้ชื่อนี้อ่านได้อย่างเดียว ส่วนบทถัดไปจะพูดถึง getter และ setter ซึ่งเป็นฟังก์ชัน (function) ที่ทำงานเมื่อเราอ่านหรือเขียนพร็อพเพอร์ตี้ด้วยวิธีเดิม

## อ่านค่าและดูแฟล็กทั้งสาม [#property-flags]

ในบรรทัด `name: "John"` เราเห็นทั้งชื่อพร็อพเพอร์ตี้และค่าที่เก็บไว้ (**`value`**) พร็อพเพอร์ตี้ที่เก็บค่าโดยตรง (*data property*) ยังมีแฟล็กอีกสามตัว แต่ละตัวเป็นการตั้งค่าที่เลือกได้ระหว่าง `true` กับ `false`

- **`writable`** ถ้าเป็น `true` เราใช้ `=` กำหนดค่าใหม่ให้พร็อพเพอร์ตี้ได้ ถ้าเป็น `false` เราจะเขียนค่าใหม่ทับด้วยวิธีนี้ไม่ได้
- **`enumerable`** ถ้าเป็น `true` ชื่อพร็อพเพอร์ตี้ที่เป็นสตริง (string) อย่าง `name` จะปรากฏเมื่อใช้ `for..in` ถ้าเป็น `false` ก็จะข้ามชื่อนั้นไป
- **`configurable`** ถ้าเป็น `true` เราลบพร็อพเพอร์ตี้หรือตั้งแฟล็กใหม่ได้ ถ้าเป็น `false` เราลบพร็อพเพอร์ตี้ไม่ได้ และการเปลี่ยนแฟล็กก็มีข้อจำกัด เราจะได้เห็นข้อยกเว้นเรื่อง `writable` ในตัวอย่างด้านล่าง

เมื่อเราเขียน `name: "John"` ไว้ใน `{...}` JavaScript จะตั้งแฟล็กทั้งสามเป็น `true` ให้เอง เราดูค่าและแฟล็กของพร็อพเพอร์ตี้ที่ออบเจ็กต์มีอยู่เองได้ด้วยเมธอด (method) [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: ออบเจ็กต์ที่จะตรวจ

`propertyName`
: ชื่อพร็อพเพอร์ตี้ที่ต้องการตรวจ เช่น `"name"`

ถ้า `obj` มีพร็อพเพอร์ตี้ชื่อนั้นเป็นของตัวเอง เมธอดนี้จะคืนออบเจ็กต์ที่บอกรายละเอียดของพร็อพเพอร์ตี้ เรียกว่า *property descriptor* ถ้าไม่มีก็จะคืน `undefined` ลองดูว่า descriptor ของ `user.name` บอกอะไรบ้าง

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

ในผลที่ได้ `value` คือ `"John"` และแฟล็กทั้งสามเป็น `true` ถ้าอยากกำหนดค่าเหล่านี้เอง ให้ส่ง descriptor ที่ต้องการไปให้ [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: ระบุว่าจะกำหนดพร็อพเพอร์ตี้ให้กับออบเจ็กต์ไหน และพร็อพเพอร์ตี้นั้นชื่ออะไร

`descriptor`
: ออบเจ็กต์ที่บอกว่าเราต้องการค่าและแฟล็กแบบไหน

เวลาแก้พร็อพเพอร์ตี้ที่เก็บค่าอยู่แล้ว เราระบุเฉพาะส่วนที่ต้องการเปลี่ยนได้ เช่น ถ้าตั้งแค่ `writable` ค่าที่เก็บไว้และแฟล็กอื่นจะคงเดิม

ถ้า `obj` ยังไม่มีพร็อพเพอร์ตี้ชื่อนั้นเป็นของตัวเองและยังเพิ่มพร็อพเพอร์ตี้ใหม่ได้ `defineProperty` จะสร้างให้ ลองเริ่มจากออบเจ็กต์ว่าง สร้าง `name` โดยระบุแค่ `value` แล้วอ่าน descriptor กลับมาดู

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

`user.name` ยังอ่านได้ค่า `"John"` เหมือนตัวอย่างแรก คราวนี้ `writable`, `enumerable` และ `configurable` เป็น `false` ทั้งหมด เพราะเมื่อ *สร้าง* พร็อพเพอร์ตี้ด้วย `defineProperty` แฟล็กที่ละไว้จะเป็น `false` ถ้าอยากเปิดแฟล็กไหน ก็ต้องเขียน `true` ให้แฟล็กนั้นใน descriptor

## ป้องกันการเขียนทับค่า (non-writable) [#non-writable]

สมมติว่าเราต้องการให้อ่านชื่อผู้ใช้ได้ แต่ห้ามแก้ชื่อด้วย `user.name = ...` เราทำได้โดยแก้แฟล็ก `writable` ของ `name` เพียงตัวเดียว

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
user.name = "Pete";
// TypeError: Cannot assign to read only property 'name' of object '#<Object>'
*/!*
```

พอ `writable` เป็น `false` บรรทัด `user.name = "Pete"` ก็เปลี่ยนชื่อไม่ได้ ค่าเดิมจึงยังเป็น `"John"` แต่ในตัวอย่างนี้ `configurable` ยังเป็น `true` เราจึงเรียก `defineProperty` เพื่อเปิดให้เขียนชื่อได้อีกครั้ง

```smart header="เมื่อเขียนทับพร็อพเพอร์ตี้ที่อ่านได้อย่างเดียว"
ตัวอย่างในบทนี้ใช้โหมดเข้มงวด (strict mode) บรรทัด `user.name = "Pete"` จึงทำให้เกิด `TypeError` คอมเมนต์ยกข้อความผิดพลาดจาก Chrome ถ้ารันโดยไม่ใช้โหมดเข้มงวด โปรแกรมจะทำงานต่อโดยไม่แจ้งข้อผิดพลาด และชื่อจะยังเป็น `"John"`
```

ถ้าจะให้ `name` อ่านได้อย่างเดียวตั้งแต่แรก ให้สร้างด้วย `defineProperty` ดังตัวอย่างต่อไปนี้ เราระบุ `true` ให้สองแฟล็กที่ต้องการเปิด ส่วน `writable` ไม่ต้องเขียน เพราะค่าเริ่มต้นเป็น `false`

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // ตอนสร้างพร็อพเพอร์ตี้ด้วย defineProperty แฟล็กที่ไม่ได้ระบุจะเป็น false
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete";
// TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```

## พร็อพเพอร์ตี้ที่ for..in จะข้าม (non-enumerable) [#non-enumerable]

ออบเจ็กต์ทั่วไปมีเมธอด `toString` ให้เรียกได้อยู่แล้ว แต่พอใช้ `for..in` ไล่ดูชื่อพร็อพเพอร์ตี้ เรากลับไม่เห็นชื่อ `toString` เพราะเมธอดที่ JavaScript มีมาให้นี้ตั้ง `enumerable: false` ไว้

ทีนี้ลองเขียน `toString` ของเราเองไว้ข้าง ๆ `name` ใน `user` วิธีนี้ทำให้ `enumerable` เป็น `true` ทั้งคู่ `for..in` จึงไล่เจอชื่อ `name` แล้วตามด้วย `toString`

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// for..in พบทั้งสองชื่อ และ alert แสดงทีละชื่อ
for (let key in user) alert(key);
// name
// toString
```

เราเปลี่ยนให้ `for..in` ข้าม `toString` ที่เขียนเองได้เช่นกัน แค่ตั้งแฟล็ก `enumerable` ของ `toString` เป็น `false`

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
// for..in ข้ามชื่อ toString แต่เรายังเรียก user.toString() ได้
*/!*
for (let key in user) alert(key); // name
```

คราวนี้เห็นแค่ `name` ส่วน `toString` ยังเรียกใช้ได้ตามเดิม เพียงแต่ชื่อของมันจะไม่ปรากฏตอนวนรอบ และจะไม่อยู่ในรายชื่อที่ `Object.keys` คืนมาเช่นกัน

```js
alert(Object.keys(user)); // name
```

## เมื่อลบพร็อพเพอร์ตี้ไม่ได้ (non-configurable) [#non-configurable]

กลับมาที่คำถามตอนต้นว่าทำไมเราจึงเขียนทับ `Math.PI` ไม่ได้ JavaScript ตั้งแฟล็กให้พร็อพเพอร์ตี้ที่มากับภาษาไว้ด้วย เราลองอ่าน descriptor ของ `PI` ได้จากออบเจ็กต์ `Math`

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

แฟล็กทั้งสามเป็น `false` แต่แต่ละตัวมีผลคนละอย่าง ที่ `Math.PI = 3` เปลี่ยนค่าไม่ได้เป็นเพราะ `writable: false` ส่วนที่ `delete Math.PI` ลบพร็อพเพอร์ตี้ไม่ได้เป็นเพราะ `configurable: false`

```js run
Math.PI = 3; // เขียนทับไม่ได้ เพราะ writable เป็น false
// TypeError: Cannot assign to read only property 'PI' of object '#<Object>'

// ใช้ delete Math.PI ลบพร็อพเพอร์ตี้นี้ไม่ได้ เพราะ configurable เป็น false
```

แล้วถ้าเรียก `defineProperty` เพื่อเปิดให้เขียนค่าได้ก่อนล่ะ? วิธีนี้ก็ใช้กับ `Math.PI` ไม่ได้ เพราะ `configurable: false` ปิดทางเปลี่ยน `writable` จาก `false` เป็น `true` ไว้ด้วย

```js run
// เมื่อ configurable เป็น false เราจะตั้ง writable กลับเป็น true ไม่ได้
Object.defineProperty(Math, "PI", { writable: true });
// TypeError: Cannot redefine property: PI
```

เมื่อตั้ง `configurable` เป็น `false` ไปแล้ว เราจะใช้ `defineProperty` ตั้งกลับเป็น `true` อีกไม่ได้

**พร็อพเพอร์ตี้ที่ลบไม่ได้ก็ยังเปลี่ยนค่าได้ ถ้า `writable` เป็น `true`**

ในตัวอย่างนี้เราตั้งเพียง `configurable: false` ส่วน `writable` ยังเป็น `true` คำสั่ง `user.name = "Pete"` จึงเปลี่ยนชื่อได้ แต่คำสั่งถัดมา `delete user.name` ลบพร็อพเพอร์ตี้ไม่ได้และทำให้เกิด `TypeError` ในโหมดเข้มงวด

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // เปลี่ยนชื่อได้ เพราะ writable ยังเป็น true
delete user.name;
// TypeError: Cannot delete property 'name' of #<Object>
```

ถ้าอยากให้ชื่อคงที่เหมือนค่า `Math.PI` เราต้องตั้งทั้งสองแฟล็กเป็น `false` คราวนี้จะเปลี่ยนค่าด้วย `=` ลบด้วย `delete` หรือแม้แต่ใช้ `defineProperty` กำหนดให้ชื่อเป็น `"Pete"` ก็ทำไม่ได้ทั้งสามวิธี

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// ตอนนี้เราเปลี่ยนค่า ลบ name หรือตั้งแฟล็กใหม่ไม่ได้แล้ว
// ลองรันแต่ละคำสั่งแยกกัน ถ้ารันตามลำดับนี้ในโหมดเข้มงวด โปรแกรมจะหยุดที่คำสั่งแรก
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="ข้อยกเว้นสำหรับ writable"
เมื่อ `configurable` เป็น `false` ยังมีแฟล็กหนึ่งที่เปลี่ยนได้ ถ้าพร็อพเพอร์ตี้นั้นยังเขียนค่าได้อยู่ เราตั้ง `writable` จาก `true` เป็น `false` เพื่อให้เหลือแค่อ่านได้ แต่เมื่อปิดแล้วจะเปิดกลับไม่ได้
```

## กำหนดหลายพร็อพเพอร์ตี้พร้อมกันด้วย Object.defineProperties [#object-defineproperties]

หากต้องการกำหนดหลายพร็อพเพอร์ตี้ในการเรียกครั้งเดียว ให้ใช้ [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) แล้วจับคู่ชื่อพร็อพเพอร์ตี้แต่ละชื่อกับ descriptor ของมัน

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

สมมติว่า `user` เป็นออบเจ็กต์ว่าง เราสร้าง `name` กับ `surname` พร้อมกันและกำหนดให้ทั้งคู่อ่านได้อย่างเดียวดังนี้

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

เมื่ออ่าน `user.name` จะได้ `"John"` และเมื่ออ่าน `user.surname` จะได้ `"Smith"` ทั้งสองชื่อมี `writable: false` ตามที่ระบุแยกไว้

## อ่าน descriptor ทั้งหมดด้วย Object.getOwnPropertyDescriptors [#object-getownpropertydescriptors]

การเรียก [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) เพียงครั้งเดียวจะได้ descriptor ของพร็อพเพอร์ตี้ทุกตัวที่ `obj` มีอยู่เอง

ถ้าอยากคัดลอกพร็อพเพอร์ตี้พร้อมแฟล็กเดิม ให้อ่าน descriptor ทั้งหมดจาก `obj` แล้วส่งต่อให้ `Object.defineProperties` สร้างพร็อพเพอร์ตี้ตามนั้นในออบเจ็กต์ว่าง `{}`

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

ลองเทียบกับอีกวิธีหนึ่ง สมมติว่าเราเริ่มจาก `clone` ที่เป็นออบเจ็กต์ว่าง แล้วใช้ `for..in` คัดลอกค่าจาก `user` ทีละชื่อ

```js
for (let key in user) {
  clone[key] = user[key]
}
```

สิ่งที่ได้จาก `user[key]` คือค่าของพร็อพเพอร์ตี้ บรรทัด `clone[key] = user[key]` จึงคัดลอกได้เฉพาะค่า แม้ว่าต้นฉบับจะอ่านได้อย่างเดียว แฟล็กนั้นก็ไม่ติดไปกับสำเนา

นอกจากนี้ `for..in` ยังข้ามพร็อพเพอร์ตี้ที่มี `enumerable: false` และพร็อพเพอร์ตี้ที่ใช้ค่า symbol เป็นชื่อ ส่วน `Object.getOwnPropertyDescriptors` จะคืน descriptor ของพร็อพเพอร์ตี้ทั้งสองกลุ่มที่ออบเจ็กต์มีอยู่เองด้วย

## จำกัดการเพิ่ม ลบ และแก้ค่าทั้งออบเจ็กต์ [#-2]

descriptor ช่วยให้เราตั้งข้อจำกัดให้พร็อพเพอร์ตี้เป็นรายตัว ถ้าต้องการกำหนดข้อจำกัดให้กับ*ทั้งออบเจ็กต์* ในครั้งเดียว มีสามเมธอดให้เลือกตามสิ่งที่ต้องการห้าม

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: ปิดการเพิ่มพร็อพเพอร์ตี้ใหม่ลงใน `obj`

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: ห้ามเพิ่มพร็อพเพอร์ตี้ใหม่ ส่วนพร็อพเพอร์ตี้ที่ `obj` มีอยู่เองจะได้ `configurable: false` ทุกตัว จึงลบออกไม่ได้

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: ห้ามเพิ่มพร็อพเพอร์ตี้ใหม่และตั้ง `configurable: false` ให้ทุกพร็อพเพอร์ตี้ที่ `obj` มีอยู่เอง จึงลบออกไม่ได้เช่นเดียวกับ `seal` สำหรับพร็อพเพอร์ตี้ที่เก็บค่า `freeze` จะตั้ง `writable: false` ด้วย จึงเขียนทับค่าไม่ได้อีก

ถ้าได้รับออบเจ็กต์มาแล้วอยากรู้ว่ายังแก้อะไรได้บ้าง ให้ใช้เมธอดตรวจสอบสามตัวที่คู่กัน

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: ตรวจว่ายังเพิ่มพร็อพเพอร์ตี้ให้ `obj` ได้หรือเปล่า ถ้าได้จะคืนค่า `true` ถ้าไม่ได้จะคืนค่า `false`

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: คืนค่า `true` เมื่อ `obj` รับพร็อพเพอร์ตี้ใหม่ไม่ได้แล้ว และทุกพร็อพเพอร์ตี้ที่ `obj` มีอยู่เองตั้ง `configurable: false` ไว้ จึงลบไม่ได้

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: คืนค่า `true` เมื่อ `obj` ผ่านเงื่อนไขของ `isSealed` ทั้งหมด และพร็อพเพอร์ตี้ชนิดเก็บค่าที่ `obj` มีอยู่เองล้วนมี `writable: false` จึงเขียนทับค่าไม่ได้ด้วย

ในการใช้งานทั่วไป เราไม่ค่อยจำเป็นต้องเรียกเมธอดกลุ่มนี้
