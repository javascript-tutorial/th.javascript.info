ความแตกต่างจะเห็นชัดเมื่อดูโค้ดที่อยู่ภายในฟังก์ชัน

สองแบบนี้ทำงานต่างกันเมื่อมีการ "กระโดดออก" จาก `try...catch`

ยกตัวอย่างเช่น เมื่อมี `return` อยู่ใน `try...catch` บล็อก `finally` จะทำงานเสมอไม่ว่าจะออกจาก `try...catch` ด้วยวิธีไหน รวมถึง `return` ด้วย โดยจะรันหลังจาก `try...catch` ทำงานเสร็จ แต่ก่อนที่โค้ดที่เรียกฟังก์ชันจะได้รับค่ากลับ

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

...หรือเมื่อมี `throw` แบบนี้:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

`finally` นี่แหละที่รับประกันว่าจะเคลียร์งานได้เสมอ ถ้าเราแค่เขียนโค้ดไว้ต่อท้ายฟังก์ชัน `f` เฉยๆ โค้ดส่วนนั้นจะไม่ทำงานในสถานการณ์เหล่านี้