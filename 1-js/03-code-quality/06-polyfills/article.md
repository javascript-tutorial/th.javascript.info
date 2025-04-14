# Polyfills และ Transpilers

ภาษา JavaScript มีวิวัฒนาการอย่างต่อเนื่อง มีข้อเสนอใหม่ๆ สำหรับภาษานี้เกิดขึ้นเป็นประจำ โดยจะมีการวิเคราะห์และพิจารณาว่าข้อเสนอใดมีคุณค่าเพียงพอที่จะเพิ่มเข้าไปในรายการที่ <https://tc39.github.io/ecma262/> จากนั้นจะค่อยๆ ผ่านเข้าสู่[ข้อกำหนด](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)

<<<<<<< HEAD
ทีมงานที่อยู่เบื้องหลังเอนจิ้น JavaScript มีแนวคิดของตัวเองว่าจะเริ่มใช้อะไรก่อน พวกเขาอาจตัดสินใจใช้ข้อเสนอที่ยังอยู่ในร่างและเลื่อนสิ่งที่อยู่ในข้อกำหนดแล้วออกไป เพราะมันน่าสนใจน้อยกว่าหรือยากกว่าที่จะทำ
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

ดังนั้นจึงเป็นเรื่องปกติที่เอนจิ้นจะใช้งานแค่บางส่วนของมาตรฐานเท่านั้น

<<<<<<< HEAD
เว็บเพจที่ดีในการดูสถานะปัจจุบันของการรองรับฟีเจอร์ภาษาคือ <https://compat-table.github.io/compat-table/es6/> (มันใหญ่มาก เรายังมีอีกหลายอย่างที่ต้องศึกษา)

ในฐานะโปรแกรมเมอร์ เราอยากใช้ฟีเจอร์ล่าสุด ยิ่งมีของดีๆ มากเท่าไหร่ก็ยิ่งดี!
=======
So it's quite common for an engine to implement only part of the standard.

A good page to see the current state of support for language features is <https://compat-table.github.io/compat-table/es6/> (it's big, we have a lot to study yet).
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

ในทางกลับกัน จะทำอย่างไรให้โค้ดสมัยใหม่ของเราทำงานได้บนเอนจิ้นเก่าๆ ที่ยังไม่เข้าใจฟีเจอร์ใหม่ๆ

มีเครื่องมือสองอย่างสำหรับเรื่องนี้:

1. Transpilers
2. Polyfills

ที่นี่ในบทนี้ จุดประสงค์ของเราคือการทำความเข้าใจเบื้องต้นว่าพวกมันทำงานอย่างไร และบทบาทของมันในการพัฒนาเว็บ

## Transpilers

[Transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) เป็นซอฟต์แวร์พิเศษที่แปลโค้ดต้นฉบับอันหนึ่งเป็นโค้ดต้นฉบับอีกชุดหนึ่ง มันสามารถแยกวิเคราะห์ ("อ่านและทำความเข้าใจ") โค้ดสมัยใหม่ และเขียนใหม่โดยใช้โครงสร้างไวยากรณ์แบบเก่า เพื่อให้ทำงานได้แม้กับเอนจิ้นที่ล้าสมัย

ยกตัวอย่างเช่น JavaScript ก่อนปี 2020 ไม่มี "ตัวดำเนินการ nullish coalescing" `??` ดังนั้น หากผู้ใช้ใช้เบราว์เซอร์รุ่นเก่า มันอาจล้มเหลวในการทำความเข้าใจโค้ดอย่างเช่น `height = height ?? 100`

Transpiler จะวิเคราะห์โค้ดของเราและเขียน `height ?? 100` ใหม่เป็น `(height !== undefined && height !== null) ? height : 100`

```js
// ก่อนรัน transpiler
height = height ?? 100;

// หลังรัน transpiler  
height = (height !== undefined && height !== null) ? height : 100;
```

ตอนนี้โค้ดที่เขียนใหม่ก็เหมาะสมกับเอนจิ้น JavaScript รุ่นเก่าแล้ว

โดยปกติแล้ว นักพัฒนาจะรัน transpiler บนคอมพิวเตอร์ของตัวเอง แล้วจากนั้นจึงนำโค้ดที่ผ่านการ transpile แล้วไปใช้บนเซิร์ฟเวอร์

<<<<<<< HEAD
พูดถึงชื่อ [Babel](https://babeljs.io) ถือเป็นหนึ่งใน transpiler ที่โดดเด่นที่สุดในตอนนี้

ระบบสร้างโปรเจ็กต์สมัยใหม่ เช่น [webpack](https://webpack.js.org/) มีวิธีให้รัน transpiler อัตโนมัติทุกครั้งที่มีการเปลี่ยนแปลงโค้ด ทำให้ง่ายต่อการรวมเข้ากับกระบวนการพัฒนา
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

## Polyfills

คุณสมบัติใหม่ของภาษาอาจไม่ได้รวมเฉพาะโครงสร้างไวยากรณ์และตัวดำเนินการเท่านั้น แต่ยังรวมถึงฟังก์ชันที่มีในตัวด้วย

ยกตัวอย่างเช่น `Math.trunc(n)` เป็นฟังก์ชันที่ "ตัดทอน" ส่วนทศนิยมของตัวเลข เช่น `Math.trunc(1.23)` จะคืนค่า `1`

ในเอนจิ้น JavaScript บางตัวที่ล้าสมัยมาก อาจไม่มี `Math.trunc` ดังนั้นโค้ดดังกล่าวจะทำงานไม่ได้

เนื่องจากเรากำลังพูดถึงฟังก์ชันใหม่ ไม่ใช่การเปลี่ยนแปลงไวยากรณ์ จึงไม่จำเป็นต้อง transpile อะไรตรงนี้ เพียงแค่ต้องประกาศฟังก์ชันที่ขาดหายไปเท่านั้น

สคริปต์ที่อัปเดตหรือเพิ่มฟังก์ชันใหม่ เรียกว่า "polyfill" มันจะ "เติมเต็ม" ช่องว่างและเพิ่มการนำไปใช้งานที่ขาดหายไป

สำหรับกรณีนี้โดยเฉพาะ polyfill สำหรับ `Math.trunc` คือสคริปต์ที่เพิ่มการนำไปใช้งานให้ ดังนี้:

```js
if (!Math.trunc) { // ถ้าไม่มีฟังก์ชันดังกล่าว
  // ให้นำไปใช้งาน
  Math.trunc = function(number) {
    // Math.ceil และ Math.floor มีอยู่แม้ในเอนจิ้น JavaScript โบราณ
    // จะมีการอธิบายเพิ่มเติมในบทเรียนถัดไป
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
JavaScript เป็นภาษาที่มีพลวัตสูงมาก สคริปต์สามารถเพิ่ม/แก้ไขฟังก์ชันใดๆ ก็ได้ แม้แต่ฟังก์ชันในตัว

มีไลบรารี polyfill ที่น่าสนใจสองแห่งคือ:
- [core js](https://github.com/zloirock/core-js) ที่รองรับฟีเจอร์เป็นจำนวนมาก โดยสามารถเลือกใช้เฉพาะฟีเจอร์ที่ต้องการได้
- บริการ [polyfill.io](https://polyfill.io/) ที่จัดเตรียมสคริปต์พร้อม polyfills ตามคุณสมบัติและเบราว์เซอร์ของผู้ใช้

## สรุป
=======
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

One interesting polyfill library is [core-js](https://github.com/zloirock/core-js), which supports a wide range of features and allows you to include only the ones you need.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

ในบทนี้เราต้องการจูงใจให้คุณศึกษาคุณสมบัติภาษาที่ทันสมัยและแม้กระทั่งที่อยู่ในระหว่างพัฒนา แม้ว่าตอนนี้เอนจิ้น JavaScript จะยังรองรับได้ไม่ดีนัก

อย่าลืมใช้ transpiler (ถ้าใช้ไวยากรณ์หรือตัวดำเนินการใหม่) และ polyfills (เพื่อเพิ่มฟังก์ชันที่อาจขาดหายไป) พวกมันจะช่วยให้มั่นใจได้ว่าโค้ดจะทำงาน

<<<<<<< HEAD
ตัวอย่างเช่น ในภายหลังเมื่อคุณคุ้นเคยกับ JavaScript แล้ว คุณสามารถตั้งค่าระบบการสร้างโค้ดที่อิงกับ [webpack](https://webpack.js.org/) ร่วมกับปลั๊กอิน [babel-loader](https://github.com/babel/babel-loader)

แหล่งข้อมูลดีๆ ที่แสดงสถานะปัจจุบันของการรองรับคุณสมบัติต่างๆ ได้แก่:
- <https://compat-table.github.io/compat-table/es6/> - สำหรับ JavaScript แท้ๆ
- <https://caniuse.com/> - สำหรับฟังก์ชันที่เกี่ยวข้องกับเบราว์เซอร์
=======
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://compat-table.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

ป.ล. Google Chrome มักจะอัปเดตการรองรับคุณสมบัติภาษาใหม่ๆ ได้ทันสมัยที่สุด ลองใช้ Chrome ดูหากเดโมในบทเรียนไม่ทำงาน แต่โดยทั่วไปแล้วเดโมในบทเรียนส่วนใหญ่น่าจะทำงานได้กับเบราว์เซอร์สมัยใหม่ทุกตัว