# Promise API

คลาส `Promise` มี static method อยู่ 6 ตัว แต่ละตัวออกแบบมาสำหรับสถานการณ์ต่างกัน มาดูกันทีละตัวเลย

## Promise.all

สมมติว่าเราต้องรัน promise หลายตัวพร้อมกัน แล้วรอให้ทุกตัวเสร็จก่อนค่อยทำต่อ

เช่น ดาวน์โหลดหลาย URL พร้อมกัน แล้วประมวลผลเมื่อได้ข้อมูลครบทุก URL — นี่คืองานของ `Promise.all` นั่นเอง

เขียนแบบนี้:

```js
let promise = Promise.all(iterable);
```

`Promise.all` รับ iterable (ปกติคืออาร์เรย์ของ promise) แล้วคืนค่าเป็น promise ใหม่

promise ใหม่นี้จะ resolve ก็ต่อเมื่อทุก promise ใน list resolve แล้ว และผลลัพธ์จะเป็นอาร์เรย์ของค่าที่แต่ละ promise คืนมา

ลองดูตัวอย่าง — `Promise.all` นี้จะ settle หลังจาก 3 วินาที แล้วได้ผลลัพธ์เป็น `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 เมื่อ promise พร้อมแล้ว: แต่ละ promise จะกลายเป็นสมาชิกในอาร์เรย์
```

สังเกตว่าลำดับในอาร์เรย์ผลลัพธ์จะตรงกับลำดับ promise ต้นทางเสมอ แม้ promise ตัวแรกจะใช้เวลานานที่สุด ผลของมันก็ยังอยู่ตำแหน่งแรกในอาร์เรย์

ท่าที่ใช้กันบ่อยคือ map อาร์เรย์ของข้อมูลเป็นอาร์เรย์ของ promise แล้วส่งเข้า `Promise.all` — เจ๋งและกระชับมาก

เช่น ถ้ามีอาร์เรย์ของ URL อยู่ ก็ fetch ทุกตัวพร้อมกันได้แบบนี้:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map แต่ละ url ให้เป็น promise ของ fetch
let requests = urls.map(url => fetch(url));

// Promise.all รอจนกว่าทุก job จะ resolve แล้ว
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

ตัวอย่างใหญ่กว่านั้น คือดึงข้อมูล user ของ GitHub จากอาร์เรย์ชื่อ (ลอจิกเดียวกับการดึงสินค้าจาก id):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // ทุก response resolve เรียบร้อยแล้ว
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // แสดง 200 ทุก url
    }

    return responses;
  })
  // map อาร์เรย์ของ response เป็น response.json() เพื่ออ่านเนื้อหา
  .then(responses => Promise.all(responses.map(r => r.json())))
  // parse JSON ครบแล้ว: "users" คืออาร์เรย์ของข้อมูล user ทั้งหมด
  .then(users => users.forEach(user => alert(user.name)));
```

**ถ้า promise ตัวไหนตัวหนึ่ง reject ขึ้นมา `Promise.all` จะ reject ทันทีพร้อม error นั้นเลย**

เช่น:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

promise ตัวที่สอง reject หลัง 2 วินาที ทำให้ `Promise.all` reject ทันทีแล้ว `.catch` ก็ทำงาน — error ตัวนั้นกลายเป็นผลลัพธ์สุดท้ายของ `Promise.all` ทั้งก้อนเลย

```warn header="เมื่อ error เกิดขึ้น promise ตัวอื่นจะถูกมองข้ามหมด"
ถ้า promise ตัวใดตัวหนึ่ง reject ขึ้นมา `Promise.all` จะ reject ทันที และหยุดสนใจ promise ตัวที่เหลือทั้งหมด ผลลัพธ์ของพวกนั้นจะถูกทิ้งไปเลย

เช่น ถ้ามีหลาย `fetch` กำลังทำงานอยู่แล้วตัวหนึ่งพัง ตัวที่เหลือก็ยังรันต่อไปได้ตามปกติ แต่ `Promise.all` จะไม่ติดตามผลของพวกนั้นอีกต่อไป ถึงจะ settle ก็ถูกเพิกเฉย

`Promise.all` ไม่มีทางยกเลิก promise เหล่านั้นได้ เพราะ promise ไม่มี concept ของ "การยกเลิก" ถ้าต้องการ cancel ลองดู `AbortController` ใน[บทอื่น](info:fetch-abort) แต่นั่นไม่ใช่ส่วนหนึ่งของ Promise API
```

````smart header="`Promise.all(iterable)` รับค่าธรรมดาที่ไม่ใช่ promise ได้ด้วย"
ปกติ `Promise.all(...)` รับ iterable ของ promise แต่ถ้าค่าไหนไม่ใช่ promise ก็จะส่งผ่านไปยังอาร์เรย์ผลลัพธ์ "ตามที่เป็น" เลย

เช่น ผลลัพธ์ที่ได้คือ `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

ก็คือเราส่งค่าที่พร้อมใช้อยู่แล้วเข้าไปใน `Promise.all` ตรงๆ ได้เลย
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` จะ reject ทันทีถ้า promise ตัวไหนพัง — เหมาะสำหรับงานแบบ "ได้ทั้งหมดหรือไม่ได้เลย" เช่นต้องมีครบทุกอย่างถึงจะเดินหน้าได้:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // เมธอด render ต้องการผลลัพธ์จากทุก fetch
```

แต่ถ้าต้องการรอให้ทุก promise จบ ไม่ว่าจะสำเร็จหรือพัง — ใช้ `Promise.allSettled` แทน

ผลลัพธ์ที่ได้จะเป็นอาร์เรย์โดยแต่ละตัวมีรูปแบบแบบนี้:

- `{status:"fulfilled", value:result}` สำหรับ response ที่สำเร็จ
- `{status:"rejected", reason:error}` สำหรับ error

ลองนึกสถานการณ์นี้ — เราอยากดึงข้อมูล user หลายคน แม้ request บางตัวจะพัง เราก็ยังอยากได้ข้อมูลของตัวที่รอดมาล่ะ:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

ค่าของ `results` ที่บรรทัด `(*)` จะหน้าตาแบบนี้:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

แต่ละ promise ได้ทั้ง status และ `value` หรือ `reason` กลับมาครบเลย — เห็นไหมว่าต่างกับ `Promise.all` ยังไง?

### Polyfill

ถ้าเบราว์เซอร์ยังไม่รองรับ `Promise.allSettled` ก็เขียน polyfill เองได้ไม่ยาก:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

โค้ดนี้ใช้ `promises.map` รับค่าเข้ามาแล้วแปลงเป็น promise ทุกตัว (กันกรณีที่ส่งค่าธรรมดาเข้ามา) ด้วย `p => Promise.resolve(p)` จากนั้นเพิ่ม `.then` handler ให้ทุกตัว

handler นั้นจะแปลง value ที่สำเร็จให้เป็น `{status:'fulfilled', value}` และแปลง reason ที่พังให้เป็น `{status:'rejected', reason}` — ตรงกับ format ของ `Promise.allSettled` พอดี

ทีนี้เราก็ใช้ `Promise.allSettled` ดึงผลลัพธ์จาก *ทุก* promise ที่ให้มาได้แล้ว ไม่ว่าบางตัวจะ reject หรือไม่

## Promise.race

คล้ายกับ `Promise.all` แต่รอแค่ promise *ตัวแรก* ที่ settle แล้วเอาผลลัพธ์ (หรือ error) ของตัวนั้น

เขียนแบบนี้:

```js
let promise = Promise.race(iterable);
```

เช่น ผลลัพธ์ที่ได้คือ `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

promise ตัวแรกเร็วที่สุดเลยกลายเป็นผลลัพธ์ หลังจาก promise แรก "ชนะการแข่ง" แล้ว ผลลัพธ์และ error ของตัวที่เหลือก็โดนมองข้ามหมดเลย


## Promise.any

`Promise.race` รอ promise แรกที่ settle ไม่ว่าจะสำเร็จหรือพัง แต่ `Promise.any` ใจดีกว่า — รอแค่ promise *ตัวแรก* ที่ *fulfill* แล้วข้ามตัวที่ reject ไปเรื่อยๆ

ถ้า promise ทุกตัว reject หมดเลย จะได้ [`AggregateError`](mdn:js/AggregateError) กลับมา — เป็น error object พิเศษที่เก็บ error ของทุก promise ไว้ใน property `errors`

เขียนแบบนี้:

```js
let promise = Promise.any(iterable);
```

เช่น ผลลัพธ์ที่ได้คือ `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

promise ตัวแรกเร็วที่สุดก็จริง แต่ reject เลยข้ามไป — promise ตัวที่สองกลายเป็นผลลัพธ์แทน หลังจาก promise แรกที่ fulfill "ชนะการแข่ง" ตัวที่เหลือก็โดนมองข้ามหมด

ทีนี้ลองดูกรณีที่ promise ทุกตัวพังพร้อมกัน:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

จะเห็นว่า error ของแต่ละ promise ที่พังไปจะเก็บอยู่ใน property `errors` ของ `AggregateError`

## Promise.resolve/reject

`Promise.resolve` กับ `Promise.reject` นั้นแทบไม่ค่อยต้องใช้ในโค้ดยุคใหม่แล้ว เพราะ `async/await` (จะพูดถึง[ในบทถัดไป](info:async-await)) ทำให้สองตัวนี้ไม่ค่อยจำเป็นอีก

แต่เรายังอธิบายไว้ให้ครบ สำหรับคนที่ยังใช้ `async/await` ไม่ได้ด้วยเหตุผลบางอย่าง

### Promise.resolve

`Promise.resolve(value)` สร้าง promise ที่ resolve แล้วพร้อมค่า `value`

เทียบเท่ากับ:

```js
let promise = new Promise(resolve => resolve(value));
```

ใช้เพื่อความเข้ากันได้ (compatibility) ในกรณีที่ฟังก์ชันจำเป็นต้องคืนค่าเป็น promise เสมอ

ดูตัวอย่าง — ฟังก์ชัน `loadCached` ด้านล่างดึงข้อมูลจาก URL แล้ว cache ไว้ ถ้าเรียกซ้ำด้วย URL เดิม จะดึงจาก cache ทันที แต่ยังต้องคืนค่าเป็น promise ด้วย เลยใช้ `Promise.resolve` ห่อค่านั้นไว้:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

ด้วยวิธีนี้ เราเขียน `loadCached(url).then(…)` ได้เสมอ เพราะฟังก์ชันการันตีว่าจะคืนค่าเป็น promise ทุกกรณี — นั่นคือจุดประสงค์ของ `Promise.resolve` ที่บรรทัด `(*)`

### Promise.reject

`Promise.reject(error)` สร้าง promise ที่ reject แล้วพร้อม `error`

เทียบเท่ากับ:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

แทบไม่ได้ใช้จริงๆ ในทางปฏิบัติ

## สรุป

`Promise` class มี static method อยู่ 6 ตัว:

1. `Promise.all(promises)` -- รอให้ promise ทุกตัว resolve แล้วคืนอาร์เรย์ผลลัพธ์ ถ้าตัวไหน reject จะกลายเป็น error ของ `Promise.all` และผลลัพธ์อื่นทั้งหมดถูกทิ้ง
2. `Promise.allSettled(promises)` (method ที่เพิ่งเพิ่มมา) -- รอให้ promise ทุกตัว settle แล้วคืนผลลัพธ์เป็นอาร์เรย์ของออบเจ็กต์ที่มี:
    - `status`: `"fulfilled"` หรือ `"rejected"`
    - `value` (ถ้า fulfilled) หรือ `reason` (ถ้า rejected)
3. `Promise.race(promises)` -- รอแค่ promise ตัวแรกที่ settle ผลลัพธ์หรือ error ของตัวนั้นกลายเป็นผลลัพธ์ทั้งหมด
4. `Promise.any(promises)` (method ที่เพิ่งเพิ่มมา) -- รอแค่ promise ตัวแรกที่ fulfill แล้วผลลัพธ์ของตัวนั้นกลายเป็นผลลัพธ์ทั้งหมด ถ้าทุกตัว reject จะได้ [`AggregateError`](mdn:js/AggregateError) กลับมา
5. `Promise.resolve(value)` -- สร้าง promise ที่ resolve แล้วด้วยค่าที่กำหนด
6. `Promise.reject(error)` -- สร้าง promise ที่ reject แล้วด้วย error ที่กำหนด

บรรดา 6 ตัวนี้ `Promise.all` น่าจะเป็นตัวที่ใช้บ่อยที่สุดในทางปฏิบัติ
