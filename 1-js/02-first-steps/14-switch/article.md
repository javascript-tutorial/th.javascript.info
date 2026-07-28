# คำสั่ง "switch"

ถ้าต้องเทียบค่าหนึ่งค่ากับตัวเลือกหลายแบบ เราอาจเขียน `if` ต่อกันหลายชุดก็ได้ แต่ยิ่งมีตัวเลือกเยอะ โค้ดก็ยิ่งไล่อ่านยาก

คำสั่ง `switch` ช่วยรวมการตรวจเหล่านี้ไว้ในโครงสร้างเดียว ทำให้เห็นชัดว่าค่าไหนต้องทำอะไร

## ไวยากรณ์

`switch` ประกอบด้วย `case` ตั้งแต่หนึ่งชุดขึ้นไป ส่วน `default` จะมีหรือไม่มีก็ได้

หน้าตาเป็นแบบนี้:

```js no-beautify
switch(x) {
  case 'value1':  // ถ้า (x === 'value1')
    ...
    [break]

  case 'value2':  // ถ้า (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- `switch` นำค่า `x` ไปเทียบแบบเข้มงวด (`===`) กับค่าของ `case` แรก ซึ่งก็คือ `value1` แล้วไล่เทียบกับ `value2` และ `case` ถัด ๆ ไป
- เมื่อเจอค่าที่ตรงกัน โค้ดจะเริ่มทำงานจาก `case` นั้นไปจนถึง `break` ที่ใกล้ที่สุด หรือจนจบ `switch`
- ถ้าไม่มี `case` ไหนตรง โค้ดใน `default` จะทำงานแทนถ้ามีส่วนนี้อยู่

## ตัวอย่าง

ลองดูตัวอย่าง `switch` โดยส่วนที่ทำงานจะถูกไฮไลต์ไว้:

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

ตอนนี้ `a` มีค่าเป็น `4` ส่วน `case` แรกมีค่าเป็น `3` จึงไม่ตรงกัน

จากนั้นจึงเทียบกับ `4` ซึ่งตรงกันพอดี โค้ดเลยเริ่มทำงานจาก `case 4` และหยุดเมื่อเจอ `break`

**ถ้าไม่มี `break` โค้ดจะไหลต่อไปยัง `case` ถัดไปทันที โดยไม่ตรวจค่าของ `case` นั้นอีก**

ตัวอย่างที่ไม่มี `break`:

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

ตัวอย่างนี้จึงเรียก `alert` สามครั้งต่อกัน:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="ใช้นิพจน์อะไรก็ได้เป็นอาร์กิวเมนต์ของ `switch/case`"
ค่าที่ใส่ใน `switch` และ `case` เป็นนิพจน์อะไรก็ได้

เช่น:

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
นิพจน์ `+a` ได้ค่า `1` ส่วน `b + 1` ใน `case` ก็ได้ค่า `1` เช่นกัน เมื่อสองค่านี้ตรงกัน โค้ดใน `case` นั้นจึงทำงาน
````

## จัดกลุ่ม "case"

ถ้าหลาย `case` ต้องทำงานเหมือนกัน เราจัดกลุ่มให้ใช้โค้ดชุดเดียวกันได้

ตัวอย่างนี้ให้ `case 3` และ `case 5` ทำงานชุดเดียวกัน:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3: // (*) จัดกลุ่มสอง case ไว้ด้วยกัน
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

ไม่ว่า `a` จะเป็น `3` หรือ `5` ก็จะแสดงข้อความชุดเดียวกัน

การจัดกลุ่มแบบนี้อาศัยพฤติกรรมเดิมของ `switch/case` ที่จะทำงานต่อเมื่อไม่เจอ `break` ถ้าค่าตรงกับ `case 3` โค้ดจะเริ่มจากบรรทัด `(*)` แล้วไหลผ่าน `case 5` ไปจนเจอ `break` โดยไม่ตรวจค่า `case 5` ซ้ำ

## ชนิดข้อมูลสำคัญ

การเปรียบเทียบใน `switch` เป็นแบบเข้มงวด (`===`) เสมอ ดังนั้นค่าที่จะตรงกันต้องมีทั้งค่าและชนิดข้อมูลเหมือนกัน

ลองดูโค้ดนี้:

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

1. ถ้าพิมพ์ `0` หรือ `1` จะเรียก `alert` แรก
2. ถ้าพิมพ์ `2` จะเรียก `alert` ที่สอง
3. ถ้าพิมพ์ `3` ค่าที่ได้จาก `prompt` จะเป็นสตริง `"3"` ซึ่งไม่เท่ากับตัวเลข `3` เมื่อเปรียบเทียบแบบเข้มงวด (`===`) โค้ดใน `case 3` จึงไม่มีทางทำงาน และจะไปทำงานที่ `default` แทน
