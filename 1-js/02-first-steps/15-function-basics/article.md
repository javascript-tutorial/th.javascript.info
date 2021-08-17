# ฟังก์ชั่น (Functions)

บ่อยครั้งที่เราเขียนโปรแกรม จะต้องมีชุดงานหนึ่งๆที่อยากจะให้มันทำงานซ้ำๆ ในหลายๆที่ของไฟล์สคริปต์

ตัวอย่างเช่น เราต้องการแสดงข้อความที่ดูดีเมื่อผู้ใช้ล็อคอินเข้าสู่ระบบ ออกจากระบบ หรือเข้าไปตามหน้าต่างๆ

ฟังก์ชั่นเป็น "building blocks" หลักของโปรแกรม เราสามารถเรียกใช้ได้หลายๆครั้ง

เราได้เห็นฟังก์ชั่นพวกนี้กันมาบ้างแล้วอย่างเช่น `alert(message)`, `prompt(message, default)` และ `confirm(question)` ฟังก์ชั่นเหล่านี้เป็นฟังชั่นก์ที่เบราเซอร์มีมาให้ แต่เราสามารถสร้างฟังชั่นก์ได้ด้วยตัวเองได้ด้วย

## การประกาศฟังก์ชั่น

เราสร้างฟังชั่นก์โดยใช้ *การประกาศฟังก์ชั่น*.

โดยที่มันมีหน้าตาแบบนี้:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

เราเขียน `function` ก่อน ตามด้วย *ตั้งชื่อให้ฟังชั่นก์* ตามด้วย *พารามิเตอร์* ที่อยู่ระหว่างวงเล็บ (เราใช้ลูกน้ำเพื่อให้ฟังชั่นก์รับพารามิเตอร์ได้หลายตัว) และสุดท้ายปีกกาหรือ "the function body" เป็นคำสั่งที่เราอยากให้โปรแกรมทำงานเมื่อเราเรียกใช้ฟังชั่นก์นี้

```js
function name(parameter1, parameter2, ... parameterN) {
  ...body...
}
```

เราสามารถใช้ฟังก์ชั่นที่เราสร้างขึ้นมาได้โดยเรียกผ่านชื่อของมันตามด้วยวงเล็บเปิด-ปิด `showMessage()`

ตัวอย่าง:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

จากโค้ดด้านบนจะเห็นว่าเราเรียกฟังก์ชั่น `showMessage()` ทำงาน 2 ที ที่นี่เราเลยเห็น `alert` ออกมาสองครั้ง

เราจะเห็นได้จากตัวอย่างด้านบนว่า วัตถุประสงค์หลักของฟังก์ชั่นคือลดความซ้ำซ้อนของโค้ดลง

หากเราต้องการจะแก้ไขข้อความที่แสดง เราก็แค่ไปแก้ไขในฟังก์ชั่นตัวนั้นแทน

## ตัวแปรภายใน (Local variables)

ตัวแปรภายใน (Local variables) คือตัวแปรที่ประกาศภายในฟังก์ชั่น จะมองเห็นได้เฉพาะในฟังก์ชั่นเท่านั้น

For example:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // ตัวแปรภายใน
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! ตัวแปรนี้เป็นตัวแปรภายในมองเห็นได้เฉพาะภายในฟังก์ชั่น showMessage เท่านั้น
```

## ตัวแปรภายนอก (Outer variables)

ฟังก์ชั่นสามารถเข้าถึงตัวแปรภายนอกได้ ตัวอย่างเช่น

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

ฟังก์ชั่นเข้าถึงตัวแปรภายนอกได้อย่างเต็มรูปแบบ นั่นหมายความว่ามันสามารถแก้ไขของที่อยู่ในตัวแปรได้ด้วย

ตัวอย่างเช่น

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) เป็นค่าของตัวแปรภายนอก

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* ก่อนฟังก์ชั่นจะถูกเรียก ยังเป็น John อยู่

showMessage();

alert( userName ); // *!*Bob*/!*, มาดูตัวแปรหลังฟังก์ชั่นถูกเรียก จะเห็นว่าเป็น Bob ไปแล้ว
```

ตัวแปรภายนอกจะถูกใช้ก็ต่อเมื่อไม่มีตัวแปรภายในให้ใช้

หากมีการประกาศตัวแปรภายนอกกับภายในชื่อเดียวกัน ฟังก์ชั่นจะใช้ตัวแปรที่อยู่ภายในแทน ดูจากตัวอย่างด้านล่าง

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // ประกาศตัวแปรภายใน
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

```smart header="ตัวแปรภายนอก (Global variables)"
ตัวแปรภายนอกคือตัวแปรที่ประกาศข้างนอกฟังก์ชั่น อย่างเช่นโค้ดจากด้านบน ตัวแปรชื่อ `userName` จะเรียกว่าตัวแปรภายนอก (Global variables)

ตัวแปรภายนอกทุกฟังก์ชั่นสามารถมองเห็นได้ (ยกเว้นแต่จะเป็นตัวแปรภายในที่ชื่อเดียวกันกับตัวแปรภายนอก)

แนวทางปฎิบัติที่ดี เราจะพยายามลดการใช้ตัวแปรภายนอกให้น้อยที่สุด ยิ่งโค้ดใหม่ๆยิ่งมีตัวแปรภายนอกไม่กี่ตัวหรือไม่ก็ไม่มีเลย ตัวแปรส่วนใหญ่จะอยู่ภายในฟังก์ชั่น แต่ตัวแปรภายนอกก็มีประโยชน์ โดยเราใช้เก็บข้อมูลระดับโปรเจค (project-level data)
```

## พารามิเตอร์

เราสามารถส่งข้อมูลใดๆเข้าไปประมวลผลในฟังก์ชั่นก็ได้โดยใช้พารามิเตอร์

ในจากตัวอย่างด้านล่าง ฟังก์ชั่นนี้มีสองพารามิเตอร์คือ `from` และ `text`

```js run
function showMessage(*!*from, text*/!*) { // สองพารามิเตอร์: from และ text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
```

เมื่อฟังก์ชั่นถูกเรียกในบรรทัด `(*)` และ `(**)` ค่าที่ถูกกำหนดถูกคัดลอกไปยังตัวแปรภายในคือ `from` และ `text` เพื่อให้ฟังก์ชั่นเรียกใช้พารามิเตอร์เหล่านี้ได้

นี่เป็นอีกหนึ่งตัวอย่าง: เรามีตัวแปร `from` ใส่ผ่านไปยังฟังก์ชั่น เราจะเห็นว่าข้างในฟังชั่นก์เราเปลี่ยนค่าตัวแปร `from` ใหม่ แต่การเปลี่ยนแปลงนี้ไม่ได้กระทบกับตัวแปร `from` ที่อยู่ภายนอก เพราะเราเปลี่ยนผ่านพารามิเตอร์ซึ่งเป็นตัวคัดลอกของ `from` ภายนอกอีกที โปรดจำไว้ว่าฟังชั่นก์จะได้รับค่าจากตัวแปรเวอร์ชั่นคัดลอกไปเสมอ

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // เปลี่ยนให้ "from" ดูโดดเด่นขึ้นมาหน่อย
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// ต่าจาก "from" เหมือนกัน, แต่ฟังชั่นก์จะจัดการกับค่าที่ก็อปปี้เสมอ
alert( from ); // Ann
```

เราเรียกค่าที่เราใส่เข้าไปในฟังก์ชั่นอีกชื่อหนึ่งว่า *อาร์กิวเมนต์ (argument)*

เพื่อให้กระจ่างมากขึ้น:

- พารามิเตอร์คือตัวแปรที่อยู่ในวงเล็บตอนประกาศฟังก์ชั่น (ตอนประกาศฟังชั่นก์เราเรียกพารามิเตอร์)
- อาร์กิวเมนต์คือค่าที่ส่งผ่านไปยังฟังก์ชั่น เมื่อฟังก์ชั่นนั้นถูกเรียกใช้ (ตอนใช้ค่าที่ใส่ไปเรียกอาร์กิวเมนต์)

เราประกาศฟังก์ชั่นใส่พารามิเตอร์ แล้วตอนเรียกฟังก์ชั่นเราส่งผ่านค่าอาร์กิวเมนต์

จากตัวอย่างด้านบน ฟังก์ชั่น `showMessage` ประกาศด้วยสองพารามิเตอร์ เราเรียกฟังชั่นก์นี้ส่งอาร์กิวเมนต์ไปสองตัวคือ `from` และ `"Hello"`

## ค่าเริ่มต้น (Default values)

เมื่อฟังก์ชั่นถูกเรียก แต่เราไม่ได้ใส่อาร์กิวเมนต์มา ค่าของตัวที่ไม่ได้ใส่จะเป็น `undefined`

กลับมากันที่ฟังก์ชั่น `showMessage(from, text)` มันสามารถถูกเรียกใช้ได้ โดยใส่อาร์กิวเมนต์แค่ตัวเดียว

```js
showMessage("Ann");
```

มันจะไม่ error ผลลัพธ์จะเป็น `"*Ann*: undefined"` จากการที่ค่า `text` ไม่ได้ถูกใส่มา จึงทำให้เป็น `undefined`

เราสามารถระบุค่าที่เรียกว่า "default" สำหรับพารามิเตอร์ได้ตอนประกาศฟังก์ชั่นโดยใช้  `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

ที่นี้หากพารามิเตอร์ `text` ไม่ถูกใส่ค่ามา ค่าของมันจะเป็น `"no text given"` แทน

`"no text given"` คือสตริง, แต่มันสามารถเป็นนิพจน์ (expression) ที่ซับซ้อนกว่านี้ก็ได้ เหมือนตอนเราประกาศตัวแปร โดยนิพจน์จะถูกประมวลผลเมืิ่อเราไม่ใส่ค่าเข้ามา ตามตัวอย่างด้านล่างดังนี้

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() จะทำงานก็ต่อเมื่อ พารามิเตอร์ `text` ไม่ถูกใส่ค่ามา
  // สิ่งที่ฟังชั่นก์ anotherFunction() ส่งกลับมาจะเป็นค่าของ `text`
}
```

```smart header="การประมวลผลของค่าเริ่มต้นสำหรับพารามิเตอร์"
ในจาวาสคริปต์ ค่าเริ่มต้นสำหรับพารามิเตอร์ จะถูกประมวลผลทุกๆครั้งที่ ฟังก์ชั่นถูกเรียกโดยไม่มีค่าใส่เข้ามาในพารามิเตอร์นั้นๆ

จากตัวอย่างด้านบน ฟังก์ชั่น `anotherFunction()` จะไม่ถูกเรียกเลย หากพารามิเตอร์ `text` ถูกใส่ค่าเข้ามา

อีกทางหนึ่งคือ ฟังก์ชั่น `anotherFunction()` จะถูกเรียกทุกคร้ัง หากพารามิเตอร์ `text` ไม่ถูกใส่ค่าอะไรมาเลย
```

### กำหนดค่าเริ่มต้นทีหลัง

บางครั้งเราก็อยากกำหนดค่าเริ่มต้นสำหรับพารามิเตอร์หลังการประกาศฟังก์ชั่น

เราทำได้โดยเราสามารถตรวจสอบว่าพารามิเตอร์ที่ถูกส่งผ่านฟังก์ชั่น โดยเทียบกับ `undefined`

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // เช็คว่าพารามิเตอร์ถูกส่งเข้ามา
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...หรือเราจะใช้ตัวดำเนินการ `||` ก็ได้

```js
function showMessage(text) {
  // หาก `text` เป็น falsy value สตริง empty จะถูกกำหนดให้เป็นค่าของ `text`
  text = text || 'empty';
  ...
}
```

จาวาสคริปต์ปัจจุบันนี้รับรอง [ตัวดำเนินการรวมเป็นโมฆะ (nullish coalescing operator)](info:nullish-coalescing-operator) `??` แล้ว เราใช้ตัวดำเนินการตัวนี้ดีกว่า ใช้ `||` เนื่องจากมันดัก falsy values ออกไปทั้งหมด แต่โดยมากเราก็จะ falsy values หลายตัวเป็นค่าเริ่มต้นเช่น สตริงเปล่า หรือ เลข `0` เป็นต้น

```js run
function showCount(count) {
  // หาก count เป็น undefined หรือ null ให้แสดง "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## ส่งผลลัพธ์หรือค่ากลับ

ฟังก์ชั่นสามารถส่งค่ากลับสู่ ตัวแปร พารามิเตอร์ อาร์กิวเมนต์ หรืออะไรก็ตามที่เรียกใช้มันได้

ตัวอย่างที่ง่ายที่สุดคือ ฟังก์ชั่นที่ส่งผลลัพธ์จากสองจำนวนบวกกัน

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

It is possible to use `return` without a value. That causes the function to exit immediately.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`.

````smart header="A function with an empty `return` or without it returns `undefined`"
If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

An empty `return` is also the same as `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

````

````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
That doesn't work, because JavaScript assumes a semicolon after `return`. That'll work the same as:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [Lodash](http://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
