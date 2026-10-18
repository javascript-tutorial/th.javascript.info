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

`throttle(func, ms)` คืน `wrapper` ซึ่งเป็นฟังก์ชัน (function) ที่ควบคุมว่าจะเรียก `func` เมื่อใด:

1. เมื่อเรียกครั้งแรก `wrapper` จะกำหนด `isThrottled = true` เพื่อเริ่มช่วงจำกัดการเรียก แล้วเรียก `func` ทันทีที่บรรทัด `(1)`
2. หากเรียก wrapper อีกระหว่างช่วงนี้ จะเข้าบรรทัด `(2)` และเก็บอาร์กิวเมนต์ (argument) กับค่า `this` ไว้ใน `savedArgs` และ `savedThis` ทุกครั้ง ค่าจากครั้งใหม่จะแทนครั้งเก่า จึงเหลือข้อมูลของการเรียกครั้งล่าสุด เราต้องเก็บทั้งสองอย่างเพื่อส่งต่อการเรียกนั้นได้ครบ
3. เมื่อผ่านไป `ms` มิลลิวินาที ฟังก์ชันที่ตั้งเวลาไว้จะทำงาน และกำหนด `isThrottled = false` ที่บรรทัด `(3)` หากมีการเรียกระหว่างช่วงที่รอ ก็จะเรียก `wrapper` ด้วยอาร์กิวเมนต์และ `this` ล่าสุดที่เก็บไว้

ขั้นตอนที่สามเรียก `wrapper` เพื่อให้ทั้งเรียก `func` และเริ่มช่วงจำกัดการเรียกรอบใหม่ พร้อมตั้งเวลาเพื่อสิ้นสุดช่วงนั้น หากเรียก `func` โดยตรง จะไม่ได้เริ่มรอบใหม่ตามที่ต้องการ
