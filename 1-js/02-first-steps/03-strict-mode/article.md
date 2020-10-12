# โหมดใหม่ "use strict"

เป็นเวลานานแล้วที่จาวาสคริปต์ออกฟีเจอร์ใหม่ๆโดยไม่มีปัญหาเรื่องความเข้ากันได้ (Compatibility) ถึงจะมีฟีเจอร์ใหม่ๆ แต่ฟีเจอร์เดิมๆก็ยังคงทำงานได้อยู่นั่นเอง

ข้อดีก็คือโค้ดของเรากับโค้ดเมื่อสิบปีที่แล้วก็สามารถทำงานร่วมกันได้ แต่มันมีข้อเสียเพราะตัวผู้สร้างภาษาเอง ก็ดันไปสร้างบาปกำเนิดกับจาวาสคริปต์ด้วย โดยไม่รู้ตัว ดังนั้นเมื่อการหักกับฟีเจอร์เก่าๆแล้ว บาปกำเนิดของจาวาสคริปต์ จึงกลายเป็นคำสาป ชำระล้างไม่ได้ไปตลอดกาล

จนเวลาล่วงเลยมาถึงปี 2009 มาตรฐานภาษาชุดใหม่เปิดตัว มันคือ ECMAScript5 ที่เพิ่มทั้งฟีเจอร์ใหม่ รวมถึงไปโมฟีเจอร์เก่าๆบางตัวด้วย ผลก็คือ `แหก` นั่นเอง แต่ทางผู้สร้างมาตรฐานชุดนี้ตระหนักในเรื่องนี้ดี เพื่อให้โค้ดเก่าๆทำงานได้ พวกเขาจึงได้ปิดฟีเจอร์โมภาษานี้ไป แต่เราสามารถเปิดตัวโมนี้ได้ผ่านคำสั่ง `"use strict"`

## "use strict"

ตัวคำสั่งหน้าตาเหมือนสตริง `"use strict"` หรือ `'use strict'` แต่คำสั่นี้จะต้องอยู่บนสุดของสคริปต์คือบรรทัดที่หนึ่ง ทีนี้สคริปต์ทั้งหมดของเราก็ทำงานแบบ "สมัยใหม่ (modern)"

ดั่งตัวอย่าง:

```js
"use strict";

// โค้ดที่เขียนต่อจากนี้จะทำงานแบบจาวาสคริปต์สมัยใหม่
...
```

<<<<<<< HEAD
เราจะเรียนรู้เรื่องฟังก์ชั่น (วิธีการจัดกลุ่มคำสั่ง) ในไม่ช้า แต่อยากบอก `"use strict"` สามารถวางไว้ที่บรรทัดเริ่มต้นของฟังก์ชั่นได้ แทนที่จะเป็นทั้งไฟล์ ตามแบบนี้ก็เพื่อจะใช้โหมด `"use strict"` แค่ในฟังก์ชั่นนี้เท่านั้น แต่ปกติแล้ว นิยมวางไว้บรรทัดแรกมากกว่า

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

````warn header="อย่าลืมว่า \"use strict\" ต้องอยู่บรรทัดแรกเสมอ"
อย่าลืมว่า `"use strict"` ต้องอยู่บรรทัดแรกของไฟล์สคริปต์เสมอ ไม่อย่างนั้นโหมดนี้จะไม่ทำงาน

เช่นตัวอย่างด้านล่าง

```js no-strict
alert("some code");
// ตัวเอนจินจะไม่สนใจ "use strict" ด้านล่าง โหมดนี้จึงไม่ได้ถูกทำงาน

"use strict";

// strict mode จะไม่ทำงาน
```

หากมีคอมเม้นอยู่เหนือ "use strict" ตัวของ "use strict" ก็จะทำปกติ
````

```warn header="ไม่มีทางยกเลิกโหมด `use strict` ได้"
มันไม่มีคำสั่งอย่าง "no use strict" เพื่อได้เอนจินกลับไปทำงานในโหมดเดิมได้

ดังนั้นเมื่อเราเปิดโหมด `use strict` แล้ว เราก็ไม่มีทางปิดมันได้
```

## คอนโซลบนเบราเซอร์

<<<<<<< HEAD
หากเราต้องการทดสอบฟีเจอร์อะไรบางอย่างบนคอนโซลของเบราเซอร์ โปรดจงคุณไว้ว่าคอนโซลบนเบราเซอร์ปิดโหมด `use strict` เอาไว้
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

ดังนั้นในบางครั้งระหว่างโหมด `use strict` กับที่ไม่ใช่ ก็จะได้ผลลัพธ์ที่แตกต่างกัน

<<<<<<< HEAD
เราสามารถลองดูได้โดยกดปุ่ม `key:Shift+Enter` เพื่อป้อนข้อความหลายบรรทัด และอย่าลืมใส่ `use strict` ไว้บนสุดทุกครั้ง, แบบนี้:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js
'use strict'; <Shift+Enter for a newline>
//  ...โค้ดของเรา
<กด Enter เพื่อให้โค้ดทำงาน>
```

ฟีเจอร์นี้รับรองบนเบราเซอร์ส่วนใหญ่แล้วอย่าง Chrome และ Firefox

<<<<<<< HEAD
หากไม่แน่ใจว่า เบราเซอร์ที่เราใช้นั้นสามารถใช้โหมดนี้ได้หรือเปล่า โค้ดข้างล่างคือโค้ดที่เอาไว้ตรวจสอบว่า เบราเซฮร์ดังกล่าวสามารถใช้โหมดนี้ได้
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js
(function() {
  'use strict';

  // ...your code here...
})()
```

<<<<<<< HEAD
## เปิดโหมด "use strict" ไว้เสมอ

อันที่จริงเราก็ยังไม่ได้บอกข้อแตกต่างของโหมด "use strict" กับโหมดปกติไว้เลย

ในบทถัดไป เราจะมาเรียนรู้ฟีเจอร์ของภาษานี้กัน เราจะได้เห็นความแตกต่างระหว่างสองโหมดบ้างต้น ความโชคดีอย่างแรกคือความแตกต่างมีเพียงเล็กน้อย ซึ่งง่ายต่อการจำจด อย่างที่สองคือมันจะทำให้ชีวิตของเราง่ายขึ้นในพริบตา

สำหรับตอนนี้แค่นี้ก็พอเพียงแล้ว

1. คำสั่ง `"use strict"` เป็นคำสั่งสำหรับเอนจินยุค ES5 ซึ่งเอาไว้สลับโหมดระหว่างโหมดปกติกับโหมด `"use strict"` เราจะมาพูดถึงรายละเอียดกันอีกทีในบทถัดไป
2. เปิด strict โหมดง่ายๆเพียงแค่ใส่ `"use strict"` ไว้บนสุดของสคริปต์หรือฟังชั่นก์ เมื่อเอนจินอ่านเจอมันจะเปิดโหมดนี้โดยอัตโนมัติ
3. โมเดิร์นเบราเซอร์ รองรับโหมด strict ทั้งหมดแล้ว
4. แนะนำว่าควรเปิด strict โหมดไว้เสมอ
=======
## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
