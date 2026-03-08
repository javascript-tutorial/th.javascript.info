วิธีใช้ลูป:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

วิธีใช้การเรียกซ้ำ:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

วิธีใช้สูตร: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. แน่นอนว่าสูตรคณิตศาสตร์เร็วที่สุด ใช้แค่ 3 การดำเนินการไม่ว่า `n` จะเป็นเท่าไหร่ คณิตศาสตร์ช่วยได้!

วิธีลูปเร็วเป็นอันดับสอง ทั้งแบบเรียกซ้ำและแบบลูปบวกตัวเลขชุดเดียวกัน แต่การเรียกซ้ำมีการเรียกฟังก์ชันซ้อนและจัดการ execution stack ซึ่งกินทรัพยากรเพิ่ม จึงช้ากว่า

P.P.S. บาง engine รองรับการปรับแต่ง "tail call" คือถ้าการเรียกซ้ำเป็นคำสั่งสุดท้ายของฟังก์ชัน โดยไม่มีการคำนวณอื่นอีก ฟังก์ชันภายนอกก็ไม่ต้องกลับมาทำงานต่อ ดังนั้น engine ไม่ต้องจำ execution context ช่วยลดภาระหน่วยความจำได้ แต่ถ้า JavaScript engine ไม่รองรับ tail call optimization (ส่วนใหญ่ไม่รองรับ) ก็จะเกิด error: maximum stack size exceeded เพราะปกติจะมีการจำกัดขนาดสแต็กรวมไว้
