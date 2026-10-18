```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

`debounce` คืน wrapper หรือฟังก์ชัน (function) ที่ครอบการเรียกฟังก์ชันเดิม ทุกครั้งที่เรียก wrapper จะยกเลิกการตั้งเวลาครั้งก่อนด้วย `clearTimeout(timeout)` แล้วตั้งเวลาใหม่ให้ `func` ทำงานหลังจากรอ `ms` มิลลิวินาที การเรียกครั้งใหม่จึงเลื่อนเวลาทำงานออกไปจากเดิม
