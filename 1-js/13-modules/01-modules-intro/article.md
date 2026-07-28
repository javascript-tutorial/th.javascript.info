
# โมดูล — บทนำ

แอปที่ใหญ่ขึ้นเรื่อยๆ จัดการยังไงดี? แตกโค้ดออกเป็นหลายไฟล์ไง — ไฟล์พวกนี้แหละที่เรียกว่า "โมดูล" แต่ละโมดูลอาจเก็บคลาส หรือชุดฟังก์ชันที่ทำงานด้านใดด้านหนึ่งโดยเฉพาะ

ย้อนไปไกลๆ JavaScript ไม่มี module syntax ในตัวภาษาเลย แต่ก็ไม่ใช่ปัญหา เพราะสมัยนั้นสคริปต์เล็กและง่ายมาก ไม่มีความจำเป็น

แต่พอสคริปต์โตขึ้นเรื่อยๆ ชุมชน developer ก็เลยประดิษฐ์ระบบจัดการโมดูลกันเอง — มีหลายแบบด้วย ทั้งไลบรารีพิเศษสำหรับโหลดโมดูลตามต้องการ

ระบบโมดูลที่เคยดังในอดีต (เล่าไว้เพื่อความรู้):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- หนึ่งในระบบโมดูลที่เก่าแก่ที่สุด เริ่มต้นจากไลบรารี [require.js](https://requirejs.org/)
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- ระบบโมดูลที่สร้างขึ้นมาสำหรับ Node.js โดยเฉพาะ
- [UMD](https://github.com/umdjs/umd) -- อีกระบบหนึ่งที่พยายามเป็น universal รองรับทั้ง AMD และ CommonJS

ตอนนี้สิ่งพวกนี้ค่อยๆ กลายเป็นประวัติศาสตร์ แต่ยังเจอได้ในโค้ดเก่าๆ

ระบบโมดูลในตัวภาษา JavaScript มาตรงๆ ในปี 2015 และค่อยๆ พัฒนามาเรื่อยๆ จนตอนนี้บราวเซอร์หลักๆ และ Node.js รองรับหมดแล้ว เราจะเรียนแบบ modern นี้เลย

## โมดูลคืออะไร?

โมดูลก็คือไฟล์ธรรมดาๆ นั่นเอง — หนึ่งสคริปต์ หนึ่งโมดูล แค่นั้นเอง

โมดูลโหลดกันเองได้ และใช้ `export` กับ `import` ในการรับส่งฟังก์ชันระหว่างกัน:

- `export` — ติดป้ายให้ตัวแปรหรือฟังก์ชันที่ต้องการให้ไฟล์อื่นเรียกใช้ได้
- `import` — ดึงสิ่งที่ export ไว้มาใช้ในโมดูลนี้

ตัวอย่าง ไฟล์ `sayHi.js` export ฟังก์ชันออกมา:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...แล้วไฟล์อื่น import มาใช้ได้เลย:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // สวัสดี, John!
```

`import` โหลดโมดูลจาก path `./sayHi.js` ที่นับจากไฟล์ปัจจุบัน แล้วเอาฟังก์ชัน `sayHi` ที่ export ไว้มาใส่ตัวแปร

ลองรันตัวอย่างในบราวเซอร์ดูกัน

เนื่องจากโมดูลมี keyword และฟีเจอร์พิเศษ เราต้องบอกบราวเซอร์ว่านี่คือ module script โดยใส่ attribute `<script type="module">` ด้วย

แบบนี้:

[codetabs src="say" height="140" current="index.html"]

บราวเซอร์จะโหลดและรันโมดูลที่ import มาให้เองโดยอัตโนมัติ (รวมถึง import ซ้อนด้วยถ้ามี)

```warn header="โมดูลใช้ได้แค่ผ่าน HTTP(s) เท่านั้น ไม่ใช่เปิดไฟล์ตรงๆ"
ถ้าลองเปิดหน้าเว็บผ่าน `file://` โดยตรง จะพบว่า `import/export` ใช้ไม่ได้ ต้องรันผ่าน web server เล็กๆ เช่น [static-server](https://www.npmjs.com/package/static-server#getting-started) หรือใช้ฟีเจอร์ "live server" ของ editor เช่น [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ใน VS Code
```

## ฟีเจอร์หลักของโมดูล

โมดูลต่างจากสคริปต์ธรรมดายังไงล่ะ?

มีจุดต่างหลักๆ ที่ใช้ได้ทั้งบราวเซอร์และ Node.js

### ใช้ "use strict" เสมอ

โมดูลรัน strict mode ตลอด เช่น ถ้าพยายามกำหนดค่าให้ตัวแปรที่ยังไม่ได้ประกาศ จะได้ error ทันที

```html run
<script type="module">
  a = 5; // error
</script>
```

### สโคปแยกของแต่ละโมดูล

แต่ละโมดูลมีสโคประดับบนสุดเป็นของตัวเอง — ตัวแปรและฟังก์ชันที่ประกาศในโมดูลหนึ่ง ไฟล์อื่นมองไม่เห็น

ตัวอย่างด้านล่างนี้ นำ script สอง script เข้ามา แล้ว `hello.js` พยายามใช้ตัวแปร `user` จาก `user.js` แต่ทำไม่ได้ เพราะเป็นคนละโมดูล (ดู error ใน console):

[codetabs src="scopes" height="140" current="index.html"]

โมดูลต้อง `export` สิ่งที่ต้องการให้ภายนอกเข้าถึง และ `import` สิ่งที่ต้องการใช้

- `user.js` ต้อง export ตัวแปร `user` ออกมา
- `hello.js` ต้อง import จาก `user.js`

พูดง่ายๆ คือ แทนที่จะพึ่งตัวแปร global เราใช้ import/export แทน

นี่คือแบบที่ถูก:

[codetabs src="scopes-working" height="140" current="hello.js"]

ในบราวเซอร์ ถ้าพูดถึงหน้า HTML แต่ละ `<script type="module">` ก็มีสโคประดับบนสุดแยกของตัวเองด้วย

สอง script ในหน้าเดียวกัน ต่างก็เป็น `type="module"` ก็มองไม่เห็นตัวแปรของกันและกัน:

```html run
<script type="module">
  // ตัวแปรนี้มองเห็นได้แค่ใน module script นี้เท่านั้น
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

```smart
ถ้าจำเป็นต้องทำให้ตัวแปรเป็น global จริงๆ ในบราวเซอร์ก็ทำได้ด้วยการกำหนดค่าให้ `window` โดยตรง เช่น `window.user = "John"`

script ทุกตัวจะเห็นมัน ทั้งแบบ `type="module"` และแบบปกติ

แต่พูดตรงๆ เลย ท่านี้ไม่แนะนำ ควรหลีกเลี่ยงถ้าทำได้
```

### โค้ดของโมดูลรันแค่ครั้งเดียวตอน import ครั้งแรก

ถ้า import โมดูลเดียวกันจากหลายที่ โค้ดในโมดูลนั้นรันแค่ครั้งเดียว — ตอน import ครั้งแรก จากนั้น export ที่สร้างไว้จะแชร์ไปให้ทุกคนที่ import ต่อมา

เรื่องนี้มีผลที่ต้องระวัง ลองดูตัวอย่างกัน

ถ้าโค้ดในโมดูลมี side-effect เช่น แสดงข้อความ การ import หลายครั้งจะทริกเกอร์แค่ครั้งแรกเท่านั้น:

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// Import โมดูลเดียวกันจากหลายไฟล์

// 📁 1.js
import `./alert.js`; // โมดูล evaluate แล้ว!

// 📁 2.js
import `./alert.js`; // (ไม่แสดงอะไร)
```

การ import ครั้งที่สองไม่แสดงอะไร เพราะโมดูล evaluate ไปแล้ว

กฎง่ายๆ คือ: โค้ดระดับบนสุดของโมดูลเหมาะสำหรับ initialization หรือสร้างโครงสร้างข้อมูลภายใน ถ้าต้องการให้เรียกซ้ำได้หลายครั้ง ให้ export เป็นฟังก์ชัน เหมือนที่ทำกับ `sayHi` ข้างบน

ทีนี้ลองดูตัวอย่างที่ลึกขึ้น

สมมติโมดูล export ออบเจ็กต์ออกมา:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

ถ้า import โมดูลนี้จากหลายไฟล์ โมดูลรันแค่ครั้งเดียว สร้างออบเจ็กต์ `admin` ทีเดียว แล้วส่งต่อให้ทุกคนที่ import

ทุกคนได้ `admin` ออบเจ็กต์อันเดียวกันทั้งหมด:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// 1.js และ 2.js ต่างอ้างอิงถึง admin object อันเดียวกัน
// การแก้ไขใน 1.js มองเห็นได้ใน 2.js
*/!*
```

เห็นไหม? พอ `1.js` แก้พร็อพเพอร์ตี้ `name` ใน `admin` ที่ import มา `2.js` ก็เห็นค่าใหม่นั้นด้วย

เหตุผลก็เพราะโมดูลรันครั้งเดียว — export สร้างขึ้นมาครั้งหนึ่งแล้วแชร์ ใครแก้ `admin` ทุกคนก็เห็นการเปลี่ยนแปลงนั้น

**พฤติกรรมแบบนี้มีประโยชน์มาก เพราะให้เรา *configure* โมดูลได้**

โมดูลหนึ่งอาจให้ฟังก์ชันการทำงานทั่วไปที่ต้องตั้งค่าก่อนใช้ เช่น ระบบ authentication ที่ต้องการ credentials แล้ว export config object ออกมาให้โค้ดภายนอกมาตั้งค่า

รูปแบบที่คลาสสิคมากๆ:
1. โมดูล export ช่องทางสำหรับตั้งค่า เช่น config object
2. ตอน import ครั้งแรก เราใส่ค่าเข้าไปในพร็อพเพอร์ตี้ — ปกติ application script ระดับบนสุดจะทำ
3. การ import ต่อๆ มาใช้โมดูลได้เลย

ตัวอย่าง `admin.js` ให้ฟังก์ชัน authentication แต่รอรับ credentials จากภายนอกผ่าน `config`:

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

`admin.js` export ออบเจ็กต์ `config` ออกมา (ตอนแรกว่างเปล่า แต่จะมี default properties ก็ได้)

แล้วใน `init.js` ซึ่งเป็น script แรกของแอป เรา import `config` มาแล้วกำหนดค่า `config.user`:

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...ตอนนี้ `admin.js` configure เรียบร้อย

ไฟล์อื่นที่ import มาทีหลังก็เรียกใช้ได้ แล้วแสดง user ที่ตั้งไว้ถูกต้อง:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // พร้อมรับใช้, *!*Pete*/!*!
```


### import.meta

ออบเจ็กต์ `import.meta` เก็บข้อมูลเกี่ยวกับโมดูลปัจจุบัน

เนื้อหาขึ้นอยู่กับ environment ในบราวเซอร์จะเก็บ URL ของ script หรือ URL ของหน้า HTML ถ้าเป็น inline script:

```html run height=0
<script type="module">
  alert(import.meta.url); // URL ของ script
  // สำหรับ inline script — URL ของหน้า HTML ปัจจุบัน
</script>
```

### ใน module, this เป็น undefined

จุดนี้เล็กน้อยหน่อย แต่ก็ควรรู้ไว้

ใน module, `this` ระดับบนสุดจะเป็น undefined

ต่างจาก script ธรรมดาที่ `this` คือ global object:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## ฟีเจอร์เฉพาะของบราวเซอร์

ยังมีความแตกต่างอีกหลายจุดระหว่าง `type="module"` กับ script ธรรมดาในบราวเซอร์

ถ้าเพิ่งอ่านครั้งแรก หรือยังไม่ได้ใช้ JavaScript ในบราวเซอร์ ข้ามส่วนนี้ไปก่อนก็ได้

### Module script โหลดแบบ deferred

Module script เป็น deferred *เสมอ* — เหมือนกับการใส่ attribute `defer` (ดูเพิ่มใน <info:script-async-defer>) ใช้ได้ทั้ง external และ inline script

พูดง่ายๆ คือ:
- การดาวน์โหลด external module script `<script type="module" src="...">` ไม่บล็อก HTML ให้โหลดคู่กันไปได้เลย
- module script รอจนกว่า HTML document จะโหลดเสร็จสมบูรณ์ก่อน (แม้ script ตัวเองเล็กมากและโหลดเร็วกว่า HTML ก็ตาม)
- ลำดับของ script ยังรักษาไว้ — script ที่อยู่ก่อนในเอกสารรันก่อน

ผลพลอยได้คือ module script "มองเห็น" HTML ทั้งหน้าที่โหลดเสร็จแล้ว รวมถึง element ที่อยู่ด้านล่างด้วย

ตัวอย่าง:

```html run
<script type="module">
*!*
  alert(typeof button); // object: script มองเห็น button ด้านล่างได้
*/!*
  // เพราะ module เป็น deferred script จึงรันหลังจาก page โหลดเสร็จ
</script>

Compare to regular script below:

<script>
*!*
  alert(typeof button); // button คือ undefined, script มองไม่เห็น element ด้านล่าง
*/!*
  // script ธรรมดารันทันที ก่อนที่ส่วนที่เหลือของหน้าจะถูกประมวลผล
</script>

<button id="button">Button</button>
```

สังเกตว่า: script ตัวที่สองรันก่อนตัวแรกด้วยซ้ำ เราจะเห็น `undefined` ก่อน แล้วจึง `object`

เพราะ module เป็น deferred จึงรอให้ document ประมวลผลก่อน ส่วน script ธรรมดารันทันที เลยเห็น output ของมันก่อน

ข้อควรระวัง: หน้า HTML จะแสดงให้เห็นก่อน แล้ว JavaScript module ค่อยรันทีหลัง

ผู้ใช้อาจเห็นหน้าเว็บก่อนที่ JavaScript พร้อมใช้งาน เลยควรใส่ "loading indicator" หรือจัดการบางอย่างเพื่อไม่ให้ผู้ใช้งง

### async ทำงานได้กับ inline script

สำหรับ script ธรรมดา attribute `async` ใช้ได้แค่กับ external script เท่านั้น Async script รันทันทีที่พร้อม ไม่สนใจ script อื่นหรือ HTML document

สำหรับ module script ใช้ได้กับ inline script ด้วย

ตัวอย่าง inline script ด้านล่างใส่ `async` ไว้ เลยไม่รอใคร

จะ import (โหลด `./analytics.js`) แล้วรันทันทีที่พร้อม แม้ HTML document ยังไม่เสร็จ หรือ script อื่นยังค้างอยู่ก็ตาม

เหมาะสำหรับฟังก์ชันที่ไม่ขึ้นอยู่กับอะไร เช่น ตัวนับ โฆษณา event listener ระดับ document

```html
<!-- โหลด dependency ทั้งหมด (analytics.js) แล้วรัน script -->
<!-- ไม่รอ document หรือ <script> tag อื่น -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### External scripts

External script ที่มี `type="module"` ต่างออกไป 2 จุด:

1. External script ที่มี `src` เดียวกัน รันแค่ครั้งเดียว:
    ```html
    <!-- script my.js จะถูกโหลดและรันแค่ครั้งเดียว -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. External script ที่โหลดจาก origin อื่น (เช่น เว็บไซต์อื่น) ต้องมี header [CORS](mdn:Web/HTTP/CORS) ตามที่อธิบายไว้ในบท <info:fetch-crossorigin> พูดง่ายๆ คือถ้า module script โหลดจาก origin อื่น server ฝั่งนั้นต้องส่ง header `Access-Control-Allow-Origin` มาด้วย
    ```html
    <!-- another-site.com ต้องส่ง Access-Control-Allow-Origin มาด้วย -->
    <!-- ไม่งั้น script จะไม่รัน -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    ท่านี้ช่วยเพิ่มความปลอดภัยแบบ default

### ห้ามใช้ "bare" module

ในบราวเซอร์ `import` ต้องได้รับ URL แบบ relative หรือ absolute เท่านั้น โมดูลที่ไม่มี path เลยเรียกว่า "bare" module ซึ่งใช้ใน `import` ไม่ได้

ตัวอย่าง `import` แบบนี้ใช้ไม่ได้:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// โมดูลต้องมี path เช่น './sayHi.js' หรือ path เต็มๆ
```

บาง environment อย่าง Node.js หรือ bundle tool รองรับ bare module ได้ เพราะมีระบบหา module เป็นของตัวเอง แต่บราวเซอร์ยังไม่รองรับ

### Compatibility, "nomodule"

บราวเซอร์เก่าๆ ไม่เข้าใจ `type="module"` script ที่มี type ที่ไม่รู้จักจะข้ามไปเฉยๆ เพื่อรองรับบราวเซอร์พวกนี้ ใช้ attribute `nomodule` เป็น fallback ได้:

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

## Build tools

ในงาน real-world นั้น browser module แบบ raw ๆ ไม่ค่อยได้ใช้โดยตรง ส่วนใหญ่จะ bundle ไฟล์ทั้งหมดด้วยเครื่องมืออย่าง [Webpack](https://webpack.js.org/) แล้วค่อย deploy ขึ้น production server

ข้อดีของ bundler คือควบคุมการ resolve โมดูลได้ละเอียดขึ้น รองรับ bare module และอีกเยอะเลย เช่น CSS/HTML modules ด้วย

Build tool ทำงานประมาณนี้:

1. รับ "main" module ที่จะใส่ใน `<script type="module">` ใน HTML
2. วิเคราะห์ dependency: import และ import ของ import ต่อไปเรื่อยๆ
3. สร้างไฟล์เดียวรวมโมดูลทั้งหมด (หรือหลายไฟล์ ปรับได้) โดยแทนที่ `import` แบบ native ด้วยฟังก์ชันของ bundler รองรับโมดูลชนิดพิเศษอย่าง HTML/CSS module ด้วย
4. ระหว่างนั้นอาจมีการ transform และ optimize ด้วย:
    - ลบโค้ดที่ไม่มีทางถูกเรียกออก
    - ลบ export ที่ไม่ได้ใช้ ("tree-shaking")
    - ลบ statement ที่ใช้ตอน development เช่น `console` และ `debugger`
    - แปลง JavaScript ที่เขียนด้วย syntax ใหม่สุดๆ ให้เป็น syntax เก่าที่ทำงานเหมือนกัน ผ่าน [Babel](https://babeljs.io/)
    - minify ไฟล์ผลลัพธ์ (ลบช่องว่าง เปลี่ยนชื่อตัวแปรให้สั้น ฯลฯ)

พอใช้ bundle tool แล้ว script ทั้งหมดรวมเป็นไฟล์เดียว (หรือไม่กี่ไฟล์) statement `import/export` ภายในก็แทนที่ด้วยฟังก์ชันของ bundler สคริปต์ที่ได้ออกมาจะไม่มี `import/export` เลย ไม่ต้องการ `type="module"` ใส่เป็น script ธรรมดาได้เลย:

```html
<!-- สมมติว่าได้ bundle.js มาจาก Webpack -->
<script src="bundle.js"></script>
```

แต่ native module ก็ยังใช้ได้นะ ในที่นี้เราจะไม่ใช้ Webpack — ค่อยไปตั้งค่าเองทีหลังได้

## สรุป

สรุป concept หลักๆ:

1. โมดูลคือไฟล์ ต้องการ `<script type="module">` ในบราวเซอร์เพื่อให้ `import/export` ทำงาน โมดูลมีจุดต่างหลายอย่าง:
    - เป็น deferred แบบ default
    - `async` ทำงานได้กับ inline script
    - การโหลด external script จาก origin อื่น (domain/protocol/port) ต้องมี CORS headers
    - External script ที่ซ้ำกันจะข้ามไป
2. โมดูลมีสโคประดับบนสุดของตัวเอง และรับส่งฟังก์ชันผ่าน `import/export`
3. โมดูลใช้ `use strict` เสมอ
4. โค้ดในโมดูลรันแค่ครั้งเดียว export ถูกสร้างครั้งเดียวแล้วแชร์ให้ทุก import

เวลาใช้โมดูล แต่ละโมดูลจัดการฟังก์ชันของตัวเองแล้ว export ออกมา เราก็ `import` ตรงๆ ในที่ที่ต้องการ บราวเซอร์โหลดและ evaluate ให้เองอัตโนมัติ

ใน production มักใช้ bundler อย่าง [Webpack](https://webpack.js.org) เพื่อ performance และเหตุผลอื่นๆ

บทถัดไปเราจะดูตัวอย่างโมดูลเพิ่มเติม และวิธี export/import แบบต่างๆ
