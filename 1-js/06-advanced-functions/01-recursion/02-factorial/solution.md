จากนิยาม แฟกทอเรียล (factorial) `n!` เขียนเป็น `n * (n-1)!` ได้

เราจึงให้ฟังก์ชัน (function) `factorial(n)` เรียก `factorial(n-1)` แล้วนำผลมาคูณกับ `n` การเรียกซ้ำ (recursion) แต่ละครั้งจะลดค่าลงทีละหนึ่ง จนถึง `1`

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

ในโค้ดนี้ ฐานของการเรียกซ้ำ (base of recursion) คือกรณีที่ `n` เท่ากับ `1` ซึ่งคืนค่า `1` ได้ทันที เราจะหยุดที่ `0` แทนก็ได้ สำหรับตัวอย่างนี้จะเรียกซ้ำเพิ่มอีกหนึ่งครั้ง แต่ได้ผลลัพธ์เท่าเดิม:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
