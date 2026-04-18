# Dynamic imports

คำสั่ง import และ export ที่เราคุ้นเคยกันมาตลอด เรียกว่า "static" — เขียนตอนไหนก็ตายตัวตอนนั้น ไม่เปลี่ยนแปลงตาม runtime

ข้อจำกัดแรกคือ path ของโมดูลต้องเป็น string ตรงๆ เรียกฟังก์ชันแทนไม่ได้:

```js
import ... from *!*getModuleName()*/!*; // Error รับแค่ string เท่านั้น
```

ข้อจำกัดที่สองคือ ใส่ใน if หรือบล็อกอื่นๆ ก็ไม่ได้:

```js
if(...) {
  import ...; // Error ใช้แบบนี้ไม่ได้!
}

{
  import ...; // Error ใส่ import ในบล็อกใดๆ ไม่ได้
}
```

เหตุผลที่เป็นแบบนี้คือ `import`/`export` ออกแบบมาเพื่อให้โครงสร้างโค้ดชัดเจนและคาดเดาได้ ทำให้ tools พิเศษวิเคราะห์โค้ดได้ รวมโมดูลเป็นไฟล์เดียวได้ และตัด export ที่ไม่ใช้ออกได้ (เรียกว่า "tree-shaking") ทั้งหมดนี้ทำได้เพราะโครงสร้างของ import/export ไม่เปลี่ยนแปลง

แต่ถ้าต้องการโหลดโมดูลแบบ on-demand ตามสถานการณ์ล่ะ?

## นิพจน์ import()

`import(module)` โหลดโมดูลแล้วคืนค่าเป็น promise ที่ resolve เป็นออบเจ็กต์ของโมดูล ซึ่งมีทุก export อยู่ครบ — เรียกจากที่ไหนในโค้ดก็ได้

ตัวอย่างการใช้แบบ dynamic:

```js
let modulePath = prompt("จะโหลดโมดูลไหนดี?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <โหลดพัง เช่น ไม่พบโมดูลที่ระบุ>)
```

หรือถ้าอยู่ใน async function ก็ใช้ `let module = await import(modulePath)` ได้เลย

สมมติเรามีโมดูล `say.js` แบบนี้:

```js
// 📁 say.js
export function hi() {
  alert(`สวัสดี`);
}

export function bye() {
  alert(`ลาก่อน`);
}
```

...dynamic import ก็เขียนได้แบบนี้:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

แต่ถ้า `say.js` ใช้ default export:

```js
// 📁 say.js
export default function() {
  alert("โหลดโมดูลแล้ว (export default)!");
}
```

...เราเข้าถึงมันผ่านพร็อพเพอร์ตี้ `default` ของออบเจ็กต์โมดูล:

```js
let obj = await import('./say.js');
let say = obj.default;
// หรือเขียนบรรทัดเดียว: let {default: say} = await import('./say.js');

say();
```

ลองดูตัวอย่างเต็มๆ:

[codetabs src="say" current="index.html"]

```smart
Dynamic imports ใช้ได้กับ script ธรรมดาทั่วไป ไม่จำเป็นต้องใส่ `script type="module"` เลย
```

```smart
แม้ว่า `import()` จะหน้าตาเหมือนเรียกฟังก์ชัน แต่จริงๆ แล้วเป็น syntax พิเศษที่ใช้วงเล็บเฉยๆ (คล้ายกับ `super()`)

เพราะฉะนั้นเอา `import` ไปเก็บในตัวแปร หรือใช้ `call/apply` ไม่ได้นะ — มันไม่ใช่ฟังก์ชัน
```
