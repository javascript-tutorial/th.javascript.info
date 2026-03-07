
# WeakMap และ WeakSet

จากที่เรารู้กันในบท <info:garbage-collection> ค่าจะอยู่ในหน่วยความจำตราบเท่าที่ยัง "เข้าถึงได้" และอาจถูกนำไปใช้งาน

ตัวอย่างเช่น:

```js
let john = { name: "John" };

// เข้าถึงออบเจ็กต์ได้ผ่าน john ซึ่งเป็น reference ของมัน

// เขียนทับ reference
john = null;

*!*
// ออบเจ็กต์จะถูกลบออกจากหน่วยความจำ
*/!*
```

พร็อพเพอร์ตี้ของออบเจ็กต์ สมาชิกของอาร์เรย์ หรือข้อมูลในโครงสร้างข้อมูลอื่นๆ ล้วนถือว่า "เข้าถึงได้" ตราบเท่าที่โครงสร้างนั้นยังอยู่ในหน่วยความจำ

เช่น ถ้าใส่ออบเจ็กต์ลงในอาร์เรย์ ออบเจ็กต์นั้นจะอยู่ตลอดตราบที่อาร์เรย์ยังอยู่ แม้จะไม่มี reference อื่นชี้ไปที่มันเลยก็ตาม

แบบนี้:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // เขียนทับ reference

*!*
// ออบเจ็กต์ที่ john เคยชี้ไป ยังคงอยู่ในอาร์เรย์
// ดังนั้นจะไม่ถูก garbage-collected
// เราเข้าถึงมันได้ผ่าน array[0]
*/!*
```

ถ้าใช้ออบเจ็กต์เป็น key ใน `Map` ปกติก็เหมือนกัน — ตราบใดที่ `Map` ยังอยู่ ออบเจ็กต์นั้นก็อยู่ด้วย ครอบครองหน่วยความจำและไม่ถูก garbage collect

ตัวอย่าง:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // เขียนทับ reference

*!*
// john ยังคงอยู่ใน map
// เราเข้าถึงมันได้ผ่าน map.keys()
*/!*
```

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) ต่างออกไปโดยสิ้นเชิง — ไม่ขัดขวางการ garbage-collect ของออบเจ็กต์ที่เป็น key เลย

มาดูกันว่าหมายความว่าอะไรผ่านตัวอย่าง

## WeakMap

ความต่างแรกระหว่าง [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) กับ [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) คือ key ต้องเป็นออบเจ็กต์เท่านั้น ใช้ค่า primitive ไม่ได้:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // ใช้งานได้ปกติ (key เป็นออบเจ็กต์)

*!*
// ไม่สามารถใช้สตริงเป็น key ได้
weakMap.set("test", "Whoops"); // เกิดข้อผิดพลาด เพราะ "test" ไม่ใช่ออบเจ็กต์
*/!*
```

ถ้าใช้ออบเจ็กต์เป็น key แล้วไม่มี reference อื่นชี้ไปที่ออบเจ็กต์นั้นอีก ออบเจ็กต์นั้นจะถูกลบออกจากหน่วยความจำ (และจาก map) โดยอัตโนมัติ

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // เขียนทับ reference

// john ถูกลบออกจากหน่วยความจำแล้ว!
```

เทียบกับตัวอย่าง `Map` ปกติข้างบน — ถ้า `john` เป็น key ใน `WeakMap` เพียงที่เดียว จะถูกลบออกจาก map และหน่วยความจำโดยอัตโนมัติ

`WeakMap` ไม่รองรับการวนซ้ำ และไม่มีเมธอด `keys()`, `values()`, `entries()` จึงไม่มีทางดึง key หรือ value ทั้งหมดออกมาได้

มีแค่สี่เมธอดเท่านั้น:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

ทำไมถึงจำกัดแค่นี้? เหตุผลเป็นเรื่องทางเทคนิค — ถ้าออบเจ็กต์สูญเสีย reference ทั้งหมด (เหมือน `john` ในโค้ดข้างบน) JavaScript engine จะ garbage collect ออบเจ็กต์นั้น แต่ไม่มีการระบุแน่นอนว่า *จะเกิดขึ้นเมื่อไหร่*

engine เป็นตัวตัดสินใจเอง อาจทำทันทีหรือรอก่อนแล้วค่อยทำทีหลังพร้อมกันหลายๆ ตัว จำนวนสมาชิกใน `WeakMap` ณ ขณะหนึ่งจึงไม่แน่นอน — อาจทำความสะอาดไปแล้ว ยังไม่ได้ทำ หรือทำไปแค่บางส่วน นั่นจึงเป็นเหตุผลที่เมธอดสำหรับเข้าถึง key/value ทั้งหมดไม่ได้รับการรองรับ

แล้วโครงสร้างข้อมูลแบบนี้ใช้ในสถานการณ์ไหนบ้าง?

## กรณีใช้งาน: ข้อมูลเสริม

การใช้งานหลักของ `WeakMap` คือการเก็บ *ข้อมูลเสริม*

สมมติเรากำลังทำงานกับออบเจ็กต์ที่ "เป็นของ" โค้ดอื่น หรืออาจเป็น library ของบุคคลที่สาม แล้วต้องการเก็บข้อมูลบางอย่างที่ผูกกับออบเจ็กต์นั้น โดยให้ข้อมูลนั้นหายไปพร้อมออบเจ็กต์ — `WeakMap` เหมาะกับงานนี้พอดี

ใส่ข้อมูลลงใน `WeakMap` โดยใช้ออบเจ็กต์เป็น key พอออบเจ็กต์ถูก garbage collect ข้อมูลนั้นก็หายไปเองโดยอัตโนมัติ

```js
weakMap.set(john, "เอกสารลับ");
// ถ้า john ถูกลบ เอกสารลับก็จะถูกทำลายโดยอัตโนมัติ
```

มาดูตัวอย่างจริงกัน

สมมติมีโค้ดที่เก็บจำนวนครั้งที่ผู้ใช้เข้าเยี่ยมชม ข้อมูลถูกเก็บใน map โดยใช้ออบเจ็กต์ user เป็น key พอผู้ใช้จากไป (ออบเจ็กต์ถูก garbage collect) เราก็ไม่ต้องการจำนวนครั้งของเขาแล้ว

นี่คือตัวอย่างฟังก์ชันนับการเข้าชมด้วย `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => จำนวนครั้งที่เข้าชม

// เพิ่มจำนวนครั้งที่เข้าชม
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

และนี่คืออีกส่วนของโค้ด อาจเป็นไฟล์อื่นที่ใช้งานมัน:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // นับการเข้าชมของเขา

// ต่อมา john ออกจากระบบ
john = null;
```

ตอนนี้ออบเจ็กต์ `john` ควรถูก garbage collect แต่ยังอยู่ในหน่วยความจำเพราะเป็น key ใน `visitsCountMap`

ทุกครั้งที่ลบผู้ใช้ออก เราต้องทำความสะอาด `visitsCountMap` ด้วย ไม่งั้นจะกินหน่วยความจำไปเรื่อยๆ ในสถาปัตยกรรมที่ซับซ้อน งานแบบนี้น่าเบื่อมาก

ใช้ `WeakMap` แทนก็แก้ปัญหาได้ทันที:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => จำนวนครั้งที่เข้าชม

// เพิ่มจำนวนครั้งที่เข้าชม
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

ไม่ต้องทำความสะอาด `visitsCountMap` อีกต่อไป พอออบเจ็กต์ `john` ไม่สามารถเข้าถึงได้จากที่อื่นนอกจากใน `WeakMap` ก็จะถูกลบออกจากหน่วยความจำพร้อมกับข้อมูลที่ผูกกับ key นั้นโดยอัตโนมัติ

## กรณีใช้งาน: caching

อีกกรณีที่พบบ่อยคือการทำ caching — เก็บผลลัพธ์จากฟังก์ชันไว้ เพื่อที่การเรียกครั้งต่อๆ ไปด้วยออบเจ็กต์เดิมจะได้นำผลลัพธ์เดิมมาใช้ได้เลยโดยไม่ต้องคำนวณใหม่

ทำแบบนี้ด้วย `Map` (แต่ยังไม่ดีที่สุด):

```js run
// 📁 cache.js
let cache = new Map();

// คำนวณและจดจำผลลัพธ์
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* คำนวณผลลัพธ์สำหรับ */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// ทีนี้เราใช้ process() ในไฟล์อื่น:
*/!*

// 📁 main.js
let obj = {/* สมมติว่าเรามีออบเจ็กต์นี้ */};

let result1 = process(obj); // คำนวณแล้ว

// ...ต่อมา จากที่อื่นในโค้ด...
let result2 = process(obj); // นำผลลัพธ์จาก cache มาใช้

// ...ต่อมา เมื่อไม่ต้องการออบเจ็กต์แล้ว:
obj = null;

alert(cache.size); // 1 (อุ๊ย! ออบเจ็กต์ยังอยู่ใน cache กินหน่วยความจำ!)
```

เรียก `process(obj)` ด้วยออบเจ็กต์เดิมกี่ครั้งก็ตาม ครั้งแรกเท่านั้นที่คำนวณจริง ครั้งต่อๆ ไปดึงจาก `cache` ได้เลย แต่ปัญหาคือต้องทำความสะอาด `cache` เองเมื่อไม่ต้องการออบเจ็กต์แล้ว

แทน `Map` ด้วย `WeakMap` ปัญหานี้หายไปเลย ผลลัพธ์ใน cache จะถูกลบออกจากหน่วยความจำอัตโนมัติหลังออบเจ็กต์ถูก garbage collect

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// คำนวณและจดจำผลลัพธ์
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* คำนวณผลลัพธ์สำหรับ */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* ออบเจ็กต์ตัวหนึ่ง */};

let result1 = process(obj);
let result2 = process(obj);

// ...ต่อมา เมื่อไม่ต้องการออบเจ็กต์แล้ว:
obj = null;

// ไม่สามารถดู cache.size ได้ เพราะเป็น WeakMap
// แต่ค่าจะเป็น 0 หรือจะเป็น 0 ในไม่ช้า
// เมื่อ obj ถูก garbage collect ข้อมูล cache ก็จะถูกลบตามไปด้วย
```

## WeakSet

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) ทำงานในทำนองเดียวกัน:

- คล้ายกับ `Set` แต่เพิ่มได้เฉพาะออบเจ็กต์เท่านั้น (ไม่ใช่ค่า primitive)
- ออบเจ็กต์จะอยู่ใน set ตราบเท่าที่ยังมีที่อื่นเข้าถึงได้
- รองรับ [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) และ [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete) เหมือน `Set` แต่ไม่มี `size`, `keys()` และไม่รองรับการวนซ้ำ

ด้วยความเป็น "weak" จึงเหมาะสำหรับเก็บข้อมูลเสริมเช่นกัน แต่ไม่ใช่ข้อมูลทั่วไป — เหมาะกับข้อเท็จจริงแบบ "ใช่/ไม่ใช่" การที่ออบเจ็กต์อยู่ใน `WeakSet` บ่งบอกว่าบางอย่างเกี่ยวกับออบเจ็กต์นั้นเป็นความจริง

ตัวอย่างเช่น เพิ่ม user ลงใน `WeakSet` เพื่อติดตามว่าใครเคยเข้าเยี่ยมชมเว็บของเรา:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John เข้าเยี่ยมชม
visitedSet.add(pete); // แล้ว Pete ก็เข้ามา
visitedSet.add(john); // John เข้ามาอีกครั้ง

// ตอนนี้ visitedSet มี 2 user

// ตรวจสอบว่า John เคยเข้าเยี่ยมชมหรือยัง?
alert(visitedSet.has(john)); // true

// ตรวจสอบว่า Mary เคยเข้าเยี่ยมชมหรือยัง?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet จะถูกทำความสะอาดโดยอัตโนมัติ
```

ข้อจำกัดที่เห็นชัดที่สุดของ `WeakMap` และ `WeakSet` คือไม่รองรับการวนซ้ำ และดึงเนื้อหาทั้งหมดออกมาไม่ได้ แต่นั่นก็ไม่ได้ขัดขวางการทำหน้าที่หลักของมัน — เป็นที่เก็บข้อมูล "เสริม" สำหรับออบเจ็กต์ที่ถูกเก็บและจัดการในที่อื่น

## สรุป

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) คือคอลเล็กชันคล้าย `Map` ที่รับเฉพาะออบเจ็กต์เป็น key และจะลบออบเจ็กต์พร้อมค่าที่ผูกกันโดยอัตโนมัติเมื่อไม่สามารถเข้าถึงได้จากที่อื่นอีก

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) คือคอลเล็กชันคล้าย `Set` ที่เก็บได้เฉพาะออบเจ็กต์ และลบออบเจ็กต์โดยอัตโนมัติเมื่อไม่สามารถเข้าถึงได้จากที่อื่นอีก

ข้อดีหลักของทั้งสองคือ reference ออบเจ็กต์แบบ "อ่อนแอ" ทำให้ garbage collector ลบออบเจ็กต์เหล่านั้นได้อย่างสะดวก

แลกมาด้วยการไม่รองรับ `clear`, `size`, `keys`, `values`...

`WeakMap` และ `WeakSet` ถูกใช้เป็นโครงสร้างข้อมูล "รอง" เพิ่มเติมจากที่เก็บออบเจ็กต์ "หลัก" พอออบเจ็กต์ถูกลบออกจากที่เก็บหลัก หากพบมันในฐานะ key ของ `WeakMap` หรืออยู่ใน `WeakSet` เพียงที่เดียว ก็จะถูกทำความสะอาดโดยอัตโนมัติ
