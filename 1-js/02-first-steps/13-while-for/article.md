# ลูบแบบ while และ for

เราใช้เพื่อทำงานที่ต้องทำซ้ำๆ

ตัวอย่างเช่น เราจะเขียนโค้ดให้ปริ้นรายชื่อสินค้าออกจากรายการทีละรายการ หรือ อยากเขียนโค้ดนิดเดียวเพื่อให้ทำงานแบบเดียวกันได้

*ลูบ* คือวิธีที่ช่วยให้เราทำงานโค้ดชุดเดียวกันซ้ำๆตามที่เราต้องการ

## ลูบ "while"

ลูบ `while` มีรูปประโยคดังนี้:

```js
while (condition) {
  // โค้ดที่เราจะให้ทำงาน
  // จะอยู่ภายในปีกกานี้
}
```

หมายความ ในขณะที่ `condition` เป็น truthy ตัว `code` ในอยู่ภายในปีกกาจะทำงานไปเรื่อยๆจนกว่า `condition` จะเป็น falsy

ตัวอย่างเช่น ลูบด้านล่างจะแสดงค่าของ `i` ออกมาเรื่อยๆถ้า `i < 3` (i น้อยกว่า 3):

```js run
let i = 0;
while (i < 3) { // แสดง 0 ตามด้วย 1 ตามด้วย 2
  alert( i );
  i++;
}
```

การงานในปีกกา 1 ครั้ง เราเรียกมันว่า *การวนซ้ำ (iteration)* และจากโค้ดด้านบนมีการวนซ้ำจำนวน 3 ครั้ง

หากเราลบ `i++` ออกจากโค้ดตัวอย่างด้านบน, ลูบจะทำงานซ้ำๆ(ในทางทฤษฎี)ตลอดไป ฉะนั้นเว็บเบราเซอร์จึงมีวิธีการหยุดลูบประเภทนี้ไว้ด้วย และหากเป็น server-side เราสามารถทำได้โดยการ kill the process

นิพจน์ (expression) หรือตัวแปรใดๆ ก็สามารถเป็นเงื่อนไขให้กับลูบ "while" ได้ โดยเงื่อนไขที่ของลูบ "while" จะถูกแปลงเป็นค่าบูลีนทั้งหมด

ตัวอย่างเช่น หากจะเขียน `while (i != 0)` แบบสั้นๆ เราสามารถเขียนเป็น `while (i)` ก็ได้:

```js run
let i = 3;
*!*
while (i) { // เมื่อ i เป็น 0 เงื่อนไขจะเป็น falsy ลูบนี้จะหยุดการทำงาน
*/!*
  alert( i );
  i--;
}
```

````smart header="ไม่จำเป็นต้องใส่ปีกกาก็ได้ หากเขียนเพียงคำสั่งเดียว"
หากเขียนเพียงคำสั่งเดียว เราสามารถละปีกกาได้ `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## ลูบ "do..while"

รูปประโยคของลูบ "do..while" ส่วนเงื่อนไขจะถูกย้ายไปด้านล่างดังนี้:

```js
do {
  // loop body
} while (condition);
```

ลูบ "do..while" จะทำงานส่วนปีกกาก่อน แล้วค่อยไปเช็คเงื่อนไข หากเงื่อนไขยังเป็น truthy อยู่ ก็จะทำงานไปเรื่อยๆจนกว่าเงื่อนไขจะเป็น falsy

ตัวอย่างเช่น:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

ลูบ "do..while" มักจะใช้กับการทำงานใดๆที่ต้องทำไปก่อน **อย่างน้อยหนึ่งครั้ง** โดยไม่สนใจเงื่อนไข แต่โดยปกติเราจะใช้ลูบ "while" กันเพราะลูบ "do..while" มี usecase น้อยมาก

## ลูบ "for"

ลูบ `for` จะซับซ้อนกว่าเดิมหน่อย แต่เป็นลูบที่ทุกใช้บ่อยที่สุด

หน้าตาเป็นแบบนี้:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

มารู้จักกับสามส่วนหลักๆของลูบนี้จากตัวอย่างด้านล่าง จะอ่านได้ว่าเรียกใช้ฟังก์ชั่น `alert(i)` สำหรับ `i` ตั้งแต่ `0` จนถึง (แต่ไม่รวม) `3` 

```js run
for (let i = 0; i < 3; i++) { // แสดง 0 ต่อด้วย 1 ต่อด้วย 2
  alert(i);
}
```

มาลองดูคำสั่ง `for` กันทีละส่วน:

| part      |            |                                                                            |
|-----------|------------|----------------------------------------------------------------------------|
| begin     | `i = 0`    | ทำงานหนึ่งครั้งเมื่อเข้าลูบ                                                        |
| condition | `i < 3`    | ตรวจสอบก่อนการวนซ้ำทุกรอบ หากเป็นเท็จ การวนซ้ำจะหยุด                              |
| body      | `alert(i)` | ทำงานซ้ำไปเรื่อยๆหากเงื่อนไขเป็นจริง                                              |
| step      | `i++`      | ทำงานหลังการทำงานในส่วนปีกกาเสร็จสิ้นแต่ละครั้ง                                     |

หลักการการทำงานของลูบทั่วไปจะทำงานดังต่อไปนี้:

```
เริ่มทำงาน
→ (หากส่วน condition เป็นจริง → ทำงานในส่วน body เมื่อเสร็จก็ทำงานในส่วน step ต่อ)
→ (หากส่วน condition เป็นจริง → ทำงานในส่วน body เมื่อเสร็จก็ทำงานในส่วน step ต่อ)
→ (หากส่วน condition เป็นจริง → ทำงานในส่วน body เมื่อเสร็จก็ทำงานในส่วน step ต่อ)
→ ...
```

สรุปก็คือส่วน `begin` ทำงานเพียงครั้งเดียว และหากทดสอบเงื่อนไขในส่วน `condition` เป็นจริงจะทำงานในส่วน body ต่อด้วยส่วน step

หากเรายังใหม่กับลูบ แนะนำให้ย้อนกลับไปดูที่ตัวอย่าง และค่อยๆเขียนวิธีการที่ลูบทำงานบนกกระดาษจะช่วยได้

หากเราเขียนโค้ดให้เหมือนกับบทที่เราเรียนมาก่อนหน้าจะได้:

```js
// for (let i = 0; i < 3; i++) alert(i)

// ทำงานเหมือนกับเราเขียน
let i = 0
// หากส่วน condition เป็นจริง → ทำงานในส่วน body เมื่อเสร็จก็ทำงานในส่วน step ต่อ
if (i < 3) { alert(i); i++ }
// หากส่วน condition เป็นจริง → ทำงานในส่วน body เมื่อเสร็จก็ทำงานในส่วน step ต่อ
if (i < 3) { alert(i); i++ }
// หากส่วน condition เป็นจริง → ทำงานในส่วน body เมื่อเสร็จก็ทำงานในส่วน step ต่อ
if (i < 3) { alert(i); i++ }
// ...จบการทำงานเพราะตอนนี้ i เป็น 3 แล้ว
```

````smart header="การประกาศตัวแปรแบบอินไลน์"
ตัวแปร `i` ถูกประกาศในลูป สิ่งนี้เรียกว่าการประกาศตัวแปรแบบอินไลน์ ตัวแปรดังกล่าวจะมองเห็นได้เฉพาะในลูปเท่านั้น

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // ออก error ไม่มีตัวแปรดังกล่าว
```

หรือเราสามารถใช้ตัวแปรที่ประกาศข้างนอกได้เช่น:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // ใช้ตัวแปรจากข้างนอก
  alert(i); // 0, 1, 2
}

alert(i); // ได้ 3 เพราะเป็นตัวแปรที่อยู่ภายนอกลูบ
```

````


### ส่วนที่ไม่เขียนก็ได้

ทุกส่วนของ `for` เราจะละไม่เขียนส่วนไหนก็ได้

ตัวอย่าง เราสามารถละส่วน หากเราไม่ต้องทำงานอะไรก่อนเริ่มลูบ

เช่นแบบนี้:

```js run
let i = 0; // เรามีตัวแปร i ที่ประกาศและกำหนดค่าไว้แล้ว

for (; i < 3; i++) { // จึงสามารถละส่วน "begin" ได้
  alert( i ); // 0, 1, 2
}
```

เรายังสามารถละส่วน `step` ได้:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

หน้าตาก็จะดูคล้ายลูบ `while (i < 3)` มากขึ้น

อันที่จริงเราสามารถละทั้งหมดได้เลย เพียงแต่ลูบจะวนซ้ำๆไม่มีที่สิ้นสุด:

```js
for (;;) {
  // repeats without limits
}
```

โปรดจำไว้ว่าลูบ `for` ต้องมีเครื่องหมาย `;` มิฉะนั้นจะเกิดข้อผิดพลาดทางไวยากรณ์ (syntax error)

## การออกจากลูบ

โดยปกติ การทำงานจะออกจากลูบเมื่อเงื่อนไขเป็นเท็จ

แต่เราสามารถบังคับให้การทำงานออกจากลูบได้โดยใช้คำสั่ง `break`

ตัวอย่างเช่น ลูบด้านล่าง จะถามตัวเลขกับผู้ใช้ซ้ำไปซ้ำมา เพื่อนำตัวเลขแต่ละตัวที่ผู้ใช้ป้อนมารวมกัน แต่จะหยุดการทำงานทันทีที่ผู้ใช้ไม่ได้ป้อนตัวเลขใดๆเข้ามา

```js run
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

คำสั่ง `break` ตรงบรรทัด `(*)` หากผู้ใช้ไม่ป้อนอะไรเข้ามาหรือกดยกเลิก ลูบจะหยุดการทำงานทันที และนำผลรวมแสดงออกทางหน้าต่างแจ้งเตือน

หากเราต้องใช้ลูบที่วนไม่จำกัด (infinite loop) เราจะใช้คู่กับ `break` เสมอ เพื่อหยุดลูบเมื่อทำงานตามเงื่อนไขที่ต้องการ

## การให้ลูบถัดไปทำงาน [#continue]

คำสั่ง `continue` เป็น `break` เวอร์ชั่นนุ่มนิ่มกว่าเพราะไม่ได้หยุดการทำงานของลูบทั้งหมด แต่แค่หยุดลูบที่ทำงานอยู่ปัจจุบัน และให้ลูบถัดไปทำงาน

เรามักจะใช้หากเราทำซ้ำปัจจุบันเสร็จแล้วและต้องการไปยังส่วนถัดไป

อย่างลูบด้านล่างใช้ `continue` เพื่อให้แสดงผลลัพธ์เฉพาะเลขคี่:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // หากเป็นจริงจะข้ามลูบปัจจุบัน ให้ไปทำลูบถัดไปแทน
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

คำอธิบายคร่าวๆก็คือ หากตัวแปร `i` เป็นเลขคู่ จะเข้าคำสั่ง `continue` ทำให้ลูบปัจจุบันหยุดทำงาน และเริ่มลูบถัดไป `for` (ด้วยเลขถัดไปของเลขคู่คือเลขคี่) ด้วยเหตุนี้ `alert` จึงแสดงออกมาเฉพาะเลขคี่

````smart header="คำสั่ง `continue` ช่วยลดของซ้ำซ้อนของปีกกา"
ลูปที่แสดงเลขคี่แบบไม่ใช้ `continue` อาจมีหน้าตาแบบนี้:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

จากมุมมองทางเทคนิค นี่เหมือนกับตัวอย่างด้านบน เราสามารถใช้บล็อก `if` แทนการใช้ `continue` ได้

But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.

For example, if we take this code:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...and rewrite it using a question mark:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

We need a way to stop the process if the user cancels the input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient -- labels, come to the rescue!

A *label* is an identifier with a colon before a loop:
```js
labelName: for (...) {
  ...
}
```

The `break <labelName>` statement in the loop below breaks out to the label:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move the label onto a separate line:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.

For example, it is impossible to do this:
```js
break label; // jump to the label below (doesn't work)

label: for (...)
```

A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:
```js
label: {
  // ...
  break label; // works
  // ...
}
```

...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
````

## Summary

We covered 3 types of loops:

- `while` -- The condition is checked before each iteration.
- `do..while` -- The condition is checked after each iteration.
- `for (;;)` -- The condition is checked before each iteration, additional settings available.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
