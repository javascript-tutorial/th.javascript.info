
คุณสามารถจดบันทึกต่อไปนี้ได้:

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- ไม่มีช่องว่างระหว่างอาร์กิวเมนต์
{  // <- เครื่องหมายวงเล็บของภาพหรือตารางอยู่บนบรรทัดแยกต่างหาก
  let result=1;   // <- ไม่มีช่องว่างก่อนหรือหลังเครื่องหมาย =
  for(let i=0;i<n;i++) {result*=x;}   // <- ไม่มีช่องว่าง
  // the contents of { ... } ควรขึ้นบรรทัดใหม่
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- เทคนิคการเขียนเป็นไปได้
// จะเขียนในบรรทัดเดียวได้ แต่ควรเขียนให้เป็น 2 บรรทัดเพื่อให้อ่านง่ายขึ้น นอกจากนี้ไม่ควรมีช่องว่าง และต้องมีเครื่องหมาย ; ต่อท้ายด้วย
if (n<=0)  // <- ควรมีบรรทัดว่างเพิ่มเติมด้านบนและไม่ควรมีช่องว่างภายใน (n <= 0)
{   // <- เครื่องหมายวงเล็บของภาพหรือตารางอยู่บนบรรทัดแยกต่างหาก
  // สำหรับบรรทัดที่ยาว สามารถแบ่งเป็นหลายบรรทัดเพื่อเพิ่มความอ่านง่ายขึ้นได้
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- สามารถเขียนเป็นบรรทัดเดียวได้ เช่น "} else {"
{
  alert(pow(x,n))  // ไม่ควรมีช่องว่างและต้องมีเครื่องหมาย ; ต่อท้ายด้วย
}
```

ตัวแก้ไขแบบถูกต้อง:

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
