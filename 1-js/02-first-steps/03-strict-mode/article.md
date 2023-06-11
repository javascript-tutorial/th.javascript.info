# โหมดสมัยใหม่, "use strict"

นานมาแล้วที่ JavaScript วิวัฒนาการไปโดยไม่มีปัญหาเรื่องความเข้ากันได้ (compatibility) ฟีเจอร์ใหม่ๆถูกเพิ่มเข้ามาในภาษา ในขณะที่ฟังก์ชั่นที่มีอยู่แล้วไม่มีการเปลี่ยนแปลง

สิ่งนี้มีข้อดีคือไม่เคยทำให้โค้ดที่มีอยู่แล้วเสียหาย แต่ข้อเสียคือข้อผิดพลาดหรือการตัดสินใจที่ไม่รอบคอบของผู้สร้าง JavaScript จะติดอยู่ในภาษานี่ไปตลอดกาล

สถานการณ์นี้ยังคงอยู่จนกระทั่งปี 2009 เมื่อ ECMAScript 5 (ES5) มากำกับดูแลสเปคของ JavaScript ทางองค์กรได้เพิ่มฟีเจอร์ใหม่เข้าไปในภาษา และแก้ไขฟีเจอร์ที่มีอยู่บางส่วน และเพื่อรักษาความทำงานของโค้ดเก่า การปรับปรุงส่วนใหญ่โดย ECMAScript จะถูกปิดโดยค่าเริ่มต้น ดังนั้นหากคุณต้องการเปิดใช้งานฟีเจอร์และการปรับปรุงใหม่ๆเข้ามา คุณจะต้องระบุในสคริปต์อย่างชัดเจนด้วยคำสั่งพิเศษ: `"use strict"`

## "use strict"

คำสั่งดังกล่าวนี้จะมีลักษณะเหมือนสตริง: `"use strict"` หรือ `"use strict"` เมื่อวางไว้ที่บนสุดของสคริปต์ สคริปต์ทั้งหมดจะทำงานในรูปแบบ "สมัยใหม่"

ตัวอย่างเช่น:

```js
"use strict";

// โค้ดนี้จะทำงานในแบบสมัยใหม่
...
```

ไม่ช้าเราจะได้เรียนรู้เรื่องฟังก์ชัน (วิธีการจัดกลุ่มคำสั่ง) ดังนั้นโปรดจงรู้ไว้ว่า `"use strict"` สามารถวางไว้ที่หน้าของฟังก์ชันได้ การกระทำนี้เปิดโหมดสมัยใหม่สำหรับฟังก์ชันตัวนั้นเท่านั้น แต่ปกติเรามักจะวางไว้บนสุดของสคริปต์

````warn header="เช็คให้แน่ใจว่า \"use strict\" อยู่บนสุดของสคริปต์เสมอ"
โปรดทำให้แน่ใจว่า `"use strict"` อยู่ที่บนสุดของสคริปต์ มิเช่นนั้น โหมดสมัยใหม่อาจจะไม่ถูกเปิดใช้งาน

โหมดสมัยใหม่ไม่ถูกเปิดใช้งานที่นี่:

```js no-strict
alert("some code");
// "use strict" ด้านล่างนี้จะถูกละเลย -- มันต้องอยู่ที่บนสุด

"use strict";

// โหมดสมัยใหม่จะไม่ถูกเปิดใข้งาน
```

เพียงแค่คอมเม้นที่อยู่เหนือ `"use strict"` เท่านั้น
````

```warn header="ไม่มีทางปิดโหมดสมัยใหม่จากคำสั่ง `use strict` ได้"
ไม่มีคำสั่งเช่น `"no use strict"` ที่จะคืนสภาพโหมดสมัยเก่ากลับมาได้

เมื่อเราเข้าสู่โหมด "สมัยใหม่" แล้ว มันจะไม่มีทางกลับมาเป็น "สมัยเก่า" อีกต่อไป
```

## Browser console

When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.

Sometimes, when `use strict` makes a difference, you'll get incorrect results.

So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

It works in most browsers, namely Firefox and Chrome.

If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:

```js
(function() {
  'use strict';

  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.