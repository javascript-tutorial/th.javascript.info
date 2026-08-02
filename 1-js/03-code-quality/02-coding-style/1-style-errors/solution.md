
จุดที่ควรแก้มีดังนี้:

```js no-beautify
function pow(x,n)  // <- ไม่เว้นวรรคระหว่างอาร์กิวเมนต์
{  // <- แยกวงเล็บปีกกาไปอีกบรรทัด
  let result=1;   // <- ไม่เว้นวรรคหน้าและหลัง =
  for(let i=0;i<n;i++) {result*=x;}   // <- ไม่เว้นวรรค
  // คำสั่งใน { ... } ควรแยกไปขึ้นบรรทัดใหม่
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- เขียนรวมบรรทัดเดียวได้
// แต่แยกเป็น 2 บรรทัดจะดีกว่า และควรเติมช่องว่างกับ ; ให้ครบ
if (n<=0)  // <- ควรเว้นวรรคให้เป็น (n <= 0) และมีบรรทัดว่างคั่นด้านบน
{   // <- แยกวงเล็บปีกกาไปอีกบรรทัด
  // บรรทัดด้านล่างยาวเกินไป แบ่งเป็นหลายบรรทัดเพื่อให้อ่านง่ายขึ้นได้
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- เขียนรวมเป็นบรรทัดเดียวอย่าง "} else {" ได้
{
  alert(pow(x,n))  // ไม่เว้นวรรคและขาด ;
}
```

โค้ดที่แก้แล้ว:

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
