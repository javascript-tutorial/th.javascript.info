# ตัวดำเนินการรวมเป็นโมฆะ (Nullish coalescing operator) '??'

[recent browser="new"]

ตัวดำเนินการรวมเป็นโมฆะ (Nullish coalescing operator) จะใช้สัญลักษณ์เครื่องหมายคำถามสองตัว `??`

ตัวดำเนินการนี้มีไว้จัดการกับค่า `null` และ `undefined` มาทำความเข้าใจกันสักเล็กน้อย ในบทนี้ หากตัวแปรใดไม่ได้เป็นค่า `null` หรือ `undefined` เราจะบอกว่า ตัวแปรนี้ถูก "defined" แล้ว

ผลลัพธ์ของ `a ?? b` คือ:
- หาก `a` ถูก "defined" จะคืน `a`
- หาก `a` ไม่ถูก defined จะคืน `b`

สรุปคือ `??` จะส่งคืนตัวแรก หากตัวแรกไม่ใช่ `null` หรือ `undefined` นอกจากนั้นจะส่งตัวหลังกลับไปแทน

ตัวดำเนินการรวมเป็นโมฆะ (Nullish coalescing operator) ไม่ได้มีอะไรแปลกใหม่ ซึ่งใช้สำหรับหาค่าที่ถูก "defined" ตัวแรก

เราสามารถเขียนได้เป็น `result = a ?? b` หรือว่าจะควบคู่ไปกับตัวดำเนินการที่เราเคยเรียนมาก่อนหน้านี้แล้วก็ได้:

```js
result = (a !== null && a !== undefined) ? a : b;
```

ตอนนี้มาดูกันชัดๆว่า `??` ทำงานอย่างไร และมันช่วยอะไรเราได้

กรณีการใช้งานทั่วไปสำหรับ `??` คือ ใช้กำหนดค่าเริ่มต้นสำหรับตัวแปรที่อาจจะเป็น `null` หรือ `undefined` ได้

ตัวอย่างด้านล่างเรากำหนดตัวแปร `user` ขึ้นมา หากตัวแปรนี้ถูก defined ก็จะแสดงค่าขึ้นมา หากไม่ใช่ก็จะแสดง `Anonymous` ขึ้นมา:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user ไม่ถูกก defined)
```

ตัวอย่างต่อมาคือหากตัวแปร `user` ถูก defined ไว้แล้ว

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user ถูก defined)
```

นอกจากนี้เรายังสามรถใช้ลำดับของ `??` เพื่อเลือกค่าแรกจากรายการที่ไม่ได้เป็น `null` หรือ `undefined`

สมมุติว่าเรามีข้อมูลผู้ใช้จากตัวแปรทั้งหมดสามตัวได้แก่ `firstName` `lastName` และ `nickName` ซึ่งตัวแปรทั้งหมดนี้อาจเป็น `undefined` ได้หากผู้ใช้ไม่ได้กรอกข้อมูลมา

เราต้องการแสดงว่าชื่อผู้ใช้โดยใช้หนึ่งในตัวแปรเหล่านี้ หรือแสดงเป็น "Anonymous" หากตัวแปรทั้งสามตัวไม่ได้ถูก "defined" ไว้

มาลองใช้ตัวดำเนินการ `??` เพื่อแก้ไขปัญหานี้ดู:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// จะแสดงตัวแปรที่ถูก defined ตัวแรก
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## เปรียบเทียบกับ ||

ตัวดำเนินการ OR `||` operator สามารถใช้ทดแทน `??` ได้ ตามที่เคยอธิบายไว้ใน[บทที่แล้ว](info:logical-operators#or-finds-the-first-truthy-value).

ตัวอย่างจากโค้ดด้านบน เราสามารถแทนที่ `??` ด้วย `||` ได้เลย ผลลัพธ์ก็ยังเหมือนเดิม

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// จะแสดงค่า truthy ตัวแรก:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

เนื่องจากว่า OR `||` เกิดมาก่อน โดยมาพร้อมกับจาวาสคริปต์เลย นักพัฒนาจึงใช้ OR `||` เพื่อจุดสงประสงค์นี้เป็นเวลานาน

ในขณะที่ตัวดำเนินการรวมเป็นโมฆะเพิ่งถูกเพิ่มเข้ามาในจาวาสคริปต์ไม่นานนี้ และหลายคนก็ยังมีข้อกังวลที่จะใช้ `??` อีกด้วย

ความแตกต่างของทั้งสองตัวก็คือ:
- `||` ส่งค่า *truthy* ตัวแรกกลับ
- `??` ส่งค่า *defined* ตัวแรกกลับ

พูดได้ว่า `||` จะไม่แยก `false`, `0`, สตริงว่าง (""), และ `null/undefined` ทุกตัวที่กล่างมาเป็นค่า falsy เหมือนกัน หากหนึ่งในนี้อยู่เป็นตัวแรกของ `||` ตัวที่สองจะถูกส่งกลับแทน

ในทางปฎิบัติ เราอาจต้องการให้ใช้ค่าเร่ิมต้น หากตัวแปรเป็น `null/undefined`

ตัวอย่างลองดูตามด้านล่างนี้

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- บรรทัด `height || 100` เช็คว่า `height` เป็นค่า falsy หรือไม่ซึ่ง `0` ก็เป็น falsy อย่างแน่นอน
    - ดังนั้นผลลัพธ์จาก `||` จึงได้ตัวที่สอง `100` กลับไป
- บรรทัด `height ?? 100` เช็คว่า `height` เป็นค่า `null/undefined` หรือไม่ซึ่ง `0` ไม่ได้เป็น
    - ดังนั้นผลลัพธ์ก็คือ `height` หรือก็คือ `0`

ในทางปฎิบัติ ความสูงเป็นศูนย์ได้ ซึ่งตาม usecase นี้ มันไม่ควรถูกแทนที่ควรค่าเริ่มต้น ดังนั้นการใช้ `??` จึงถูกต้องแล้ว

## Precedence

The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:

```js run
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.

The code below triggers a syntax error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Summary

- The nullish coalescing operator `??` provides a short way to choose the first "defined" value from a list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
