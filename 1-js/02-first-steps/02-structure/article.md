# โครงสร้างโค้ด

สิ่งแรกที่เราจะเริ่มศึกษากันจริงจังคือหน่วยของโค้ด (blocks of code)

## คำสั่ง (Statements)

คำสั่ง (Statements) คือโครงสร้างไวยากรณ์ที่ประกอบไปด้วยคำสั่งที่พร้อมให้คอมพิวเตอร์ดำเนินการ

เราเคยเห็นคำสั่ง (Statements) หน่ึงกันมาแล้วคือ `alert('Hello, world!')`, ซึ่งคำสั่งของมันก็คือให้แสดงข้อความ "Hello World!"

เราจะเขียนคำสั่ง (Statements) กี่ครั้งก็ได้ตามที่เราต้องการ และ คำสั่ง (Statements) มักจบด้วย semicolon เสมอ เพื่อแยกแต่ละคำสั่ง (Statements) ออกจากกัน คล้ายๆ full stop ในภาษาอังกฤษที่แบ่งประโยคออกจากกัน

ดั่งตัวอย่างเราแบ่ง "Hello" กับ "World" ออกมาเป็นสองข้อความ

```js run no-beautify
alert('Hello'); alert('World');
```

โดยปกติแล้ว เราจะเขียนแยกบรรทัดกันเพื่อให้โค้ดอ่านง่ายขึ้น

```js run no-beautify
alert('Hello');
alert('World');
```

## Semicolons [#semicolon]

การขึ้นบรรทัดใหม่ก็เหมือนมี semicolon อยู่ในตัว เมื่อเราแบ่งบรรทัดจึงมีหรือไม่มี semicolon ก็ได้

แบบนี้ก็ได้ผลเช่นเดียวกันกับด้านบน:

```js run no-beautify
alert('Hello')
alert('World')
```

จาวาสคริปต์จะตีความการขึ้นบรรทัดใหม่ว่าเป็น semicolon ในที่นี้เราเรียกว่า [การแทรก semicolon ให้อัตโนมัติ](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**ส่วนใหญ่การขึ้นบรรทัดใหม่คือจะแทรก semicolon ไปโดยปริยายด้วย แต่ก็ไม่ได้หมายความว่าจะเป็นแบบนั้นเสมอไป!**

บรรทัดใหม่แบบนี้ จาวาสคริปต์จะไม่ตีความว่าเป็น semicolon

```js run no-beautify
alert(3 +
1
+ 2);
```

<<<<<<< HEAD
เมื่อเราสั่งคำสั่งนี้ออกไป เราจะได้ผลลัพธ์เป็น 6 แทน จาวาสคริปต์ไม่ได้แทรก semicolon เอาว่าทันทีที่เริ่มบรรทัด เพราะจาวาสคริปต์มองว่าบรรทัดใหม่จบด้วยเครื่องหมาย `+` สำหรับจาวาสคริปต์นี่แสดงว่าคำสั่งนี้ยังไม่สมบูรณ์ (incomplete expression) ดังนั้น semicolon จึงไม่จำเป็น จะคำสั่งนี้ก็ได้ผลลัพธ์ตามที่เราคาดหวัง
=======
The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there would be incorrect. And in this case, that works as intended.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**แต่ก็มีบางคำสั่งที่จาวาสคริปต์ได้ตีความผิดพลาดไป โดยจาวาสคริปต์มองว่าคำสั่งดังกล่าวจำเป็นต้องมี semicolon ด้วย;**

error หาเจอได้ยาก และยังแก้ไขได้ยากอีกด้วย

````smart header="An example of an error"
ตัวอย่างข้อผิดพลาดที่กล่าวมาดูได้จากโค้ดด้านล่าง

```js run
alert("Hello");

[1, 2].forEach(alert);
```

<<<<<<< HEAD
ณ ตอนนี้ยังไม่ต้องสนใจว่า `[]` และ `forEach` หมายถึงอะไร ให้เข้าใจว่ามันจะแสดงข้อความแจ้งเตือนว่า 1 และ 2 พอ

แล้วเมื่อเราลองเพิ่ม `alert` ไปบรรทัดก่อนหน้าตัว `[]` ของเรา และปล่อยไว้แบบนั้นโดยที่ไม่มี semicolon ปิดใดๆ
=======
No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let's remove the semicolon after the `alert`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
```

<<<<<<< HEAD
เมื่อเราลองสั่งรันดู จะมีเพียงแต่ข้อความแรกเท่านั้นที่แจ้งเตือน จากนั่นโค้ดของเราจะ error

ทุกอย่างจะกลับมาทำงานได้ปกติ เพียงเติม semicolon หลังคำสั่ง `alert`:
```js run
alert("All fine now");
=======
The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

If we run this code, only the first `Hello` shows (and there's an error, you may need to open the console to see it). There are no numbers any more.

<<<<<<< HEAD
ทีนี้เราก็จะได้รับข้อความแจ้งเตือนสามครั้งได้แก่ "All fine now", "1" และ "2" ตามลำดับ


error ดังกล่าวเกิดขึ้นเพราะว่าจาวาสคริปต์จะไม่ใส่ semicolon ให้ก่อน square brackets หรือก้ามปู `[]` นั่นเอง

เมื่อ semicolon ไม่ได้ถูกใส่มา ดังนั้นมันจึงกลายเป็นคำสั่งเดียวกัน ข้างล่างคือสิ่งที่เอนจินเห็น
=======
That's because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here's how the engine sees it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

<<<<<<< HEAD
มันควรแยกเป็นสองคำสั่งสิ ไม่ใช่คำสั่งเดียว จึงทำให้เครื่องทำงานผิดพลาด ดังนั้นสิ่งนี้จึงอาจเกิดขึ้นได้อยู่เสมอ
=======
Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

ในทางที่ดีเราจึงอยากแนะนำให้ใส่ semicolon เมื่อจบคำสั่งหนึ่งๆเสมอ แม้คำสั่งเหล่านั้นจะแยกการด้วยบรรทัดใหม่แล้วก็ตาม และกฎนี้ใช้กันอย่างกว้างขวางในชุมชนนักพัฒนา โปรดทราบอีกครั้งว่า *มันเป็นไปได้* ที่จะไม่ใส่ semicolon ลงไป แต่สำหรับมือใหม่ก็แนะนำให้ใส่ไว้จะปลอดภัยกว่า

## คอมเม้นต์

เมื่อเขียนโปรแกรมไปเรื่อยๆ ก็จะพบว่าโปรแกรมยิ่งทวีความซับซ้อนมากขึ้นเรื่อยๆ จึงจำเป็นต้องมี *comments* มาอธิบายว่าโค้ดที่เราเขียนทำงานอย่างไร

คอมเม้นสามารถเขียนลงไปส่วนไหนก็ได้ของสคริปต์ คอมเม้นจะไม่ส่งผลต่อการดำเนินงาน เพราะว่า เอนจินจะไม่สนใจคอมเม้นพวกนี้อยู่แล้ว

**คอมเม้นแบบบรรทัดเดียวจะใช้เครื่องหมาย forward slash `//`**

เราสามารถคอมเม้นทั้งบรรทัด หรือคอมเม้นด้านหลังคำสั่งก็ได้

แบบนี้:

```js run
// This comment occupies a line of its own
alert('Hello');

alert('World'); // This comment follows the statement
```

**คอมเม้นแบบหลายบรรทัด จะเริ่มต้นด้วย forward slash และเครื่องหมายดอกจัน `/*` และลงท้ายด้วย เครื่องหมายดอกจันและ forward slash `*/`**

แบบนี้:

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert('Hello');
alert('World');
```

เอนจินไม่สนใจเนื้อหาภายในคอมเม้นต์ ต่อให้เราใส่จาวาสคริปต์ของเราไปภายในคอมเม้นก็จะไม่เกิดการรันคำสั่งใดๆ

หลายครั้ง เป็นประโยชน์อย่างมากที่ช่วยให้ไม่ต้องบางคำสั่งไม่ต้องดำเนินการ

```js run
/* Commenting out the code
alert('Hello');
*/
alert('World');
```

```smart header="ใช้คีย์ลัด!"
ใน editor ส่วนใหญ่มีคีย์ลัดเพื่อเอาไว้คอมเม้นต์โค้ด โดยกด `key:Ctrl+/` สำหรับคอมเม้นต์บรรทัดเดียว และ `key:Ctrl+Shift+/` สำหรับคอมเม้นต์หลายบรรทัด สำหรับผู้ใช้ Mac ให้ใชปุ่ม `key:Cmd` แทน `key:Ctrl` และ `key:Option` แทน `key:Shift`
```

````warn header="คอมเม้นต์ซ้อนคอมเม้นต์ไม่ได้"
ไม่ควรมี `/*...*/` ข้างในคอมเม้นต์แบบนี้ `/*...*/` อีกที

โค้ดแบบนี้จะพังด้วย error

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

อย่าลังเลที่จะคอมเม้นต์โค้ดของตัวเอง

คอมเม้นเพิ่มบรรทัดของโค้ด แต่นั่นไม่ใช่ปัญหาเลย มีเครื่องมือมากมายที่ช่วยนำคอมเม้นเหล่านั้นออกจากโค้ด ก่อนเผยแพร่ออกสู่เซิฟเวอร์ที่ใช้งานจริง ดังนั้นอย่างกังวลที่จะใช้คอมเม้นโค้ด

ในภายหลังจะมีบทเรียนเกี่ยวกับ <info:code-quality> ที่จะช่วยอธิบายความสำคัญของคอมเม้นต์ และการเขียนคอมเม้นต์ที่ดีอีกด้วย
