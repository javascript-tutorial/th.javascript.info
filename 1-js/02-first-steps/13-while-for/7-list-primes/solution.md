โจทย์ข้อนี้แก้ได้หลายวิธี

วิธีหนึ่งคือใช้ลูปซ้อนกัน:

```js
For each i in the interval {
  check if i has a divisor from 2..i-1
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

เมื่อนำป้ายกำกับมาใช้ จะเขียนได้ดังนี้:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // หากไม่เป็นจำนวนเฉพาะ ไป i ตัวต่อไป
  }

  alert( i ); // ตรงนี้จะได้จำนวนเฉพาะ
}
```

โค้ดนี้ยังปรับให้เร็วขึ้นได้อีกมาก เช่น ตรวจหาตัวหารตั้งแต่ `2` ถึงรากที่สองของ `i` ก็พอ แต่ถ้าต้องหาจำนวนเฉพาะในช่วงที่ใหญ่มากจริง ๆ จะต้องเปลี่ยนแนวทางไปใช้อัลกอริทึมทางคณิตศาสตร์ที่ซับซ้อนกว่า เช่น [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve) หรือ [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve)
