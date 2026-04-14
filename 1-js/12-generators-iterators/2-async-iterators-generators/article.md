
# Async iteration และ generators

บางทีข้อมูลไม่ได้พร้อมทันที — ต้องรอโหลดจากเน็ต ต้องรอ `setTimeout` หรือต้องมาทีละ chunk ถ้าใช้ iterator แบบปกติจะรับมือกับเคสแบบนี้ไม่ได้เลย

Async iteration คือทางออก — ให้เราวน loop ข้อมูลที่มาแบบ asynchronous ได้ แถม async generators ยังทำให้โค้ดกระชับขึ้นอีก

มาดูตัวอย่างง่ายๆ กันก่อน แล้วค่อยไปดูตัวอย่างจริงที่เจอบ่อยในงาน

## ทบทวน iterables

ก่อนไปต่อ เอา iterables มาทบทวนกันนิดนึงก่อนนะ

สมมติมีออบเจ็กต์ `range` แบบนี้:

```js
let range = {
  from: 1,
  to: 5
};
```

แล้วเราอยากใช้ `for..of` วนดูค่าตั้งแต่ `1` ถึง `5` — พูดง่ายๆ คือต้องการ*ความสามารถในการวนซ้ำ* (iteration) ให้กับออบเจ็กต์นี้

ทำได้โดยเพิ่มเมธอดพิเศษชื่อ `Symbol.iterator`:

- `for..of` เรียกเมธอดนี้แค่ครั้งเดียวตอนเริ่มต้น และต้องคืนค่าออบเจ็กต์ที่มีเมธอด `next`
- แต่ละรอบ loop จะเรียก `next()` เพื่อดึงค่าถัดไป
- `next()` ต้องคืนค่าในรูป `{done: true/false, value: <ค่าในลูป>}` โดย `done: true` หมายถึงจบแล้ว

ตัวอย่าง `range` ที่ใช้งาน iterable ได้:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // เรียกครั้งเดียว ตอนเริ่ม for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // เรียกทุกรอบ เพื่อดึงค่าถัดไป
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 แล้วก็ 2, 3, 4, 5
}
```

ถ้าตรงไหนยังงงอยู่ ลองไปอ่านบทความ [](info:iterable) ที่อธิบาย iterables แบบปกติไว้ครบมากๆ

## Async iterables

แล้วถ้าค่าที่ต้องการมันมาช้า ต้องรอ `setTimeout` หรือต้องยิง network request ก่อน ล่ะ?

เคสที่เจอบ่อยที่สุดคือต้องยิง request ไปดึงข้อมูลก่อน ถึงจะรู้ว่าค่าถัดไปคืออะไร — เดี๋ยวจะเห็นตัวอย่างจริงกัน

วิธีทำให้ออบเจ็กต์ iterable แบบ asynchronous:

1. ใช้ `Symbol.asyncIterator` แทน `Symbol.iterator`
2. เมธอด `next()` ต้องคืนค่าเป็น promise (เพื่อ resolve เป็นค่าถัดไป)
    - ใช้ keyword `async` ช่วยได้ — แค่เขียน `async next()` ก็พอ
3. เวลาวน loop ต้องใช้ `for await (let item of iterable)`
    - สังเกตว่ามี `await` ต่อท้าย `for`

ลองทำ `range` ที่ให้ค่าแบบ asynchronous ทีละวินาที — แก้โค้ดเดิมแค่นิดเดียวก็ได้เลย:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // หมายเหตุ: ใช้ "await" ใน async next ได้เลย:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

โครงสร้างคล้าย iterator แบบปกติมาก เพิ่มแค่ตรงนี้:

1. ออบเจ็กต์ที่จะ iterate แบบ async ต้องมีเมธอด `Symbol.asyncIterator` `(1)`
2. เมธอดนี้ต้องคืนออบเจ็กต์ที่มี `next()` คืนค่าเป็น promise `(2)`
3. `next()` ไม่จำเป็นต้องเป็น `async` ก็ได้ — แค่ให้คืน promise ก็พอ แต่ใช้ `async` แล้วเขียนสบายกว่า เพราะใช้ `await` ข้างในได้ ในตัวอย่างนี้แค่หน่วงเวลา 1 วินาที `(3)`
4. ตอนวน loop ใช้ `for await(let value of range)` `(4)` — เติม `await` หลัง `for` ก็จบ JavaScript จะเรียก `range[Symbol.asyncIterator]()` ครั้งเดียว แล้วค่อยเรียก `next()` ทีละรอบ

สรุปความต่างในตาราง:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| เมธอดบนออบเจ็กต์ | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` คืนค่า | ค่าใดก็ได้         | `Promise`  |
| ใช้ loop แบบ | `for..of`         | `for await..of` |

````warn header="Spread syntax `...` ไม่รองรับ async"
ฟีเจอร์ที่ต้องการ iterator แบบ synchronous จะใช้กับ async iterator ไม่ได้

เช่น spread syntax จะพังทันที:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

เพราะ spread ไปหา `Symbol.iterator` ไม่ใช่ `Symbol.asyncIterator`

เช่นเดียวกับ `for..of` ธรรมดา: ถ้าไม่มี `await` ก็ต้องการ `Symbol.iterator` อยู่ดี
````

## ทบทวน generators

ก่อนไปถึง async generators มาทบทวน generator แบบปกติกันก่อน — เพราะมันทำให้โค้ด iteration สั้นลงเยอะมาก

พูดสั้นๆ generator คือ "ฟังก์ชันที่ส่งค่าออกมาทีละตัว" รายละเอียดเต็มอยู่ที่บทความ [](info:generators)

Generator ใช้ `function*` (สังเกตมีดาว) และใช้ `yield` เพื่อส่งค่าออกมาทีละตัว จากนั้นใช้ `for..of` วนรับค่าได้เลย:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, แล้วก็ 2, 3, 4, 5
}
```

ถ้าอยากให้ออบเจ็กต์ iterable ได้ก็แค่ใส่ `Symbol.iterator`:

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <ออบเจ็กต์ที่มี next เพื่อให้ range iterate ได้>
  }
*/!*
}
```

เทคนิคที่นิยมกันคือให้ `Symbol.iterator` คืน generator เลย โค้ดสั้นลงเห็นชัด:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // ย่อจาก [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, แล้วก็ 2, 3, 4, 5
}
```

ดูรายละเอียดเพิ่มเติมได้ที่บทความ [](info:generators)

แต่ generator แบบปกติใช้ `await` ไม่ได้นะ — ค่าทุกตัวต้องออกมาแบบ synchronous ตาม `for..of`

แล้วถ้าอยากดึงค่าแบบ asynchronous ล่ะ? เช่น ต้องยิง network request ก่อน?

ตรงนี้แหละที่ async generators เข้ามาช่วย

## Async generators (ในที่สุด!)

ส่วนใหญ่ถ้าอยากได้ออบเจ็กต์ที่ส่งค่าแบบ asynchronous ก็ใช้ async generator ตรงๆ เลย

วิธีเขียนง่ายมาก — แค่เติม `async` หน้า `function*` แค่นี้ก็ได้ async generator แล้ว

จากนั้นใช้ `for await (...)` วน loop:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // เจ๋งมาก ใช้ await ได้เลย!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, แล้วก็ 2, 3, 4, 5 (มีดีเลย์ระหว่างแต่ละค่า)
  }

})();
```

เพราะ generator นี้เป็น async เราก็ใช้ `await` ข้างในได้ รอ promise ได้ ยิง network request ได้ ทุกอย่างเลย

````smart header="ความต่างภายใน"
สำหรับคนที่จำรายละเอียด generators ได้แม่น — มีความต่างด้านใน

ใน async generator เมธอด `generator.next()` เป็น asynchronous คืนค่าเป็น promise

ใน generator ปกติเราใช้ `result = generator.next()` ดึงค่าได้เลย แต่ใน async generator ต้องเติม `await`:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
นั่นเองที่ทำให้ async generator ทำงานกับ `for await...of` ได้
````

### Async iterable range

เหมือนกับที่ generator ปกติใช้แทน `Symbol.iterator` ได้ async generator ก็ใช้แทน `Symbol.asyncIterator` ได้เช่นกัน

ยกตัวอย่าง — แปลง `range` ให้ส่งค่าแบบ async ทีละวินาที แค่เปลี่ยน `Symbol.iterator` เป็น `Symbol.asyncIterator` ก็จบ:

```js run
let range = {
  from: 1,
  to: 5,

  // บรรทัดนี้เหมือนกับ [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // หน่วงระหว่างค่าแต่ละตัว รอก่อน
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, แล้วก็ 2, 3, 4, 5
  }

})();
```

ตอนนี้ค่าแต่ละตัวมีดีเลย์ 1 วินาทีระหว่างกัน

```smart
จริงๆ แล้วใส่ทั้ง `Symbol.iterator` และ `Symbol.asyncIterator` ในออบเจ็กต์เดียวกันก็ได้ — ทำให้รองรับทั้ง `for..of` และ `for await..of`

แต่ในทางปฏิบัติ แทบไม่มีเหตุผลที่จะทำแบบนั้นเลย
```

## ตัวอย่างจริง: ข้อมูลแบบแบ่งหน้า (paginated data)

ตัวอย่างที่ผ่านมาเป็นแค่ basic เพื่อให้เห็นภาพ ทีนี้มาดูของจริงกันบ้าง

API ออนไลน์หลายตัวส่งข้อมูลมาแบบแบ่งหน้า (paginated) เช่น ขอรายชื่อ user มา — ก็ได้มาครั้งละ 100 คน พร้อม URL ของหน้าถัดไป ต้องขอซ้ำเรื่อยๆ จนครบ

pattern นี้เจอทุกที่ ไม่ใช่แค่ user แต่คือเกือบทุกอย่าง

GitHub ก็ใช้ pattern นี้สำหรับดึง commit history:

- ยิง request ไปที่ `https://api.github.com/repos/<repo>/commits`
- ได้ JSON กลับมา 30 commits พร้อม link หน้าถัดไปใน header `Link`
- เอา link นั้นไปยิง request ต่อ วนซ้ำจนครบ

เราอยากเขียนโค้ดที่ใช้งานง่าย ไม่ต้องคิดเรื่อง pagination เอง

ลองสร้างฟังก์ชัน `fetchCommits(repo)` ที่ดึง commit มาให้ รับผิดชอบเรื่อง pagination ทั้งหมด ส่วนคนเรียกใช้ก็แค่ `for await..of` ได้เลย:

```js
for await (let commit of fetchCommits("username/repository")) {
  // จัดการ commit
}
```

ตัวฟังก์ชัน implement เป็น async generator:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github ต้องการ user-agent header
    });

    const body = await response.json(); // (2) response เป็น JSON (อาร์เรย์ของ commits)

    // (3) URL ของหน้าถัดไปอยู่ใน header ดึงออกมา
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commit ทีละตัวจนหมดหน้า
      yield commit;
    }
  }
}
```

โค้ดทำงานยังไงล่ะ:

1. ใช้เมธอด [fetch](info:fetch) ของ browser ดึง commit มา

    - URL เริ่มต้นคือ `https://api.github.com/repos/<repo>/commits` URL หน้าถัดไปจะอยู่ใน header `Link` ของ response
    - `fetch` รองรับการใส่ authorization หรือ header อื่นๆ ได้ตามต้องการ — GitHub บังคับให้ส่ง `User-Agent` มาด้วย
2. commit กลับมาเป็น JSON
3. ดึง URL หน้าถัดไปออกจาก header `Link` — format พิเศษ ต้องใช้ regular expression (ดูรายละเอียดได้ที่ [Regular expressions](info:regular-expressions))
    - URL หน้าถัดไปอาจมีหน้าตาแบบนี้: `https://api.github.com/repositories/93253246/commits?page=2` — GitHub สร้างให้เอง
4. yield commit ทีละตัวจนหมดหน้า แล้ว `while(url)` รอบต่อไปจะยิง request หน้าถัดไป

ตัวอย่างการใช้งาน (แสดงชื่อ author ของ commit ใน console):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // หยุดที่ 100 commits พอ
      break;
    }
  }

})();

// หมายเหตุ: ถ้ารันใน sandbox ภายนอก ต้องวางฟังก์ชัน fetchCommits ที่นิยามไว้ด้านบนไว้ในที่นี้ด้วย
```

ได้ผลลัพธ์แบบที่ต้องการเลย

รายละเอียด pagination ทั้งหมดซ่อนอยู่ข้างใน คนใช้เห็นแค่ async generator ที่ส่ง commit มาทีละตัวเท่านั้น ไม่ต้องคิดเรื่องหน้าถัดไปเลย

## สรุป

Iterator และ generator แบบปกติใช้ได้ดีกับข้อมูลที่ไม่ต้องรอ

ถ้าข้อมูลมาแบบ async มีดีเลย์ ก็ใช้คู่แฝด async ของมันแทน พร้อมกับเปลี่ยน `for..of` เป็น `for await..of`

ความต่างของ async และปกติสำหรับ iterables:

|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
| เมธอดสำหรับ iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` คืนค่า | `{value:…, done: true/false}`         | `Promise` ที่ resolve เป็น `{value:…, done: true/false}`  |

ความต่างของ async และปกติสำหรับ generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| การประกาศ | `function*` | `async function*` |
| `next()` คืนค่า | `{value:…, done: true/false}`         | `Promise` ที่ resolve เป็น `{value:…, done: true/false}`  |

ในงาน web development เจอ data stream บ่อยมาก — ข้อมูลที่มาทีละ chunk เช่น การดาวน์โหลดหรืออัพโหลดไฟล์ใหญ่

async generator จัดการกับงานแบบนี้ได้ แถม browser ยังมี Streams API ด้วย ซึ่งมี interface เฉพาะสำหรับจัดการ stream แปลงข้อมูล และส่งต่อจาก stream หนึ่งไปอีก stream (เช่น ดาวน์โหลดจากที่หนึ่ง แล้วส่งต่อไปอีกที่ทันที)
