ผลลัพธ์คือ: **error**

ลองรันดู:

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

ตัวอย่างนี้แสดงให้เห็นความแตกต่างระหว่างตัวแปรที่ "ไม่มีอยู่" กับ "ยังไม่ได้ initialize"

อย่างที่อาจอ่านมาแล้วในบทความ [](info:closure) ตัวแปรจะเริ่มต้นในสถานะ "uninitialized" ตั้งแต่เมื่อการทำงานเข้าสู่บล็อกโค้ด (หรือฟังก์ชัน) และจะอยู่ในสถานะนี้จนกว่าจะถึงคำสั่ง `let` ที่ประกาศมัน

พูดง่ายๆ ก็คือ ตัวแปรมีอยู่ในทางเทคนิค แต่ยังใช้ไม่ได้จนกว่าจะถึงบรรทัด `let`

โค้ดด้านบนแสดงให้เห็นจุดนี้

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

โซนที่ตัวแปรใช้ไม่ได้ชั่วคราวนี้ (ตั้งแต่ต้นบล็อกจนถึง `let`) บางทีเรียกว่า "dead zone"
