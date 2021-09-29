# นิพจน์ฟังก์ชั่น (Function expressions)

ในจาวาสคริปต์ ฟังก์ชันไม่ใช่เมจิกทางภาษา แต่เป็นค่าชนิดพิเศษ

ไวยากรณ์ที่เราใช้ก่อนหน้านี้เรียกว่า *Function Declaration*:

```js
function sayHi() {
  alert( "Hello" );
}
```

มีอีกรูปแบบหนึ่งสำหรับการสร้างฟังก์ชันที่เรียกว่า *Function Expression*

มันมีรูปประโยคแบบนี้:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

ในที่นี้ ฟังก์ชันจะถูกสร้างขึ้นและกำหนดเป็นค่าของตัวแปร เช่นเดียวกับค่าอื่นๆ ไม่ว่าจะกำหนดฟังก์ชันอย่างไร ก็เป็นเพียงค่าที่เก็บไว้ในตัวแปร `sayHi`

ความหมายของตัวอย่างโค้ดด้านบนคือ: "สร้างฟังก์ชันและใส่ลงในตัวแปร `sayHi`"

เราสามารถแสดงค่านั้นออกมาได้โดยใช้ `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // แสดงโค้ดฟังก์ชัน
*/!*
```

บรรทัดสุดท้ายจะไม่ทำงาน เนื่องจากไม่มีวงเล็บเปิด-ปิดหลัง `sayHi` เพื่อเรียกฟังก์ชั่นนี้ทำงาน มีภาษาโปรแกรมมิ่งบางภาษาที่สามารถให้ฟังก์ชั่นทำงานได้เพียงระบุชื่อฟังก์ชั่นโดยไม่ต้องใส่วงเล็บเปิด-ปิด แต่สำหรับจาวาสคริปต์ไม่ได้เป็นแบบนั้น

ในจาวาสคริปต์ฟังก์ชันคือค่าค่าหรึ่ง ดังนั้นเราสามารถจัดการกับมันเป็นค่าได้ โค้ดของฟังก์ชั่นทั้งหมดจะถูกแสดงออกมาด้วยค่าสตริง

แน่นอนว่า ฟังก์ชันเป็นค่าพิเศษ นั่นคือเราสามารถสั่งให้มันทำงานได้โดยการเติมวงเล็บ `sayHi()`

แต่มันก็ยังคงเป็นค่าอยู่ ดังนั้นเราจึงสามารถทำงานกับมันได้เหมือนกับค่าอื่นๆ

เราสามารถคัดลอกฟังก์ชันไปยังตัวแปรอื่นได้:

```js run no-beautify
function sayHi() {   // (1) สร้างฟังก์ชั่น
  alert( "Hello" );
}

let func = sayHi;    // (2) คัดลอกฟังก์ชั่น

func(); // Hello     // (3) สั่งตัวก็อปปี้ทำงาน (ทำงานได้)
sayHi(); // Hello    //     สั่งตัวดั้งเดิมทำงาน (ทำงานได้เช่นกัน)
```

นี่คือสิ่งที่เกิดขึ้นจากโค้ดข้างบนโดยละเอียด:

1. การประกาศฟังก์ชั่น (Function Declaration) `(1)` สร้างฟังก์ชันและใส่ลงในตัวแปรชื่อ `sayHi`
2. บรรทัด `(2)` คัดลอกลงในตัวแปร `func` อย่าลืมว่า: ไม่มีวงเล็บหลังหลังฟังก์ชั่น `sayHi` หากมีวงเล็บแบบนี้ `func = sayHi()` ผลลัพธ์ที่คืนกลับมาจาก `sayHi()` จะเก็บไว้ในตัวแปร `func` ไม่ใช่ตัวฟังก์ชั่น `sayHi` เอง
3. ตอนนี้ฟังก์ชันนี้สามารถเรียกได้ทั้ง `sayHi()` และ `func()`

โปรดทราบว่าเราสามารถใช้ Function Expression เพื่อประกาศ `sayHi` ในบรรทัดแรกได้:

```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

ทุกอย่างจะทำงานเหมือนกัน


````smart header="ทำไมมี semicolon ต่อท้าย?"
อาจสงสัยว่าทำไม Function Expression ถึงมีเครื่องหมายอัฒภาค `;` ต่อท้าย แต่ Function Declaration ไม่มี:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

คำตอบนั้นง่ายมาก:
- เราไม่จำเป็นต้องใช้ `;` ที่ส่วนท้ายของบล็อคโค้ดเช่น `if { ... }`, `for { }`, `function f { }` เป็นต้น
- นิพจน์ฟังก์ชัน (Function expressions) ถูกใช้ภายในคำสั่ง: `let sayHi = ...;` เป็นค่าค่าหนึ่งที่ถูกกำหนดให้กับตัวแปร ไมใช่บล็อคโค้ด เราจึงแนะนำให้ใช้เครื่องหมายอัฒภาค `;` ที่ส่วนท้ายของคำสั่ง ไม่ว่าค่าจะเป็นเท่าใด ดังนั้น semicolon ที่นี่จึงไม่เกี่ยวข้องกับนิพจน์ฟังก์ชัน เพียงแต่บอกให้โปรแกรมรู้ว่านี่คือส่วนยุติคำสั่งเพื่อขึ้นคำสั่งถัดไป
````

## ฟังก์ชันไว้เรียกทีหลัง (Callback functions)

มาดูตัวอย่างเพิ่มเติมของการส่งฟังก์ชันเป็นค่าและการใช้นิพจน์ฟังก์ชั่น (function expressions)

เราจะลองมาเขียนฟังก์ชั่น `ask(question, yes, no)` ด้วยพารามิเตอร์สามตัว:

`question`
: ข้อความถาม

`yes`
: ฟังก์ชั่นที่ทำงานหากคำตอบคือ "Yes"

`no`
: ฟังก์ชั่นที่ทำงานหากคำตอบคือ "No"

ฟังก์ชั่นควรถาม `question` จากนั้นให้กำหนดเงื่อนไขเพื่อเรียกใช้ฟังก์ชั่น `yes()` หรือ `no()` ตามคำตอบของผู้ใช้:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// การใช้งาน: ฟังก์ชั่น showOk, showCancel ถูกส่งผ่านเป็นอาร์กิวเมนต์เพื่อใช้ถาม
ask("Do you agree?", showOk, showCancel);
```

ในทางปฏิบัติ ฟังก์ชั่นดังกล่าวมีประโยชน์มาก ความแตกต่างที่สำคัญระหว่าง "การถาม" ในชีวิตจริงกับตัวอย่างข้างต้นคือฟังก์ชันในชีวิตจริงใช้วิธีที่ซับซ้อนกว่าในการโต้ตอบกับผู้ใช้มากกว่า `confirm` ในเบราว์เซอร์ธรรมดาๆ ฟังก์ชันดังกล่าวมักจะสร้างหน้าต่างคำถามที่ดูดีกว่า

**อาร์กิวเมนต์ `showOk` และ `showCancel` ของฟังก์ชั่น `ask` เรียกว่า *ฟังก์ชันไว้เรียกทีหลัง (Callback functions)* หรือบางทีเราก็เรียกสั้นๆแค่ *Callback***

แนวคิดคือเราส่งฟังก์ชันและคาดว่าจะ "เอาไว้เรียกทีหลัง" หากจำเป็น ในกรณีของเรา `showOk` ก็คือฟังก์ชั่น Callback สำหรับคำตอบ "yes" และ `showCancel` สำหรับคำตอบ "no"
เราสามารถgเขียนเป็น Function Expressions เพื่อให้ฟังก์ชั่นส้ันลงได้ดังนี้:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

ในที่นี้ ฟังก์ชั่นต่างๆ จะถูกประกาศไว้ภายใน `ask(...)` ฟังก์ชั่นเหล่านี้ไม่มีชื่อ เราจึงเรียกว่าฟังก์ชั่นเหล่านี้ว่า *anonymous* ฟังก์ชันดังกล่าวไม่สามารถเข้าถึงได้จากภายนอกฟังก์ชั่น 'ask' (เพราะไม่ได้กำหนดเข้าตัวแปร)

โค้ดดังกล่าวที่ปรากฏในสคริปต์เป็นเรื่องปกติสำหรับจาวาสคริปต์

```smart header="ฟังก์ชั่นคือค่าที่เป็นตัวแทนของ \"การกระทำ\""
ค่าปกติเช่นสตริงหรือตัวเลขเป็นตัวแทนของ *ข้อมูล*

ฟังก์ชั่นจะถูกรับรู้ว่าคือ *การกระทำ* เสมอ

เราสามารถส่งต่อฟังก์ชั่นระหว่างตัวแปรและเรียกใช้ฟังก์ชั่นนั้นผ่านตัวแปรเมื่อเราต้องการได้
```


## Function Expression vs Function Declaration

มาดูความแตกต่างระหว่างการประกาศฟังก์ชั่น (Function Declaration) และ นิพจน์ฟังก์ชั่น (Function Expression)

อันดับแรก ไวยากรณ์: วิธีแยกความแตกต่างระหว่างทั้งสองในโค้ด

- *การประกาศฟังก์ชั่น:* ฟังก์ชันที่ประกาศเป็นคำสั่งแยกต่างหากในโฟลว์โค้ดหลัก

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *นิพจน์ฟังก์ชั่น:* ฟังก์ชันที่สร้างขึ้นภายในนิพจน์หรือภายในโครงสร้างไวยากรณ์อื่น ในทีนี้เราเขียนฟังก์ชั่นด้านขวาของ "assignment expression" `=`

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

ความซับซ้อนจะยิ่งมากขึ้น *เมื่อ* JavaScript engine มาเกี่ยวข้องด้วย

**นิพจน์ฟังก์ชั่นจะถูกสร้างขึ้นเมื่อการดำเนินการมาถึง และสามารถใช้ได้ในช่วงเวลานั้นเท่านั้น**

นั่นก็คือนิพจน์ฟังก์ชั่นจะทำงานตามโฟลว์การทำงานของโปรแกรม ซึ่งจะเหมือนกับการอ่านหนังสือของคนเรา นั่นคือจากซ้ายไปขวาและบนลงล่าง `let sum = function…` นั่นหมายถึงนิพจน์ฟังก์ชั่นสามารถใช้งานได้จากบรรทัดที่เพิ่งถูกกำหนดลงมาเท่านั้น

ส่วนการประกาศฟังก์ชัน (Function Declarations) จะต่างออกไป

**การประกาศฟังก์ชันสามารถเรียกได้เร็วกว่าที่กำหนดไว้**

นั่นก็คือการประกาศฟังก์ชัน (Function Declarations) เป็น global scope ไม่ว่าเราจะประกาศฟังก์ชั่นส่วนไหนของสคริปต์ เราก็สามารถเรียกใช้ฟังก์ชั่นนั่นได้

นั่นเป็นเพราะอัลกอริธึมของ JavaScript engine เมื่อจาวาสคริปต์เตรียมที่จะรันสคริปต์ อันดับแรกมันจะค้นหา Global Function Declarations ในสคริปต์นั้นๆ และสร้างฟังก์ชันขึ้นมาก่อน เราเรียกขั้นตอนนี้ว่า "initialization stage"

และหลังจากประมวลผลบรรดาการประกาศฟังก์ชันทั้งหมด (Function Declarations) แล้ว โค้ดก็จะถูกดำเนินการ จึงมีการเข้าถึงฟังก์ชั่นเหล่านี้

ตัวอย่างเช่น:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

การประกาศฟังก์ชัน `sayHi` ถูกสร้างขึ้นเมื่อ JavaScript กำลังเตรียมที่จะเริ่มสคริปต์ ดังนั้นทุกส่วนในสคริปต์จึงเห็นฟังก์ชั่น `sayHi`

...หากเป็น Function Expression มันก็จะใช้งานไม่ได้:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

นิพจน์ฟังก์ชันจะถูกสร้างขึ้นเมื่อการดำเนินการมาถึง ที่จะเกิดขึ้นเฉพาะในบรรทัด `(*)` ดังนั้นหากเราจะเรียกใช้ ควรเรียกในบรรทัดถัดไป

คุณสมบัติพิเศษอีกอย่างของการประกาศฟังก์ชัน (Function Declarations) คือขอบเขตบล็อก

**ใน strict mode, เมื่อการประกาศฟังก์ชันอยู่ในบล็อกโค้ด โค้ดที่อยู่ในบล็อคนั้นจะมองเห็นฟังก์ชั่นที่เพิ่งประกาศตัวนี้หมด แต่ไม่สามารถมองเห็นได้จากภายนอกบล็อค**

ตัวอย่างเช่น สมมติว่าเราจำเป็นต้องประกาศฟังก์ชัน `welcome()` ขึ้นอยู่กับตัวแปร `age` ที่เราได้รับระหว่างรันไทม์ แล้วเราวางแผนที่จะใช้มันในภายหลัง

ถ้าเราใช้การประกาศฟังก์ชัน Function Declaration ก็จะไม่ทำงานตามที่ตั้งใจไว้:

```js run
let age = prompt("What is your age?", 18);

// ประกาศฟังก์ชันแบบมีเงื่อนไข
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...ใช้ทีหลัง
*!*
welcome(); // Error: welcome is not defined
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
