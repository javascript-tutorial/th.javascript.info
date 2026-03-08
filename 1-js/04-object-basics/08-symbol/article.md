# ชนิดข้อมูล Symbol

ตามสเปคแล้ว ชนิดข้อมูลพื้นฐานที่ใช้เป็น key ของพร็อพเพอร์ตี้ในออบเจ็กต์ได้มีอยู่แค่สองประเภท คือ:

- string
- symbol

ถ้าใช้ชนิดข้อมูลอื่น เช่น number เป็น key จะถูกแปลงเป็น string โดยอัตโนมัติ ดังนั้น `obj[1]` จึงเท่ากับ `obj["1"]` และ `obj[true]` ก็เท่ากับ `obj["true"]`

ที่ผ่านมา เราใช้แต่ string เป็น key มาตลอด

ทีนี้ลองมาทำความรู้จักกับ symbol กันดูบ้าง ว่าใช้ทำอะไรได้บ้าง

## Symbol

"Symbol" เป็นค่าที่ใช้แทนตัวระบุ (identifier) ที่ไม่ซ้ำกัน

สร้างค่า symbol ได้ด้วย `Symbol()`:

```js
let id = Symbol();
```

ตอนสร้าง symbol เราจะใส่คำอธิบาย (description) กำกับไว้ด้วยก็ได้ ซึ่งจะมีประโยชน์ตอนดีบั๊ก:

```js
// id คือ symbol ที่มีคำอธิบายว่า "id"
let id = Symbol("id");
```

Symbol รับประกันว่าค่าจะไม่ซ้ำกันเสมอ แม้จะสร้างหลายตัวด้วยคำอธิบายเดียวกัน ค่าก็ยังต่างกันอยู่ดี เพราะคำอธิบายเป็นแค่ป้ายชื่อ (label) ไม่ได้มีผลต่อค่าจริงของ symbol

เช่น symbol สองตัวด้านล่างนี้ แม้คำอธิบายเหมือนกัน แต่ค่าไม่เท่ากัน:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

ถ้าคุ้นเคยกับ symbol ในภาษา Ruby หรือภาษาอื่นที่มีแนวคิดคล้ายกัน อย่าสับสนนะ เพราะ symbol ใน JavaScript นั้นต่างออกไป

สรุปก็คือ symbol เป็นค่าพื้นฐานที่ไม่ซ้ำใคร (unique) โดยอาจมี description กำกับไว้ก็ได้ มาดูกันว่าจะนำไปใช้ตรงไหนได้บ้าง

````warn header="Symbol ไม่แปลงเป็น string อัตโนมัติ"
ค่าส่วนใหญ่ใน JavaScript แปลงเป็น string ได้อัตโนมัติ เช่น `alert` ค่าอะไรก็ได้แล้วจะแสดงผลออกมา

แต่ symbol พิเศษกว่านั้น — จะไม่ยอมแปลงเป็น string อัตโนมัติ ถ้าลอง alert symbol ตรงๆ แบบนี้:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: ไม่สามารถแปลง Symbol เป็น string ได้
*/!*
```

จะเกิด error ขึ้น เพราะภาษาต้องการป้องกันไม่ให้ string กับ symbol แปลงหากันโดยไม่ตั้งใจ — เนื่องจากเป็นคนละประเภทกันโดยสิ้นเชิง

ถ้าต้องการแสดง symbol จริงๆ ต้องเรียกเมธอด `.toString()` ชัดเจนแบบนี้:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id) ตอนนี้โอเคแล้ว
*/!*
```

หรือถ้าอยากได้แค่ description ก็ใช้พร็อพเพอร์ตี้ `symbol.description` ได้:

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```
````

## พร็อพเพอร์ตี้ที่ "ซ่อนอยู่"

Symbol ช่วยให้เราสร้างพร็อพเพอร์ตี้ที่ "ซ่อนอยู่" ในออบเจ็กต์ได้ โดยโค้ดส่วนอื่นจะไม่มีทางเข้าถึงหรือเขียนทับโดยบังเอิญ

สมมติว่าเรากำลังทำงานกับออบเจ็กต์ `user` ที่มาจากโค้ดของคนอื่น แล้วเราอยากเพิ่ม identifier ลงไป ก็ใช้ symbol เป็น key แทน string ปกติ:

```js run
let user = { // เป็นของโค้ดจากที่อื่น
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // เข้าถึงข้อมูลได้โดยใช้ symbol เป็น key
```

แล้วทำไมถึงใช้ `Symbol("id")` แทน string `"id"` ธรรมดาล่ะ?

เพราะออบเจ็กต์ `user` เป็นของโค้ดคนอื่น การเพิ่ม field ลงไปตรงๆ อาจไม่ปลอดภัย เพราะอาจไปขัดแย้งกับลอจิกที่เขาเขียนไว้ แต่ symbol นั้นโค้ดอื่นจะเข้าถึงโดยบังเอิญไม่ได้ เพราะไม่มี symbol ตัวนี้อยู่ในมือ ดังนั้นจึงเพิ่มลงในออบเจ็กต์ `user` ได้อย่างปลอดภัย

ลองนึกภาพว่า ถ้ามีอีกสคริปต์หนึ่งอยากเพิ่ม identifier ของตัวเองลงใน `user` ด้วย สคริปต์นั้นก็แค่สร้าง `Symbol("id")` ขึ้นมาเอง:

```js
// ...
let id = Symbol("id");

user[id] = "ไอดีของสคริปต์นั้น";
```

identifier ของเรากับของสคริปต์นั้นจะไม่ชนกันเลย เพราะ symbol แต่ละตัวไม่ซ้ำกัน แม้จะใช้คำอธิบายเดียวกันก็ตาม

...แต่ถ้าใช้ string `"id"` ตรงๆ แทน symbol ล่ะก็ *จะ*เกิดการชนกันแน่นอน:

```js
let user = { name: "John" };

// สคริปต์ของเราใช้ property "id" 
user.id = "ไอดีของเรา";

// ...สคริปต์อื่นก็อยากใช้ "id" เหมือนกัน

user.id = "ไอดีของอีกสคริปต์"
// บูม! โดนสคริปต์อื่นเขียนทับแล้ว!
```

### ใช้ Symbol ใน Object Literal

ถ้าต้องการใช้ symbol ใน object literal `{...}` ต้องครอบด้วยวงเล็บก้ามปู (square bracket) แบบนี้:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // ไม่ใช่ "id": 123
*/!*
};
```

เพราะเราต้องการใช้ค่าที่เก็บอยู่ในตัวแปร `id` เป็น key ไม่ใช่ string "id"

### for..in จะข้าม Symbol

พร็อพเพอร์ตี้ที่เป็น symbol จะไม่ถูกวนลูปใน `for..in`

ลองดูตัวอย่าง:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (ไม่มี symbol)
*/!*

// ถ้าเข้าถึงโดยตรง symbol ก็ยังใช้งานได้
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) ก็ข้าม symbol เช่นกัน นี่เป็นส่วนหนึ่งของหลักการ "ซ่อน symbol property" — ถ้าสคริปต์อื่นหรือไลบรารีมาวนลูปออบเจ็กต์ของเรา จะไม่เจอพร็อพเพอร์ตี้ที่เป็น symbol โดยบังเอิญ

กลับกัน [Object.assign](mdn:js/Object/assign) จะคัดลอกทั้ง string และ symbol property:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

ไม่มีอะไรขัดแย้งกันตรงนี้ เพราะถูกออกแบบมาให้เป็นแบบนี้ แนวคิดคือ เวลา clone หรือ merge ออบเจ็กต์ เรามักจะอยากคัดลอก*ทุก* พร็อพเพอร์ตี้ (ทั้ง string และ symbol) นั่นเอง

## Global Symbol

อย่างที่เห็น โดยปกติ symbol ทุกตัวจะไม่ซ้ำกันเลย แม้คำอธิบายจะเหมือนกันก็ตาม

แต่บางครั้งเราอยากให้ symbol ที่มีชื่อเดียวกันเป็นตัวเดียวกัน เช่น อยากให้ส่วนต่างๆ ของแอปพลิเคชันเข้าถึง symbol `"id"` ตัวเดียวกันเพื่ออ้างอิงพร็อพเพอร์ตี้เดียวกัน

สำหรับกรณีนี้ มี *global symbol registry* ให้ใช้ เราสร้าง symbol เก็บไว้ใน registry แล้วเรียกใช้ซ้ำทีหลังได้ โดย registry รับประกันว่าเรียกด้วยชื่อเดิมกี่ครั้งก็ได้ symbol ตัวเดิมเสมอ

ใช้ `Symbol.for(key)` เพื่ออ่าน (หรือสร้างใหม่ถ้ายังไม่มี) symbol จาก registry

เมธอดนี้จะค้นหาใน global registry ว่ามี symbol ที่ตรงกับ `key` หรือไม่ — ถ้ามีก็คืน symbol นั้น ถ้าไม่มีก็สร้างใหม่ด้วย `Symbol(key)` แล้วเก็บไว้ใน registry

เช่น:

```js run
// อ่าน symbol จาก global registry
let id = Symbol.for("id"); // ถ้ายังไม่มี symbol นี้อยู่ ก็จะสร้างขึ้นมาใหม่

// อ่าน symbol อีกรอบ (อาจจะจากส่วนอื่นของโค้ด)
let idAgain = Symbol.for("id");

// คือ symbol อันเดียวกัน
alert( id === idAgain ); // true
```

Symbol ที่อยู่ใน registry เรียกว่า *global symbol* — ถ้าต้องการ symbol ที่ใช้ได้ทั่วทั้งแอปพลิเคชัน เข้าถึงได้จากทุกที่ในโค้ด ก็ใช้ตัวนี้เลย

```smart header="เหมือนใน Ruby"
ในบางภาษาเช่น Ruby จะมี symbol อยู่หนึ่งตัวสำหรับชื่อหนึ่งชื่อ

ใน JavaScript อย่างที่เราเห็น จะเป็นแบบนั้นเฉพาะ global symbol เท่านั้น
```

### Symbol.keyFor

เราเห็นแล้วว่า `Symbol.for(key)` คืน symbol จากชื่อ ในทางกลับกัน ถ้าอยากได้ชื่อจาก global symbol ก็ใช้ `Symbol.keyFor(sym)`:

เช่น:

```js run
// รับ symbol จากชื่อ
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// รับชื่อจาก symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` ค้นหา key จาก global symbol registry ดังนั้นจึงใช้กับ symbol ที่ไม่ใช่ global ไม่ได้ — ถ้าลองใส่ symbol ที่ไม่ใช่ global จะคืน `undefined`

อย่างไรก็ตาม ทุก symbol มีพร็อพเพอร์ตี้ `description` อยู่

เช่น:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name เพราะเป็น global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined เพราะไม่ใช่ global

alert( localSymbol.description ); // name
```

## Symbol ของระบบ

JavaScript มี "system symbol" หลายตัวที่ใช้ภายใน และเราก็นำมาใช้ปรับแต่งพฤติกรรมของออบเจ็กต์ได้

ดูรายการทั้งหมดได้ในตาราง [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) ของ specification เช่น:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- และอื่นๆ อีกมาก

เช่น `Symbol.toPrimitive` ช่วยให้เราปรับแต่งวิธีแปลงออบเจ็กต์เป็นค่าพื้นฐานได้ จะได้เห็นการใช้งานจริงเร็วๆ นี้

Symbol เหล่านี้จะค่อยๆ คุ้นตาขึ้นเมื่อเราเรียนฟีเจอร์ต่างๆ ของภาษาที่เกี่ยวข้อง

## สรุป

`Symbol` เป็นชนิดข้อมูลพื้นฐาน (primitive) สำหรับ unique identifier

Symbol สร้างได้ด้วย `Symbol()` โดยให้ description เป็นตัวเลือก

Symbol จะมีค่าไม่ซ้ำกันเลย แม้จะมี description เหมือนกัน ถ้าเราต้องการให้ symbol ที่มีชื่อเดียวกันมีค่าเท่ากัน ให้ใช้ global registry: `Symbol.for(key)` จะคืน (หรือสร้างถ้ายังไม่มี) global symbol ที่มี `key` เป็นชื่อ การเรียก `Symbol.for` หลายครั้งด้วย key เดียวกันจะให้ symbol ตัวเดียวกันเสมอ

Symbol มีประโยชน์หลักๆ สองอย่าง คือ:

1. พร็อพเพอร์ตี้ที่ "ซ่อนอยู่" ของออบเจ็กต์

    ถ้าอยากเพิ่มพร็อพเพอร์ตี้ลงในออบเจ็กต์ที่ "เป็นของ" สคริปต์หรือไลบรารีอื่น ก็สร้าง symbol แล้วใช้เป็น key ได้เลย พร็อพเพอร์ตี้แบบนี้จะไม่ปรากฏใน `for..in` จึงไม่ถูกประมวลผลโดยบังเอิญ และสคริปต์อื่นก็เข้าถึงไม่ได้โดยตรง เพราะไม่มี symbol ของเรา — พร็อพเพอร์ตี้จึงปลอดภัยจากการถูกเขียนทับ

    พูดง่ายๆ ก็คือ เราสามารถ "แอบยัด" อะไรบางอย่างเข้าไปในออบเจ็กต์ โดยไม่ให้ใครอื่นรู้ ผ่าน symbol property นี้

2. JavaScript มี system symbol หลายตัวที่ใช้ภายใน เข้าถึงได้ผ่าน `Symbol.*` เราใช้มันปรับแต่งพฤติกรรมบางอย่างของภาษาได้ เช่น ในบทต่อๆ ไป จะใช้ `Symbol.iterator` สำหรับ [iterables](info:iterable) และ `Symbol.toPrimitive` สำหรับ[แปลงออบเจ็กต์เป็นค่าพื้นฐาน](info:object-toprimitive) เป็นต้น

จริงๆ แล้ว symbol ไม่ได้ถูกซ่อนไว้ 100% มีเมธอดอย่าง [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) ที่ดึง symbol ทั้งหมดออกมาได้ และ [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ที่คืน*ทุก* key ของออบเจ็กต์ รวมถึง symbol ด้วย

แต่ไลบรารี เมธอด และ syntax ในตัวส่วนใหญ่จะไม่ค่อยใช้เมธอดเหล่านี้ ทำให้ symbol property ยังคงเป็นส่วนตัวได้ในระดับหนึ่ง
