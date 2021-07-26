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

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.

Let's use the `??` operator for that:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparison with ||

The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.

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
