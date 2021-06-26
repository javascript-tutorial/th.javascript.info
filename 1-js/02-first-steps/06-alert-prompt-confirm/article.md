# การปฎิสัมพันธ์: alert, prompt, confirm

เนื่องจากเราใช้เบราว์เซอร์เป็นสภาพแวดล้อมการสาธิต เรามาดูฟังก์ชันกันสักสองสามอย่างเพื่อโต้ตอบกับผู้ใช้: `alert`, `prompt` และ `confirm`

## alert

อย่างที่เราเคยเห็นกันได้นี้แล้ว หน้าขนาดเล็กมุมบนแสดงข้อความที่รอให้ผู้ใช้กด OK

ตัวอย่าง:

```js run
alert("Hello");
```

หน้าต่างขนาดเล็กที่มีข้อความเราเรียกมันว่าหน้าต่างโมเดล *modal window* คำว่า "modal" หมายความว่าผู้เยี่ยมชมไม่สามารถโต้ตอบกับส่วนที่เหลือของหน้า หรือกดปุ่มอื่นๆใดๆได้ จนกว่าพวกเขาจะจัดการกับหน้าต่างนี้ อย่างในกรณีนี้ก็คือกด "OK"

## prompt

ฟังก์ชัน 'prompt' รับสองอาร์กิวเมนต์:

```js no-beautify
result = prompt(title, [default]);
```

จะแสดงหน้าต่างโมเดลพร้อมข้อความ ช่องป้อนข้อมูล (input) และปุ่ม OK/Cancel

`title`
: พารามิเตอร์แรกคือข้อความที่จะแสดงให้ผู้เข้าชมเว็บ

`default`
: พารามิเตอร์ที่สองเป็นทางเลือก (จะใส่มาหรือไม่ใส่มาก็ได้) โดยจะใช้เป็นค่าเริ่มต้นสำหรับสำหรับช่องป้อนข้อมูล

```smart header="square brackets `[...]`"
square brackets รอบๆ "default" ตามตัวอย่างด้านบนแสดงว่าพารามิเตอร์นี้เป็นทางเลือก
```

ผู้เข้าชมสามารถพิมพ์บางอย่างในช่องป้อนข้อมูลพร้อมท์แล้วกด OK จากนั้นเราจะได้ข้อความนั้นจากตัวแปรชื่อ `result` หรือผู้ใช้สามารถยกเลิกการป้อนข้อมูลโดยกด Cancel หรือกดปุ่ม "คีย์: Esc" จากนั้นเราจะได้ "null" มาเก็บไว้ในตัวแปรชื่อ `result` แทน

การเรียกฟังชั่นก์ `prompt` จะคืนข้อความจากช่องป้อนข้อมูล หรือ `null` หากช่องป้อนข้อมูลถูกยกเลิก

ตัวอย่าง:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="ใน IE: จะใส่ค่าเริ่มต้นให้ `default` เสมอ"
ถึงแม้พารามิเตอร์ที่สองเป็นทางเลือก แต่หากเราไม่ใส่ไว้ Internet Explorer จะใส่สตริง `"undefined"` ลงไปแทน

สามารถรันโค้ดนี้ใน IE เพื่อดูผลลัพธ์ได้

```js run
let test = prompt("Test");
```

ดังนั้น เพื่อให้ข้อความแจ้งดูดีใน IE เราแนะนำให้ระบุอาร์กิวเมนต์ที่สองเสมอ:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

The syntax:

```js
result = confirm(question);
```

The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
