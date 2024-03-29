# โหมดสมัยใหม่ "use strict" 

เป็นเวลายาวนานที่ JavaScript ถูกพัฒนาโดยไม่ต้องกังวลเรื่องความเข้ากันได้ มีการเพิ่มคุณสมบัติใหม่ๆ เข้ามาอย่างต่อเนื่อง ในขณะที่ฟังก์ชันเดิมๆ ยังคงทำงานเหมือนเดิม 

ซึ่งในแง่หนึ่งก็เป็นเรื่องดี เพราะไม่ทำให้โค้ดเดิมพังไป แต่ในอีกแง่ก็ทำให้ข้อผิดพลาดหรือการตัดสินใจออกแบบที่ไม่สมบูรณ์แบบของผู้พัฒนา JavaScript ถูกสืบทอดมาในภาษาเรื่อยๆ 

สถานการณ์เป็นแบบนั้นจนถึงปี 2009 เมื่อ ECMAScript 5 (ES5) เปิดตัว โดยมีการเพิ่มคุณสมบัติใหม่ และปรับปรุงบางส่วนที่มีอยู่เดิมให้ดีขึ้น แต่เพื่อให้โค้ดเก่ายังทำงานได้ การปรับปรุงส่วนใหญ่จึงถูกปิดไว้เป็นค่าเริ่มต้น ผู้ใช้ต้องเปิดใช้งานผ่าน directive พิเศษที่เรียกว่า `"use strict"`

## "use strict"

Directive จะมีลักษณะคล้ายสตริง: `"use strict"` หรือ `'use strict'` เมื่อวางไว้ที่ต้นสคริปต์ ทั้งสคริปต์จะทำงานในโหมด "สมัยใหม่"

ตัวอย่างเช่น:

```js
"use strict";

// โค้ดนี้จะทำงานในโหมดสมัยใหม่
...
```

เร็วๆ นี้เราจะได้เรียนรู้เรื่องฟังก์ชัน (การจัดกลุ่มคำสั่ง) ดังนั้นจึงขอบอกไว้ก่อนว่า `"use strict"` สามารถวางไว้ในฟังก์ชันได้ มันจะเปิดใช้งานโหมดเข้มงวดเฉพาะในฟังก์ชันนั้นเท่านั้น แต่โดยทั่วไปแล้วผู้คนจะใช้มันกับทั้งสคริปต์

````warn header="ตรวจสอบให้แน่ใจว่า \"use strict\" อยู่ที่ต้นสคริปต์"
โปรดตรวจสอบให้แน่ใจว่า `"use strict"` อยู่ด้านบนสุดของสคริปต์ ไม่เช่นนั้นโหมดเข้มงวดอาจไม่ถูกเปิดใช้งาน

ดังเช่นในตัวอย่างนี้ โหมดเข้มงวดจะไม่ทำงาน:

```js no-strict
alert("some code");
// "use strict" ด้านล่างถูกเพิกเฉย -- ต้องอยู่บรรทัดบนสุด

"use strict";

// โหมดเข้มงวดยังไม่เปิดใช้งาน
```

มีเพียงคอมเมนต์เท่านั้นที่สามารถปรากฏขึ้นเหนือ `"use strict"` ได้
````

```warn header="ไม่มีทางยกเลิก `use strict`"
ไม่มี directive อย่างเช่น `"no use strict"` ที่จะทำให้เอนจินย้อนกลับไปใช้พฤติกรรมแบบเก่า

เมื่อเราเข้าสู่โหมดเข้มงวดแล้ว ก็ไม่มีทางย้อนกลับได้อีก
```

## คอนโซลเบราว์เซอร์

เมื่อคุณใช้ [คอนโซลนักพัฒนา](info:devtools) ในการรันโค้ด โปรดสังเกตว่ามันไม่ได้ `use strict` โดยค่าเริ่มต้น

ในบางครั้ง เมื่อ `use strict` มีผลแตกต่างออกไป คุณอาจได้ผลลัพธ์ที่ไม่ถูกต้อง 

แล้วจะใช้ `use strict` ในคอนโซลได้อย่างไร?

ก่อนอื่น คุณสามารถลองใช้ `key:Shift+Enter` เพื่อป้อนหลายบรรทัด แล้ววาง `use strict` ไว้ด้านบน แบบนี้:

```js
'use strict'; <Shift+Enter สำหรับขึ้นบรรทัดใหม่>
//  ...โค้ดของคุณ
<Enter เพื่อรันโค้ด>
```

วิธีนี้ใช้ได้กับเบราว์เซอร์ส่วนใหญ่ เช่น Firefox และ Chrome

ถ้าไม่ได้ผล เช่นในเบราว์เซอร์รุ่นเก่า มีอีกทางที่อาจดูไม่สวยงามแต่ใช้งานได้ นั่นคือให้ห่อหุ้มมันด้วยฟังก์ชันแบบนี้:

```js
(function() {
  'use strict';

  // ...your code here...
})()
```

## เราควรใช้ "use strict" หรือไม่?

คำถามอาจดูชัดเจน แต่จริงๆ แล้วไม่ได้ชัดเจนขนาดนั้น

ถ้าสอบถามความเห็นผู้อื่น บางคนอาจแนะนำให้เริ่มสคริปต์ทุกตัวด้วย `"use strict"`... แต่คุณรู้อะไรมั้ย? มีเรื่องที่น่าสนใจกว่านั้น

JavaScript สมัยใหม่รองรับ "classes" และ "modules" - โครงสร้างขั้นสูงของภาษา (เราจะต้องได้เรียนแน่นอน) ซึ่งจะเปิดใช้งาน `use strict` โดยอัตโนมัติ ดังนั้นเราจึงไม่จำเป็นต้องเพิ่ม directive `"use strict"` เองเมื่อใช้คุณสมบัติเหล่านี้

**ดังนั้น ตอนนี้ `"use strict"` คือส่วนเสริมที่ดีที่ควรใส่ไว้ต้นสคริปต์ แต่ในอนาคตเมื่อโค้ดทั้งหมดถูกเขียนเป็น classes และ modules เราก็อาจละมันไปได้**

ถึงตอนนี้เราก็ได้มีความรู้เบื้องต้นเกี่ยวกับ `use strict` แล้ว

ในบทต่อๆ ไป เมื่อเราเรียนรู้คุณสมบัติต่างๆ ของภาษา เราจะเห็นความแตกต่างระหว่างโหมดเข้มงวดและโหมดปกติ โชคดีที่มันไม่ได้แตกต่างกันมากนัก และจริงๆ แล้วโหมดเข้มงวดทำให้ชีวิตเราสะดวกขึ้นด้วยซ้ำ

ทุกตัวอย่างโค้ดในบทเรียนนี้จะถือว่าใช้โหมดเข้มงวด ยกเว้น (ซึ่งพบได้น้อยมาก) ที่ระบุเป็นอย่างอื่น
