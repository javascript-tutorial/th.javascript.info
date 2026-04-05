
ถ้าเข้าใจว่ามันทำงานยังไงข้างใน คำตอบมาเลย

แค่มองการเรียก `async` function เป็น promise แล้วต่อ `.then` ต่อท้าย:

```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // แสดง 10 หลังจาก 1 วินาที
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
