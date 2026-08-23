จุดเล็ก ๆ ที่สำคัญคือ อย่าเพิ่งแปลง `value` เป็นตัวเลขทันทีหลังเรียก `prompt`

ถ้าทำ `value = +value` ก่อน เราจะแยกไม่ออกระหว่างสตริงว่างที่ใช้เป็นสัญญาณให้หยุดกับเลขศูนย์ซึ่งเป็นค่าที่รับได้ โค้ดจึงค่อยแปลงค่าหลังตรวจเงื่อนไขแล้ว


```js run demo
function sumInput() {

  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // ต้องหยุดรับค่าหรือยัง?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() );
```
