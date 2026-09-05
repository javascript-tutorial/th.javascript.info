
ใช้ `WeakMap` เก็บวันที่อ่าน โดยให้ออบเจ็กต์ (object) ข้อความเป็นคีย์ (key) และวันที่อ่านเป็นค่าที่ผูกกับคีย์นั้น:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// เราจะเรียนเรื่องออบเจ็กต์ Date กันภายหลัง
```
