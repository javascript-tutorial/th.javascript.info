
แบบแรกใช้ `setInterval` เรียกฟังก์ชัน (function) ที่แสดงตัวเลขทุกวินาที และยกเลิกการเรียกซ้ำเมื่อแสดงค่าถึง `to`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// ตัวอย่างการใช้งาน:
printNumbers(5, 10);
```

แบบที่สองใช้ `setTimeout` แบบซ้อน หลังแสดงตัวเลขแต่ละค่า ถ้ายังไม่ถึง `to` ก็จะตั้งเวลาให้ `go` ทำงานอีกครั้งในอีกหนึ่งวินาที:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// ตัวอย่างการใช้งาน:
printNumbers(5, 10);
```

ทั้งสองแบบจะรอ `1000` มิลลิวินาที หรือหนึ่งวินาที ก่อนแสดงตัวเลขตัวแรก เพราะการเรียกครั้งแรกก็ตั้งเวลาไว้เช่นเดียวกับครั้งถัด ๆ ไป

ถ้าต้องการแสดงตัวเลขตัวแรกทันที ให้เรียก `go()` เพิ่มอีกครั้งโดยตรง ในตัวอย่างนี้เราตั้ง `setInterval` และเก็บ `timerId` ก่อนเรียก `go()` เพื่อให้ยกเลิกได้แม้ `from` เท่ากับ `to` ตั้งแต่แรก:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

  let timerId = setInterval(go, 1000);
*!*
  go();
*/!*
}

printNumbers(5, 10);
```
