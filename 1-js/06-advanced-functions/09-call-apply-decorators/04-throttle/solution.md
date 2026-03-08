```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

การเรียก `throttle(func, ms)` จะคืนค่า `wrapper`

1. ในการเรียกครั้งแรก `wrapper` จะรัน `func` ทันที แล้วตั้งสถานะพักเย็น (`isThrottled = true`)
2. ในสถานะนี้ ทุกการเรียกจะถูกจำไว้ใน `savedArgs/savedThis` สังเกตว่าทั้ง context และอาร์กิวเมนต์สำคัญเท่าๆ กัน ต้องจำไว้ทั้งคู่เพื่อจำลองการเรียกได้ถูกต้อง
3. เมื่อผ่านไป `ms` มิลลิวินาที `setTimeout` จะทำงาน สถานะพักเย็นจะถูกยกเลิก (`isThrottled = false`) และถ้ามีการเรียกที่ถูกเพิกเฉยไว้ `wrapper` จะถูกรันด้วยอาร์กิวเมนต์และ context ล่าสุดที่จำไว้

ขั้นตอนที่ 3 รัน `wrapper` ไม่ใช่ `func` โดยตรง เพราะเราไม่ใช่แค่ต้องรัน `func` แต่ต้องเข้าสู่สถานะพักเย็นอีกครั้ง พร้อมตั้ง timeout เพื่อรีเซ็ตมันด้วย
