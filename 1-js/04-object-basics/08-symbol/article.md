# ชนิดข้อมูล Symbol

ในภาษา JavaScript นั้น มีเพียงชนิดข้อมูลพื้นฐานสองประเภทเท่านั้นที่สามารถใช้เป็น key ของ property ในออบเจ็กต์ได้ นั่นคือ:

<<<<<<< HEAD
- string และ
- symbol 

สำหรับชนิดข้อมูลอื่นๆ เช่น number เมื่อใช้เป็น key มันจะถูกแปลงเป็น string โดยอัตโนมัติ ซึ่งหมายความว่า `obj[1]` จะเท่ากับ `obj["1"]` และ `obj[true]` จะเท่ากับ `obj["true"]`
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

ที่ผ่านมา เราใช้แต่ string เป็น key มาโดยตลอด 

คราวนี้ลองมาทำความรู้จักกับ symbol และประโยชน์ของมันกันดูบ้าง

## Symbol คืออะไร

"Symbol" เป็นตัวแทนของ unique identifier หรือตัวระบุที่ไม่ซ้ำกัน

เราสามารถสร้างค่า symbol ได้โดยใช้ฟังก์ชัน `Symbol()` ดังนี้:

```js
let id = Symbol();
```

<<<<<<< HEAD
เวลาสร้าง symbol เรายังสามารถให้คำอธิบาย (description) หรือชื่อให้กับมันได้ด้วย ซึ่งส่วนใหญ่จะมีประโยชน์ในการดีบั๊ก:
=======
Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
// id คือ symbol ที่มีคำอธิบายว่า "id"
let id = Symbol("id");
```

<<<<<<< HEAD
Symbol รับประกันว่าจะมีค่าไม่ซ้ำกันเสมอ ถึงแม้จะสร้าง symbol หลายตัวด้วยคำอธิบายเดียวกัน ค่าของมันก็จะไม่เหมือนกัน เพราะคำอธิบายเป็นเพียงป้ายชื่อ (label) ที่ไม่ได้กำหนดค่าจริงของ symbol แต่อย่างใด 
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

ยกตัวอย่างเช่น symbol สองตัวด้านล่างนี้ แม้จะมีคำอธิบายเหมือนกัน แต่ค่าจะไม่เท่ากัน:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

ถ้าคุณคุ้นเคยกับ symbol ในภาษา Ruby หรือภาษาอื่นที่มีแนวคิดคล้ายๆ กัน อย่าสับสน เพราะ symbol ใน JavaScript นั้นแตกต่างออกไป

<<<<<<< HEAD
โดยสรุปคือ symbol คือค่าพื้นฐานที่ unique ซึ่งอาจมี description กำกับไว้ก็ได้ มาดูกันว่าเราจะประยุกต์ใช้มันได้อย่างไรบ้าง
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

````warn header="Symbol ไม่ถูกแปลงเป็น string โดยอัตโนมัติ"
ค่าส่วนใหญ่ใน JavaScript รองรับการถูกแปลงเป็น string โดยอัตโนมัติ เช่น เราสามารถ `alert(value)` ค่าอะไรก็ได้ออกมา และมันจะทำงาน

แต่ symbol นั้นพิเศษกว่า มันจะไม่ยอมถูกแปลงเป็น string โดยอัตโนมัติ เช่นถ้าเรา alert symbol ตรงๆ แบบนี้:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: ไม่สามารถแปลง Symbol เป็น string ได้
*/!*
```

จะเกิด error ขึ้น เพราะภาษาต้องการป้องกันไม่ให้เราแปลง string และ symbol ให้กันและกันโดยไม่ตั้งใจ เนื่องจากมันเป็นคนละประเภทกันโดยสิ้นเชิง

ถ้าเราต้องการจะแสดง symbol จริงๆ เราต้องเรียกเมท็อด `.toString()` อย่างชัดเจน แบบนี้:

<<<<<<< HEAD
=======
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id) ตอนนี้โอเคแล้ว
*/!*
```

<<<<<<< HEAD
หรือถ้าเราอยากได้แค่ description ของ symbol ก็ใช้ `.description` ได้:
=======
Or get `symbol.description` property to show the description only:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```
````

## Property ที่ "ซ่อนอยู่"

<<<<<<< HEAD
Symbol ช่วยให้เราสร้าง "hidden" property ใส่ในออบเจ็กต์ได้ โดยที่โค้ดส่วนอื่นๆ จะไม่สามารถเข้าถึงหรือเขียนทับโดยไม่ได้ตั้งใจ
=======

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

สมมติว่าเรากำลังทำงานกับออบเจ็กต์ `user` ซึ่งเป็นของโค้ดจากที่อื่นมา แล้วเราอยากเพิ่ม identifier ใส่ลงไป เพื่อให้ identifier นั้นไม่ไปซ้ำกับ property ที่มีอยู่แล้ว เราเลยใช้ symbol แทนการใช้ชื่อ string ปกติ:

```js run
let user = { // เป็นของโค้ดจากที่อื่น
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // เราสามารถเข้าถึงข้อมูลโดยใช้ symbol เป็น key
```

ข้อดีของการใช้ `Symbol("id")` แทนที่จะเป็น `"id"` string ธรรมดาคือ มันจะไม่ไปทับ property ที่มีอยู่ก่อน

<<<<<<< HEAD
เนื่องจากออบเจ็กต์ `user` เป็นของคนอื่น การไปเพิ่ม field ใหม่ลงไปในนั้นโดยตรงอาจไม่ปลอดภัย เพราะอาจไปขัดแย้งกับลอจิกที่เขาเขียนไว้ได้ แต่ symbol จะไม่มีทางถูกเข้าถึงจากโค้ดอื่นโดยบังเอิญ เพราะโค้ดอื่นจะไม่มี symbol ตัวนี้ ดังนั้นเราจึงสามารถใช้ symbol เพิ่มอะไรลงไปในออบเจ็กต์ `user` ได้อย่างปลอดภัย  

จินตนาการว่า ถ้ามีอีกสคริปต์นึงอยากใช้ identifier ของมันเองกับ `user` เพื่อวัตถุประสงค์บางอย่าง สคริปต์นั้นก็แค่สร้าง `Symbol("id")` ของมันเอง ดังนี้:
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.

Then that script can create its own `Symbol("id")`, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
// ...
let id = Symbol("id");

user[id] = "ไอดีของสคริปต์นั้น";
```

ไม่มีการชนกันเกิดขึ้นระหว่าง identifier ของเรากับของอีกสคริปต์ เพราะ symbol จะไม่ซ้ำกันเสมอ แม้จะใช้ชื่อคำอธิบายเดียวกันก็ตาม

...แต่ถ้าเราใช้ string `"id"` ตรงๆ แทนที่จะเป็น symbol ในกรณีนี้ มันก็*จะ* เกิดการชนกันขึ้นแน่ๆ:

```js
let user = { name: "John" };

// สคริปต์ของเราใช้ property "id" 
user.id = "ไอดีของเรา";

// ...สคริปต์อื่นก็อยากใช้ "id" เหมือนกัน

user.id = "ไอดีของอีกสคริปต์"
// บูม! โดนสคริปต์อื่นเขียนทับแล้ว!
```

### ใช้ Symbol ใน Object Literal

ถ้าเราต้องการใช้ symbol ใน object literal `{...}` จะต้องครอบมันไว้ด้วยวงเล็บก้ามปู (square bracket) แบบนี้:

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

### Symbol จะถูกข้ามโดย for..in

Property ที่เป็น symbol จะไม่เข้าร่วมในการ loop `for..in` 

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

<<<<<<< HEAD
// ถ้าเข้าถึงโดยตรง symbol ก็ยังใช้งานได้
=======
// the direct access by the symbol works
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
alert( "Direct: " + user[id] ); // Direct: 123
```

`Object.keys(user)` ก็จะละเว้น symbol เช่นกัน นี่คือส่วนหนึ่งของหลักการ "ซ่อน symbol property" ที่ว่า ถ้ามีไลบรารีอื่นมา for..in ออบเจ็กต์ของเรา มันจะไม่เจอ property ที่เป็น symbol โดยไม่ได้ตั้งใจ

ในทางตรงกันข้าม `Object.assign` นั้นจะคัดลอกทั้ง string และ symbol property:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

ไม่มีอะไรแปลกตรงนี้ เพราะนั่นคือสิ่งที่มันถูกออกแบบมาให้ทำ แนวคิดคือ เวลาเรา clone หรือ merge ออบเจ็กต์ เราก็มักจะอยากให้มัน copy *ทุก* property (string และ symbol) นั่นเอง

## Global Symbol

อย่างที่เห็น ปกติแล้ว symbol ทุกตัวจะไม่ซ้ำกันเลย แม้ว่าจะมีคำอธิบายเดียวกันก็ตาม 

แต่บางครั้ง เราอาจอยากให้ symbol ที่มีชื่อเหมือนกันเป็นตัวเดียวกันด้วย เช่นอยากให้ส่วนต่างๆ ของแอปพลิเคชันใช้ symbol ที่ชื่อ `"id"` โดยอ้างอิงถึง property อันเดียวกัน

เพื่อทำแบบนั้น มีสิ่งที่เรียกว่า *global symbol registry* เราสามารถสร้าง symbol ไว้ในนั้น และเรียกใช้ซ้ำได้ในภายหลัง registry นี้จะรับประกันว่า การเข้าถึงด้วยชื่อเดิมซ้ำๆ จะคืน symbol ตัวเดียวกันเสมอ

ใช้ `Symbol.for(key)` ในการอ่าน (หรือสร้างใหม่ถ้ายังไม่มี) symbol จาก registry นี้

การเรียกเมท็อดนี้จะไปค้นหาใน global registry ว่ามี symbol ที่มี `key` ตามที่ระบุไว้หรือไม่ ถ้ามีก็จะคืน symbol นั้น ถ้าไม่ก็จะสร้าง symbol ใหม่ด้วย `Symbol(key)` แล้วเก็บไว้ใน registry โดยใช้ `key` เป็นชื่อ

ยกตัวอย่างเช่น:

```js run
// อ่าน symbol จาก global registry
let id = Symbol.for("id"); // ถ้ายังไม่มี symbol นี้อยู่ มันก็จะถูกสร้างขึ้นมาใหม่

// อ่าน symbol อีกรอบ (อาจจะจากส่วนอื่นของโค้ด)
let idAgain = Symbol.for("id");

// คือ symbol อันเดียวกัน
alert( id === idAgain ); // true
```

Symbol ภายใน registry นี้ถูกเรียกว่า *global symbol* ถ้าเราต้องการ symbol ที่ใช้ทั่วทั้งแอปพลิเคชันและเข้าถึงได้จากทุกที่ในโค้ด เราก็ใช้อันนี้ได้เลย

```smart header="เหมือนใน Ruby"
ในบางภาษาเช่น Ruby จะมี symbol อยู่หนึ่งตัวสำหรับชื่อหนึ่งชื่อ

<<<<<<< HEAD
ใน JavaScript อย่างที่เราเห็น มันเป็นอย่างนั้นสำหรับ global symbol เท่านั้น
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

### Symbol.keyFor

<<<<<<< HEAD
เราเห็นแล้วว่า `Symbol.for(key)` จะคืน symbol ที่มีชื่อตามที่ระบุ เราก็สามารถทำย้อนกลับได้ด้วยเช่นกัน โดยใช้เมท็อด `Symbol.keyFor(sym)` เพื่อคืนชื่อจาก global symbol
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

ตัวอย่างเช่น:

```js run
// รับ symbol จากชื่อ
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// รับชื่อจาก symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` จะค้นหา key ของ symbol จาก global symbol registry ซึ่งหมายความว่ามันจะไม่ใช้กับ symbol ที่ไม่ใช่ global การใช้กับ symbol ที่ไม่ใช่ global จะคืน `undefined`

<<<<<<< HEAD
เทียบกับ `Symbol.for` แล้ว `Symbol.keyFor` นั้นเป็นตรงข้ามกัน: อันแรกคือรับชื่อแล้วคืน symbol ส่วนอันหลังคือรับ symbol แล้วคืนชื่อ
=======
That said, all symbols have the `description` property.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

อย่างไรก็ตาม ไม่ใช่ทุก symbol ที่จะถูกเก็บไว้ใน global registry ซึ่ง `Symbol.for` ช่วยให้เรามี global symbol ที่มีชื่อเดียวกันได้ในขณะที่ symbol ทั่วไปจะเป็นคนละอันแม้ชื่อเหมือนกัน

ลองดูโค้ดนี้:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name เพราะเป็น global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined เพราะไม่ใช่ global

alert( localSymbol.description ); // name
```

## Symbol ของระบบ

มี "system symbol" ต่างๆ ที่ JavaScript ใช้ภายใน ซึ่งเราสามารถใช้มันปรับแต่งพฤติกรรมของออบเจ็กต์ได้บางส่วน

พวกมันถูกแสดงอยู่ในตารางของ specification ชื่อ [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) เช่น:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- และอื่นๆ อีกมาก

ยกตัวอย่างเช่น `Symbol.toPrimitive` ช่วยให้เราปรับแต่งวิธีการแปลงออบเจ็กต์เป็นค่าพื้นฐานได้ เราจะได้เห็นการใช้งานจริงของมันเร็วๆ นี้

Symbol พวกนี้จะดูคุ้นตาเมื่อเราศึกษา feature ต่างๆ ของภาษาที่เกี่ยวข้องกับมัน

## สรุป

`Symbol` เป็นชนิดข้อมูลพื้นฐาน (primitive) สำหรับ unique identifier

Symbol สร้างได้ด้วย `Symbol()` โดยให้ description เป็นตัวเลือก

Symbol จะมีค่าไม่ซ้ำกันเลย แม้จะมี description เหมือนกัน ถ้าเราต้องการให้ symbol ที่มีชื่อเดียวกันมีค่าเท่ากัน ให้ใช้ global registry: `Symbol.for(key)` จะคืน (หรือสร้างถ้ายังไม่มี) global symbol ที่มี `key` เป็นชื่อ การเรียก `Symbol.for` หลายครั้งด้วย key เดียวกันจะให้ symbol ตัวเดียวกันเสมอ

Symbol มีสองประโยชน์หลักๆ คือ:

<<<<<<< HEAD
1. "Hidden" property ของออบเจ็กต์
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ถ้าเราอยากเพิ่ม property ลงในออบเจ็กต์ที่ "เป็นของ" script หรือ library อื่น เราสามารถสร้าง symbol แล้วใช้เป็น key ของมันได้ 

    Property ที่เป็น symbol จะไม่ปรากฏใน `for..in` จึงไม่ถูกประมวลผลโดยไม่ได้ตั้งใจ และไม่สามารถเข้าถึงได้โดยตรงด้วย เพราะ script อื่นไม่มี symbol ของเรา ทำให้ property นั้นจะได้รับการปกป้องจากการถูกใช้หรือเขียนทับโดยไม่ตั้งใจ

<<<<<<< HEAD
    เราสามารถ "แอบยัด" อะไรบางอย่งเข้าไปในออบเจ็กต์ที่เราใช้อยู่ โดยที่ไม่ให้ใครอื่นรู้ได้ ผ่านการใช้ symbol property นี้

2. มี system symbol หลายตัวที่ JavaScript ใช้เองภายใน ซึ่งเราสามารถใช้ผ่าน `Symbol.*` ได้ เราสามารถใช้มันปรับแต่งพฤติกรรมบางอย่างในภาษาได้  
    เช่นในบทต่อๆ ไป เราจะใช้ `Symbol.iterator` เพื่อทำ [iteration](info:iterable) `Symbol.toPrimitive` ในการ[แปลงออบเจ็กต์เป็นค่าพื้นฐาน](info:object-toprimitive) เป็นต้น

ในแง่เทคนิคแล้ว symbol ไม่ได้ถูกซ่อนไว้ 100% มีบางเมท็อดในตัวอย่างเช่น [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) ที่ช่วยให้เราเข้าถึง symbol ทั้งหมดได้ และเมท็อด [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ที่คืน *ทุก* key ของออบเจ็กต์ รวมถึง symbol ด้วย 

แต่ส่วนใหญ่แล้ว ไลบรารีต่างๆ เมท็อดและ syntax structure ในตัวจะไม่ค่อยใช้เมท็อดเหล่านี้กัน ทำให้ symbol property ยังคงความเป็นส่วนตัวไว้ได้ในระดับหนึ่ง
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
