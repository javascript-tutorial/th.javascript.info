# Promisification

ชื่อมันยาวหน่อย แต่ concept ง่ายมาก — Promisification แค่แปลงฟังก์ชันที่รับ callback ให้กลายเป็นฟังก์ชันที่คืนค่าเป็น promise แทน

ทำไมต้องทำแบบนี้ล่ะ? ก็เพราะโค้ดในโลกจริงเต็มไปด้วย library และฟังก์ชันที่ใช้ callback-based อยู่เยอะมาก แต่ promise ใช้งานได้สะดวกกว่า — เลยต้อง promisify มันซะ

มาดูตัวอย่างกัน

เราเคยเห็นฟังก์ชัน `loadScript(src, callback)` จากบท <info:callbacks> กันมาแล้ว:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// การใช้งาน:
// loadScript('path/script.js', (err, script) => {...})
```

ฟังก์ชันนี้โหลด script จาก `src` ที่กำหนด แล้วเรียก `callback(err)` ถ้า error หรือ `callback(null, script)` ถ้าโหลดสำเร็จ — เป็น pattern มาตรฐานของ callback-based ที่เราคุ้นเคยกันดี

ทีนี้ลอง promisify มันดู

เราจะสร้างฟังก์ชันใหม่ชื่อ `loadScriptPromise(src)` ที่ทำหน้าที่เดิม (โหลด script) แต่คืนค่าเป็น promise แทน ไม่รับ callback อีกต่อไป

พูดง่ายๆ คือ — รับแค่ `src` เข้ามา แล้วได้ promise กลับออกไป promise จะ resolve พร้อม `script` ถ้าโหลดสำเร็จ หรือ reject พร้อม error ถ้าโหลดไม่ได้

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// การใช้งาน:
// loadScriptPromise('path/script.js').then(...)
```

จะเห็นว่าฟังก์ชันใหม่นี้เป็นแค่ wrapper ครอบ `loadScript` เดิมอีกที — เรียก `loadScript` แล้วใส่ callback ของตัวเองเข้าไป โดย callback นั้นจะแปลงผลลัพธ์ไปเป็น `resolve/reject` ของ promise

`loadScriptPromise` เข้ากันได้ดีกับโค้ดแบบ promise เลย ถ้าชอบ promise มากกว่า callback (และเดี๋ยวจะเห็นเหตุผลอีกมากในบทต่อๆ ไป) เปลี่ยนมาใช้ตัวนี้ได้เลย

แต่ในชีวิตจริง เราคงต้อง promisify หลายฟังก์ชัน — เลยควรทำ helper ขึ้นมาแทน

เรียกมันว่า `promisify(f)`: รับฟังก์ชัน `f` ที่อยากแปลง แล้วคืน wrapper function กลับมา

```js
function promisify(f) {
  return function (...args) { // คืน wrapper-function กลับไป (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // callback ที่เราสร้างเองสำหรับ f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // เอา callback ของเราต่อท้ายอาร์กิวเมนต์ของ f

      f.call(this, ...args); // เรียกฟังก์ชันต้นฉบับ
    });
  };
}

// การใช้งาน:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

โค้ดอาจดูซับซ้อนหน่อย แต่จริงๆ แล้วทำเหมือนกับที่เราเขียน `loadScriptPromise` ด้านบนเลย เพียงแต่ครอบคลุมฟังก์ชันอื่นๆ ได้ทั่วไปมากกว่า

ทำงานยังไงล่ะ? `promisify(f)` คืน wrapper รอบ `f` `(*)` ที่พอถูกเรียก จะสร้าง promise ขึ้น แล้ว forward การเรียกไปยัง `f` ต้นฉบับ โดยรับผลลัพธ์ผ่าน custom callback `(**)`

`promisify` ตัวนี้สมมติไว้ว่า — `f` ต้นฉบับรับ callback ที่มีอาร์กิวเมนต์แค่ 2 ตัวคือ `(err, result)` ซึ่งเป็น pattern ที่เจอบ่อยที่สุด ถ้าเจอแบบนี้ก็โอเคเลย

แต่ถ้า `f` ต้นฉบับส่งอาร์กิวเมนต์มากกว่านั้น เช่น `callback(err, res1, res2, ...)` ล่ะ?

ก็ต้องอัปเกรด helper นิดนึง มาทำ version ที่ดีกว่าเดิม:

- เรียก `promisify(f)` แบบปกติ → ทำงานเหมือนเดิม
- เรียก `promisify(f, true)` → คืน promise ที่ resolve พร้อม *อาร์เรย์* ของผลลัพธ์ทั้งหมด เหมาะกับ callback ที่ส่งค่ากลับมาหลายตัว

```js
// promisify(f, true) เพื่อรับผลลัพธ์เป็นอาร์เรย์
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // callback ที่เราสร้างเองสำหรับ f
        if (err) {
          reject(err);
        } else {
          // resolve ด้วยผลลัพธ์ทั้งหมด ถ้ากำหนด manyArgs ไว้
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// การใช้งาน:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

โค้ดแทบไม่ต่างกันเลย ต่างแค่ตอน resolve — ถ้า `manyArgs` เป็น true จะ resolve ด้วย `results` ทั้งอาร์เรย์ ถ้าไม่ก็รับแค่ `results[0]` ตัวเดียว

สำหรับ callback แปลกๆ พิเศษ เช่น ไม่มี `err` เลย อย่าง `callback(result)` — แบบนี้ก็ promisify เองด้วยมือได้โดยไม่ต้องพึ่ง helper

แถมยังมี module ภายนอกที่ทำ promisification ได้ยืดหยุ่นกว่านี้อีก เช่น [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) และถ้าใช้ Node.js ก็มีฟังก์ชัน `util.promisify` ติดมาให้เลย ไม่ต้องติดตั้งเพิ่ม

```smart
Promisification เป็นท่าที่ดีมาก โดยเฉพาะตอนใช้ `async/await` (ดูเพิ่มเติมในบท <info:async-await>) แต่ไม่ได้แทน callback ได้ทุกกรณีนะ

อย่าลืมว่า — promise มีผลลัพธ์ได้แค่ครั้งเดียว แต่ callback เรียกซ้ำกี่รอบก็ได้

เพราะฉะนั้น promisification เหมาะกับฟังก์ชันที่เรียก callback แค่ครั้งเดียวเท่านั้น ถ้าเรียกซ้ำ ครั้งหลังๆ promise จะเพิกเฉยไป
```
