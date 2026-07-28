
# การจัดการ error ใน promise

promise chain เก่งเรื่อง error handling มาก — พอ promise reject ปุ๊บ handler ที่ใกล้ที่สุดจะรับงานต่อทันทีเลย

ลองดูตัวอย่าง URL ที่ `fetch` ไปไม่ถึง (เซิร์ฟเวอร์ไม่มีอยู่จริง) — `.catch` จัดการ error ให้เราได้เลย:

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (ข้อความอาจต่างกัน)
```

จะเห็นว่า `.catch` ไม่ต้องอยู่ติดกัน — วางไว้หลัง `.then` หนึ่งตัวหรือหลายตัวก็ได้

อีกกรณีที่พบบ่อยคือเซิร์ฟเวอร์ตอบกลับปกติ แต่ข้อมูลที่ได้ไม่ใช่ JSON ที่ถูกต้อง วิธีที่ง่ายที่สุดคือเติม `.catch` ไว้ท้าย chain:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

ปกติ `.catch` นี้จะไม่ทำงานเลย แต่ถ้า promise ตัวไหนตัวหนึ่ง reject — ไม่ว่าจะเป็นปัญหาเครือข่าย JSON ผิดรูปแบบ หรืออะไรก็แล้วแต่ — `.catch` ตัวเดียวนี้จะรับหมด

## Implicit try..catch

ลองคิดดูว่าถ้าเราโยน error ตรงๆ ใน executor มันจะเป็นยังไงล่ะ?

executor และ handler ของ promise มี `try..catch` "ล่องหน" ครอบอยู่ด้วยกันทุกตัว ถ้ามี exception เกิดขึ้น JavaScript จะดักจับแล้วแปลงเป็น rejected promise ให้อัตโนมัติ

เช่น โค้ดนี้:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...ทำงานเหมือนกันทุกอย่างกับแบบนี้:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

`try..catch` ล่องหนใน executor จัดการ error แล้วเปลี่ยนเป็น rejected promise ให้เองเลย

แต่ไม่ใช่แค่ใน executor — ใน handler ก็เช่นกัน ถ้าเรา `throw` ใน `.then` ตัวไหน promise ตัวนั้นจะกลาย reject แล้วโยนไปให้ error handler ที่ใกล้ที่สุด:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejects the promise
*/!*
}).catch(alert); // Error: Whoops!
```

ไม่ใช่แค่ `throw` ด้วย — error ที่เกิดจากโค้ดผิดพลาดก็โดนดักเหมือนกัน เช่น เรียกฟังก์ชันที่ไม่มีอยู่:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // ไม่มีฟังก์ชันนี้
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

`.catch` ตัวสุดท้ายรับได้ทั้ง rejection ที่ตั้งใจ throw และ error ที่เกิดขึ้นโดยไม่ตั้งใจในทุก handler ด้านบน

## Rethrowing

`.catch` ท้าย chain ก็คล้ายกับ `try..catch` ธรรมดานั่นเอง — เราจะมี `.then` กี่ตัวก็ได้ แล้วใส่ `.catch` ตัวเดียวตอนท้ายเพื่อรับ error ทั้งหมด

ใน `try..catch` ธรรมดา เราเช็ค error แล้วโยนต่อ (rethrow) ได้ถ้าจัดการเองไม่ได้ promise ก็ทำแบบเดียวกันได้

ถ้า `throw` ใน `.catch` การทำงานจะกระโดดไปหา error handler ตัวต่อไป แต่ถ้าจัดการ error ได้และทำงานปกติจนจบ การทำงานจะไหลต่อไปหา `.then` ที่ใกล้ที่สุด

ตัวอย่างแรก — `.catch` จัดการ error ได้จบ:

```js run
// การทำงาน: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

`.catch` ทำงานจบปกติ เลย `.then` ถัดไปก็ทำงานต่อ

ตัวอย่างที่สอง — handler `(*)` รับ error มาแต่จัดการไม่ได้ (รู้จักแค่ `URIError`) เลยโยนต่อ:

```js run
// การทำงาน: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // จัดการได้
  } else {
    alert("Can't handle such error");

*!*
    throw error; // โยน error นี้หรือ error อื่นต่อไปยัง catch ถัดไป
*/!*
  }

}).then(function() {
  /* ไม่ทำงานตรงนี้ */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // ไม่ return อะไร => การทำงานเดินต่อตามปกติ

});
```

การทำงานกระโดดจาก `.catch` ตัวแรก `(*)` ไปตัวที่สอง `(**)` ลงมาใน chain

## Unhandled rejections

แล้วถ้าไม่มีอะไรมาจัดการ error เลยล่ะ? เช่น เราลืมต่อ `.catch` ท้าย chain:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // เกิด error ตรงนี้ (ไม่มีฟังก์ชันนี้)
})
  .then(() => {
    // handler ที่สำเร็จ หนึ่งตัวหรือมากกว่า
  }); // ไม่มี .catch ตอนท้าย!
```

พอเกิด error ขึ้น promise จะกลายเป็น rejected แล้วการทำงานควรกระโดดไปหา rejection handler ที่ใกล้ที่สุด — แต่ไม่มีเลย เลย error ค้างอยู่อย่างนั้น ไม่มีโค้ดใดมาจัดการ

สถานการณ์แบบนี้ก็เหมือนกับ unhandled error ทั่วไปในโปรแกรม — แปลว่ามีอะไรผิดพลาดหนักมาก

ปกติถ้า error เกิดขึ้นโดยไม่มี `try..catch` รับ สคริปต์จะพังพร้อม error ใน console — promise rejection ที่ไม่มีใครจัดการก็คล้ายกัน

JavaScript engine ติดตาม rejection พวกนี้อยู่ และจะสร้าง global error ขึ้นมา ลองรันตัวอย่างด้านบนดูแล้วเช็ค console ได้เลย

บน browser เราดักจับ error แบบนี้ได้ผ่านอีเวนต์ `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // event object มีสองพร็อพเพอร์ตี้พิเศษ:
  alert(event.promise); // [object Promise] - promise ที่ทำให้เกิด error
  alert(event.reason); // Error: Whoops! - ออบเจ็กต์ error ที่ไม่มีใครจัดการ
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // ไม่มี catch มารับ error
```

อีเวนต์นี้เป็นส่วนหนึ่งของ [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections)

เมื่อเกิด error แล้วไม่มี `.catch` รับ handler `unhandledrejection` จะทำงานและได้รับออบเจ็กต์ `event` พร้อมข้อมูล error ครบ — เอาไปทำอะไรต่อก็ได้

Error แบบนี้ส่วนใหญ่แก้ไขไม่ได้แล้ว ทางออกที่ดีที่สุดคือแจ้ง user และส่ง log ไปที่เซิร์ฟเวอร์

สำหรับ Node.js และ environment อื่นที่ไม่ใช่ browser ก็มีวิธีติดตาม unhandled error เช่นกัน แต่รูปแบบต่างกัน

## สรุป

- `.catch` รับ error ได้ทุกแบบ — ทั้งจากการเรียก `reject()` และจาก error ที่โยนใน handler
- `.then` ก็รับ error ได้เหมือนกัน ถ้าส่งฟังก์ชันรับ error เข้าไปเป็นอาร์กิวเมนต์ที่สอง
- ควรวาง `.catch` ตรงจุดที่รู้วิธีจัดการ error และ handler ควรวิเคราะห์ error (คลาส error แบบ custom ช่วยได้) แล้วโยนต่อถ้าจัดการไม่ได้ (เผื่อเป็น programming bug)
- ถ้าไม่มีทางกู้คืนจาก error ได้เลย จะไม่ใช้ `.catch` เลยก็โอเค
- แต่ไม่ว่ากรณีไหน ควรมี handler สำหรับ `unhandledrejection` เสมอ (บน browser) หรือรูปแบบที่เทียบเท่าใน environment อื่น เพื่อติดตาม error ที่หลุดรอด แจ้ง user และบันทึก log ไปที่เซิร์ฟเวอร์ — เพื่อให้แอปไม่ "ดับเงียบ" โดยไม่มีใครรู้
