สำหรับการบ้านนี้เราสามารถทำได้หลากหลายวิธี

ลองมาเริ่มจากใช้ลูบซ้อนลูบก่อน:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

ลองใช้ label:

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

มีวิธีมากมายที่ช่วยเพิ่มประสิทธิภาพให้กับโค้ดชุดนี้ เมื่อ `n` ใหญ่ขึ้น เช่น เราสามารถมองหาตัวหารจาก `2` ถึงรากที่สองของ `i` แต่อย่างไรก็ตามหาก `n` ของเราใหญ่มากๆ เราก็จำเป้นที่จะต้องใช้วิธีการที่ซับซ้อนมากขึ้น เพื่อให้โปรแกรมทำงานได้มีประสิทธิภาพสูงสุด โดยอาศัยหลักการทางคณิตศาสตร์และอัลกอรึทึ่มเข้าช่วยเช่น [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) และอื่นๆ
