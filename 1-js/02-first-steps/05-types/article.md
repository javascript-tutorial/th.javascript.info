# ชนิดของข้อมูล

<<<<<<< HEAD
ตัวแปรในจาวาสคริปต์สามารถเก็บข้อมูลใดๆก็ได้ เช่น ตัวแปรหนึ่งเก็บข้อมูลที่เป็นสตริง (String) อีกตัวเก็บข้อมูลที่เป็นตัวเลข (Number)
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js
// ไม่มี error
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
โปรแกรมมิ่งภาษาใดที่อนุญาตให้เราเปลี่ยนชนิดของข้อมูลได้ โดยที่ไม่ error เราจะเรียกภาษานั้นว่าเป็น "dynamically typed" หมายความว่า ตัวแปรจะเก็บข้อมูลเป็นอะไรก็ได้ และไม่ได้ผูกกับชนิดของข้อมูลชนิดใดชนิดหนึ่ง

ในจาวาสคริปต์ข้อมูลสามารถจำแนกออกได้เป็น 8 ชนิด ในบทนี้จะพูดแต่เรื่องพื้นฐานเท่านั้น โดยจะลงรายละเอียดในบทถัดไป
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## ตัวเลข (Number)

```js
let n = 123;
n = 12.345;
```

ตัวแปรชนิด *number* คือตัวเลขนั่นเอง สามารถเป็นได้ทั้งจำนวนเต็ม (Integer) และทศนิยม (Floating Point)

เราสามารถนำตัวเลข 2 ตัวมาทำการบวก (addition) ด้วยเครื่องหมาย `+` ลบ (subtraction) `-` คูณ (multiplication) `*` หรือหาร (division) `/` และอื่นๆ

นอกจากตัวเลขปกติแล้ว ในจาวาสคริปต์ ยังมีจำนวนพิเศษอีก ได้แก่ `Infinity`, `-Infinity` และ `NaN`

- `Infinity` คือ [อนันต์](https://th.wikipedia.org/wiki/อนันต์)(∞) ในทางคณิตศาสตร์ เป็นค่าพิเศษที่มีค่ามากกว่าตัวเลขใดๆก็คาม

    เราจะได้ค่านี้ก็ต่อเมื่อ เราหารตัวเลขอะไรก็ตามด้วยศูนย์

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    หรือจะพิมพ์ไปตรงๆเลยก็ได้

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` คือ ค่าที่เกิดขึ้นจากข้อผิดพลาดทางการคำนวณ เป็นผลมาจากการดำเนินการทางคณิตศาสตร์ที่ไม่ถูกต้อง ตัวอย่างเช่น

    ```js run
    alert( "not a number" / 2 ); // NaN, สตริงหารตัวเลขไม่ได้
    ```

    `NaN` เป็นค่าที่ติดหนึบ เพราะไม่ว่าเราจะทำอะไรกับค่า `NaN` มันก็จะเป็น `NaN` เสมอ

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    ดังนั้น หากเกิด `NaN` ขึ้นมาในโค้ดของเรา มันก็อาจจะลามไปที่อื่นในโค้ดของเราด้วย

```smart header="การดำเนินการทางคณิตศาสตร์นั้นปลอดภัย"
การกระทำใดๆที่เกี่ยวกับตัวเลขนั้นปลอดภัย ต่อไปเราจะ หารอะไรด้วยศูนย์ เอาข้อมูลชนิดอื่นมาบวกตัวเลข และอื่นๆ

สคริปต์ของเราจะไม่หยุดทำงาน (fatal error) หรือตาย อย่างแย่ที่สุดก็คือ ได้ผลลัพธ์เป็น `NaN`
```

จำนวนพิเศษเหล่านั้นจัดอยู่ในข้อมูลชนิด `number` แต่เป็นจำนวนทางโปรแกรมมิ่ง ที่ขัดกับหลักสามัญสำนึกของเรา

หากต้องการทราบรายละเอียดเกี่ยวกับตัวเลขที่เยอะขึ้น ให้คลิกที่บทนี้ <info:number>.

## จำนวนเต็มที่เยอะมากๆ (BigInt)

<<<<<<< HEAD
ในจาวาสคริปต์ ข้อมูลชนิด `number` ไม่สามารถแสดงจำนวนเต็มที่มีค่าเกินกว่า <code>2<sup>53</sup></code> (หรือน้อยกว่า <code>-2<sup>53</sup></code> สำหรับจำนวนเต็มลบ) นับเป็นหนึ่งในข้อจำกัดทางเทคนิคของภาษา การแสดงตัวเลขได้เพียง 16 หลักสามารถใช้แทนจำนวนในชีวิตประจำวันได้โดยส่วนใหญ่อยู่แล้ว ข้อจำกัดนี้จึงไม่ใช่ปัญหา แต่บางครั้งเราก็ต้องการเก็บข้อมูลที่มีตัวเลขจำนวนมาก เช่น สำหรับการเข้ารหัส (cryptography) หรือ การประทับเวลาในระดับไมโครวินาที เป็นต้น
=======
In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

ข้อมูลชนิด `BigInt` เพิ่งจะถูกเพิ่มเข้ามาในจาวาสคริปต์ไม่นานนี้ เพื่อให้ตัวแปรสามารถเก็บข้อมูล เป็นตัวเลขทีมีความยาวเกิน 16 หลักได้

<<<<<<< HEAD
เราจะสร้างข้อมูลชนิด `BigInt` ได้ด้วยการเติม `n` ไว้ข้างหลังเลขจำนวนเต็ม
=======
A `BigInt` value is created by appending `n` to the end of an integer:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

<<<<<<< HEAD
จำนวน `BigInt` จะใช้เฉพาะจุดประสงค์เฉพาะจริงๆ เราจะพูดถึงรายละเอียดในบท <info:bigint>.

```smart header="ปัญหาเรื่องความเข้ากันได้ (compatability)"
ในตอนนี้ `BigInt` สามารถใช้ได้เฉพาะ Firefox และ Chrome เท่านั้น
```

## สตริง (String)
=======
As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

สตริงในจาวาสคริปต์จะต้องล้อมรอบด้วยเครื่องหมาย quotes

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

ในจาวาสคริปต์ เรามีสตริงทั้งหมด 3 ประเภท

1. แบบ Double quotes: `"Hello"`.
2. แบบ Single quotes: `'Hello'`.
3. แบบ Backticks: <code>&#96;Hello&#96;</code>.

Double และ single quotes เป็นสตริงที่ไม่มีอะไรซับซ้อน และไม่มีความแตกต่างระหว่างกัน

Backticks จะพิเศษออกไป เพราะมีความสามารถ ในการฝังตัวแปรหรือนิพจน์ (expression) ลงในสตริงได้ด้วยการล้อมรอบด้วย `${…}` ดั่งตัวอย่าง

```js run
let name = "John";

// ฝังตัวแปร
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// ฝังนิพจน์ (expression)
alert( `the result is *!*${1 + 2}*/!*` ); // จะได้ผลลัพธ์เป็น 3
```

ตัว `${…}` จะหาค่าตัวนิพจน์ (expression) ที่อยู่ภายใน และผลลัพธ์จาการดำเนินการ จะกลายเป็นส่วนหนึ่งของสตริง เราจะใส่อะไรลงไปภายใน `${…}` ก็ได้ทั้ง ตัวแปร นิพจน์ (expression) หรืออะไรที่ซับซ้อนกว่านี้

โปรดอย่าลืมว่าความสามารถนี้มีเฉพาะ Backticks เท่านั้น เครื่องหมาย quotes อื่นๆ ไม่มีความสามารถนี้
```js run
alert( "the result is ${1 + 2}" ); // ผลลัพธ์ก็คือ ${1 + 2} (double quote ไม่ได้มีผลอะไร)
```

รายละเอียดเกี่ยวกับสตริงเชิงลึกสามารถคลิกดูที่บทนี้ได้เลย<info:string>.

```smart header="ไม่มีข้อมูลชนิด *อักขระ (character)*"
ในบางภาษาโปรแกรมม่ิง จะมีข้อมูลชนิดอักขระ (character) คือเก็บตัวอักษรจำนวน 1 ตัว ตัวอย่างเช่น ภาษาซีหรือจาวา

<<<<<<< HEAD
ในจาวาสคริปต์จะไม่มีข้อมูลชนิดดังกล่าว มีเพียงสตริงอย่างเดียว จะมีตัวอักษรเพียงตัวเดียวหรือหลายตัว ก็เป็นสตริงทั้งหมด
=======
In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
```

## บูลีน (Boolean - logical type)

ข้อมูลชนิดบูลีนมีค่าเพียงสองแบบคือ `true` และ `false`

โดยปกติค่าบูลีน จะเหมือนกับเก็บค่า ใช่/ไม่ใช่ เอาไว้ `true` หมายถึง ใช่ และ `false` หมายถึง ไม่ใช่

For instance:

```js
let nameFieldChecked = true; // ใช่ ช่องชื่อถูกติ๊ก
let ageFieldChecked = false; // ไมใช่ ช่องอายุไม่ได้ถูกติ๊ก 
```

ค่าบูลีนสามารถเกิดจาก ผลลัพธ์ของการเปรียบเทียบกัน เช่นในตัวอย่าง

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (หมายถึงว่าใช่ 4 มากกว่า 1)
```

รายละเอียดเกี่ยวกับบูลีนเชิงลึกสามารถดูได้ที่บทนี้ <info:logical-operators>.

## ค่า "null"

ค่า "null" เป็นค่าชนิดพิเศษ ที่ไม่ได้อยู่ในข้อมูลชนิดใดๆเลย

ค่า "null" เป็นชนิดข้อมูลที่แยกออกมาตะหาก ซึ่งมีเพียงค่าเดียวนั่นคือ `null`

```js
let age = null;
```

ในจาวาสคริปต์ค่า `null` ไม่ได้หมายถึง "การอ้างถึงออบเจ็กต์ที่ไม่มีอยู่" หรือ "ตัวที่ชี้ดันไม่มีค่า (null pointer)" เหมือนภาษาโปรแกรมมิ่งบางภาษา

เป็นเพียงค่าพิเศษที่แสดงถึง ความว่างเปล่า ไม่มีค่า หรือ ไม่ทราบค่า

<<<<<<< HEAD
อย่างโค้ดด้านบน เป็นการสื่อว่ายังไม่ทราบอายุ หรือเป็นค่าว่าง ด้วยเหตุผลบางประการ
=======
The code above states that `age` is unknown.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## ค่า "undefined"

ค่า undefined ก็เป็นชนิดข้อมูลอีกประเภท ไม่เหมือนกับ `null`

ความหมายของ `undefined` คือ "ค่ายังไม่ได้ถูกกำหนด"

หากเราสร้างตัวแปรขึ้นมา แต่ไม่ได้กำหนดค่าให้ตัวแปร ค่าที่ได้จะเป็น `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(x); // "undefined"
```

ในทางเทคนิค เราสามารถกำหนดค่า `undefined` ให้ตัวแปรได้เลย
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
แต่ไม่แนะนำให้ทำ โดยปกติจะใช้ `null` เพื่อแทนค่าว่าง ส่วน `undefined` จะใช้เพื่อดูว่าตัวแปรนั้นมีค่าหรือยังมากกว่า
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## ออบเจ็กต์ (Objects) และซิมโบล (Symbols)

ข้อมูลชนิด `object` ก็เป็นชนิดพิเศษ

<<<<<<< HEAD
เพราะประเภทอื่นๆ ทั้งหมดจะเรียกว่า "primitive" เพราะ ค่ามีได้เพียงค่าเดียว ต่างกับออบเจ็กต์ที่สามารถเก็บค่าได้หลายค่า 

ซิมโบลใช้เมื่อเราต้องการตัวระบุเอกลักษณ์ ในบทนี้จะเกรื่นไว้คร่าวๆเท่านั้น และจะพูดถึงอีกทีหลังจบเรื่องออบเจ็กต์แล้ว
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## typeof operator [#type-typeof]

ตัวโอเปอเรเตอร์ `typeof` จะส่งคืนชนิดของข้อมูลนั้นๆออกมา โอเปอเรเตอร์ตัวนี้มีประโยชน์อย่างมาก เมื่อเราต้องประมวลผลชนิดข้อมูลที่ต่างกัน หรือ เช็คชนิดของชนิดข้อมูลนั้นๆ

สามารถเขียนได้ทั้งสองรูปแบบดังนี้

1. เขียนแบบโอเปอเรเตอร์ `typeof x`
2. เขียนแบบฟังชั่นก์ `typeof(x)`

ทั้งสองแบบได้ผลลัพธ์แบบเดียวกัน

การเรียก `typeof x` จะส่งคืนค่าสตริงที่เป็นชนิดของข้อมูลนั้นๆออกมา

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

คำอธิบายเพิ่มเติมเกี่ยวกับสามบรรทัดสุดท้าย

<<<<<<< HEAD
1. `Math` เป็นออบเจ็กต์ที่ built-in มาโดยตัวภาษา ที่มีโอเปอเตอร์ทางคณิตศาสตร์อยู่ข้างใน อ่านเพิ่มเติมได้ที่ <info:number> ในนี้ได้ใส่ตัวอย่างสำหรับออบเจ็กต์ตัวนี้ไว้แล้ว
2. ผลลัพธ์ของ `typeof null` ได้ `"object"` เป็นผลลัพธ์ที่ผิด ซึ่งเป็นข้อผิดพลาดจากตัวโอเปอเรเตอร์ `typeof` เอง เพราะค่า `null` ไม่ใช่ออบเจ็กต์ เป็นชนิดพิเศษที่แยกออกมาตะหาก และอีกเช่นกันนี่เป็นข้อผิดพลาดทางภาษา 
3. ผลลัพธ์ของ `typeof alert` คือ `"function"` เพราะว่า `alert` เป็นฟังชั่นก์ ซึ่งจะพูดในบทถัดไป แต่จากที่กล่าวมาในบทนี้ จะสังเกตว่าไม่มีข้อมูลชนิดฟังชั่นก์ เพราะฟังชั่นก์เป็นส่วนหนึ่งของข้อมูลชนิดออบเจ็กต์ แต่ตัว `typeof` ปฎิบัติกับบรรดาฟังชั่นก์ต่างไปสักหน่อย โดยการส่งคืนสตริงว่า `"function"` ออกมา ผลลัพธ์มันผิด แต่กลับสะดวกมากทีเดียวเวลาทำงานจริง
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## สรุป

มีข้อมูลอยู่ 8 ชนิดในจาวาสคริปต์

<<<<<<< HEAD
- `number` คือตัวเลขอะไรก็ตาม ไม่ว่าจะเป็น จำนวนเต็ม หรือ ทศนิยม โดยที่จำนวนเต็มจะจำกัดอยู่แค่ ±2<sup>53</sup>
- `bigint` คือตัวเลขที่เป็นจำนวนเต็ม และจะมีกี่หลักก็ได้
- `string` คือสตริงหรือข้อความ จะมีอักขระกี่ตัวก็ได้ โดยไม่แยกระหว่างอักขระตัวเดียวกับ ชุดอักขระเหมือนภาษาอื่น
- `boolean` คือค่า `true` และ `false`
- `null` คือค่าว่าง เป็นทั้งค่า และ ชนิดของข้อมูล
- `undefined` คือค่าที่ยังไม่ถูกกำหนด เป็นทั้งค่า และ ชนิดของข้อมูล
- `object` สำหรับ เก็บข้อมูลมากกว่าหนึ่งค่า มีความซับซ้อนในเรื่องโครงสร้างข้อมูล
- `symbol` สำหรับ เป็นตัวระบุเอกลักษณ์
=======
- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

ตัว `typeof` สามารถช่วยเราดูข้อมูลเก็บอยู่ในตัวแปร เป็นข้อมูลชนิดใด

- เขียนได้แบบสอง `typeof x` หรือ `typeof(x)`
- ส่งคืนเป็นสตริง บอกชนิดของข้อมูลออกมา อย่าง `"string"`.
- แต่กับ `null` จะส่งค่าเป็น `"object"` -- เป็นข้อผิดพลาดทางภาษา เพราะมันไม่ใช่ออบเจ็กต์

ในบทหน้า เราจะเน้นไปที่ข้อมูลประเภท "primitive" พอคุ้นเคยแล้ว จะไปเน้นที่ออบเจ็กต์กันต่อ
