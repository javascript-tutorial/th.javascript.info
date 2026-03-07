
ลองสังเกตจุดที่มีปัญหา:

```js no-beautify
function pow(x,n)  // <- ไม่มีช่องว่างระหว่างอาร์กิวเมนต์
{  // <- วงเล็บปีกกาไม่ควรอยู่บรรทัดแยก
  let result=1;   // <- ไม่มีช่องว่างรอบเครื่องหมาย =
  for(let i=0;i<n;i++) {result*=x;}   // <- ไม่มีช่องว่าง
  // เนื้อหาใน { ... } ควรขึ้นบรรทัดใหม่
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- เขียนแบบนี้ได้ แต่ควรแยกเป็น 2 บรรทัด และขาดเครื่องหมาย ; ต่อท้าย
if (n<=0)  // <- ควรมีบรรทัดว่างด้านบน และควรเว้นวรรคภายในเป็น (n <= 0)
{   // <- วงเล็บปีกกาไม่ควรอยู่บรรทัดแยก
  // บรรทัดที่ยาวเกินไป ควรแบ่งเป็นหลายบรรทัดเพื่อให้อ่านง่ายขึ้น
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- ควรเขียนต่อบรรทัดเดียวกันเป็น "} else {"
{
  alert(pow(x,n))  // ไม่มีช่องว่าง และขาดเครื่องหมาย ; ต่อท้าย
}
```

เวอร์ชันที่แก้ไขแล้ว:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
