# วิธีที่ง่ายแต่ผิด

วิธีที่ง่ายที่สุดคือสุ่มค่าตั้งแต่ `min` ถึง `max` แล้วปัดเป็นจำนวนเต็ม แต่วิธีนี้ให้ผลไม่ถูกต้อง:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

ฟังก์ชันทำงานได้ แต่โอกาสที่จะสุ่มได้ค่าริมช่วงอย่าง `min` และ `max` มีเพียงครึ่งหนึ่งของค่าอื่น

ถ้ารันตัวอย่างนี้หลายครั้ง จะเห็นว่าเลข `2` ออกบ่อยที่สุด

สาเหตุคือ `Math.round()` รับค่าสุ่มจากช่วง `1..3` แล้วปัดค่าตามช่วงต่อไปนี้:

```js no-beautify
values from 1    ... to 1.4999999999  become 1
values from 1.5  ... to 2.4999999999  become 2
values from 2.5  ... to 2.9999999999  become 3
```

ช่วงของเลข `1` จึงยาวเพียงครึ่งเดียวของช่วงเลข `2` และเลข `3` ก็เจอปัญหาเดียวกัน

# วิธีที่ถูกต้อง

โจทย์นี้มีคำตอบที่ถูกต้องหลายแบบ วิธีหนึ่งคือขยับขอบของช่วง ถ้าต้องการให้แต่ละจำนวนเต็มครอบคลุมช่วงยาวเท่ากัน เราสุ่มค่าตั้งแต่ `0.5 ถึง 3.5` เพื่อให้ค่าริมทั้งสองฝั่งมีช่วงยาวเท่าค่าอื่น:

```js run
*!*
function randomInteger(min, max) {
  // ตอนนี้ rand มีค่าตั้งแต่ (min-0.5) ถึง (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

อีกวิธีคือใช้ `Math.floor` กับค่าสุ่มตั้งแต่ `min` ถึง `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // ตรงนี้ rand มีค่าตั้งแต่ min ถึง (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

ช่วงทั้งหมดจะแบ่งได้แบบนี้:

```js no-beautify
values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
```

ทุกช่วงมีความยาวเท่ากัน ค่าที่ได้จึงกระจายอย่างสม่ำเสมอ
