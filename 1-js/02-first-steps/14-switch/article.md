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

Here the `switch` starts to compare `a` from the first `case` variant that is `3`. The match fails.

Then `4`. That's a match, so the execution starts from `case 4` until the nearest `break`.

**If there is no `break` then the execution continues with the next `case` without any checks.**

An example without `break`:

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

In the example above we'll see sequential execution of three `alert`s:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="Any expression can be a `switch/case` argument"
Both `switch` and `case` allow arbitrary expressions.

For example:

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
Here `+a` gives `1`, that's compared with `b + 1` in `case`, and the corresponding code is executed.
````

## Grouping of "case"

Several variants of `case` which share the same code can be grouped.

For example, if we want the same code to run for `case 3` and `case 5`:

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

Now both `3` and `5` show the same message.

The ability to "group" cases is a side-effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.

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
