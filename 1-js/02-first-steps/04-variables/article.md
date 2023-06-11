# ตัวแปร

ส่วนใหญ่แอปพลิเคชัน JavaScript จำเป็นต้องทำงานกับข้อมูล ต่อไปนี้เป็นตัวอย่างสองแอพที่เราคุ้นเคยกัน:
1. ร้านค้าออนไลน์ - ข้อมูลอาจจะรวมถึงสินค้าที่ขายและรถเข็นสินค้า
2. แอปพลิเคชันแชท - ข้อมูลอาจจะรวมถึงผู้ใช้ ข้อความ และอื่นๆอีกมากมาย

ตัวแปรจะถูกใช้เพื่อจัดเก็บข้อมูลนี้

## ตัวแปร

[ตัวแปร](https://en.wikipedia.org/wiki/Variable_(computer_science)) เป็น "ที่เก็บข้อมูลที่มีชื่อ" เราสามารถใช้ตัวแปรเพื่อเก็บสิ่งที่สนใจ, ผู้เยี่ยมชม, และข้อมูลอื่นๆ

การสร้างตัวแปรใน JavaScript, เราใช้คีย์เวิร์ด `let`

คำสั่งด้านล่างนี้สร้าง (หรือเรียกอีกอย่างหนึ่งว่า: *ประกาศ (declares)*) ตัวแปรที่มีชื่อว่า "message":

```js
let message;
```

ตอนนี้, เราสามารถใส่ข้อมูลลงไปในมันด้วยการใช้ตัวดำเนินการกำหนดค่า (assignment operator) `=`:

```js
let message;

*!*
message = 'สวัสดี'; // เก็บสตริง 'สวัสดี' ลงในตัวแปรที่ชื่อ message
*/!*
```

สตริงถูกบันทึกลงในพื้นที่หน่วยความจำที่เชื่อมโยงกับตัวแปร ที่เราสามารถเข้าถึงสตริงนี้ได้โดยใช้ชื่อตัวแปร:

```js run
let message;
message = 'สวัสดี!';

*!*
alert(message); // แสดงเนื้อหาของตัวแปร
*/!*
```

เพื่อความกระชับ, เราสามารถรวมการประกาศตัวแปรและการกำหนดค่าเข้าด้วยกันในบรรทัดเดียว:

```js run
let message = 'สวัสดี!'; // กำหนดตัวแปรและกำหนดค่า

alert(message); // สวัสดี!
```

เรายังสามารถประกาศตัวแปรหลายตัวในบรรทัดเดียว:

```js no-beautify
let user = 'จอห์น', age = 25, message = 'สวัสดี';
```

ที่อาจดูสั้นกว่า, แต่เราไม่แนะนำ เพื่อให้อ่านได้อ่านขึ้น, เราแนะนำว่าควรประกาศหนึ่งตัวแปรต่อหนึ่งบรรทัด

แบบที่มีหลายบรรทัดนั้นยาวขึ้นนิดหน่อย, แต่ง่ายต่อการอ่าน:

```js
let user = 'จอห์น';
let age = 25;
let message = 'สวัสดี';
```

บางคนยังกำหนดตัวแปรหลายตัวในรูปแบบที่มีหลายบรรทัดนี้:

```js no-beautify
let user = 'จอห์น',
  age = 25,
  message = 'สวัสดี';
```

...หรือแม้กระทั่งในรูปแบบ "comma-first":

```js no-beautify
let user = 'จอห์น'
  , age = 25
  , message = 'สวัสดี';
```

จากทางเทคนิค, ทุกๆ รูปแบบนี้ทำงานเหมือนกัน ดังนั้น, มันเป็นเรื่องของรสนิยมส่วนบุคคลและความสวยงามของโค้ด

````smart header="`var` แทน `let`"
ในสคริปต์ที่เก่ากว่า, คุณอาจจะพบคีย์เวิร์ดอื่น: `var` แทน `let`:

```js
*!*var*/!* message = 'สวัสดี';
```

คีย์เวิร์ด `var` นั้น *แทบจะ* เหมือนกับ `let` มันคือประกาศตัวแปรเหมือนกัน แต่มันแบบเก่า

มีความแตกต่างที่ละเอียดระหว่าง `let` และ `var` แต่ไม่สำคัญสำหรับเราในขณะนี้ เราจะพูดถึงเรื่องนี้อย่างละเอียดในบท <info:var>
````

## หากเทียบกับชีวิตจริง

เราสามารถเข้าใจแนวคิดของ "ตัวแปร" ได้ง่ายหากเราจินตนาการว่ามันคือ "กล่อง" สำหรับข้อมูล, มีสติ๊กเกอร์ที่มีชื่อที่ไม่ซ้ำกันติดอยู่บนกล่อง

ตัวอย่างเช่น ตัวแปร `message` สามารถจินตนาการได้ว่าเป็นกล่องที่มีป้ายชื่อ `"message"` และมีค่า `"สวัสดี!"` อยู่ในกล่อง:

![](variable.svg)

เราสามารถใส่ค่าอะไรก็ได้ลงในกล่อง

เรายังสามารถเปลี่ยนแปลงค่าในกล่องได้เท่าที่เราต้องการ:

```js run
let message;

message = 'สวัสดี!';

message = 'โลก!'; // ค่าถูกเปลี่ยน

alert(message);
```

เมื่อค่าถูกเปลี่ยน ข้อมูลเก่าจะถูกลบออกจากตัวแปร:

![](variable-change.svg)

เรายังสามารถประกาศตัวแปรสองตัวและคัดลอกข้อมูลจากตัวหนึ่งไปยังอีกตัวหนึ่ง

```js run
let hello = 'สวัสดี โลก!';

let message;

*!*
// คัดลอก 'สวัสดี โลก!' จาก hello ไปยัง message
message = hello;
*/!*

// ตอนนี้มีตัวแปรสองตัวที่เก็บข้อมูลเดียวกัน
alert(hello); // สวัสดี โลก!
alert(message); // สวัสดี โลก!
```

````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

```smart header="Functional languages"
It's interesting to note that there exist so-called [pure functional](https://en.wikipedia.org/wiki/Purely_functional_programming) programming languages, such as [Haskell](https://en.wikipedia.org/wiki/Haskell), that forbid changing variable values.

In such languages, once the value is stored "in the box", it's there forever. If we need to store something else, the language forces us to create a new box (declare a new variable). We can't reuse the old one.

Though it may seem a little odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits.
```

## Variable naming [#variable-naming]

There are two limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:

```js
let userName;
let test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word except first starting with a capital letter: `myVeryLongName`.

What's interesting -- the dollar sign `'$'` and the underscore `'_'` can also be used in names. They are regular symbols, just like letters, without any special meaning.

These names are valid:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

Examples of incorrect variable names:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including cyrillic letters, Chinese logograms and so on, like this:

```js
let имя = '...';
let 我 = '...';
```

Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it some time.
````

````warn header="Reserved names"
There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.

The code below gives a syntax error:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

````warn header="An assignment without `use strict`"

Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using `let`. This still works now if we don't put `use strict` in our scripts to maintain compatibility with old scripts.

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist

alert(num); // 5
```

This is a bad practice and would cause an error in strict mode:

```js
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```
````

## Constants

To declare a constant (unchanging) variable, use `const` instead of `let`:

```js
const myBirthday = '18.04.1982';
```

Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and clearly communicate that fact to everyone.

### Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.

Such constants are named using capital letters and underscores.

For instance, let's make constants for colors in so-called "web" (hexadecimal) format:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:

```js
const pageLoadTime = /* time taken by a webpage to load */;
```

The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant because it doesn't change after assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.

## Name things right

Talking about variables, there's one more extremely important thing.

A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.

An extra variable is good, not evil.

Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
```

## Summary

We can declare variables to store data by using the `var`, `let`, or `const` keywords.

- `let` -- is a modern variable declaration.
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.

Variables should be named in a way that allows us to easily understand what's inside them.