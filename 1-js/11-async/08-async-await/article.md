# Async/await

มี syntax พิเศษที่ทำให้การทำงานกับ promise สบายขึ้นมาก — เรียกว่า "async/await" และที่น่าแปลกใจคือมันเข้าใจง่ายกว่าที่คิด

## Async functions

เริ่มจาก keyword `async` กันก่อน ใส่ไว้หน้าฟังก์ชันได้เลย แบบนี้:

```js
async function f() {
  return 1;
}
```

`async` บอกแค่สิ่งเดียวว่า — ฟังก์ชันนี้จะคืนค่าเป็น promise เสมอ ถ้าคืนค่าที่ไม่ใช่ promise JavaScript จะห่อมันไว้ใน resolved promise ให้อัตโนมัติ

ลองดูตัวอย่าง ฟังก์ชันนี้คืนค่าเป็น resolved promise ที่มีผลลัพธ์เป็น `1`:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...จะ return เป็น promise ตรงๆ เลยก็ได้ ผลเหมือนกัน:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

`async` รับประกันว่าฟังก์ชันจะคืนค่าเป็น promise เสมอ และห่อค่าที่ไม่ใช่ promise ไว้ในนั้น เข้าใจง่ายใช่ไหม? แต่ยังไม่หมดแค่นั้น — ยังมี keyword อีกตัวคือ `await` ที่ใช้ได้แค่ภายใน `async` function และมันเจ๋งมาก

## Await

เขียนแบบนี้:

```js
// ใช้ได้แค่ภายใน async function เท่านั้น
let value = await promise;
```

`await` ทำให้ JavaScript หยุดรอจนกว่า promise จะ settle แล้วค่อยคืนผลลัพธ์มา

ดูตัวอย่างกับ promise ที่ resolve หลังจาก 1 วินาที:

```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // รอจนกว่า promise จะ resolve (*)
*/!*

  alert(result); // "done!"
}

f();
```

การทำงานของฟังก์ชันจะ "หยุดนิ่ง" ที่บรรทัด `(*)` แล้วค่อยทำงานต่อเมื่อ promise settle โดย `result` รับค่าผลลัพธ์นั้นมา โค้ดด้านบนจึงแสดง "done!" หลังจาก 1 วินาที

ย้ำให้ชัด: `await` หยุดการทำงานของฟังก์ชันจนกว่า promise จะ settle จากนั้นค่อยทำงานต่อพร้อมผลลัพธ์ ไม่ได้กิน CPU เลยนะ เพราะ JavaScript engine ยังทำงานอื่นได้ระหว่างรอ — รันสคริปต์อื่น จัดการ event ฯลฯ

เป็นแค่ syntax ที่หรูกว่า `promise.then` ในการรับผลลัพธ์จาก promise อ่านและเขียนก็ง่ายกว่าด้วย

````warn header="ใช้ `await` ใน regular function ไม่ได้"
ถ้าลองใช้ `await` ในฟังก์ชันที่ไม่ใช่ async จะเจอ syntax error ทันที:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

error แบบนี้มักเกิดเพราะลืมใส่ `async` ไว้หน้าฟังก์ชัน อย่าลืมว่า `await` ใช้ได้แค่ภายใน `async` function เท่านั้น
````

มาลองเอาตัวอย่าง `showAvatar()` จากบทที่แล้ว <info:promise-chaining> มาเขียนใหม่ด้วย `async/await` กัน:

1. แทนที่การเรียก `.then` ทั้งหมดด้วย `await`
2. ใส่ `async` หน้าฟังก์ชันด้วย

```js run
async function showAvatar() {

  // อ่าน JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // อ่านข้อมูล github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // แสดงรูป avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // รอ 3 วินาที
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

อ่านง่ายกว่าเดิมมากใช่ไหม? ไม่มี `.then` ซ้อนๆ ให้งงอีกแล้ว

````smart header="เบราว์เซอร์สมัยใหม่รองรับ top-level `await` ใน module"
ใน module เราใช้ `await` ที่ระดับบนสุดได้เลย ไม่ต้องห่อด้วยฟังก์ชัน รายละเอียดเรื่อง module อยู่ในบท <info:modules-intro>

เช่น:

```js run module
// สมมติโค้ดนี้รันที่ระดับบนสุดของ module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

ถ้าไม่ได้ใช้ module หรือต้องรองรับ [เบราว์เซอร์เก่า](https://caniuse.com/mdn-javascript_operators_await_top_level) ก็มีท่าสากลคือห่อด้วย anonymous async function แบบนี้:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` รับ \"thenable\" ได้ด้วย"
เหมือนกับ `promise.then`, `await` ใช้กับ thenable object (ออบเจ็กต์ที่มีเมธอด `then`) ได้เช่นกัน แนวคิดคือถึงแม้ออบเจ็กต์จาก third-party จะไม่ใช่ promise แต่ถ้ามี `.then` ก็ใช้กับ `await` ได้เลย

ดูตัวอย่างคลาส `Thenable` — `await` ด้านล่างรับ instance ของมันได้:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve ด้วย this.num*2 หลังจาก 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // รอ 1 วินาที แล้ว result กลายเป็น 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

ถ้า `await` ได้รับออบเจ็กต์ที่ไม่ใช่ promise แต่มี `.then` จะเรียกเมธอดนั้นโดยส่ง `resolve` และ `reject` เป็นอาร์กิวเมนต์ (เหมือนกับที่ทำกับ `Promise` executor ทั่วไป) จากนั้น `await` รอจนกว่าหนึ่งในนั้นจะถูกเรียก (ในตัวอย่างเกิดที่บรรทัด `(*)`) แล้วค่อยทำงานต่อพร้อมผลลัพธ์
````

````smart header="Async class method"
ประกาศ async method ในคลาสได้เลย แค่ใส่ `async` ไว้ข้างหน้า:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (เหมือนกับ (result => alert(result)))
```
ความหมายเหมือนเดิม: รับประกันว่าค่าที่คืนมาเป็น promise และเปิดใช้งาน `await` ได้

````
## Error handling

ถ้า promise resolve ปกติ `await promise` ก็คืนผลลัพธ์มาเลย แต่ถ้า reject จะโยน error ออกมาเหมือนมีคำสั่ง `throw` อยู่ที่บรรทัดนั้น

โค้ดนี้:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...มีความหมายเดียวกันกับอันนี้:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

ในสถานการณ์จริง promise อาจใช้เวลาสักพักก่อนจะ reject ก็จะมีช่วงหน่วงก่อนที่ `await` จะโยน error ออกมา

จับ error ได้ด้วย `try..catch` เหมือนกับ `throw` ทั่วไปเลย:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

เมื่อเกิด error การทำงานจะกระโดดไปที่บล็อก `catch` ทันที ครอบหลายบรรทัดในบล็อก `try` เดียวกันก็ได้:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // ดักจับ error จากทั้ง fetch และ response.json
    alert(err);
  }
}

f();
```

ถ้าไม่มี `try..catch` promise ที่ได้จากการเรียก async function `f()` จะกลายเป็น rejected promise ต่อ `.catch` ท้ายได้เลย:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() กลายเป็น rejected promise
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

ถ้าลืมต่อ `.catch` ไว้ จะเจอ unhandled promise error ใน console จัดการด้วย global `unhandledrejection` event handler ได้ ตามที่อธิบายในบท <info:promise-error-handling>


```smart header="`async/await` กับ `promise.then/catch`"
เวลาใช้ `async/await` แทบไม่ต้องเขียน `.then` เพราะ `await` จัดการการรอให้แล้ว และใช้ `try..catch` แทน `.catch` ได้เลย ซึ่งปกติแล้วสะดวกกว่า (แต่ไม่ทุกกรณี)

แต่ที่ระดับบนสุดของโค้ด ตอนที่อยู่นอก `async` function ทุกอัน ใช้ `await` ตรงๆ ไม่ได้ เลยเป็นเรื่องปกติที่จะต่อ `.then/catch` เพื่อจัดการผลลัพธ์สุดท้ายหรือ error ที่หลุดออกมา เหมือนบรรทัด `(*)` ในตัวอย่างด้านบน
```

````smart header="`async/await` ทำงานร่วมกับ `Promise.all` ได้ดี"
เวลาต้องรอหลาย promise พร้อมกัน ห่อด้วย `Promise.all` แล้ว `await` ได้เลย:

```js
// รอผลลัพธ์จากอาร์เรย์ทั้งหมด
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

ถ้าเกิด error ก็จะกระจายตามปกติ จาก promise ที่พัง ไปยัง `Promise.all` แล้วกลายเป็น exception ที่จับได้ด้วย `try..catch` รอบนอก

````

## สรุป

`async` ที่ใส่หน้าฟังก์ชันมีผลสองอย่าง:

1. ฟังก์ชันจะคืนค่าเป็น promise เสมอ
2. เปิดใช้ `await` ภายในฟังก์ชันได้

`await` ที่ใส่หน้า promise ทำให้ JavaScript รอจนกว่า promise จะ settle จากนั้น:

1. ถ้าเป็น error จะโยน exception ออกมา — เหมือนมีคำสั่ง `throw error` อยู่ตรงนั้น
2. ถ้าไม่ใช่ error จะคืนผลลัพธ์มา

ทั้งสองตัวทำงานร่วมกันได้ดีมาก เขียนโค้ด asynchronous แบบ synchronous ได้เลย อ่านง่าย เขียนง่าย

ใช้ `async/await` แล้วแทบไม่ต้องเขียน `promise.then/catch` อีกต่อไป แต่อย่าลืมว่ามันยังสร้างอยู่บน promise อยู่ดี เพราะบางครั้ง (เช่น ที่ระดับสโคปด้านนอกสุด) จำเป็นต้องใช้เมธอดเหล่านั้น แล้วก็ `Promise.all` ยังเป็นตัวเลือกที่ดีเมื่อต้องรอ async หลายอย่างพร้อมๆ กัน
