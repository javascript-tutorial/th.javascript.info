# ตัวดำเนินการ (operator)

ตัวดำเนินการในโลกโปรแกรมมิ่ง เราเคยได้เรียนกันมาแล้วสมัยโรงเรียน นั่นก็คือ การบวก `+` การลบ `-` การคูณ `*` การหาร `/` และ ตัวอื่นๆ

โดยในบทนี้ เราจะพูดถึง

## คำว่า:  "เดี่ยว (unary)", "คู่ (binary)", "ตัวถูกดำเนินการ (operand)"

ก่อนที่เราจะเข้าเรื่อง ขออธิบายศัพท์เหล่านี้เพิ่มเติมอีกนิด

- *ตัวถูกดำเนินการ* (operand) -- หมายถึง ตัวเลขหรือตัวแปรในสมการใด ๆ ที่ถูกดำเนินการ ด้วยตัวดำเนินการ (operator) หรือ "เครื่องหมายทางคณิตศาสตร์" ตัวอย่างเช่น `5 * 2` มีตัวถูกดำเนินการ 2 ตัว ด้านซ้ายคือ `5` และด้านขวาคือ `2` บางคนก็เรียกว่าอาร์กิวเม้นท์ (arguments) แทนตัวถูกดำเนินการ (operands)
- ตัวดำเนินการ (operator) เดี่ยว *unary* หมายถึง การมีตัวถูกดำเนินการ (operand) เพียงแค่ตัวเดียว อย่างเช่น การเติมเครื่องหมายลบไว้ที่ข้างหน้าตัวแปร (negation) เพื่อกลับค่าบวก ให้เป็นค่าลบ

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1
    ```
- ตัวดำเนินการ (operator) คู่ *binary* หมายถึง การมีตัวถูกดำเนินการ (operand) สองตัวนั่นเอง อย่างเช่น การลบกันของแปรสองตัว

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // ได้ 2 เกิดจากการลบกันของตัวแปรสองตัว
    ```

    ตามสองตัวอย่างด้านบน เราได้เห็นการดำเนินการสองแบบ ที่ใช้เครื่องหมายลบร่วมกัน การลบแบบเดี่ยว จะกลับค่าจากบวกเป็นลบ จากลบเป็นบวก การลบแบบคู่ จะลบค่าตัวหน้าด้วยค่าตัวหลัง

## การต่อสตริง (String concatenation) ต้องใช้บวกแบบมีตัวดำเนินการสองตัว (binary) 

ทีนี้ มาลองดูฟีเจอร์ของจาวาสคริปต์ ที่ไม่มีสอนในวิชาคณิตศาสตร์ที่โรงเรียนกันบ้าง

โดยปกติแล้ว เราจะเห็นแต่การใช้เครื่องหมายบวก `+` กับตัวเลข

แต่ หากเราใช้เครื่องหมายบวกกับสตริง มันจะเป็นการต่อสตริงสองชุดไว้ด้วยกัน

```js
let s = "my" + "string";
alert(s); // mystring
```

หากตัวถูกดำเนินการใดๆเป็นสตริง ไปบวกกับข้อมูลชนิดอื่นๆ ตัวนั้นก็จะถูกรวมเป็นสตริงเดียวกัน

ตัวอย่างเช่น:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

ไม่สำคัญว่าสตริงจะอยู่หน้า หรือหลังของเครื่องหมาย แต่เมื่อสตริงไปบวกกับอะไรก็ตาม ก็จะถูกรวมเข้ามาเป็นสตริงหมด

อ่อแต่อย่าลืมว่า การดำเนินการในทางโปรแกรมมิ่ง ก็เหมือนกับคณิตศาสตร์ คือ ทำงานจากซ้ายไปขวาเสมอ หากมีตัวเลขบวกกันอยู่ทางซ้าย แล้วตัวที่สามเป็นสตริง ตัวเลขทั้งสองตัวจะบวกกันก่อน จากนั้นผลลัพธ์จะไปรวมกับสตริงตัวสุดท้ายอีกที


```js run
alert(2 + 2 + '1' ); // ได้ "41" ไม่ใช่ "221"
```

การต่อสตริงเป็นฟีเจอร์เฉพาะกับเครื่องหมาย `+` เท่านั้น เครื่องหมายอื่นๆ จะทำงานได้กับตัวเลขอย่างเดียว

ตัวอย่างเช่น การลบ และ การหาร

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## แปลงข้อมูลเป็นตัวเลขด้วยเครื่องหมายบวก

เครื่องหมาย `+` เราสามารถใช้ได้สองแบบ แบบคู่ (binary) ตามตัวอย่างด้านบน และ แบบเดี่ยว (unary)

บวกแบบเดี่ยว (unary) หากเราเพิ่มเครื่องหมายบวก ไว้ข้างหน้าตัวแปร จะเป็นการแปลงข้อมูลที่ไม่ใช่ตัวเลข ให้เป็นตัวเลข

ตัวอย่างเช่น

```js run
// แปลงตัวเลข ก็จะได้ตัวเลขเหมือนเดิม
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// แปลงจากข้อมูลที่ไม่ใช่ตัวเลข
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

จริงๆแล้ว ก็เหมือนกับใช้ฟังชั่นก์ `Number(...)` แต่สั้นกว่า

ในงานจริวเรามักจะเปลี่ยนสตริงเป็นตัวเลขอยู่บ่อยๆเหมือนกัน เช่น เรากำลังรับค่าที่กรอกในแท็ก `form` เพราะค่าที่อยู่ในแท็กนี้มักจะเป็นสตริงเสมอ เพราะหากเราจับบวกเลย

มันจะก็กลายเป็นการนำสตริงมาต่อกันแทน

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // ได้ "23" ซึ่งเกิดจากการต่อสตริง 
```

If we want to treat them as numbers, we need to convert and then sum them:

```js run
let apples = "2";
let oranges = "3";

*!*
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

From a mathematician's standpoint, the abundance of pluses may seem strange. But from a programmer's standpoint, there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we're going to see, that's because of their *higher precedence*.

## Operator precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here's an extract from the [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):

| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
| ... | ... | ... |
| 3 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `16` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.

## Assignment

Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `3`.

That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

It is possible to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

````smart header="The assignment operator `\"=\"` returns a value"
An operator always returns a value. That's obvious for most of them like addition `+` or multiplication `*`. But the assignment operator follows this rule too.

The call `x = value` writes the `value` into `x` *and then returns it*.

Here's a demo that uses an assignment as part of a more complex expression:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries, but shouldn't write anything like that ourselves. Such tricks definitely don't make code clearer or readable.
````

## Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the remainder of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1 is a remainder of 5 divided by 2
alert( 8 % 3 ); // 2 is a remainder of 8 divided by 3
alert( 6 % 3 ); // 0 is a remainder of 6 divided by 3
```

## Exponentiation **

The exponentiation operator `**` is a recent addition to the language.

For a natural number `b`, the result of `a ** b` is `a` multiplied by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

The operator works for non-integer numbers as well.

For instance:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root, that's maths)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```

## Increment/decrement

<!-- Can't use -- in title, because built-in parse turns it into – -->

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for it:

- **Increment** `++` increases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Decrement** `--` decreases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
    ```

```warn
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment a value but use its previous value, we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
