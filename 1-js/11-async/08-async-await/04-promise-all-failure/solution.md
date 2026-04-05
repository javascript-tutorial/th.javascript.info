
ต้นตอของปัญหาคือ `Promise.all` reject ทันทีเมื่อ promise ตัวใดตัวหนึ่ง reject แต่ไม่ได้ยกเลิก promise ตัวอื่นแต่อย่างใด

ในกรณีนี้ query ที่สองพัง `Promise.all` เลย reject แล้วบล็อก `try...catch` ดักจับ error นั้นได้

แต่ขณะเดียวกัน promise ที่เหลือ *ยังไม่ได้รับผลกระทบ* — ยังทำงานต่อแบบอิสระ query ที่สามโยน error ของตัวเองออกมาหลังจากนั้นไม่นาน และ error นั้นไม่มีใครดักจับ เราเลยเห็นมันใน console

ปัญหานี้อันตรายโดยเฉพาะในฝั่ง server อย่าง Node.js เพราะ uncaught error อาจทำให้ process พังได้เลย

แก้ยังไงดี?

ถ้าแก้ได้ดีที่สุดคือยกเลิก query ที่ยังค้างอยู่ทั้งหมดเมื่อ query ใดหนึ่งพัง วิธีนี้กำจัดโอกาสเกิด error ที่หลุดออกไปได้

แต่ข่าวร้ายคือ service call อย่าง `database.query` มักมาจาก library ของ third-party ที่ไม่รองรับการยกเลิก เลยไม่มีทางยกเลิกการเรียกนั้นได้

ทางเลือกอื่นคือเขียน wrapper function รอบ `Promise.all` ของเราเองที่เพิ่ม `then/catch` handler ให้กับแต่ละ promise เพื่อติดตามผล: รวบรวมผลลัพธ์ไว้ และถ้าเกิด error ขึ้น promise ที่เหลือก็จะถูกข้ามไป

```js
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resultsCount = 0;
    let hasError = false; // จะเซ็ตเป็น true เมื่อเจอ error ครั้งแรก

    promises.forEach((promise, index) => {
      promise
        .then(result => {
          if (hasError) return; // ละเว้น promise ถ้าเกิด error ไปแล้ว
          results[index] = result;
          resultsCount++;
          if (resultsCount === promises.length) {
            resolve(results); // เมื่อได้ผลลัพธ์ครบทุกตัว — สำเร็จ
          }
        })
        .catch(error => {
          if (hasError) return; // ละเว้น promise ถ้าเกิด error ไปแล้ว
          hasError = true; // โอ้โห มี error!
          reject(error); // reject ด้วย error นั้น
        });
    });
  });
}
```

แนวทางนี้ก็มีปัญหาของตัวเอง — มักไม่ต้องการให้ `disconnect()` ในขณะที่ query ยังค้างอยู่

บางทีสำคัญมากที่ต้องให้ query ทุกตัวทำงานเสร็จ โดยเฉพาะถ้ามี query ที่อัปเดตข้อมูลสำคัญ

เลยควรรอจนกว่า promise ทั้งหมดจะ settle ก่อน ค่อยทำงานต่อแล้วค่อย disconnect

นี่คือ implementation อีกแบบ ทำงานคล้าย `Promise.all` — reject ด้วย error แรก แต่รอจนกว่า promise ทั้งหมดจะ settle ก่อน:

```js
function customPromiseAllWait(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
        })
        .catch(error => {
          if (firstError === null) {
            firstError = error;
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            if (firstError !== null) {
              reject(firstError);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}
```

ทีนี้ `await customPromiseAllWait(...)` จะหยุดรอจนกว่า query ทุกตัวจะประมวลผลเสร็จ

เป็นแนวทางที่เชื่อถือได้มากกว่า เพราะรับประกัน flow การทำงานที่คาดเดาได้

สุดท้าย ถ้าต้องการจัดการ error ทั้งหมด ใช้ `Promise.allSettled` หรือเขียน wrapper รอบมันเพื่อรวบรวม error ทั้งหมดไว้ใน [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) ตัวเดียวแล้ว reject ด้วยมัน:

```js
// รอให้ promise ทั้งหมด settle
// คืนผลลัพธ์ถ้าไม่มี error
// โยน AggregateError พร้อม error ทั้งหมดถ้ามี
function allOrAggregateError(promises) {
  return Promise.allSettled(promises).then(results => {
    const errors = [];
    const values = [];

    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        values[i] = res.value;
      } else {
        errors.push(res.reason);
      }
    });

    if (errors.length > 0) {
      throw new AggregateError(errors, 'One or more promises failed');
    }

    return values;
  });
}
```
