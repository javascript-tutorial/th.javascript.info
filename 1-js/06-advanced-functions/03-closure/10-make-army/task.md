importance: 5

---

# กองทัพของฟังก์ชัน

โค้ดด้านล่างสร้างอาร์เรย์ของ `shooters`

ฟังก์ชันแต่ละตัวควรจะแสดงหมายเลขของมัน แต่มีบางอย่างผิดพลาด...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // สร้างฟังก์ชัน shooter
      alert( i ); // ที่ควรแสดงหมายเลขของมัน
    };
    shooters.push(shooter); // แล้วเพิ่มเข้าไปในอาร์เรย์
    i++;
  }

  // ...แล้วคืนค่าอาร์เรย์ของ shooters
  return shooters;
}

let army = makeArmy();

*!*
// shooters ทุกตัวแสดง 10 แทนที่จะเป็นหมายเลข 0, 1, 2, 3...
army[0](); // 10 จาก shooter หมายเลข 0
army[1](); // 10 จาก shooter หมายเลข 1
army[2](); // 10 ...เป็นแบบนี้ไปเรื่อยๆ
*/!*
```

ทำไม shooters ทุกตัวถึงแสดงค่าเดียวกัน?

จงแก้โค้ดให้ทำงานตามที่ต้องการ

