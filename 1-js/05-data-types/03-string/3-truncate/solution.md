เมื่อจำเป็นต้องตัด ผลลัพธ์ต้องยาวเท่ากับ `maxlength` เราจึงต้องตัดข้อความให้สั้นกว่าค่านี้หนึ่งอักขระ เพื่อเว้นที่ให้จุดไข่ปลา

สังเกตว่าจุดไข่ปลาเป็นอักขระ Unicode เพียงตัวเดียว ไม่ใช่จุดสามตัว

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
