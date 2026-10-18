คำตอบคือ `null` เมื่อรันใน strict mode เช่นเดียวกับตัวอย่างในบทนี้


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

`f.bind(null)` สร้างฟังก์ชัน (function) ที่ผูก `null` ไว้เป็น `this` การนำฟังก์ชันนี้ไปเก็บในออบเจ็กต์ (object) อื่นไม่ได้เปลี่ยนค่าที่ผูกไว้

ดังนั้นแม้จะเรียกผ่าน `user.g()` ฟังก์ชัน `f` ก็ยังได้รับ `this` เป็น `null` ไม่ใช่ `user`
