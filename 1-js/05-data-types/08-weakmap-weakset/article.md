
# WeakMap และ WeakSet

จากที่เรารู้กันในบท <info:garbage-collection> JavaScript engine จะเก็บค่าไว้ในหน่วยความจำตราบเท่าที่ค่านั้น "ยังเข้าถึงได้" และอาจถูกนำไปใช้งาน

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

โดยทั่วไปแล้ว พร็อพเพอร์ตี้ของออบเจ็กต์ หรือสมาชิกของอาร์เรย์ หรือโครงสร้างข้อมูลอื่นๆ จะถือว่า "เข้าถึงได้" และจะถูกเก็บไว้ในหน่วยความจำตราบเท่าที่โครงสร้างข้อมูลนั้นยังคงอยู่

ตัวอย่างเช่น ถ้าเราใส่ออบเจ็กต์ลงในอาร์เรย์ ตราบใดที่อาร์เรย์ยังคงอยู่ ออบเจ็กต์นั้นก็จะยังคงอยู่ด้วย แม้จะไม่มี reference อื่นชี้ไปที่มันแล้วก็ตาม

แบบนี้:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // เขียนทับ reference

*!*
// ออบเจ็กต์ที่ john เคยชี้ไป ยังคงอยู่ในอาร์เรย์
// ดังนั้นมันจะไม่ถูก garbage-collected
// เราเข้าถึงมันได้ผ่าน array[0]
*/!*
```

ในทำนองเดียวกัน ถ้าเราใช้ออบเจ็กต์เป็น key ใน `Map` ปกติ ตราบใดที่ `Map` ยังคงอยู่ ออบเจ็กต์นั้นก็จะยังคงอยู่ด้วย มันจะครอบครองหน่วยความจำและไม่อาจถูก garbage collect

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

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) ทำงานต่างออกไปในแง่นี้โดยสิ้นเชิง มันไม่ขัดขวางการ garbage-collect ของออบเจ็กต์ที่เป็น key

มาดูกันว่าหมายความว่าอะไรผ่านตัวอย่าง

## WeakMap

ความแตกต่างประการแรกระหว่าง [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) และ [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) คือ key ต้องเป็นออบเจ็กต์เท่านั้น ไม่ใช่ค่า primitive:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // ใช้งานได้ปกติ (key เป็นออบเจ็กต์)

*!*
// ไม่สามารถใช้สตริงเป็น key ได้
weakMap.set("test", "Whoops"); // เกิดข้อผิดพลาด เพราะ "test" ไม่ใช่ออบเจ็กต์
*/!*
```

ทีนี้ ถ้าเราใช้ออบเจ็กต์เป็น key และไม่มี reference อื่นชี้ไปที่ออบเจ็กต์นั้นอีกแล้ว ออบเจ็กต์นั้นจะถูกลบออกจากหน่วยความจำ (และจาก map) โดยอัตโนมัติ

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // เขียนทับ reference

// john ถูกลบออกจากหน่วยความจำแล้ว!
```

เปรียบเทียบกับตัวอย่าง `Map` ปกติข้างบน ถ้า `john` อยู่ใน `WeakMap` ในฐานะ key เพียงอย่างเดียว มันจะถูกลบออกจาก map (และหน่วยความจำ) โดยอัตโนมัติ

`WeakMap` ไม่รองรับการวนซ้ำ และเมธอด `keys()`, `values()`, `entries()` ดังนั้นจึงไม่มีทางดึง key หรือ value ทั้งหมดออกมาได้

`WeakMap` มีเพียงเมธอดเหล่านี้:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

ทำไมถึงมีข้อจำกัดเช่นนี้? เหตุผลเป็นเรื่องทางเทคนิค ถ้าออบเจ็กต์สูญเสีย reference ทั้งหมด (เหมือน `john` ในโค้ดข้างบน) มันจะถูก garbage collect โดยอัตโนมัติ แต่ในทางเทคนิคแล้ว ไม่มีการระบุแน่นอนว่า *การทำความสะอาดจะเกิดขึ้นเมื่อใด*

JavaScript engine เป็นตัวตัดสินใจ อาจเลือกทำทันทีหรือรอก่อนแล้วค่อยทำในภายหลังเมื่อมีการลบมากขึ้น ดังนั้นในทางเทคนิค จำนวนสมาชิกปัจจุบันของ `WeakMap` จึงไม่แน่นอน engine อาจทำความสะอาดไปแล้วหรือยังไม่ได้ทำ หรือทำไปบางส่วน ด้วยเหตุนี้ เมธอดที่เข้าถึง key/value ทั้งหมดจึงไม่ได้รับการรองรับ

แล้วเราต้องการโครงสร้างข้อมูลแบบนี้ในสถานการณ์ไหน?

## กรณีใช้งาน: ข้อมูลเสริม

การใช้งานหลักของ `WeakMap` คือการเก็บ *ข้อมูลเสริม*

ถ้าเรากำลังทำงานกับออบเจ็กต์ที่ "เป็นของ" โค้ดอื่น หรืออาจเป็น library ของบุคคลที่สาม และต้องการเก็บข้อมูลบางอย่างที่เชื่อมโยงกับมัน ซึ่งควรมีอยู่แค่ตราบเท่าที่ออบเจ็กต์นั้นยังมีชีวิตอยู่ — `WeakMap` คือสิ่งที่ต้องการพอดี

เราใส่ข้อมูลลงใน `WeakMap` โดยใช้ออบเจ็กต์เป็น key และเมื่อออบเจ็กต์ถูก garbage collect ข้อมูลนั้นก็จะหายไปโดยอัตโนมัติด้วย

```js
weakMap.set(john, "เอกสารลับ");
// ถ้า john ถูกลบ เอกสารลับก็จะถูกทำลายโดยอัตโนมัติ
```

มาดูตัวอย่างกัน

สมมติเรามีโค้ดที่เก็บจำนวนครั้งที่ผู้ใช้เข้าเยี่ยมชม ข้อมูลถูกเก็บใน map โดยใช้ออบเจ็กต์ user เป็น key และจำนวนครั้งเป็น value เมื่อผู้ใช้จากไป (ออบเจ็กต์ถูก garbage collect) เราก็ไม่อยากเก็บจำนวนครั้งของเขาอีกต่อไป

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

ตอนนี้ ออบเจ็กต์ `john` ควรจะถูก garbage collect แต่มันยังคงอยู่ในหน่วยความจำ เพราะเป็น key ใน `visitsCountMap`

เราต้องทำความสะอาด `visitsCountMap` ทุกครั้งที่ลบผู้ใช้ออก ไม่เช่นนั้นมันจะกินหน่วยความจำไปเรื่อยๆ การทำความสะอาดแบบนี้อาจกลายเป็นงานน่าเบื่อในสถาปัตยกรรมที่ซับซ้อน

เราหลีกเลี่ยงปัญหานี้ได้ด้วยการเปลี่ยนไปใช้ `WeakMap` แทน:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => จำนวนครั้งที่เข้าชม

// เพิ่มจำนวนครั้งที่เข้าชม
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

ทีนี้เราไม่ต้องทำความสะอาด `visitsCountMap` อีกต่อไป เมื่อออบเจ็กต์ `john` ไม่สามารถเข้าถึงได้แล้ว ยกเว้นในฐานะ key ของ `WeakMap` มันจะถูกลบออกจากหน่วยความจำพร้อมกับข้อมูลที่เชื่อมโยงกับ key นั้นใน `WeakMap` โดยอัตโนมัติ

## กรณีใช้งาน: caching

อีกตัวอย่างที่พบบ่อยคือการทำ caching เราสามารถเก็บ ("cache") ผลลัพธ์จากฟังก์ชันไว้ เพื่อที่การเรียกครั้งต่อๆ ไปด้วยออบเจ็กต์เดิมจะได้นำผลลัพธ์เดิมมาใช้ได้เลย

เราทำแบบนี้ได้ด้วย `Map` (แต่ยังไม่ดีที่สุด):

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

เมื่อเรียก `process(obj)` ด้วยออบเจ็กต์เดิมหลายครั้ง ครั้งแรกเท่านั้นที่จะคำนวณผลลัพธ์ ครั้งต่อๆ ไปจะดึงมาจาก `cache` แต่ข้อเสียคือเราต้องทำความสะอาด `cache` เมื่อไม่ต้องการออบเจ็กต์แล้ว

ถ้าเราแทน `Map` ด้วย `WeakMap` ปัญหานี้จะหมดไป ผลลัพธ์ที่ cache ไว้จะถูกลบออกจากหน่วยความจำโดยอัตโนมัติหลังจากออบเจ็กต์ถูก garbage collect

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

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) ทำงานในลักษณะเดียวกัน:

- คล้ายกับ `Set` แต่เราเพิ่มได้เฉพาะออบเจ็กต์ใน `WeakSet` เท่านั้น (ไม่ใช่ค่า primitive)
- ออบเจ็กต์จะอยู่ใน set ตราบเท่าที่ยังมีที่อื่นเข้าถึงมันได้
- เหมือน `Set` รองรับ [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) และ [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete) แต่ไม่มี `size`, `keys()` และไม่รองรับการวนซ้ำ

ด้วยความเป็น "weak" มันจึงเหมาะสำหรับเก็บข้อมูลเสริมเช่นกัน แต่ไม่ใช่ข้อมูลทั่วไป แต่เป็นข้อเท็จจริงแบบ "ใช่/ไม่ใช่" การที่ออบเจ็กต์อยู่ใน `WeakSet` อาจหมายความว่าบางอย่างเกี่ยวกับออบเจ็กต์นั้น

ตัวอย่างเช่น เราสามารถเพิ่ม user ลงใน `WeakSet` เพื่อติดตามว่าใครเคยเข้าเยี่ยมชมเว็บของเรา:

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

ข้อจำกัดที่เด่นชัดที่สุดของ `WeakMap` และ `WeakSet` คือการไม่รองรับการวนซ้ำ และไม่สามารถดึงเนื้อหาทั้งหมดในขณะนั้นออกมาได้ ดูเหมือนจะไม่สะดวก แต่ก็ไม่ได้ขัดขวาง `WeakMap/WeakSet` จากการทำหน้าที่หลัก นั่นคือเป็นที่เก็บข้อมูล "เสริม" สำหรับออบเจ็กต์ที่ถูกเก็บและจัดการในที่อื่น

## สรุป

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) คือคอลเล็กชันคล้าย `Map` ที่รองรับเฉพาะออบเจ็กต์เป็น key และจะลบออบเจ็กต์พร้อมกับค่าที่เชื่อมโยงโดยอัตโนมัติเมื่อออบเจ็กต์นั้นไม่สามารถเข้าถึงได้จากที่อื่นอีกแล้ว

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) คือคอลเล็กชันคล้าย `Set` ที่เก็บได้เฉพาะออบเจ็กต์ และจะลบออบเจ็กต์โดยอัตโนมัติเมื่อไม่สามารถเข้าถึงได้จากที่อื่นอีกแล้ว

ข้อดีหลักของทั้งสองคือมัน reference ออบเจ็กต์แบบ "อ่อนแอ" ทำให้ garbage collector ลบออบเจ็กต์เหล่านั้นได้อย่างง่ายดาย

แลกมาด้วยการไม่รองรับ `clear`, `size`, `keys`, `values`...

`WeakMap` และ `WeakSet` ถูกใช้เป็นโครงสร้างข้อมูล "รอง" เพิ่มเติมจากที่เก็บออบเจ็กต์ "หลัก" เมื่อออบเจ็กต์ถูกลบออกจากที่เก็บหลัก หากพบมันในฐานะ key ของ `WeakMap` หรืออยู่ใน `WeakSet` เท่านั้น มันก็จะถูกทำความสะอาดโดยอัตโนมัติ
