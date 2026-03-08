คำตอบ: `null`


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

context ของฟังก์ชันที่ผูกแล้วจะถูกล็อกอยู่อย่างนั้น ไม่มีทางเปลี่ยนได้อีก

ดังนั้นแม้เราจะเรียก `user.g()` ฟังก์ชันตัวเดิมก็จะถูกเรียกด้วย `this=null` อยู่ดี
