# Arrow functions ขั้นพื้นฐาน

มีการสร้างฟังก์ชันอีกรูปแบบหนึ่งที่ประโยคเรียบง่ายและกระชับกว่านิพจน์ฟังก์ชัน

มันเรียกว่า "Arrow function" เพราะมีรูปประโยคดังนี้:

```js
let func = (arg1, arg2, ..., argN) => expression
```

...ด้วยรูปประโยตดังนี้จะสร้างฟังก์ชัน `func` ที่รับอาร์กิวเมนต์ `arg1..argN` จากนั้นจึงประเมิน `นิพจน์ (expression)` ทางด้านขวาและส่งคืนผลลัพธ์

กล่าวอีกนัยหนึ่งก็คือ เวอร์ชันที่สั้นกว่าของ

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

มาดูตัวอย่างที่เป็นรูปธรรมกัน:

```js run
let sum = (a, b) => a + b;

/* Arrow function นี้เป็นรูปที่เขียนสั้นกว่าของ:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

อย่างที่เราเห็น `(a, b) => a + b` หมายถึงฟังก์ชันที่ยอมรับสองอาร์กิวเมนต์ชื่อ `a` และ `b` เมื่อดำเนินการ มันจะประเมินนิพจน์ `a + b` และส่งคืนผลลัพธ์

- หากเรารับอาร์กิวเมนต์เพียงตัวเดียว วงเล็บรอบพารามิเตอร์สามารถละเว้นได้ ซึ่งจะทำให้มันเขียนสั้นลงอีก

    For example:

    ```js run
    *!*
    let double = n => n * 2;
    // roughly the same as: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- If there are no arguments, parentheses will be empty (but they should be present):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
