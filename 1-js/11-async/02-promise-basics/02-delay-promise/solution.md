```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('รันหลัง 3 วินาที'));
```

สังเกตว่าในโจทย์นี้ `resolve` ถูกเรียกโดยไม่มีอาร์กิวเมนต์ เราไม่ได้คืนค่าอะไรจาก `delay` แค่แน่ใจว่ามีการหน่วงเวลาก็พอ
