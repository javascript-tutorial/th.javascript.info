# สร้าง error class เอง ด้วยการ extend Error

พอแอปเริ่มซับซ้อนขึ้น error แบบ built-in อย่าง `SyntaxError` หรือ `TypeError` มันไม่พอใช้แล้ว — เราต้องสร้าง error class ของเราเองขึ้นมา

ลองนึกดู ถ้าเป็นงาน network ก็อาจต้องมี `HttpError` งานฐานข้อมูลก็ `DbError` หาข้อมูลไม่เจอก็ `NotFoundError` แต่ละตัวบอกได้ชัดเลยว่าเจ๊งตรงไหน

error ที่สร้างเองก็ควรมี `message`, `name`, `stack` เหมือน error ทั่วไป แถมยังเพิ่มพร็อพเพอร์ตี้เฉพาะได้อีก — เช่น `HttpError` อาจมี `statusCode` เก็บค่า `404` หรือ `500`

จริงๆ JavaScript ยอมให้ throw อะไรก็ได้นะ จะสตริง จะตัวเลขก็ยังได้ แต่ถ้า extend จาก `Error` ไว้ เราจะเช็คด้วย `obj instanceof Error` ได้เลย — ท่านี้สะดวกกว่าเยอะ

พอแอปโตขึ้น error class ก็จะแตกกิ่งเป็นลำดับชั้นไปเอง เช่น `HttpTimeoutError` extend จาก `HttpError` อีกที

## ต่อยอดจาก Error

สมมติเรามีฟังก์ชัน `readUser(json)` ที่รับ JSON แล้วอ่านข้อมูลผู้ใช้ออกมา มาดูกันว่า error class จะช่วยได้ยังไง

JSON ที่ถูกต้องจะหน้าตาประมาณนี้:
```js
let json = `{ "name": "John", "age": 30 }`;
```

ข้างในฟังก์ชัน เราใช้ `JSON.parse` ถ้า `json` รูปแบบผิดก็โดน `SyntaxError` ทันที

แต่ถึง `json` จะถูกไวยากรณ์ ก็ไม่ได้แปลว่าข้อมูลจะครบนะ — อาจไม่มี `name` หรือ `age` ที่เราต้องการก็ได้ จริงไหม?

`readUser(json)` เลยต้องทำทั้งอ่าน JSON และเช็คข้อมูลด้วย ถ้าฟิลด์จำเป็นหายไป ก็ถือว่า error — แต่เป็น error คนละท่ากับ `SyntaxError` เพราะตัว JSON ถูกอยู่ แค่ข้อมูลไม่ครบ

เราจะเรียก error แบบนี้ว่า `ValidationError` แล้วสร้างคลาสขึ้นมา โดยให้บอกด้วยว่าฟิลด์ไหนมีปัญหา

`ValidationError` ควร extend จาก `Error` มาดูก่อนว่าคลาส `Error` ข้างในมีอะไร:

```js
// "pseudocode" ของคลาส Error ที่ JavaScript สร้างไว้ให้
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (คลาส error ที่ built-in มาจะมีชื่อต่างกันไป)
    this.stack = <call stack>; // ไม่ใช่มาตรฐาน แต่เกือบทุกเอนจินรองรับ
  }
}
```

ทีนี้มาสร้าง `ValidationError` โดย extend จาก `Error` แล้วลองเรียกใช้ดู:

```js run
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("อุ๊ปส์!");
}

try {
  test();
} catch(err) {
  alert(err.message); // อุ๊ปส์!
  alert(err.name); // ValidationError
  alert(err.stack); // รายการเรียกฟังก์ชันซ้อนกัน พร้อมเลขบรรทัด
}
```

บรรทัด `(1)` — เรียก `super` เพื่อให้คลาสแม่ตั้ง `message` ให้ JavaScript บังคับว่าคลาสลูกต้องเรียก `super` เสมอ

แต่คลาสแม่ตั้ง `name` เป็น `"Error"` ด้วย เลยต้องเปลี่ยนเองในบรรทัด `(2)`

ลองเอาไปใช้กับ `readUser(json)` จริงๆ ดู:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// ใช้งานจริง
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("ไม่มีฟิลด์: age");
  }
  if (!user.name) {
    throw new ValidationError("ไม่มีฟิลด์: name");
  }

  return user;
}

// ตัวอย่างการใช้ try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("ข้อมูลไม่ถูกต้อง: " + err.message); // ข้อมูลไม่ถูกต้อง: ไม่มีฟิลด์: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // error ที่ไม่รู้จัก โยนต่อออกไป (**)
  }
}
```

`try..catch` ด้านบนจัดการได้ทั้ง `ValidationError` ของเราและ `SyntaxError` จาก `JSON.parse` เลย

สังเกตบรรทัด `(*)` ไหม? เราใช้ `instanceof` เช็คว่า error เป็นชนิดไหน

จะใช้ `err.name` แทนก็ได้นะ แบบนี้:

```js
// ...
// แทนที่จะใช้ (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

แต่ `instanceof` ดีกว่าเยอะ — ถ้าอนาคตเราแตกคลาสย่อยเช่น `PropertyRequiredError` ท่า `instanceof` ยังใช้ได้กับคลาสลูกทั้งหมดเลย รองรับอนาคตดีมาก

อีกจุดสำคัญ — ถ้า `catch` เจอ error ที่ไม่รู้จักล่ะ? ต้องโยนต่อออกไปเหมือนบรรทัด `(**)` เพราะ `catch` ของเราจัดการได้แค่ validation กับ syntax error ชนิดอื่นต้องปล่อยให้หลุดไป

## สืบทอดต่ออีกชั้น

`ValidationError` ของเรายังกว้างเกินไป — พร็อพเพอร์ตี้อาจหาย หรือรูปแบบอาจผิด (เช่น `age` เป็นสตริงแทนตัวเลข)

มาสร้างคลาสที่เจาะจงกว่านี้กัน — `PropertyRequiredError` สำหรับกรณีที่พร็อพเพอร์ตี้หายไป พร้อมบอกด้วยว่าตัวไหนที่หาย:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// ใช้งานจริง
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// ตัวอย่างการใช้ try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("ข้อมูลไม่ถูกต้อง: " + err.message); // ข้อมูลไม่ถูกต้อง: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // error ที่ไม่รู้จัก โยนต่อออกไป
  }
}
```

ใช้งานง่ายมาก — แค่ส่งชื่อพร็อพเพอร์ตี้เข้าไป `new PropertyRequiredError(property)` แล้วคอนสตรักเตอร์จะสร้าง `message` ให้เอง

แต่สังเกตไหมว่า `this.name` ต้องกำหนดเองทุกคลาสเลย? น่าเบื่อใช่ไหม?

แก้ได้ง่ายๆ — สร้างคลาส base error ที่ตั้ง `this.name = this.constructor.name` ให้อัตโนมัติ แล้วให้ error class อื่นๆ extend จากมัน

เรียกมันว่า `MyError` ดูโค้ดกันเลย:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name ถูกต้องเลย
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

แค่นี้ error class สั้นกระชับขึ้นเยอะเลย โดยเฉพาะ `ValidationError` ที่ไม่ต้องมี `"this.name = ..."` อีกแล้ว

## การห่อหุ้ม exception (Wrapping exceptions)

ทีนี้ลองคิดดู — `readUser` อาจเจ๊งได้หลายแบบ ตอนนี้มี `SyntaxError` กับ `ValidationError` แต่อนาคตอาจมีอีก

โค้ดที่เรียก `readUser` ก็ต้องมานั่งเช็ค error ทีละชนิดในบล็อก `catch` จัดการตัวที่รู้จัก โยนตัวที่ไม่รู้จักออกไป

ท่าที่ใช้อยู่หน้าตาแบบนี้:

```js
try {
  ...
  readUser()  // แหล่งที่อาจเกิด error
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // จัดการ validation error
  } else if (err instanceof SyntaxError) {
    // จัดการ syntax error
  } else {
    throw err; // error ที่ไม่รู้จัก โยนต่อ
  }
}
```

ตอนนี้มี 2 ชนิด แต่อนาคตอาจมีอีก เราจะมานั่งเช็คทีละตัวทุกครั้งเลยเหรอ?

ส่วนใหญ่ไม่ต้อง — เราแค่อยากรู้ว่า "อ่านข้อมูลเจ๊ง" ส่วนเจ๊งเพราะอะไรค่อยไปดูทีหลังก็ได้

ท่านี้เรียกว่า "การห่อหุ้ม exception" (wrapping exceptions)

1. สร้างคลาส `ReadError` ขึ้นมาเป็นตัวแทนของ error ทุกชนิดที่เกี่ยวกับ "การอ่านข้อมูล"
2. ฟังก์ชัน `readUser` จะจับ error ที่เกิดภายใน (ทั้ง `ValidationError` และ `SyntaxError`) แล้วสร้าง `ReadError` ขึ้นมาแทน
3. ออบเจ็กต์ `ReadError` จะเก็บ error ต้นทางไว้ในพร็อพเพอร์ตี้ `cause`

โค้ดข้างนอกก็แค่เช็ค `ReadError` ตัวเดียวจบ อยากรู้รายละเอียดก็ดูจาก `cause`

มาดูโค้ดเต็มๆ เลย:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

`readUser` จับ syntax error กับ validation error แล้ว throw เป็น `ReadError` แทน — error ที่ไม่รู้จักก็โยนต่อตามปกติ

โค้ดข้างนอกก็แค่เช็ค `instanceof ReadError` อย่างเดียว ไม่ต้องไล่เช็คทุกชนิดอีก เจ๋งใช่ไหม?

ท่านี้เรียกว่า "การห่อหุ้ม exception" — เอา error ระดับล่างมา "ห่อ" ไว้ใน error ระดับสูง เป็นท่าที่ใช้เยอะมากใน OOP

## สรุป

- สร้าง error class เองได้โดย extend จาก `Error` แค่อย่าลืมตั้ง `name` แล้วเรียก `super`
- ใช้ `instanceof` เช็คชนิด error ได้ ใช้กับคลาสลูกก็โอเค ถ้าได้ error จากไลบรารีภายนอกที่เข้าถึงคลาสไม่ได้ — ก็เช็คจาก `name` แทน
- การห่อหุ้ม exception เป็นท่าที่ใช้บ่อย — จับ error ระดับล่างแล้วสร้าง error ระดับสูงขึ้นมาแทน error ต้นทางเก็บไว้ใน `err.cause` ก็ได้ ไม่ก็ได้
