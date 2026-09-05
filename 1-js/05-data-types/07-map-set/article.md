
# Map และ Set

ก่อนหน้านี้เราได้รู้จักโครงสร้างข้อมูล (data structure) สองแบบแล้ว:

- ออบเจ็กต์ (object) ใช้เก็บข้อมูลโดยมีคีย์ (key) ไว้อ้างถึงค่าแต่ละค่า
- อาร์เรย์ (array) ใช้เก็บข้อมูลเรียงเป็นลำดับ

งานบางอย่างต้องการวิธีเก็บข้อมูลที่ต่างออกไป บทนี้เราจะมารู้จัก `Map` และ `Set` ซึ่งช่วยตอบโจทย์เหล่านั้น

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) เป็นคอลเล็กชัน (collection) หรือที่เก็บข้อมูลหลายรายการ โดยจับคู่คีย์กับค่า คล้ายกับ `Object` ข้อแตกต่างสำคัญคือคีย์ของ `Map` เป็นข้อมูลชนิดใดก็ได้

เมธอด (method) และพร็อพเพอร์ตี้ (property) ที่ใช้มีดังนี้:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) สร้าง `Map` ใหม่
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) เก็บค่า `value` ไว้ด้วยคีย์ `key`
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) คืนค่าที่เก็บไว้ด้วยคีย์ `key` หากไม่มีคีย์นั้นจะคืนค่า `undefined`
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) คืนค่า `true` ถ้ามีคีย์ `key` อยู่ใน `Map` และคืนค่า `false` ถ้าไม่มี
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) ลบคู่คีย์กับค่าที่ตรงกับคีย์ `key`
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) ลบข้อมูลทั้งหมดออกจาก `Map`
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) บอกจำนวนคู่คีย์กับค่าที่มีอยู่ใน `Map`

ตัวอย่าง:

```js run
let map = new Map();

map.set('1', 'str1');   // key เป็น string
map.set(1, 'num1');     // key เป็นตัวเลข
map.set(true, 'bool1'); // key เป็น boolean

// คีย์ของออบเจ็กต์ธรรมดาเป็นสตริงหรือ Symbol
// แต่ Map เก็บชนิดข้อมูลไว้ ดังนั้นสองตัวนี้ต่างกัน:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

ในตัวอย่างนี้ คีย์ที่เป็นตัวเลข (number) `1` กับสตริง (string) `'1'` เก็บค่าแยกกัน เพราะ `Map` ไม่แปลงคีย์ให้เป็นสตริง เราจึงใช้คีย์เป็นข้อมูลชนิดใดก็ได้

```smart header="`map[key]` ไม่ใช่วิธีที่ถูกต้องในการใช้ `Map`"
เราเขียน `map[key]` ได้ เช่น `map[key] = 2` แต่การเขียนแบบนี้คือการเพิ่มพร็อพเพอร์ตี้ให้ `map` เหมือนออบเจ็กต์ธรรมดา จึงยังมีข้อจำกัดแบบออบเจ็กต์ เช่น คีย์ต้องเป็นสตริงหรือ `Symbol`

ถ้าต้องการเก็บและอ่านข้อมูลใน `Map` ให้ใช้เมธอดของ `map` เช่น `set` และ `get`
```

**`Map` ใช้ออบเจ็กต์เป็นคีย์ได้ด้วย**

ตัวอย่าง:

```js run
let john = { name: "John" };

// เก็บจำนวนครั้งที่ผู้ใช้แต่ละคนเข้าเยี่ยมชม
let visitsCountMap = new Map();

// john เป็น key ของ map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

การใช้ออบเจ็กต์เป็นคีย์ช่วยให้ `Map` เก็บข้อมูลที่ผูกกับออบเจ็กต์แต่ละตัวได้โดยตรง อย่างจำนวนครั้งที่ `john` เข้าเยี่ยมชมในตัวอย่าง ส่วนออบเจ็กต์ธรรมดารองรับคีย์ที่เป็นสตริง แต่เก็บออบเจ็กต์อีกตัวเป็นคีย์โดยตรงแบบนี้ไม่ได้

ลองดูตัวอย่าง:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // ลองใช้ object ธรรมดา

visitsCountObj[ben] = 234; // ลองใช้ ben object เป็น key
visitsCountObj[john] = 123; // คีย์ตรงกับของ ben จึงทับค่า 234 เดิม

*!*
// ผลลัพธ์ที่ได้จริงๆ คือ:
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

ในตัวอย่างนี้ `visitsCountObj` เป็นออบเจ็กต์ธรรมดา เมื่อใช้ `john` และ `ben` เป็นคีย์ ทั้งคู่จึงถูกแปลงเป็นสตริง `"[object Object]"` เหมือนกัน ค่าที่ใส่ทีหลังจึงทับค่าเดิม แทนที่จะแยกเก็บจำนวนครั้งของผู้ใช้แต่ละคน

```smart header="`Map` เปรียบเทียบคีย์อย่างไร"
`Map` เปรียบเทียบคีย์ด้วยอัลกอริทึม (algorithm) [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) ซึ่งคล้ายกับการเปรียบเทียบแบบเท่ากันอย่างเคร่งครัด (strict equality) ด้วย `===` แต่ถือว่า `NaN` เท่ากับ `NaN` ด้วย เราจึงใช้ `NaN` เป็นคีย์ได้เช่นกัน

อัลกอริทึมนี้ไม่สามารถเปลี่ยนหรือปรับแต่งได้
```

````smart header="การเรียกเมธอดต่อกัน (chaining)"
ทุกครั้งที่เรียก `map.set` เมธอดจะคืน `Map` ตัวเดิมกลับมา เราจึงเรียก `.set` ต่อกันได้แบบนี้:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## การวนซ้ำ (iteration) บน Map

ถ้าต้องการวนซ้ำเพื่ออ่านข้อมูลใน `map` เราเลือกได้ว่าจะอ่านคีย์ ค่า หรือทั้งคู่ เมธอดต่อไปนี้คืนค่า iterable ซึ่งเป็นข้อมูลที่นำไปวนซ้ำด้วย `for..of` ได้:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) คืนค่า iterable สำหรับอ่านคีย์ทั้งหมด
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) คืนค่า iterable สำหรับอ่านค่าทั้งหมด
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) คืนค่า iterable สำหรับอ่านข้อมูลแต่ละรายการในรูปคู่ `[key, value]` การใช้ `for..of` กับ `map` โดยตรงก็จะได้คู่คีย์กับค่าแบบนี้

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

```smart header="วนซ้ำตามลำดับที่เพิ่มข้อมูล"
เมื่อวนซ้ำบน `Map` เราจะได้ข้อมูลตามลำดับที่เพิ่มเข้าไป ซึ่งต่างจากลำดับคีย์ของออบเจ็กต์ธรรมดา
```

`Map` ยังมีเมธอด `forEach` มาให้ เช่นเดียวกับ `Array` โดยจะเรียกฟังก์ชัน (function) ที่เราส่งให้กับข้อมูลแต่ละคู่:

```js
// เรียกฟังก์ชันสำหรับแต่ละคู่ (key, value)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 เป็นต้น
});
```

## Object.entries: สร้าง Map จาก Object

ตอนสร้าง `Map` เรากำหนดข้อมูลเริ่มต้นได้โดยส่งอาร์เรย์หรือ iterable อื่นที่เก็บคู่คีย์กับค่าเข้าไป:

```js run
// อาร์เรย์ของคู่ [key, value]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

ถ้ามีออบเจ็กต์ธรรมดาอยู่แล้วและต้องการนำข้อมูลมาสร้าง `Map` ให้ใช้ [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) เมธอดนี้คืนค่าอาร์เรย์ของคู่คีย์กับค่าในรูปแบบที่ `Map` รับได้พอดี

เราจึงสร้าง `Map` จากออบเจ็กต์ได้แบบนี้:

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

ในตัวอย่างนี้ `Object.entries` คืนค่า `[ ["name","John"], ["age", 30] ]` จากนั้น `new Map` จะนำคู่คีย์กับค่าเหล่านี้ไปเก็บเป็นข้อมูลเริ่มต้น


## Object.fromEntries: สร้าง Object จาก Map

เมื่อกี้เราใช้ `Object.entries` ดึงคู่คีย์กับค่าจากออบเจ็กต์เพื่อสร้าง `Map` ส่วน `Object.fromEntries` ทำงานย้อนกลับ โดยรับคู่ `[key, value]` แล้วนำมาสร้างเป็นออบเจ็กต์:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// ตอนนี้ prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

เราจึงใช้ `Object.fromEntries` แปลง `Map` เป็นออบเจ็กต์ธรรมดาได้ เช่น เมื่อเก็บข้อมูลไว้ใน `Map` แต่ต้องส่งให้โค้ดของผู้อื่นที่รับเฉพาะออบเจ็กต์ธรรมดา:

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

`map.entries()` คืนค่า iterable ของคู่คีย์กับค่า ซึ่งตรงกับรูปแบบที่ `Object.fromEntries` ต้องการ

ย่อบรรทัด `(*)` ให้สั้นลงได้อีก:
```js
let obj = Object.fromEntries(map); // ละ .entries() ออก
```

ผลลัพธ์ยังเหมือนเดิม เพราะอาร์กิวเมนต์ (argument) ที่ `Object.fromEntries` รับเป็น iterable ได้ ไม่จำเป็นต้องเป็นอาร์เรย์ การวนซ้ำบน `map` โดยตรงให้คู่คีย์กับค่าเหมือน `map.entries()` จึงได้ออบเจ็กต์ที่เก็บคีย์กับค่าเดียวกับ `Map` นี้

## Set

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) เป็นคอลเล็กชันที่เก็บค่าโดยไม่มีคีย์แยกต่างหาก และ **เก็บแต่ละค่าไว้เพียงครั้งเดียว**

เมธอดและพร็อพเพอร์ตี้หลักมีดังนี้:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) สร้าง `Set` ใหม่ ถ้าส่ง `iterable` มาด้วย เช่น อาร์เรย์ จะคัดลอกค่าจากข้อมูลนั้นเข้า `Set`
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) เพิ่มค่า `value` แล้วคืน `Set` ตัวเดิมกลับมา
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) ลบค่า `value` แล้วคืนค่า `true` ถ้ามีค่านั้นอยู่ตอนเรียกเมธอด หากไม่มีจะคืนค่า `false`
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) คืนค่า `true` ถ้ามีค่านั้นอยู่ใน `Set` และคืนค่า `false` ถ้าไม่มี
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) ลบค่าทั้งหมดออกจาก `Set`
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) บอกจำนวนค่าที่มีอยู่ใน `Set`

ถ้าเรียก `set.add(value)` ด้วยค่าที่มีอยู่แล้ว `Set` จะไม่เพิ่มค่านั้นซ้ำ จึงมีแต่ละค่าอยู่เพียงครั้งเดียว

สมมติว่าเราต้องการเก็บข้อมูลว่าใครเข้ามาเยี่ยมชมบ้าง ถ้าคนเดิมกลับมาอีกก็ให้เก็บข้อมูลคนนั้นเพียงครั้งเดียว เราใช้ `Set` ทำแบบนี้ได้:

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

อีกทางหนึ่งคือเก็บผู้ใช้ในอาร์เรย์ แล้วใช้ [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) ตรวจค่าซ้ำก่อนเพิ่มทุกครั้ง เมธอดนี้จะหยุดทันทีที่พบผู้ใช้ที่ต้องการ แต่ถ้าไม่พบจะตรวจจนครบอาร์เรย์ ส่วน `Set` มีวิธีตรวจว่ามีค่าอยู่แล้วหรือไม่ที่โดยเฉลี่ยเร็วกว่าการไล่ตรวจข้อมูลจำนวนมากในอาร์เรย์ จึงเหมาะกับการเก็บค่าที่ไม่ซ้ำกัน

## การวนซ้ำบน Set

เราวนซ้ำบน `Set` ได้ด้วย `for..of` หรือ `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// แบบเดียวกันกับ forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

สังเกตว่าฟังก์ชันคอลแบ็ก (callback) ที่ส่งให้ `forEach` ได้รับอาร์กิวเมนต์ 3 ตัว คือ `value`, *ค่าเดียวกันอีกครั้ง* ใน `valueAgain` และ `Set` ที่กำลังวนซ้ำ

ที่ส่งค่าเดิมมาสองครั้งก็เพื่อให้รูปแบบคอลแบ็กเข้ากันได้กับ `forEach` ของ `Map` ซึ่งส่งอาร์กิวเมนต์ 3 ตัวเช่นกัน รูปแบบที่เหมือนกันนี้ช่วยให้เปลี่ยนจาก `Map` มาใช้ `Set` หรือสลับกลับได้สะดวกในบางกรณี

`Set` ยังมีเมธอดสำหรับสร้าง iterator เพื่ออ่านข้อมูลทีละรายการ เช่นเดียวกับ `Map`:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) คืนค่า iterable สำหรับอ่านค่าทั้งหมด
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) ทำงานเหมือน `set.keys()` โดยมีชื่อเมธอดให้เข้ากันกับ `Map`
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) คืนค่า iterable สำหรับอ่านข้อมูลแต่ละรายการในรูป `[value, value]` เพื่อให้เข้ากันกับ `Map`

## สรุป

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) เก็บข้อมูลเป็นคู่คีย์กับค่า

เมธอดและพร็อพเพอร์ตี้:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) สร้าง `Map` ใหม่ โดยส่ง `iterable` ของคู่ `[key,value]` เช่น อาร์เรย์ เพื่อกำหนดข้อมูลเริ่มต้นได้ แต่ไม่จำเป็นต้องส่ง
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) เก็บค่า `value` ไว้ด้วยคีย์ `key` แล้วคืน `Map` ตัวเดิมกลับมา
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) คืนค่าที่เก็บไว้ด้วยคีย์ `key` หากไม่มีคีย์นั้นจะคืนค่า `undefined`
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) คืนค่า `true` ถ้ามีคีย์ `key` และคืนค่า `false` ถ้าไม่มี
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) ลบคู่คีย์กับค่าที่ตรงกับคีย์ `key` แล้วคืนค่า `true` ถ้ามีคีย์นั้นอยู่ตอนเรียกเมธอด หากไม่มีจะคืนค่า `false`
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) ลบข้อมูลทั้งหมดออกจาก `Map`
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) บอกจำนวนคู่คีย์กับค่าที่มีอยู่ใน `Map`

ข้อแตกต่างจาก `Object` ธรรมดา:

- คีย์เป็นข้อมูลชนิดใดก็ได้ รวมถึงออบเจ็กต์
- มีเมธอดสำหรับจัดการข้อมูลเพิ่มเติม และมีพร็อพเพอร์ตี้ `size`

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) เก็บค่าที่ไม่ซ้ำกัน

เมธอดและพร็อพเพอร์ตี้:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) สร้าง `Set` ใหม่ โดยส่ง `iterable` ของค่า เช่น อาร์เรย์ เพื่อกำหนดข้อมูลเริ่มต้นได้ แต่ไม่จำเป็นต้องส่ง
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) เพิ่มค่า `value` ถ้ายังไม่มีค่านั้น แล้วคืน `Set` ตัวเดิมกลับมา
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) ลบค่า `value` แล้วคืนค่า `true` ถ้ามีค่านั้นอยู่ตอนเรียกเมธอด หากไม่มีจะคืนค่า `false`
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) คืนค่า `true` ถ้ามีค่านั้นอยู่ใน `Set` และคืนค่า `false` ถ้าไม่มี
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) ลบค่าทั้งหมดออกจาก `Set`
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) บอกจำนวนค่าที่มีอยู่ใน `Set`

เมื่อวนซ้ำบน `Map` และ `Set` เราจะได้ข้อมูลตามลำดับที่เพิ่มเข้าไป คอลเล็กชันทั้งสองจึงมีลำดับที่แน่นอน แต่ไม่มีเมธอดสำหรับจัดเรียงข้อมูลใหม่หรือดึงค่าตามหมายเลขลำดับโดยตรง
