# คำสั่ง "switch"

คำสั่ง `switch` สามารถใช้แทนการใช้ `if` หลายๆตัวได้

ปกติมักจะใช้เปรียบเทียบตัวแปรที่สามารถเป็นได้หลายค่า

## รูปประโยค

`switch` มีเพียงตัวเดียว `case` มีกี่ตัวก็ได้ ส่วน `default` เราจะใส่หรือไม่ใส่ก็ได้

หน้าตาจะเป็นแบบนี้:

```js no-beautify
switch(x) {
  case 'value1':  // เทียบเท่าเขียน if (x === 'value1')
    ...
    [break]

  case 'value2':  // เทียบเท่าเขียน if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- ค่าของคัวแปร `x` ถูกเช็คทั้งค่าและชนิดข้อมูล (strict equality) ว่าเท่ากับ  `case` ตัวแรกหรือไม่ (หรือก็คือ `value1`) หรือไม่ก็จะไปเช็คตัวที่สองต่อไป (`value2`) และตาม `case` ไปเรื่อยๆ
- แต่แต่ให้เจอ `case` ที่เท่ากันก็ตาม คำสั่ง `switch` จะไล่เช็คตาม `case` ที่มีต่อไปเรื่อยๆจนกว่าจะเจอคำสั่ง `break` หรือ ไม่มี `case` ต่อให้ให้เช็คอีกแล้ว
- หากไม่มี `case` ไหนตรงเลย ตัว `default` จะทำงาน (หากมี)

## ตัวอย่าง

ตัวอย่างคำสั่ง `switch` (โค้ดที่ทำงานไปแล้วจะถูกไฮไลท์เอาไว้):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}
```

ที่นี่ คำสั่ง `switch` จะเริ่มเทียบตัวแปร `a` จาก `case` ตัวแรก นั่นก็คือ `3` ซึ่งไม่ตรงเพราะ `a` ของเราคือ `4`

ที่น่ีมากันต่อที่ `case` ถัดมา `4` ซึ่งตรงพอดี การทำงานจะเริ่มจาก `case 4` ไปเรื่อยๆจนกว่าจะเจอคำสั่ง `break`

**หากเราไม่ใส่ `break` ไว้ โปรแกรมจะทำงานตาม `case` ทีละเคสไปเรื่อยๆจนถึงตัวสุดท้าย โดยที่มันจะไม่ตรวจสอบเงื่อนไขใดๆเลย**

นี่คือตัวอย่างหากเราไม่ใส่คำสั่ง `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

ตามตัวอย่างด้านบน เราจะเห็นว่าโปรแกรมจะทำงานตั้งแต่ `alert( 'Exactly!' );` ไปเรื่อยๆจนจรด `default` เป็นตัวสุดท้าย เราจะเห็น `alert` ออกมา 3 ที

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="นิพจน์ (expression) ใดๆก็สามารถใส่มาเป็นอาร์กิวเมนท์ของ `switch/case` ได้"
ทั้ง `switch` และ `case` อนุญาตให้ใส่นิพจน์ (expression) ใดๆเข้ามาก็ได้

ตัวอย่างเช่น:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
การเขียน `+a` จะได้เลข `1` ต่อมาโปรแกรมจึงเริ่มเปียบเทียบจาก `case` ที่เป็น `b + 1` (หรือไม่คือ 1 เพราะว่า เป็น 0) โค้ดตั้งแต่ `case b + 1` ลงมาจึงทำงาน
````

## การรวม "case"

เราสามารถใช้โค้ดชุดเดียวกันกับ `case` หลายแบบได้

ตัวอย่างเช่น เราต้องการให้โค้ดชุดเดียวกันทำงานกับ `case 3` และ `case 5`:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

พอเราเขียนแบบนี้แล้ว ทั้ง `3` และ `5` ก็จะแสดงข้อความเดียวกัน

การที่เราสามารถทำท่านี้ได้เพราะว่าเกิดจาก side-effect ของ `switch/case` ที่มันจะทำงานตั้งแต่ `case` ลงมาเรื่อยๆ หากเราไม่ได้ใส่ `break` เอาไว้ ที่นี่โปรแกรมเริ่มทำงานจาก `case 3` ลงมาถึง `case 5` เลย เพราะไม่มีคำสั่ง `break` มาคั่นกลาง

## Type matters

Let's emphasize that the equality check is always strict. The values must be of the same type to match.

For example, let's consider the code:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. For `0`, `1`, the first `alert` runs.
2. For `2` the second `alert` runs.
3. But for `3`, the result of the `prompt` is a string `"3"`, which is not strictly equal `===` to the number `3`. So we've got a dead code in `case 3`! The `default` variant will execute.
