# ตัวดำเนินการทางตรรกะ (Logical operators)

ใน JavaScript จะมีตัวดำเนินการทั้งหมด 4 ตัว: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing) ในบทเรียนนี้เราจะครอบคลุม 3 ตัวแรกก่อน และ `??` จะอยุ่ในบทเรียนถัดไป

ถึงจะมีคำว่า "ตรรกะ" ต่อท้ายก็ตาม แต่ตัวดำเนินการเหล่านี้ใช้ได้กับค่าทุกประเภท ไม่จำเป็นต้องเป็นบูลีนเท่านั้น

มาดูกันในรายละเอียด

## || (OR)

ตัวดำเนินการ "OR" จะแสดงด้วยสัญลักษณ์เส้นแนวตั้งสองเส้น:

```js
result = a || b;
```

ในภาษาโปรแกรมมิ่งเก่าๆ "OR" มีไว้ใช้กับค่าบูลีนเท่านั้น หากอาร์กิวเมนต์ตัวใดเป็น `true` ก็จะส่งต่า `true` กลับมิฉะนั้นส่งค่า `false` กลับ

ใน JavaScript ตัวดำเนินการทางตรระกะจะซับซ้อนกว่าและมีประสิทธิภาพกว่า แต่ก่อนอื่น มาดูตัวอย่างจากบูลีนกันก่อน

เราสามารถนำบูลีนมามิกซ์แอนด์แมทซ์กันได้ทั้งหมด 4 ชุด:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

อย่างที่เราเห็น ผลลัพธ์จะได้ `true` เสมอ ยกเว้นกรณีที่ตัวถูกดำเนินการทั้งสองเป็น `false`

ถ้าตัวถูกดำเนินการไม่ใช่บูลีน จะถูกแปลงเป็นบูลีน

ตัวอย่างเช่น ตัวเลข `1` จะถือเป็น `true` ตัวเลข `0` เป็น `false`

```js run
if (1 || 0) { // works just like if( true || false )
  alert( 'truthy!' );
}
```

ส่วนใหญ่ OR `||` มักจะใช้ในคำสั่ง `if` เพื่อทดสอบว่าตามเงื่อนไขที่กำหนด *มีอะไร* เป็น `true` หรือไม่

ตัวอย่าง:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

เราสามารถใส่เงื่อนไขเพิ่มเติมได้:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}
```

## OR "||" หาค่า truthy ที่เจอตัวแรก [#or-finds-the-first-truthy-value]

ตัวอย่างด้านบนจะอธิบายตามภาษาโปรแกรมมิ่งเก่าๆ ตอนนี้เรามีดูคุณสมบัติ "พิเศษ" ที่พบเฉพาะ JavaScript กัน

ลำดับการทำงานเป็นดังนี้

แต่เราขอเพิ่มตัวดำเนินการ OR ขึ้นมาอีกสักหน่อย:

```js
result = value1 || value2 || value3;
```

ตัวดำเนินการ OR `||` ทำสิ่งต่อไปนี้:

- ประเมินตัวถูกดำเนินการจากซ้ายไปขวา
- ตัวถูกดำเนินการแต่ละตัวจะถูกแปลงเป็นบูลีน หากผลลัพธ์เป็น `true` การทำงานจะหยุดและส่งค่าเดิมกลับไป
- ตัวถูกดำเนินการทุกตัวถูกประเมินหมดแล้ว (หรือก็คือทุกค่าเป็น `false`) จะส่งตัวสุดท้ายกลับไป

ค่าที่ถูกส่งไม่มีการแปลงค่า ดังนั้นจึงเป็นค่าเดิม

กล่าวอีกนัยหนึ่ง chain ของ OR `||` จะส่งกลับค่า truthy ที่เจอตัวแรก และหากไม่เจอค่าไหนที่เป็น truthy เลยก็จะส่งค่าสุดท้ายกลับไป

ตัวอย่าง:

```js run
alert( 1 || 0 ); // 1 (1 คือ truthy)

alert( null || 1 ); // 1 (1 คือค่า truthy ตัวแรก)
alert( null || 0 || 1 ); // 1 (ค่า truthy ตัวแรก)

alert( undefined || null || 0 ); // 0 (ทั้งหมดเป็น falsy ส่งตัวสุดท้ายกลับไป)
```

นี่คือสิ่งที่ทำให้ JavaScript แตกต่างออกไป จากภาษาโปรแกรมมิ่งเก่าๆ

1. **หาค่า truthy ที่เจอตัวแรก**

    ตัวอย่าง เรามีตัวแปร `firstName`, `lastName` และ `nickName` ทุกตัวเป็น optional คือจะใส่มาหรือไม่ใส่ก็ได้ (หากไม่ใส่มา ค่าท่ีได้จะเป็น `undefined`)

    มาลองใช้ OR `||` เพื่อเลือกแสดงตัวแปรที่มีค่า truthy เก็บไว้ (หรือแสดงเป็น `"Anonymous"` หากไม่ได้ใส่อะไรมาเลย):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    หากตัวแปรทั้งหมดเป็น falsy คำว่า `"Anonymous"` จะแสดงขึ้นมา

2. **การประเมินแบบลัดวงจร (Short-circuit evaluation)**

    ฟีเจอร์อีกอย่างของโอเปอเรเตอร์ OR `||` คือการประเมินที่เรียกว่า "ลัดวงจร (Short-circuit)"

    หมายความว่า `||` จะควานหาค่าที่เป็น truthy ตัวแรก และส่งค่ากลับทันที จะไม่ประเมินส่วนที่เหลือต่อ

    ความสำคัญของฟีเจอร์นี้ที่เห็นเด่นๆเลยคือ หากตัวถูกดำเนินการไม่ใช่ค่าใดค่าหนึ่ง แต่เป็นนิพจน์ (expression) หรือฟังชั่นก์แทน

    ในตัวอย่างด้านล่างมีเพียง บรรทัดที่สองเท่านั้นที่ฟังชั่นก์ `alert` ทำงาน

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

    ในบรรทัดแรก OR `||` จะหยุดทำงานทันทีที่ค่าตัวแรกเป็น truthy ดังนั้นฟังชั่นก์ `alert` จึงไม่ทำงาน

    และในบางครั้งเราต้องการให้ฟังชั่นก์อะไรสักอย่างทำงาน เมื่อเงื่อนไขทางซ้ายเป็น falsy

## && (AND)

The AND operator is represented with two ampersands `&&`:

```js
result = a && b;
```

In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

An example with `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Just as with OR, any value is allowed as an operand of AND:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND "&&" finds the first falsy value

Given multiple AND'ed values:

```js
result = value1 && value2 && value3;
```

The AND `&&` operator does the following:

- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.

In other words, AND returns the first falsy value or the last value if none were found.

The rules above are similar to OR. The difference is that AND returns the first *falsy* value while OR returns the first *truthy* one.

Examples:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

We can also pass several values in a row. See how the first falsy one is returned:

```js run
alert( 1 && 2 && null && 3 ); // null
```

When all values are truthy, the last value is returned:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".

For instance:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.

So we basically have an analogue for:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
````


## ! (NOT)

The boolean NOT operator is represented with an exclamation sign `!`.

The syntax is pretty simple:

```js
result = !value;
```

The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.

For instance:

```js run
alert( !true ); // false
alert( !0 ); // true
```

A double NOT `!!` is sometimes used for converting a value to boolean type:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

There's a little more verbose way to do the same thing -- a built-in `Boolean` function:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
