คำตอบคือ: **ไม่ `.catch` จะไม่ทำงาน**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

อย่างที่อธิบายไปในบท executor มี `try..catch` ล่องหนครอบอยู่ เลย error แบบ synchronous จะโดนดักจับได้หมด

แต่ตรงนี้ error ไม่ได้เกิดขึ้นตอนที่ executor กำลังทำงาน — มันเกิดทีหลัง ตอนที่ `setTimeout` callback รัน promise จึงจัดการ error ตัวนี้ไม่ได้
