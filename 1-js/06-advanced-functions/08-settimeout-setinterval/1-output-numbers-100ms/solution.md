
ใช้ `setInterval`:

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

ใช้ `setTimeout` แบบซ้อน:


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

สังเกตว่าทั้งสองแบบจะมีการหน่วงเวลาก่อนแสดงผลครั้งแรก เพราะฟังก์ชันจะถูกเรียกหลังจากผ่านไป `1000ms` ในครั้งแรก

ถ้าต้องการให้ฟังก์ชันทำงานทันทีด้วย ก็เพิ่มการเรียกอีกครั้งแยกออกมาแบบนี้:

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

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
