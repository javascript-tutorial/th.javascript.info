# ตัวเลข

ในจาวาสคริปต์ยุคใหม่ มีตัวเลขอยู่สองประเภท:

<<<<<<< HEAD
1. ตัวเลขทั่วไปในจาวาสคริปต์ถูกเก็บในรูปแบบ 64 บิต [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) หรือที่เรียกว่า "จำนวนทศนิยมความแม่นยำสองเท่า" ตัวเลขเหล่านี้เป็นตัวเลขที่เราใช้บ่อยที่สุด และเราจะพูดถึงในบทนี้

2. BigInt ใช้แทนจำนวนเต็มที่มีความยาวไม่จำกัด บางครั้งจำเป็นต้องใช้เพราะตัวเลขทั่วไปไม่สามารถเกิน <code>2<sup>53</sup></code> หรือน้อยกว่า <code>-2<sup>53</sup></code> ได้อย่างปลอดภัย เนื่องจาก BigInt ใช้ในบางกรณีพิเศษเท่านั้น เราจึงแยกไว้ในบทเฉพาะ <info:bigint>
=======
1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ในบทนี้เราจะพูดถึงตัวเลขทั่วไป มาดูรายละเอียดเพิ่มเติมกัน

## วิธีเขียนตัวเลขแบบอื่นๆ

สมมติว่าเราต้องเขียนหนึ่งพันล้าน วิธีที่ชัดเจนคือ:

```js
let billion = 1000000000;
```

แต่ในชีวิตจริง เราอาจสับสนกับจำนวนศูนย์ได้ง่าย ในภาษาไทย เรามักใช้คำว่า "ล้าน" "สิบล้าน" "ร้อยล้าน" เพื่อช่วยในการอ่าน ในจาวาสคริปต์ เราสามารถใช้เครื่องหมายขีดล่าง `_` เป็นตัวคั่นได้:

```js
let billion = 1_000_000_000;
```

<<<<<<< HEAD
ในที่นี้ เครื่องหมายขีดล่าง `_` ทำหน้าที่เป็น "น้ำตาลทางไวยากรณ์" ช่วยให้ตัวเลขอ่านง่ายขึ้น เครื่องมือจาวาสคริปต์จะมองข้าม `_` ระหว่างตัวเลข ดังนั้นจึงเป็นตัวเลขหนึ่งพันล้านเหมือนกันกับข้างบน
=======
Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ในชีวิตจริง เรามักหลีกเลี่ยงการเขียนเลขศูนย์ต่อกันยาวๆ เพราะขี้เกียจ เรามักเขียนแบบย่อ เช่น `"1พันล้าน"` สำหรับหนึ่งพันล้าน หรือ `"7.3พันล้าน"` สำหรับเจ็ดพันสามร้อยล้าน เช่นเดียวกับตัวเลขใหญ่ส่วนมาก

ในจาวาสคริปต์ เราสามารถย่อตัวเลขโดยเพิ่มตัวอักษร `"e"` ต่อท้ายและระบุจำนวนศูนย์:

```js run
let billion = 1e9;  // 1 พันล้าน คือ 1 ตามด้วยศูนย์ 9 ตัว

alert( 7.3e9 );  // 7.3 พันล้าน (เท่ากับ 7300000000 หรือ 7_300_000_000)
```

กล่าวคือ `e` คูณตัวเลขด้วย 1 ตามด้วยจำนวนศูนย์ที่กำหนด

```js
1e3 === 1 * 1000; // e3 หมายถึง *1000
1.23e6 === 1.23 * 1000000; // e6 หมายถึง *1000000
```

<<<<<<< HEAD
ทีนี้มาเขียนตัวเลขที่เล็กมากๆ กัน สมมติว่า 1 ไมโครวินาที (หนึ่งในล้านของวินาที):
=======
Now let's write something very small. Say, 1 microsecond (one-millionth of a second):
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
let mсs = 0.000001;
```

<<<<<<< HEAD
เช่นเดียวกับก่อนหน้านี้ การใช้ `"e"` ช่วยได้ ถ้าเราไม่อยากเขียนศูนย์เยอะๆ เราก็เขียนแบบนี้ได้:

```js
let mcs = 1e-6; // ศูนย์หกตัวทางซ้ายของ 1
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

ถ้านับจำนวนศูนย์ใน `0.000001` จะมี 6 ตัว ดังนั้นจึงเป็น `1e-6`

กล่าวอีกนัยหนึ่ง ตัวเลขลบหลัง `"e"` หมายถึงการหารด้วย 1 ตามด้วยจำนวนศูนย์ที่กำหนด:

```js
// -3 หมายถึงหารด้วย 1000 (3 ศูนย์)
1e-3 === 1 / 1000; // 0.001

// -6 หมายถึงหารด้วย 1,000,000 (6 ศูนย์)
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
```

### เลขฐานสิบหก ฐานสอง และฐานแปด

[เลขฐานสิบหก](https://en.wikipedia.org/wiki/Hexadecimal) ใช้กันมากในจาวาสคริปต์ เพื่อแสดงสี เข้ารหัสตัวอักษร และอื่นๆ อีกมาก จึงมีวิธีเขียนแบบย่อ คือใช้ `0x` นำหน้าตัวเลข

ตัวอย่าง:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (ไม่ต่างกัน ตัวพิมพ์เล็กหรือใหญ่ไม่สำคัญ)
```

ระบบเลขฐานสองและฐานแปดใช้น้อย แต่ก็รองรับ โดยใช้คำนำหน้า `0b` และ `0o`:


```js run
let a = 0b11111111; // รูปแบบเลขฐานสองของ 255
let b = 0o377; // รูปแบบเลขฐานแปดของ 255

alert( a == b ); // จริง เป็นเลข 255 เหมือนกันทั้งสองฝั่ง
```

มีแค่ 3 ระบบเลขที่รองรับแบบนี้ สำหรับระบบเลขอื่นๆ เราควรใช้ฟังก์ชัน `parseInt` (ซึ่งเราจะเห็นในภายหลังในบทนี้)

## toString(base)

วิธี `num.toString(base)` คืนค่าสตริงที่แสดง `num` ในระบบเลขฐาน `base`

ตัวอย่าง:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

<<<<<<< HEAD
`base` อาจมีค่าตั้งแต่ `2` ถึง `36` โดยค่าเริ่มต้นคือ `10`
=======
The `base` can vary from `2` to `36`. By default, it's `10`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

กรณีใช้งานทั่วไปคือ:

<<<<<<< HEAD
- **base=16** ใช้สำหรับสีในรูปแบบเลขฐานสิบหก, เข้ารหัสตัวอักษร ฯลฯ ตัวเลขอาจเป็น `0..9` หรือ `A..F`
- **base=2** ส่วนใหญ่ใช้สำหรับการแก้จุดบกพร่องของการดำเนินการระดับบิต ตัวเลขอาจเป็น `0` หรือ `1`
- **base=36** เป็นค่าสูงสุด ตัวเลขอาจเป็น `0..9` หรือ `A..Z` ตัวอักษรละตินทั้งหมดถูกใช้แทนตัวเลข กรณีที่สนุกแต่มีประโยชน์สำหรับ `36` คือเมื่อเราต้องการย่อตัวระบุตัวเลขที่ยาวให้สั้นลง เช่น ทำ URL ย่อ เราสามารถแสดงมันในระบบเลขฐาน `36` ได้ง่ายๆ:
=======
- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="จุดสองจุดเพื่อเรียกเมธอด"
โปรดสังเกตว่าจุดสองจุดใน `123456..toString(36)` ไม่ใช่การพิมพ์ผิด ถ้าเราต้องการเรียกเมธอดโดยตรงกับตัวเลข เช่น `toString` ในตัวอย่างข้างต้น เราต้องใส่จุดสองจุด `..` หลังตัวเลข

<<<<<<< HEAD
ถ้าเราใส่จุดเดียว: `123456.toString(36)` จะเกิดข้อผิดพลาด เพราะไวยากรณ์จาวาสคริปต์เข้าใจว่าส่วนทศนิยมอยู่หลังจุดแรก และถ้าเราใส่จุดอีกจุด จาวาสคริปต์จะเข้าใจว่าส่วนทศนิยมว่างเปล่าและตามด้วยเมธอด
=======
If we placed a single dot: `123456.toString(36)`, then there would be an error, because JavaScript syntax implies the decimal part after the first dot. And if we place one more dot, then JavaScript knows that the decimal part is empty and now uses the method.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

เราสามารถเขียน `(123456).toString(36)` ได้เช่นกัน

```

## การปัดเศษ

การดำเนินการที่ใช้บ่อยที่สุดเมื่อทำงานกับตัวเลขคือการปัดเศษ

มีฟังก์ชันในตัวหลายตัวสำหรับการปัดเศษ:

`Math.floor`
: ปัดลง: `3.1` เป็น `3`, `-1.1` เป็น `-2`

`Math.ceil`
: ปัดขึ้น: `3.1` เป็น `4`, `-1.1` เป็น `-1`

`Math.round`
<<<<<<< HEAD
: ปัดเศษไปยังจำนวนเต็มที่ใกล้ที่สุด: `3.1` เป็น `3`, `3.6` เป็น `4`, กรณีกึ่งกลาง `3.5` ปัดขึ้นเป็น `4` เช่นกัน
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

`Math.trunc` (ไม่รองรับใน Internet Explorer)
: ตัดส่วนทศนิยมทิ้งโดยไม่ปัดเศษ: `3.1` เป็น `3`, `-1.1` เป็น `-1`

ตารางสรุปความแตกต่างระหว่างฟังก์ชันเหล่านี้:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


ฟังก์ชันเหล่านี้ครอบคลุมวิธีการจัดการกับส่วนทศนิยมของตัวเลขทั้งหมด แต่ถ้าเราต้องการปัดเศษตัวเลขไปยังตำแหน่งทศนิยมที่ `n` ล่ะ?

เช่น เรามี `1.2345` และต้องการปัดเศษให้เหลือ 2 ตำแหน่งทศนิยม เป็น `1.23`

มีสองวิธีในการทำเช่นนี้:

1. คูณและหาร

    เช่น เพื่อปัดเศษตัวเลขไปยังตำแหน่งทศนิยมที่ 2 เราสามารถคูณตัวเลขด้วย `100` (หรือกำลังของ 10 ที่มากกว่า) เรียกใช้ฟังก์ชันปัดเศษ แล้วหารกลับ

<<<<<<< HEAD
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100`, call the rounding function and then divide it back.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. วิธี [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) ปัดเศษตัวเลขไปยัง `n` ตำแหน่งหลังจุดทศนิยมและคืนค่าเป็นสตริง

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    วิธีนี้ปัดขึ้นหรือลงไปยังค่าที่ใกล้ที่สุด คล้ายกับ `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

<<<<<<< HEAD
    โปรดทราบว่าผลลัพธ์ของ `toFixed` เป็นสตริง หากส่วนทศนิยมสั้นกว่าที่ต้องการ จะเพิ่มศูนย์ต่อท้าย:
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", เพิ่มศูนย์เพื่อให้ครบ 5 หลัก
    ```

<<<<<<< HEAD
    เราสามารถแปลงเป็นตัวเลขโดยใช้เครื่องหมายบวกเดี่ยวหรือเรียก `Number()`: `+num.toFixed(5)`
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## การคำนวณที่ไม่แม่นยำ

<<<<<<< HEAD
ภายใน ตัวเลขถูกเก็บในรูปแบบ 64 บิต [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) มีบิต 64 บิตเพื่อเก็บตัวเลข: 52 บิตใช้เก็บตัวเลข, 11 บิตเก็บตำแหน่งของจุดทศนิยม (เป็นศูนย์สำหรับจำนวนเต็ม) และ 1 บิตสำหรับเครื่องหมาย

ถ้าตัวเลขใหญ่เกินไป อาจล้นพื้นที่เก็บข้อมูล 64 บิต ทำให้ได้ค่าอนันต์:
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
alert( 1e500 ); // Infinity
```

สิ่งที่อาจไม่ชัดเจนนัก แต่เกิดขึ้นบ่อย คือการสูญเสียความแม่นยำ

<<<<<<< HEAD
พิจารณาการทดสอบนี้ (ที่ให้ผลเป็นเท็จ):
=======
Consider this (falsy!) equality test:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
alert( 0.1 + 0.2 == 0.3 ); // เท็จ
```

ถูกต้อง ถ้าเราตรวจสอบว่าผลรวมของ `0.1` และ `0.2` เท่ากับ `0.3` เราจะได้ `เท็จ`

แปลก! แล้วมันคืออะไรถ้าไม่ใช่ `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
โอ้! มีผลกระทบมากกว่าการเปรียบเทียบที่ไม่ถูกต้อง ลองนึกภาพว่าคุณกำลังทำเว็บไซต์ขายของออนไลน์ และลูกค้าใส่สินค้ามูลค่า `฿10` และ `฿20` ลงในตะกร้า ยอดรวมจะเป็น `฿30.000000000000004` ซึ่งจะทำให้ทุกคนแปลกใจ
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

แต่ทำไมถึงเกิดเรื่องนี้ขึ้น?

ตัวเลขถูกเก็บในหน่วยความจำในรูปแบบไบนารี เป็นลำดับของบิต 0 และ 1 แต่เศษส่วนเช่น `0.1`, `0.2` ที่ดูง่ายในระบบเลขฐานสิบ จริงๆ แล้วเป็นเศษส่วนไม่รู้จบในระบบไบนารี

<<<<<<< HEAD
กล่าวคือ `0.1` คืออะไร? มันคือ 1 หาร 10 หรือ `1/10` ในระบบเลขฐานสิบ ตัวเลขแบบนี้แสดงได้ง่าย เปรียบเทียบกับ 1 หาร 3 หรือ `1/3` ซึ่งเป็นเศษส่วนไม่รู้จบ `0.33333(3)`
=======
```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ดังนั้น การหารด้วยกำลังของ 10 รับประกันว่าจะทำงานได้ดีในระบบฐานสิบ แต่การหารด้วย 3 ไม่ใช่ ด้วยเหตุผลเดียวกัน ในระบบไบนารี การหารด้วยกำลังของ 2 รับประกันว่าจะทำงานได้ แต่ `1/10` กลายเป็นเศษส่วนไบนารีไม่รู้จบ

ไม่มีทางเก็บ *0.1 หรือ 0.2 อย่างแม่นยำ* โดยใช้ระบบไบนารี เช่นเดียวกับที่ไม่มีทางเก็บหนึ่งส่วนสามเป็นเศษส่วนทศนิยมได้อย่างแม่นยำ

รูปแบบตัวเลข IEEE-754 แก้ปัญหานี้โดยปัดเศษไปยังตัวเลขที่ใกล้ที่สุดที่เป็นไปได้ กฎการปัดเศษเหล่านี้ปกติไม่ให้เราเห็น "การสูญเสียความแม่นยำเล็กน้อย" นั้น แต่มันมีอยู่

เราสามารถเห็นสิ่งนี้ในการทำงาน:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

และเมื่อเรารวมสองตัวเลข "การสูญเสียความแม่นยำ" ของพวกมันจะรวมกัน

นั่นคือเหตุผลที่ `0.1 + 0.2` ไม่เท่ากับ `0.3` อย่างแม่นยำ

```smart header="ไม่ใช่แค่จาวาสคริปต์"
ปัญหาเดียวกันนี้มีอยู่ในภาษาโปรแกรมอื่นๆ หลายภาษา

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby ให้ผลลัพธ์เดียวกัน เพราะพวกมันใช้รูปแบบตัวเลขเดียวกัน
=======
PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

เราสามารถแก้ไขปัญหานี้ได้ไหม? แน่นอน วิธีที่น่าเชื่อถือที่สุดคือปัดเศษผลลัพธ์โดยใช้วิธี [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

โปรดทราบว่า `toFixed` คืนค่าเป็นสตริงเสมอ มันรับประกันว่าจะมี 2 ตำแหน่งหลังจุดทศนิยม ซึ่งสะดวกถ้าเรามีร้านค้าออนไลน์และต้องแสดง `฿0.30` สำหรับกรณีอื่นๆ เราสามารถใช้เครื่องหมายบวกเดี่ยวเพื่อแปลงเป็นตัวเลข:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

เราสามารถคูณตัวเลขด้วย 100 (หรือตัวเลขที่ใหญ่กว่า) ชั่วคราวเพื่อเปลี่ยนให้เป็นจำนวนเต็ม ทำการคำนวณ แล้วหารกลับ เมื่อทำเช่นนี้ ข้อผิดพลาดจะลดลงบ้าง แต่ยังคงมีเมื่อหาร:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
ดังนั้น วิธีคูณ/หารช่วยลดข้อผิดพลาด แต่ไม่ได้กำจัดออกทั้งหมด
=======
So, the multiply/divide approach reduces the error, but doesn't remove it totally.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

บางครั้งเราอาจพยายามหลีกเลี่ยงเศษส่วนทั้งหมด เช่น ถ้าเราทำเรื่องร้านค้า เราอาจเก็บราคาเป็นสตางค์แทนบาท แต่ถ้าเราลดราคา 30% ล่ะ? ในทางปฏิบัติ การหลีกเลี่ยงเศษส่วนทั้งหมดแทบจะเป็นไปไม่ได้ เพียงแค่ปัดเศษตัดทศนิยมเมื่อจำเป็น

````smart header="เรื่องแปลก"
ลองรันโค้ดนี้ดู:

```js run
// สวัสดี! ฉันเป็นตัวเลขที่เพิ่มขึ้นเอง!
alert( 9999999999999999 ); // แสดง 10000000000000000
```

นี่เกิดจากปัญหาเดียวกัน: การสูญเสียความแม่นยำ มี 64 บิตสำหรับตัวเลข, 52 บิตใช้เก็บตัวเลข แต่ไม่พอ ดังนั้นตัวเลขที่มีนัยสำคัญน้อยที่สุดจึงหายไป

จาวาสคริปต์ไม่แจ้งข้อผิดพลาดในกรณีเช่นนี้ มันพยายามทำให้ตัวเลขพอดีกับรูปแบบที่ต้องการ แต่น่าเสียดายที่รูปแบบนี้ไม่ใหญ่พอ
````

```smart header="สองศูนย์"
ผลพลอยได้ที่แปลกอีกอย่างของการแสดงตัวเลขภายในคือการมีศูนย์สองแบบ: `0` และ `-0`

นั่นเพราะเครื่องหมายถูกแสดงด้วยบิตเดียว ดังนั้นจึงอาจตั้งค่าหรือไม่ตั้งค่าสำหรับตัวเลขใดๆ รวมถึงศูนย์

<<<<<<< HEAD
ในกรณีส่วนใหญ่ ความแตกต่างไม่สังเกตเห็น เพราะตัวดำเนินการปฏิบัติต่อพวกมันเหมือนกัน
=======
In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

## การทดสอบ: isFinite และ isNaN

จำค่าตัวเลขพิเศษสองค่านี้ได้ไหม?

- `Infinity` (และ `-Infinity`) เป็นค่าตัวเลขพิเศษที่มากกว่า (น้อยกว่า) ทุกอย่าง
- `NaN` แทนข้อผิดพลาด

ค่าเหล่านี้เป็นประเภท `number` แต่ไม่ใช่ตัวเลข "ปกติ" จึงมีฟังก์ชันพิเศษสำหรับตรวจสอบ:

- `isNaN(value)` แปลงอาร์กิวเมนต์เป็นตัวเลขแล้วทดสอบว่าเป็น `NaN`:

    ```js run
    alert( isNaN(NaN) ); // จริง
    alert( isNaN("str") ); // จริง
    ```

<<<<<<< HEAD
    แต่เราจำเป็นต้องใช้ฟังก์ชันนี้ไหม? เราไม่สามารถใช้การเปรียบเทียบ `=== NaN` ได้หรือ? ขอโทษ แต่คำตอบคือไม่ได้ ค่า `NaN` เป็นค่าพิเศษที่ไม่เท่ากับอะไรเลย รวมถึงตัวมันเอง:
=======
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    ```js run
    alert( NaN === NaN ); // เท็จ
    ```

- `isFinite(value)` แปลงอาร์กิวเมนต์เป็นตัวเลขและคืนค่า `จริง` ถ้าเป็นตัวเลขปกติ ไม่ใช่ `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // จริง
    alert( isFinite("str") ); // เท็จ เพราะเป็นค่าพิเศษ: NaN
    alert( isFinite(Infinity) ); // เท็จ เพราะเป็นค่าพิเศษ: Infinity
    ```

บางครั้ง `isFinite` ถูกใช้เพื่อตรวจสอบว่าค่าสตริงเป็นตัวเลขปกติหรือไม่:


```js run
let num = +prompt("ป้อนตัวเลข", '');

// จะเป็นจริงยกเว้นคุณป้อน Infinity, -Infinity หรือไม่ใช่ตัวเลข
alert( isFinite(num) );
```

โปรดทราบว่าสตริงว่างเปล่าหรือสตริงที่มีแต่ช่องว่างจะถูกปฏิบัติเป็น `0` ในทุกฟังก์ชันตัวเลขรวมถึง `isFinite`

<<<<<<< HEAD
```smart header="เปรียบเทียบกับ `Object.is`"

มีวิธีพิเศษในตัว [`Object.is`](mdn:js/Object/is) ที่เปรียบเทียบค่าเหมือน `===` แต่น่าเชื่อถือมากกว่าสำหรับสองกรณีพิเศษ:

1. ทำงานกับ `NaN`: `Object.is(NaN, NaN) === true` ซึ่งดี
2. ค่า `0` และ `-0` ต่างกัน: `Object.is(0, -0) === false` ทางเทคนิคแล้วถูกต้อง เพราะภายในตัวเลขมีบิตเครื่องหมายที่อาจต่างกันแม้บิตอื่นทั้งหมดเป็นศูนย์
=======
````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ในกรณีอื่นๆ ทั้งหมด `Object.is(a, b)` เหมือนกับ `a === b`

<<<<<<< HEAD
วิธีเปรียบเทียบนี้มักใช้ในข้อกำหนดของจาวาสคริปต์ เมื่ออัลกอริทึมภายในต้องเปรียบเทียบสองค่าว่าเหมือนกันพอดี จะใช้ `Object.is` (เรียกภายในว่า [SameValue](https://tc39.github.io/ecma262/#sec-samevalue))
=======
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```


## parseInt และ parseFloat

การแปลงเป็นตัวเลขโดยใช้เครื่องหมายบวก `+` หรือ `Number()` นั้นเข้มงวด ถ้าค่าไม่ใช่ตัวเลขพอดี จะล้มเหลว:

```js run
alert( +"100px" ); // NaN
```

ข้อยกเว้นเดียวคือช่องว่างที่อยู่ต้นหรือท้ายสตริง ซึ่งจะถูกละเลย

<<<<<<< HEAD
แต่ในชีวิตจริง เรามักมีค่าในหน่วยต่างๆ เช่น `"100px"` หรือ `"12pt"` ใน CSS และในหลายประเทศสัญลักษณ์สกุลเงินอยู่หลังจำนวน เช่น `"19฿"` และเราอยากแยกค่าตัวเลขออกมา
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

นั่นคือสิ่งที่ `parseInt` และ `parseFloat` มีไว้

ฟังก์ชันเหล่านี้ "อ่าน" ตัวเลขจากสตริงจนกว่าจะอ่านไม่ได้ ถ้าเกิดข้อผิดพลาด จะคืนค่าตัวเลขที่อ่านได้ ฟังก์ชัน `parseInt` คืนค่าจำนวนเต็ม ส่วน `parseFloat` คืนค่าทศนิยม:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, คืนเฉพาะส่วนจำนวนเต็ม
alert( parseFloat('12.3.4') ); // 12.3, หยุดอ่านที่จุดทศนิยมที่สอง
```

มีบางสถานการณ์ที่ `parseInt/parseFloat` จะคืนค่า `NaN` เกิดขึ้นเมื่อไม่สามารถอ่านตัวเลขได้เลย:

```js run
alert( parseInt('a123') ); // NaN, หยุดอ่านที่ตัวอักษรแรก
```

````smart header="อาร์กิวเมนต์ที่สองของ parseInt(str, radix)"
ฟังก์ชัน `parseInt()` มีอาร์กิวเมนต์ที่สองเป็นตัวเลือก กำหนดฐานของระบบตัวเลข ดังนั้น `parseInt` สามารถแยกวิเคราะห์สตริงของตัวเลขฐานสิบหก ฐานสอง และอื่นๆ ได้:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, ทำงานได้โดยไม่มี 0x ด้วย

alert( parseInt('2n9c', 36) ); // 123456
```
````

## ฟังก์ชันคณิตศาสตร์อื่นๆ

จาวาสคริปต์มีวัตถุ [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) ในตัว ซึ่งมีไลบรารีขนาดเล็กของฟังก์ชันคณิตศาสตร์และค่าคงที่

ตัวอย่างบางส่วน:

`Math.random()`
: สร้างตัวเลขสุ่มตั้งแต่ 0 ถึง 1 (ไม่รวม 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (ตัวเลขสุ่มใดๆ)
    ```

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: คืนค่าสูงสุด/ต่ำสุดจากอาร์กิวเมนต์ที่ให้มา
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: คืนค่า `n` ยกกำลัง `power`

    ```js run
    alert( Math.pow(2, 10) ); // 2 ยกกำลัง 10 = 1024
    ```

มีฟังก์ชันและค่าคงที่อื่นๆ อีกใน `Math` รวมถึงตรีโกณมิติ ซึ่งคุณสามารถดูได้ในเอกสารสำหรับวัตถุ [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)

## สรุป

การเขียนตัวเลขที่มีศูนย์จำนวนมาก:

- เพิ่ม `"e"` ตามด้วยจำนวนศูนย์ต่อท้ายตัวเลข เช่น: `123e6` เท่ากับ `123` ตามด้วยศูนย์ 6 ตัว `123000000`
- ตัวเลขลบหลัง `"e"` ทำให้ตัวเลขถูกหารด้วย 1 ตามด้วยจำนวนศูนย์ที่กำหนด เช่น `123e-6` หมายถึง `0.000123` (`123` หนึ่งในล้าน)

สำหรับระบบตัวเลขต่างๆ:

- เขียนตัวเลขโดยตรงในระบบฐานสิบหก (`0x`), ฐานแปด (`0o`) และฐานสอง (`0b`) ได้
- `parseInt(str, base)` แยกวิเคราะห์สตริง `str` เป็นจำนวนเต็มในระบบตัวเลขฐาน `base`, `2 ≤ base ≤ 36`
- `num.toString(base)` แปลงตัวเลขเป็นสตริงในระบบตัวเลขฐานที่กำหนด

<<<<<<< HEAD
สำหรับการแปลงค่าเช่น `12pt` และ `100px` เป็นตัวเลข:
=======
For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

- ใช้ `parseInt/parseFloat` สำหรับการแปลง "แบบยืดหยุ่น" ซึ่งอ่านตัวเลขจากสตริงแล้วคืนค่าที่อ่านได้ก่อนเกิดข้อผิดพลาด

สำหรับเศษส่วน:

- ปัดเศษโดยใช้ `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` หรือ `num.toFixed(precision)`
- พึงระวังการสูญเสียความแม่นยำเมื่อทำงานกับเศษส่วน

ฟังก์ชันคณิตศาสตร์เพิ่มเติม:

<<<<<<< HEAD
- ดู [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) เมื่อต้องการใช้ ไลบรารีนี้มีขนาดเล็ก แต่ครอบคลุมความต้องการพื้นฐานทางคณิตศาสตร์ได้
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
