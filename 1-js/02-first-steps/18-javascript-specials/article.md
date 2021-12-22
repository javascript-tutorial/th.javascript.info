# จาวาสคริปต์พิเศษ

ในบทนี้เราจะสรุปฟีเจอร์ของจาวาสคริปต์ ที่เราเรียนรู้กันไปจากบทที่ผ่านๆมาแบบสั้นๆ แต่จะใส่ใจรายละเอียดเล็กๆน้อยๆเป็นพิเศษ

## โค้ดสร้างภาษา

คำสั่ง (Statements) แต่ละคำสั่งคั่นด้วย semicolon (;) เสมอ

```js run no-beautify
alert('Hello'); alert('World');
```

และการเว้นละบรรทัดก็ถือว่าเป็นการคั่นคำสั่งอย่างหนึ่ง เราสามารถใช้ได้เช่นกัน

```js run no-beautify
alert('Hello')
alert('World')
```

โดยจาวาสคริปต์จะทำการใส่ semicolon (;) ให้เองโดยอัตโนมัติ แต่บางครั้งเราก็ไม่สามารถเว้นบรรทัดแบบนี้ได้ เช่น

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

ดังนั้นคู่มือจาวาสคริปต์ส่วนใหญ่จึงแนะนำให้ใส่ semicolon (;) คั่นคำสั่งทุกครั้ง

เราไม่จำเป็นต้องใส่ semicolon (;) ข้างหลัง code block `{...}` หรือรูปประโยคแบบ `for...loop`:

```js
function f() {
  // ไม่จำเป็นต้องใส่ semicolon (;) หลังจากการประกาศฟังก์ชัน
}

for(;;) {
  // ไม่จำเป็นต้องใส่ semicolon (;) หลังลูบ
}
```

...แต่ถ้าเราเผลอไปใส่ ก็จะไม่มีข้อผิดพลาด และsemicolon (;) จะถูกละเลยไป จาวาสคริปต์ก็ยังทำงานของมันได้ 

อ่านเพิ่มเติมได้ในบท: <info:structure>.

## Strict mode

เพื่อเปิดใช้งานฟีเจอร์ทั้งหมดของจาวาสคริปจ์สมัยใหม่อย่างสมบูรณ์ เราควรเริ่มสคริปต์ด้วย `"use strict"`

```js
'use strict';

...
```

คำสั่งต้องอยู่ที่ด้านบนสุดของสคริปต์หรือด้านบนสุดของฟังก์ชัน

หากไม่ใส่ `"use strict"` โปรแกรมก็ยังคงทำงานได้ แต่เราจะใช้ได้แต่ฟีเจอร์เก่าๆ

ฟีเจอร์ใหม่ๆ (อย่างเช่น class เราจะเขียนไปในบทถัดไป) จะเปิดใช้งานเฉพาะ Strict mode เท่สนั้น

ดูเพิ่มเติมได้ที่: <info:strict-mode>.

## ตัวแปร (Variables)

สามารถประกาศได้โดยใช้:

- `let`
- `const` (constant, can't be changed)
- `var` (old-style, will see later)

ชื่อตัวแปรสามารถมี:
- ตัวอักษรและตัวเลข แต่ตัวอักษรตัวแรกต้องไม่เป็นตัวเลข
- สามารถใช้อักขระพิเศษอย่าง `$` และ `_` ได้เทียบเท่ากับตัวอักษร.
- อนุญาตให้ใช้ตัวอักษรที่ไม่ใช่ละตินรวมถึงอักษรอียิปต์โบราณ แต่ไม่เป็นที่นิยม

ตัวแปรสามารถเก็บข้อมูลอะไรก็ได้ หรือ ข้อมูลชนิดใดๆก็ได้

```js
let x = 5;
x = "John";
```

มีข้อมูลทั้งหมด 8 ชนิด:

- `number` สำหรับทั้งเลขทศนิยมและจำนวนเต็ม
- `bigint` สำหรับจำนวนเต็มหรือตัวเลขที่มีค่าเกิน `2^53 - 1`
- `string` สำหรับสตริง
- `boolean` สำหรับค่าทางตรรกะ: `true/false`,
- `null` -- ชนิดที่มีค่าเดียวคือ `null` หมายถึง "ค่าว่าง" หรือ "ค่านั้นไม่มีอยู่"
- `undefined` -- ชนิดที่มีค่าเดียวคือ `undefined` หมายถึง "ยังไม่ถูกกำหนดค่า",
- `object` และ `symbol` -- สำหรับโครงสร้างข้อมูลที่ซับซ้อนและ unique identifiers ซึ่งเราจะได้เรียนกันในบทถัดๆไป

ตัวดำเนินการ `typeof` ส่งคืนประเภทของค่า โดยมีข้อยกเว้นสองประการ:
```js
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```

More in: <info:variables> and <info:types>.

## Interaction

We're using a browser as a working environment, so basic UI functions will be:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Output a `message`.

All these functions are *modal*, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

More in: <info:alert-prompt-confirm>.

## Operators

JavaScript supports the following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Guide/Expressions_and_Operators#Bitwise) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped (not necessary `true`/`false`). Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Nullish coalescing operator
: The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it's `null/undefined`, then `b`.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Loops

- We covered 3 types of loops:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.
- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: <info:while-for>.

Later we'll study more types of loops to deal with objects.

## The "switch" construct

The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: <info:switch>.

## Functions

We covered three ways to create a function in JavaScript:

1. Function Declaration: the function in the main code flow

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Function Expression: the function in the context of an expression

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Arrow functions:

    ```js
    // expression at the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;
    ```


- Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: see <info:function-basics>, <info:arrow-functions-basics>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
