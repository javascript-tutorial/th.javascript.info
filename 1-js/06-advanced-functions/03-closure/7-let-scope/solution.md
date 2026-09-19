เกิด **ข้อผิดพลาด (error)**

ลองรันโค้ดนี้ดู:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

ตัวอย่างนี้ช่วยแยกความต่างระหว่างตัวแปร (variable) ที่ "ไม่มีอยู่" กับตัวแปรที่ "มีอยู่แต่ยังไม่พร้อมใช้งาน"

ตามที่อธิบายในบท [สโคป (scope) ของตัวแปรและคลอเชอร์ (closure)](info:closure) เมื่อเริ่มทำงานในบล็อก (block) หรือฟังก์ชัน (function) ตัวแปรที่ประกาศด้วย `let` ภายในนั้นจะอยู่ในสถานะ "uninitialized" จนกว่าโค้ดจะทำงานถึงคำสั่ง `let` ของตัวแปรนั้น

กล่าวคือ ตัวประมวลผล JavaScript หรือ engine รู้ว่ามีตัวแปร `x` อยู่ใน `func` แล้ว แต่เรายังใช้งานไม่ได้ก่อนถึงบรรทัด `let` การอ่าน `x` จึงหยุดที่ตัวแปรนี้และเกิดข้อผิดพลาด ไม่ได้ข้ามไปอ่าน `x` ที่มีค่า `1` ด้านนอก:

```js
function func() {
*!*
  // engine รู้ว่ามีตัวแปร x ตั้งแต่เริ่มฟังก์ชัน
  // แต่อยู่ในสถานะ "uninitialized" (ใช้ไม่ได้) จนกว่าจะถึง let ("dead zone")
  // จึงเกิด error
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

ช่วงตั้งแต่เริ่มบล็อกจนถึงคำสั่ง `let` ซึ่งตัวแปรยังใช้ไม่ได้ เรียกว่า "dead zone"
