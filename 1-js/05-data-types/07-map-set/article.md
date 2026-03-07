
# Map และ Set

ก่อนหน้านี้เราได้รู้จักโครงสร้างข้อมูลสองแบบแล้ว:

- ออบเจ็กต์ — เก็บข้อมูลแบบมี key
- อาร์เรย์ — เก็บข้อมูลแบบมีลำดับ

แต่สำหรับงานจริงๆ บางครั้งสองแบบนี้ก็ยังไม่พอ `Map` และ `Set` จึงเกิดขึ้นมาเพื่อเติมเต็มจุดนั้น

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) คือคอลเล็กชันของข้อมูลแบบมี key คล้ายกับ `Object` แต่ข้อแตกต่างสำคัญคือ `Map` ให้ใช้ key เป็น **ชนิดข้อมูลใดก็ได้**

เมธอดและพร็อพเพอร์ตี้ที่มี:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- สร้าง map ใหม่
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- บันทึกค่า value ด้วย key ที่กำหนด
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- คืนค่า value ตาม key ที่กำหนด หากไม่มี key นั้นจะคืนค่า `undefined`
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- คืนค่า `true` ถ้า key มีอยู่ใน map, `false` ถ้าไม่มี
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- ลบ element (คู่ key/value) ตาม key ที่กำหนด
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- ลบทุกอย่างออกจาก map
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- คืนค่าจำนวน element ปัจจุบัน

ตัวอย่าง:

```js run
let map = new Map();

map.set('1', 'str1');   // key เป็น string
map.set(1, 'num1');     // key เป็นตัวเลข
map.set(true, 'bool1'); // key เป็น boolean

// จำ Object ธรรมดาได้ไหม? มันจะแปลง key ให้เป็น string เสมอ
// แต่ Map เก็บชนิดข้อมูลไว้ ดังนั้นสองตัวนี้ต่างกัน:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

ต่างจาก Object ตรงนี้แหละ — Map ไม่แปลง key เป็น string key จะเป็นชนิดใดก็ได้ทั้งนั้น

```smart header="`map[key]` ไม่ใช่วิธีที่ถูกต้องในการใช้ `Map`"
แม้ว่า `map[key]` จะใช้ได้ เช่น `map[key] = 2` แต่นั่นคือการใช้ `map` เสมือน plain JavaScript object ทั่วไป ซึ่งมีข้อจำกัดทั้งหมดของ Object (key ได้แค่ string หรือ symbol เป็นต้น)

ดังนั้น ควรใช้เมธอดของ `map` แทน ได้แก่ `set`, `get` และอื่นๆ
```

**Map ยังใช้ออบเจ็กต์เป็น key ได้ด้วย**

ตัวอย่าง:

```js run
let john = { name: "John" };

// เก็บจำนวนครั้งที่ผู้ใช้แต่ละคนเข้าเยี่ยมชม
let visitsCountMap = new Map();

// john เป็น key ของ map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

นี่คือหนึ่งในฟีเจอร์ที่โดดเด่นที่สุดของ `Map` — ใช้ออบเจ็กต์เป็น key ได้เลย ซึ่ง `Object` ทำไม่ได้ เพราะ Object ธรรมดาใช้ string เป็น key ได้ แต่ไม่สามารถใช้ Object อื่นเป็น key ได้

ลองดูตัวอย่าง:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // ลองใช้ object ธรรมดา

visitsCountObj[ben] = 234; // ลองใช้ ben object เป็น key
visitsCountObj[john] = 123; // ลองใช้ john object เป็น key ซึ่งจะทับ ben object

*!*
// ผลลัพธ์ที่ได้จริงๆ คือ:
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

เนื่องจาก `visitsCountObj` เป็น object ธรรมดา ไม่ว่าจะใส่ `john` หรือ `ben` เป็น key มันจะแปลงให้เป็น string เดียวกันคือ `"[object Object]"` ซึ่งไม่ใช่สิ่งที่ต้องการแน่นอน

```smart header="`Map` เปรียบเทียบ key อย่างไร"
`Map` ใช้อัลกอริทึม [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) ในการเปรียบเทียบ key ซึ่งคล้ายกับ strict equality `===` แต่ต่างตรงที่ `NaN` ถือว่าเท่ากับ `NaN` จึงใช้ `NaN` เป็น key ได้เช่นกัน

อัลกอริทึมนี้ไม่สามารถเปลี่ยนหรือปรับแต่งได้
```

````smart header="การเชื่อมต่อเมธอด (Chaining)"
ทุกครั้งที่เรียก `map.set` จะได้รับ map กลับคืนมา จึงเชื่อมการเรียกต่อกันได้แบบนี้:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## การวนซ้ำบน Map

วนซ้ำบน `map` ได้ด้วยเมธอดสามแบบ:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- คืนค่า iterable สำหรับ key ทั้งหมด
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- คืนค่า iterable สำหรับ value ทั้งหมด
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- คืนค่า iterable สำหรับ entry ในรูป `[key, value]` ซึ่งเป็นค่าที่ `for..of` ใช้โดยค่าเริ่มต้น

ตัวอย่าง:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// วนซ้ำบน key (ผัก)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// วนซ้ำบน value (ปริมาณ)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// วนซ้ำบน entry แบบ [key, value]
for (let entry of recipeMap) { // เหมือนกับ recipeMap.entries()
  alert(entry); // cucumber,500 (และอื่นๆ)
}
```

```smart header="ลำดับการแทรกถูกนำมาใช้"
การวนซ้ำจะเป็นลำดับเดียวกับที่แทรกค่าเข้าไป `Map` รักษาลำดับนี้ไว้ ต่างจาก Object ธรรมดา
```

นอกจากนี้ `Map` ยังมีเมธอด `forEach` แบบ built-in คล้ายกับ `Array`:

```js
// เรียกฟังก์ชันสำหรับแต่ละคู่ (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 เป็นต้น
});
```

## Object.entries: สร้าง Map จาก Object

ตอนสร้าง `Map` เราส่งอาร์เรย์ (หรือ iterable อื่นๆ) ที่มีคู่ key/value เพื่อกำหนดค่าเริ่มต้นได้เลย:

```js run
// อาร์เรย์ของคู่ [key, value]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

ถ้ามี plain object อยู่แล้วและต้องการแปลงเป็น `Map` ใช้เมธอด built-in [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) ได้เลย มันคืนค่าอาร์เรย์ของคู่ key/value ในรูปแบบที่ต้องการพอดี

สร้าง map จาก object ได้แบบนี้:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

`Object.entries` คืนค่าอาร์เรย์ `[ ["name","John"], ["age", 30] ]` ซึ่งเป็นรูปแบบที่ `Map` ต้องการพอดี


## Object.fromEntries: สร้าง Object จาก Map

ถ้า `Object.entries` แปลง object เป็น Map ได้ `Object.fromEntries` ก็ทำสิ่งตรงกันข้าม — รับอาร์เรย์ของคู่ `[key, value]` แล้วสร้าง object กลับออกมา:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// ตอนนี้ prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

ใช้ `Object.fromEntries` แปลง `Map` กลับเป็น plain object ได้ เช่น เก็บข้อมูลไว้ใน `Map` แต่ต้องส่งให้โค้ดของ third-party ที่รับแค่ plain object — ทำแบบนี้:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // แปลงเป็น plain object (*)
*/!*

// เสร็จแล้ว!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

`map.entries()` คืนค่า iterable ของคู่ key/value ในรูปแบบที่ `Object.fromEntries` ต้องการพอดี

ย่อบรรทัด `(*)` ให้สั้นลงได้อีก:
```js
let obj = Object.fromEntries(map); // ละ .entries() ออก
```

ผลลัพธ์เหมือนกัน เพราะ `Object.fromEntries` รับ iterable object เป็น argument ไม่จำเป็นต้องเป็นอาร์เรย์เสมอไป และการวนซ้ำมาตรฐานของ `map` คืนค่าคู่ key/value เหมือนกับ `map.entries()` ทุกประการ

## Set

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) คือคอลเล็กชันชนิดพิเศษ — "ชุดของค่า" (ไม่มี key) ที่ **แต่ละค่าปรากฏได้เพียงครั้งเดียว**

เมธอดหลักที่มี:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- สร้าง set ใหม่ ถ้าส่ง `iterable` มาด้วย (ปกติเป็นอาร์เรย์) จะคัดลอกค่าจากมันเข้า set
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- เพิ่มค่า และคืนค่า set กลับมา
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- ลบค่า คืนค่า `true` ถ้า value มีอยู่ตอนที่เรียก มิฉะนั้นคืน `false`
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- คืนค่า `true` ถ้าค่ามีอยู่ใน set มิฉะนั้นคืน `false`
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- ลบทุกอย่างออกจาก set
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- จำนวน element ทั้งหมด

จุดเด่นคือการเรียก `set.add(value)` ซ้ำด้วยค่าเดิมจะไม่มีผลใดๆ นั่นเองที่ทำให้แต่ละค่าปรากฏใน `Set` ได้เพียงครั้งเดียว

สมมติมีผู้เยี่ยมชมเข้ามา และต้องการจำทุกคน — แต่ไม่อยากให้คนเดิมซ้ำกัน ผู้เยี่ยมชมคนหนึ่งควรนับแค่ครั้งเดียว `Set` เหมาะกับงานนี้พอดี:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// ผู้เยี่ยมชม บางคนมาหลายครั้ง
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set เก็บเฉพาะค่าที่ไม่ซ้ำกัน
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (แล้วก็ Pete และ Mary)
}
```

อีกทางหนึ่งคือใช้อาร์เรย์แล้วตรวจสอบซ้ำทุกครั้งที่เพิ่มด้วย [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) แต่ประสิทธิภาพจะแย่กว่ามาก เพราะ `arr.find` ต้องวนอ่านอาร์เรย์ทั้งหมดทุกครั้ง ส่วน `Set` ถูกออกแบบมาให้ตรวจสอบความเป็นเอกลักษณ์ได้รวดเร็วกว่ามาก

## การวนซ้ำบน Set

วนซ้ำบน set ได้ด้วย `for..of` หรือ `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// แบบเดียวกันกับ forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

สังเกตสิ่งที่น่าแปลกใจ — callback ที่ส่งให้ `forEach` มี 3 argument คือ `value`, *ค่าเดิมอีกครั้ง* `valueAgain`, และ object เป้าหมาย ค่าเดิมปรากฏถึงสองครั้ง ดูแปลกๆ ใช่ไหม?

เหตุผลคือเพื่อความเข้ากันได้กับ `Map` ซึ่ง callback ของ `forEach` มีสาม argument เหมือนกัน ข้อดีคือช่วยให้สลับระหว่าง `Map` กับ `Set` ได้ง่ายในบางกรณี

เมธอด iterator ที่ `Map` มีก็รองรับใน `Set` ด้วย:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- คืนค่า iterable object สำหรับ value ทั้งหมด
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- เหมือนกับ `set.keys()` ไว้รองรับความเข้ากันได้กับ `Map`
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- คืนค่า iterable object สำหรับ entry ในรูป `[value, value]` ไว้รองรับความเข้ากันได้กับ `Map`

## สรุป

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- คือคอลเล็กชันของค่าแบบมี key

เมธอดและพร็อพเพอร์ตี้:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- สร้าง map ใหม่ โดยมี `iterable` (เช่น อาร์เรย์) ของคู่ `[key,value]` สำหรับกำหนดค่าเริ่มต้นได้ (ไม่บังคับ)
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- บันทึกค่า value ด้วย key และคืนค่า map กลับมา
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- คืนค่า value ตาม key, `undefined` ถ้าไม่มี key นั้น
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- คืนค่า `true` ถ้า key มีอยู่, `false` ถ้าไม่มี
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- ลบ element ตาม key คืนค่า `true` ถ้า key มีอยู่ตอนที่เรียก มิฉะนั้นคืน `false`
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- ลบทุกอย่างออกจาก map
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- คืนค่าจำนวน element ปัจจุบัน

ข้อแตกต่างจาก `Object` ธรรมดา:

- key เป็นชนิดใดก็ได้ รวมถึงออบเจ็กต์
- มีเมธอดอำนวยความสะดวกเพิ่มเติม และพร็อพเพอร์ตี้ `size`

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- คือคอลเล็กชันของค่าที่ไม่ซ้ำกัน

เมธอดและพร็อพเพอร์ตี้:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- สร้าง set ใหม่ โดยมี `iterable` (เช่น อาร์เรย์) ของค่าสำหรับกำหนดค่าเริ่มต้นได้ (ไม่บังคับ)
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- เพิ่มค่า (ไม่ทำอะไรถ้า value มีอยู่แล้ว) คืนค่า set กลับมา
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- ลบค่า คืนค่า `true` ถ้า value มีอยู่ตอนที่เรียก มิฉะนั้นคืน `false`
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- คืนค่า `true` ถ้าค่ามีอยู่ใน set มิฉะนั้นคืน `false`
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- ลบทุกอย่างออกจาก set
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- จำนวน element ทั้งหมด

การวนซ้ำบน `Map` และ `Set` จะเป็นลำดับเดียวกับที่แทรกค่าเข้าไปเสมอ จึงพูดไม่ได้ว่าคอลเล็กชันเหล่านี้ไม่มีลำดับ — แต่ก็ไม่สามารถจัดเรียงใหม่หรือดึง element โดยตรงจากหมายเลขลำดับได้
