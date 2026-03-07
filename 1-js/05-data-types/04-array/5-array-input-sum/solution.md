สังเกตรายละเอียดเล็กน้อยแต่สำคัญในโซลูชันนี้ เราไม่แปลง `value` เป็นตัวเลขทันทีหลังจาก `prompt` เพราะถ้าทำ `value = +value` ไปก่อน เราจะไม่สามารถแยกแยะสตริงว่าง (สัญญาณหยุด) ออกจากเลขศูนย์ (ค่าที่ถูกต้อง) ได้ จึงแปลงทีหลังแทน


```js run demo
function sumInput() {

  let numbers = [];

  while (true) {

    let value = prompt("กรุณาป้อนตัวเลข", 0);

    // ควรหยุดหรือเปล่า?
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
