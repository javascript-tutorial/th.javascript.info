เรา "แทนที่" อักขระตัวแรกโดยตรงไม่ได้ เพราะสตริงใน JavaScript เปลี่ยนแปลงไม่ได้

แต่เราสร้างสตริงใหม่จากสตริงเดิม โดยเปลี่ยนอักขระตัวแรกเป็นตัวพิมพ์ใหญ่ได้:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

ยังมีปัญหาเล็กน้อย ถ้า `str` เป็นสตริงว่าง `str[0]` จะเป็น `undefined` และ `undefined` ไม่มีเมธอด `toUpperCase()` จึงเกิด error

วิธีแก้ที่ง่ายที่สุดคือตรวจสตริงว่างก่อน:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
