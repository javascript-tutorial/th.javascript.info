```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

การเรียก `debounce` จะคืนค่า wrapper เมื่อถูกเรียก wrapper จะตั้ง timeout สำหรับเรียกฟังก์ชันเดิมหลังจาก `ms` ที่กำหนด แล้วยกเลิก timeout เก่าที่ตั้งไว้ก่อนหน้า

