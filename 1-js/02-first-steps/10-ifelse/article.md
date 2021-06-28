# การแตกแขนงแบบมีเงื่อนไข: if, '?'

บางครั้ง เราจำเป็นต้องดำเนินการต่างๆ ตามเงื่อนไขที่แตกต่างกัน

ในการทำเช่นนั้น เราสามารถใช้คำสั่ง `if` และตัวดำเนินการแบบเงื่อนไข (conditional operator) `?` ซึ่งเรียกอีกอย่างว่าโอเปอเรเตอร์ "เครื่องหมายคำถาม (question mark)"

## คำสั่ง "if"

คำสั่ง `if(...)` จะประเมินเงื่อนไขในวงเล็บและรันบล็อกของโค้ดหากผลลัพธ์เป็น `จริง`

ตัวอย่าง:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

ในตัวอย่างข้างต้น เงื่อนไขคือการตรวจความเท่ากันแบบง่ายๆ (`year == 2015`) แต่เราสามารถทำได้ซับซ้อนกว่านี้มาก

หากเราต้องการดำเนินการมากกว่าหนึ่งคำสั่ง เราต้องล้อมบล็อคโค้ดของเราไว้ในวงเล็บปีกกา:

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

เราแนะนำให้ล้อมบล็อคโค้ดด้วยวงเล็บปีกกา `{}` ทุกครั้งที่ใช้คำสั่ง `if` แม้ว่าจะมีเพียงคำสั่งเดียวให้ดำเนินการก็ตาม การทำเช่นนี้จะช่วยให้โค้ดอ่านง่ายขึ้น

## การแปลงค่าชนิดอื่นเป็นบูลีน (Boolean conversion)

คำสั่ง `if (…)` จะประเมินนิพจน์ (expression) ในวงเล็บและแปลงค่าใดๆก็ตามเป็นบูลีน

ทบทวนความจำได้จากบทนี้ <info:type-conversions>:

- เลข `0`, สตริงว่าง `""`, `null` `undefined` และ `NaN` จะกลายเป็น `false` เราจะเรียกค่าเหล่านี้ว่า "falsy"
- ส่วนที่เหลือจะเป็น `true` เราจะเรียกค่าเหล่านี้ส่า "truly"

ดังนั้นโค้ดภายใต้เงื่อนไขนี้จะไม่ทำงาน:

```js
if (0) { // 0 คือ falsy
  ...
}
```

...และภายใต้เงื่อนไขนี้โค้ดจะทำงานส่วนที่อยู่ในบล็อค (วงเล็บปีกกา) ต่อไป

```js
if (1) { // 1 คือ truthy
  ...
}
```

นอกจากนี้เรายังสามารถส่งค่าบูลีนที่ประเมินล่วงหน้า (pre-evaluated) ไปยังคำสั่ง `if` ได้ดังนี้:

```js
let cond = (year == 2015); // บรรทัดนี้หาก year เป็น 2015 จะเป็น `true` หากไม่จะเป็น `false` เก็บไว้ในตัวแปร

if (cond) {
  ...
}
```

## คำสั่ง "else"

คำสั่ง `if` อาจมีบล็อก `else` เป็นตัวเลือกขึ้นมา หากเงื่อนไขในคำสั่ง `if` เป็นเท็จ โปรแกรมจะทำงานในบล็อคของ `else` แทน

ตัวอย่าง:
```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // any value except 2015
}
```

## มีมากกว่าสองเงื่อนไขใช้ "else if"

บางครั้ง เราต้องการทดสอบเงื่อนไขมากกว่าสอง รูปแบบประโยค `else if`

ตัวอย่าง:

```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

ตามโค้ดด้ายบน JavaScript จะตรวจสอบ `year < 2015` ก่อน หากเป็น falsy จะเข้าสู่เงื่อนไขถัดไป `year > 2015` หากเงืื่อนไขยังเป็นเท็จ ก็จะแสดง `alert` ออกมา
มีบล็อค `else if` ได้ตามที่ใจต้องการ ส่วนบล็อค `else` เป็นทางเลือกจะมีหรือไม่มีก็ได้

## ตัวดำเนินการแบบเงื่อนไข (conditional operator) "?"

บางครั้ง เราต้องกำหนดตัวแปรตามเงื่อนไขที่กำหนด

ตัวอย่าง:

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

ตัวดำเนินการที่เรียกว่าแบเงื่อนไข หรือ เครื่องหมายคำถาม ช่วยให้เราเขียนโค้ดสั้นได้กว่า

ตัวดำเนินการนี้จะใช้เครื่องหมายคำถาม `?` บางทีเราก็เรีนยกมันว่า "ไตรภาค (ternary)" เพราะมันมีตัวถูกดำเนินการสามตัว ตัวดำเนินการแบบเงื่อนไขเป็นตัวดำเนินการเพียงตัวเดียวใน JavaScript ที่ใช้ตัวถูกดำเนินการถึงสามตัว โดยปกติจะมีตัวถูกดำเนินการสองตัวเช่น `1 + 1` และ `true && false`

วากยสัมพันธ์ (syntax):
```js
let result = condition ? value1 : value2;
```

ตัวแปร `เงื่อนไข` จะถูกประเมิน: หากเป็นจริง `value1` จะถูกส่งกลับ มิฉะนั้น `value2` จะถูกส่งกลับ

ตัวอย่าง:

```js
let accessAllowed = (age > 18) ? true : false;
```

ในทางเทคนิค เราจะไม่ใส่วงเล็บล้อม `age > 18` ก็ได้

ตัวอย่างนี้จะทำสิ่งเดียวกันกับตัวอย่างก่อนหน้านี้:

```js
// ตัวดำเนินการเปรียบเทียบ "age > 18" จะดำเนินการก่อน
// (จึงไม่จำเป็นต้องใส่วงเล็บ)
let accessAllowed = age > 18 ? true : false;
```

แต่วงเล็บทำให้โค้ดอ่านง่ายขึ้น เราจึงแนะนำให้ใส่ทุกครั้ง

````smart
ในตัวอย่างข้างต้น เราสามารถละตัวดำเนินการ ? ก็ได้ เนื่องจาก "age > 18" เป็นตัวดำเนิินการแบบเปรียบเทียบจะส่งค่ากลับมาเป็น "true/false" อยู่แล้ว:

```js
// ได้ผลลัพธ์เหมือนกัน
let accessAllowed = age > 18;
```
````

## Multiple '?'

A sequence of question mark operators `?` can return a value that depends on more than one condition.

For instance:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

It may be difficult at first to grasp what's going on. But after a closer look, we can see that it's just an ordinary sequence of tests:

1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon '":"', checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon '":"', checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon '":"', returning `'What an unusual age!'`.

Here's how this looks using `if..else`:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Non-traditional use of '?'

Sometimes the question mark `?` is used as a replacement for `if`:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

**It's not recommended to use the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.
