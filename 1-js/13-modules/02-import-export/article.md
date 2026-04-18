# Export and Import

คำสั่ง export และ import มีรูปแบบ syntax ให้เลือกใช้หลายแบบ

บทที่แล้วเราดูตัวอย่างง่ายๆ ไปแล้ว คราวนี้มาลงรายละเอียดกันให้ครบ

## Export ก่อน declaration

วางคำว่า `export` ไว้หน้า declaration ใดก็ได้ — จะเป็นตัวแปร ฟังก์ชัน หรือคลาสก็โอเค

เช่น ตัวอย่างข้างล่างนี้ export ได้ทุกแบบเลย:

```js
// export อาร์เรย์
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export ค่าคงที่
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// export คลาส
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="ไม่ต้องใส่ semicolon หลัง export class/function"
สังเกตว่า `export` ที่วางไว้หน้าคลาสหรือฟังก์ชัน ไม่ได้ทำให้มันกลายเป็น [function expression](info:function-expressions) นะ มันยังเป็น function declaration อยู่ แค่ export ออกไปด้วยเท่านั้น

style guide ของ JavaScript ส่วนใหญ่ไม่แนะนำให้ใส่ semicolon หลัง function หรือ class declaration

เพราะฉะนั้น `export class` และ `export function` ก็ไม่ต้องใส่ semicolon ท้ายบรรทัดเหมือนกัน:

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // ไม่มี ; ท้ายบรรทัด */!*
```

````

## Export แยกออกจาก declaration

อีกวิธีคือประกาศก่อน แล้วค่อย export ทีหลัง

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // รายการฟังก์ชันที่จะ export
*/!*
```

...หรือจะวาง `export` ไว้เหนือฟังก์ชันก็ได้เหมือนกัน

## Import *

ปกติเราจะระบุรายชื่อที่จะ import ใน curly braces แบบนี้:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

แต่ถ้ามีของที่จะ import เยอะมาก จะ import ทุกอย่างเป็นออบเจ็กต์เดียวด้วย `import * as <obj>` ก็ได้:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

มองผิวเผินก็ดูเจ๋งดีนะ — เขียนน้อย import ได้ทั้งหมด แล้วทำไมต้องระบุรายชื่อให้ยุ่งยากล่ะ?

จริงๆ แล้วมีเหตุผลอยู่สองข้อ

1. ระบุชื่อที่ import ชัดๆ จะได้ชื่อสั้นกว่า: `sayHi()` แทน `say.sayHi()`
2. มีรายชื่อ import ชัดเจน ทำให้เห็นภาพรวมของโค้ดได้ดีขึ้น — รู้ว่าใช้อะไรบ้าง ใช้ที่ไหน ช่วยให้แก้โค้ดและ refactor ง่ายขึ้นด้วย

```smart header="ไม่ต้องกังวลว่า import เยอะเกินไป"
build tool สมัยใหม่อย่าง [webpack](https://webpack.js.org/) จะ bundle โมดูลและ optimize ให้อัตโนมัติ รวมถึงตัด import ที่ไม่ได้ใช้ออกด้วย

เช่น ถ้าเรา `import * as library` จาก library ขนาดใหญ่ แล้วใช้แค่ไม่กี่เมธอด เมธอดที่ไม่ได้ใช้ [จะไม่รวม](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) เข้าไปใน bundle สุดท้าย
```

## Import "as"

ใช้ `as` เปลี่ยนชื่อตอน import ได้

เช่น import `sayHi` แล้วเก็บไว้ในตัวแปร `hi` เพื่อให้ชื่อสั้นลง และ import `sayBye` เป็น `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

ฝั่ง `export` ก็มีวิธีเดียวกัน

export ฟังก์ชันออกไปในชื่อ `hi` และ `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

ทีนี้ `hi` และ `bye` กลายเป็นชื่อทางการที่ฝั่งผู้ใช้จะเห็นตอน import:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

ในทางปฏิบัติ โมดูลมักมีอยู่สองแบบ

1. โมดูลที่รวมฟังก์ชันหลายตัวเป็น library เดียว เช่น `say.js` ด้านบน
2. โมดูลที่ export สิ่งเดียว เช่น `user.js` ที่ export แค่ `class User`

แนวทางที่สองนิยมกันมากกว่า เพราะแต่ละ "สิ่ง" ก็อยู่ในโมดูลของตัวเอง

แน่นอนว่าต้องสร้างไฟล์เยอะหน่อย แต่ถ้าตั้งชื่อดีและจัดโครงสร้างโฟลเดอร์ชัดเจน การ navigate โค้ดจะง่ายกว่ามาก

โมดูลมี syntax พิเศษชื่อ `export default` สำหรับรูปแบบ "หนึ่งโมดูล หนึ่งสิ่ง" โดยเฉพาะ

วาง `export default` ไว้หน้าสิ่งที่จะ export:

```js
// 📁 user.js
export *!*default*/!* class User { // แค่เพิ่ม "default"
  constructor(name) {
    this.name = name;
  }
}
```

ในแต่ละไฟล์มี `export default` ได้แค่ตัวเดียว

...แล้ว import มาใช้โดยไม่ต้องใส่ curly braces:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // ไม่ใช่ {User} แต่เป็น User

new User('John');
```

Import โดยไม่มี curly braces ดูสะอาดตากว่า ข้อผิดพลาดที่เจอบ่อยตอนเริ่มใช้โมดูลคือลืม curly braces ไปเลย จำไว้ว่า `import` ต้องมี curly braces สำหรับ named export แต่ default export ไม่ต้องใส่

| Named export | Default export |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

จริงๆ แล้วมีทั้ง default และ named export ในโมดูลเดียวกันได้ แต่ในทางปฏิบัติคนส่วนใหญ่ไม่ผสมกัน โมดูลจะเลือกใช้อย่างใดอย่างหนึ่ง

เนื่องจากไฟล์นึงมี default export ได้แค่ตัวเดียว สิ่งที่ export ออกไปไม่จำเป็นต้องมีชื่อก็ได้

เช่น ตัวอย่างข้างล่างนี้เป็น default export ที่ถูกต้องทั้งหมด:

```js
export default class { // ไม่มีชื่อคลาส
  constructor() { ... }
}
```

```js
export default function(user) { // ไม่มีชื่อฟังก์ชัน
  alert(`Hello, ${user}!`);
}
```

```js
// export ค่าเดียว โดยไม่ต้องสร้างตัวแปร
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

ไม่มีชื่อก็โอเค เพราะในไฟล์นึงมี `export default` ได้แค่ตัวเดียว `import` โดยไม่มี curly braces จึงรู้ว่าต้อง import อะไร

แต่ถ้าไม่มี `default` จะ error ทันที:

```js
export class { // Error! (named export ต้องมีชื่อ)
  constructor() {}
}
```

### ชื่อ "default"

บางสถานการณ์ใช้ keyword `default` อ้างอิงถึง default export ได้

เช่น export ฟังก์ชันแยกออกจากนิยามฟังก์ชัน:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// เหมือนกับใส่ "export default" ไว้หน้าฟังก์ชัน
export {sayHi as default};
```

หรืออีกกรณี สมมติโมดูล `user.js` export สิ่งหลักเป็น default แล้วยังมี named export เพิ่มด้วย (พบได้ไม่บ่อย แต่ก็มี):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

วิธี import default export พร้อมกับ named export:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

และถ้า import ทุกอย่างด้วย `*` เป็นออบเจ็กต์ พร็อพเพอร์ตี้ `default` จะเป็น default export นั้นเอง:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // default export
new User('John');
```

### ข้อเสียของ default export

Named export บอกชัดว่า import อะไร เพราะชื่อมันตายตัว — ข้อดีชัดเจน

Named export บังคับให้ใช้ชื่อที่ถูกต้องตอน import:

```js
import {User} from './user.js';
// import {MyUser} ไม่ได้ ต้องใช้ {User} เท่านั้น
```

...แต่ default export ตั้งชื่อเองได้ตอน import:

```js
import User from './user.js'; // โอเค
import MyUser from './user.js'; // โอเคเหมือนกัน
// จะ import Anything... ก็ยังได้
```

เพราะอย่างนี้ คนในทีมอาจใช้ชื่อต่างกันในการ import สิ่งเดียวกัน — ไม่ดีแน่

วิธีที่ทีมส่วนใหญ่ใช้แก้ปัญหานี้คือกำหนดกฎว่าชื่อตัวแปรที่ import ต้องตรงกับชื่อไฟล์:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

บางทีมถือว่านี่เป็นข้อเสียร้ายแรงของ default export จนเลือกใช้ named export ตลอด แม้จะ export สิ่งเดียวก็ยังใส่ชื่อไว้โดยไม่ใช้ `default`

แนวทางนี้ยังทำให้การ re-export (ดูด้านล่าง) ง่ายขึ้นด้วย

## Re-export

syntax `export ... from ...` ช่วยให้ import มาแล้ว export ต่อได้ทันที (จะเปลี่ยนชื่อด้วยก็ได้):

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

ใช้ทำอะไรล่ะ? ลองดูกรณีที่ใช้งานจริง

สมมติเรากำลังเขียน "package" — โฟลเดอร์ที่มีโมดูลเยอะมาก บางโมดูล export ฟีเจอร์ออกไปให้คนอื่นใช้ (เหมือน NPM package แต่ไม่จำเป็นต้อง publish) และอีกหลายโมดูลเป็นแค่ "helper" ใช้งานภายใน package เท่านั้น

โครงสร้างไฟล์อาจหน้าตาแบบนี้:
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

เราต้องการให้คนอื่น import ผ่านจุดเดียว

พูดง่ายๆ คือคนที่จะใช้ package นี้ ควร import จาก "ไฟล์หลัก" `auth/index.js` เท่านั้น

แบบนี้:

```js
import {login, logout} from 'auth/index.js'
```

`auth/index.js` จะ export ทุกฟีเจอร์ที่ต้องการเปิดให้ใช้งาน

ไอเดียคือคนภายนอกไม่ควรต้องไปยุ่งกับโครงสร้างภายใน ไปค้นหาไฟล์ใน package โดยตรง เรา export แค่ที่จำเป็นใน `auth/index.js` แล้วซ่อนส่วนที่เหลือไว้

เนื่องจากฟีเจอร์กระจายอยู่ตามโมดูลต่างๆ เราก็ import มาที่ `auth/index.js` แล้ว export ต่อ:

```js
// 📁 auth/index.js

// import login/logout แล้ว export ออกไปทันที
import {login, logout} from './helpers.js';
export {login, logout};

// import default เป็น User แล้ว export
import User from './user.js';
export {User};
...
```

ตอนนี้คนใช้ package เรา `import {login} from "auth/index.js"` ได้เลย

syntax `export ... from ...` เป็นแค่ shorthand ของ import-export แบบข้างบน:

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export default export เป็น User
export {default as User} from './user.js';
...
```

ข้อแตกต่างสำคัญของ `export ... from` เทียบกับ import/export ธรรมดาคือ โมดูลที่ re-export ออกไปจะ**ใช้งานในไฟล์ปัจจุบันไม่ได้** ใน `auth/index.js` ด้านบน เราเรียกฟังก์ชัน `login/logout` ที่ re-export ออกไปตรงนั้นไม่ได้

### Re-export default export

การ re-export default export ต้องจัดการแยกต่างหาก

สมมติมี `user.js` ที่มี `export default class User` แล้วต้องการ re-export:

```js
// 📁 user.js
export default class User {
  // ...
}
```

มีปัญหาที่เจอได้สองข้อ:

1. `export User from './user.js'` ไม่ได้ — เป็น syntax error

    ต้องเขียน `export {default as User}` ตามตัวอย่างด้านบน

2. `export * from './user.js'` re-export เฉพาะ named export แต่ข้าม default ไป

    ถ้าต้องการ re-export ทั้ง named และ default ต้องเขียนสองบรรทัด:
    ```js
    export * from './user.js'; // re-export named exports
    export {default} from './user.js'; // re-export default export
    ```

ความยุ่งยากพวกนี้คือหนึ่งในเหตุผลที่นักพัฒนาหลายคนไม่ชอบ default export และเลือกใช้ named export แทน

## สรุป

นี่คือ `export` ทุกรูปแบบที่เราพูดถึงในบทนี้และบทก่อนหน้า

ลองอ่านดูแล้วนึกว่าแต่ละแบบทำงานยังไง:

- วางไว้หน้า declaration ของ class/function/...:
  - `export [default] class/function/variable ...`
- export แบบแยกออกมา:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (ไม่ re-export default)
  - `export {default [as y]} from "module"` (re-export default)

Import:

- Import named exports:
  - `import {x [as y], ...} from "module"`
- Import default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import ทั้งหมด:
  - `import * as obj from "module"`
- Import โมดูล (รันโค้ด) แต่ไม่รับค่า export ใดๆ:
  - `import "module"`

วาง `import/export` ไว้บนสุดหรือล่างสุดของ script ก็ได้ ไม่มีผลต่างกัน

เช่น โค้ดแบบนี้ก็โอเค:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import ที่ท้ายไฟล์
```

ในทางปฏิบัตินิยมวาง import ไว้บนสุดเพื่อความสะดวก

**จุดสำคัญ: `import/export` ใช้ภายใน `{...}` ไม่ได้**

import แบบมีเงื่อนไขแบบนี้จะไม่ทำงาน:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import ต้องอยู่ระดับบนสุด
}
```

...แล้วถ้าต้องการ import ตามเงื่อนไขจริงๆ ล่ะ? หรือ import ตอนที่ต้องการเท่านั้น? เช่น โหลดโมดูลเมื่อมีคนร้องขอ?

เรื่อง dynamic import จะพูดถึงในบทถัดไป
