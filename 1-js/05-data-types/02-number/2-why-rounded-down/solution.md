ภายในระบบ เศษส่วนทศนิยม `6.35` เป็นเลขฐานสองที่ไม่มีที่สิ้นสุด เหมือนกับกรณีอื่นๆ ทั้งหมด มันถูกเก็บไว้โดยมีการสูญเสียความแม่นยำ

ลองดู:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

การสูญเสียความแม่นยำนี้สามารถทำให้ตัวเลขเพิ่มขึ้นหรือลดลงได้ ในกรณีนี้ตัวเลขกลายเป็นน้อยลงเล็กน้อย นั่นคือเหตุผลที่มันถูกปัดลง

แล้ว `1.35` ล่ะ?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

ในกรณีนี้ การสูญเสียความแม่นยำทำให้ตัวเลขมากขึ้นเล็กน้อย ดังนั้นมันจึงถูกปัดขึ้น

**เราจะแก้ปัญหากับ `6.35` ได้อย่างไรถ้าเราต้องการให้มันถูกปัดเศษอย่างถูกต้อง?**

เราควรทำให้มันใกล้กับจำนวนเต็มก่อนที่จะปัดเศษ:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

สังเกตว่า `63.5` ไม่มีการสูญเสียความแม่นยำเลย นั่นเป็นเพราะส่วนทศนิยม `0.5` จริงๆ แล้วคือ `1/2` เศษส่วนที่หารด้วยกำลังของ `2` จะถูกแสดงอย่างแม่นยำในระบบฐานสอง ตอนนี้เราสามารถปัดเศษมันได้:

```js run
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(ปัดเศษ) -> 6.4
```

