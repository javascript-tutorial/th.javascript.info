
# อันตรายของ Promise.all

`Promise.all` เป็นท่าที่ดีมากสำหรับรัน operation หลายอย่างพร้อมกัน โดยเฉพาะเวลาต้องส่ง request ไปหลาย service พร้อมกัน

แต่มันมีกับดักซ่อนอยู่ โจทย์นี้จะให้เห็นตัวอย่างและแนวทางแก้ไข

สมมติเราเชื่อมต่อกับ remote service อย่างเช่น database

มีสองฟังก์ชัน: `connect()` และ `disconnect()`

เมื่อเชื่อมต่อแล้ว ส่ง request ได้ด้วย `database.query(...)` — เป็น async function ที่ปกติจะคืนผลลัพธ์ แต่ก็อาจโยน error ได้

implementation อย่างง่ายหน้าตาแบบนี้:

```js
let database;

function connect() {
  database = {
    async query(isOk) {
      if (!isOk) throw new Error('Query failed');
    }
  };
}

function disconnect() {
  database = null;
}

// วิธีใช้ที่ตั้งใจไว้:
// connect()
// ...
// database.query(true) เพื่อจำลองการเรียกที่สำเร็จ
// database.query(false) เพื่อจำลองการเรียกที่พัง
// ...
// disconnect()
```

ทีนี้มาดูปัญหา

เราเขียนโค้ดเชื่อมต่อแล้วส่ง 3 query พร้อมกัน (แต่ละอันใช้เวลาต่างกัน เช่น 100, 200 และ 300ms) แล้วค่อย disconnect:

```js
// ฟังก์ชัน helper สำหรับเรียก async function `fn` หลังจาก `ms` มิลลิวินาที
function delay(fn, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => fn().then(resolve, reject), ms);
  });
}

async function run() {
  connect();

  try {
    await Promise.all([
      // 3 งานที่รันพร้อมกัน ใช้เวลา 100, 200 และ 300 ms ตามลำดับ
      // ใช้ `delay` helper เพื่อจำลองเวลา
*!*
      delay(() => database.query(true), 100),
      delay(() => database.query(false), 200),
      delay(() => database.query(false), 300)
*/!*
    ]);
  } catch(error) {
    console.log('Error handled (or was it?)');
  }

  disconnect();
}

run();
```

สอง query เกิด error แต่เราฉลาดพอที่จะครอบ `Promise.all` ไว้ในบล็อก `try..catch`

แต่มันไม่ได้ช่วยเลย! สคริปต์นี้ยังเจอ uncaught error ใน console อยู่ดี!

ทำไม? และจะแก้ยังไง?
