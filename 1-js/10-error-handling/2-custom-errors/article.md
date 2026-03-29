# สร้าง error class เอง ด้วยการ extend Error

ตอนพัฒนาแอปจริง เราจะต้องมี error class เป็นของตัวเอง เพื่อบอกว่าเกิดปัญหาอะไรขึ้นในแต่ละจุด เช่น error เรื่อง network อาจต้องใช้ `HttpError` เรื่องฐานข้อมูลก็ `DbError` หาข้อมูลไม่เจอก็ `NotFoundError`

error ที่เราสร้างขึ้นเองก็ควรมีพร็อพเพอร์ตี้พื้นฐานอย่าง `message`, `name` และ `stack` ด้วย แต่ยังเพิ่มพร็อพเพอร์ตี้เฉพาะของตัวเองได้ เช่น ออบเจ็กต์ `HttpError` อาจมี `statusCode` เก็บค่า `404` หรือ `403` หรือ `500`

JavaScript ยอมให้ throw อะไรก็ได้ — error class ที่สร้างเองจึงไม่จำเป็นต้อง extend จาก `Error` แต่ถ้า extend ไว้ เราจะเช็คด้วย `obj instanceof Error` ได้เลย เป็นท่าที่ดีกว่า

พอแอปโตขึ้น error class ต่างๆ ก็จะค่อยๆ แตกกิ่งเป็นลำดับชั้นอย่างเป็นธรรมชาติ เช่น `HttpTimeoutError` extend จาก `HttpError` อีกที

## ต่อยอดจาก Error

ลองดูตัวอย่างจริงกัน สมมติเรามีฟังก์ชัน `readUser(json)` ที่รับ JSON แล้วอ่านข้อมูลผู้ใช้ออกมา

JSON ที่ถูกต้องจะหน้าตาประมาณนี้:
```js
let json = `{ "name": "John", "age": 30 }`;
```

ภายในฟังก์ชันเราใช้ `JSON.parse` ซึ่งถ้ารับ `json` ที่มีรูปแบบผิดจะ throw `SyntaxError` ออกมา แต่ถึง `json` จะถูกไวยากรณ์แล้ว ก็ไม่ได้แปลว่าข้อมูลถูกต้องเสมอไปนะ — อาจจะขาดฟิลด์สำคัญ เช่น ไม่มี `name` หรือ `age` ก็ได้

ฟังก์ชัน `readUser(json)` จะไม่ได้แค่อ่าน JSON อย่างเดียว แต่ต้องเช็ค ("validate") ข้อมูลด้วย ถ้าฟิลด์ที่จำเป็นหายไป หรือรูปแบบผิด ก็ถือว่าเป็น error — แต่ไม่ใช่ `SyntaxError` นะ เพราะตัว JSON ถูกไวยากรณ์อยู่ เป็น error คนละท่ากัน เราจะเรียกว่า `ValidationError` แล้วสร้างเป็นคลาสขึ้นมา error แบบนี้ควรบอกด้วยว่าฟิลด์ไหนมีปัญหา

คลาส `ValidationError` ของเราควร extend จากคลาส `Error`

คลาส `Error` เป็นคลาส built-in แต่ลองดูโค้ดจำลองกันก่อนว่าข้างในมีอะไรบ้าง:

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

สังเกตบรรทัด `(1)` — เราเรียก `super` เพื่อเรียกคอนสตรักเตอร์ของคลาสแม่ JavaScript บังคับว่าคลาสลูกต้องเรียก `super` เสมอ ซึ่งคอนสตรักเตอร์ของคลาสแม่จะตั้งค่า `message` ให้

คลาสแม่ยังตั้ง `name` เป็น `"Error"` ด้วย เราเลยต้องเปลี่ยนเป็นค่าที่ถูกต้องในบรรทัด `(2)`

มาลองใช้กับ `readUser(json)` จริงๆ กัน:

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

บล็อก `try..catch` ในโค้ดด้านบนจัดการได้ทั้ง `ValidationError` ที่เราสร้างเองและ `SyntaxError` ที่มาจาก `JSON.parse`

ลองสังเกตบรรทัด `(*)` ดู — เราใช้ `instanceof` เพื่อเช็คว่า error เป็นชนิดไหน

จะใช้ `err.name` แทนก็ได้ แบบนี้:

```js
// ...
// แทนที่จะใช้ (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

แต่ `instanceof` ดีกว่ามากนะ เพราะถ้าอนาคตเราแตกคลาสย่อยจาก `ValidationError` อีก เช่น `PropertyRequiredError` ท่า `instanceof` จะยังใช้ได้กับคลาสลูกทั้งหมด ถือว่ารองรับอนาคตดี

จุดสำคัญอีกอย่าง — ถ้า `catch` เจอ error ที่ไม่รู้จัก ต้องโยนต่อออกไปเหมือนในบรรทัด `(**)` เพราะ `catch` ของเราจัดการได้แค่ validation error กับ syntax error เท่านั้น error ชนิดอื่น (เช่น พิมพ์ตัวแปรผิด หรือเหตุผลอื่นที่คาดไม่ถึง) ต้องปล่อยให้หลุดออกไป

## สืบทอดต่ออีกชั้น

คลาส `ValidationError` ของเราค่อนข้างกว้าง ปัญหาที่เจอได้มีหลายแบบ — พร็อพเพอร์ตี้อาจหายไป หรืออาจเป็นรูปแบบผิด (เช่น `age` เป็นสตริงแทนที่จะเป็นตัวเลข) มาสร้างคลาสที่เจาะจงกว่ากัน คือ `PropertyRequiredError` สำหรับกรณีที่พร็อพเพอร์ตี้หายไปโดยเฉพาะ พร้อมเก็บข้อมูลว่าพร็อพเพอร์ตี้ไหนที่หายไปด้วย

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

คลาส `PropertyRequiredError` ใช้งานง่ายมาก — แค่ส่งชื่อพร็อพเพอร์ตี้เข้าไป: `new PropertyRequiredError(property)` ส่วน `message` ที่อ่านรู้เรื่องนั้น คอนสตรักเตอร์สร้างให้เอง

สังเกตไหมว่า `this.name` ใน `PropertyRequiredError` ก็ต้องกำหนดเองเหมือนกัน? ทำแบบนี้ทุกคลาสก็น่าเบื่อเหมือนกันนะ — ต้องมานั่งเขียน `this.name = <ชื่อคลาส>` ทุกครั้ง แก้ได้ง่ายๆ โดยสร้างคลาส "base error" ของเราเอง ที่กำหนด `this.name = this.constructor.name` ให้อัตโนมัติ แล้วให้ error class อื่นๆ extend จากมันอีกที

ลองตั้งชื่อว่า `MyError` ดู

โค้ดที่ใช้ `MyError` เป็นฐาน จะกระชับขึ้นแบบนี้:

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

ตอนนี้ error class ที่สร้างเองสั้นลงมาก โดยเฉพาะ `ValidationError` ที่ไม่ต้องมีบรรทัด `"this.name = ..."` ในคอนสตรักเตอร์อีกแล้ว

## การห่อหุ้ม exception (Wrapping exceptions)

ฟังก์ชัน `readUser` ข้างบนมีหน้าที่ "อ่านข้อมูลผู้ใช้" ระหว่างทำงานอาจเจ๊งได้หลายแบบ ตอนนี้เรามี `SyntaxError` กับ `ValidationError` แต่อนาคตฟังก์ชันนี้อาจเพิ่มเข้ามาอีก

โค้ดที่เรียก `readUser` ต้องจัดการ error เหล่านี้ทั้งหมด ตอนนี้ใช้ `if` หลายตัวใน `catch` เพื่อเช็คทีละชนิด จัดการ error ที่รู้จัก ส่วนที่ไม่รู้จักก็โยนต่อ

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

ในโค้ดนี้มี error 2 ชนิด แต่จริงๆ อาจมีมากกว่านี้

ถ้า `readUser` ยิง error ออกมาหลายชนิด ถามว่าเราอยากมานั่งเช็คทีละชนิดทุกครั้งจริงหรือเปล่า?

ส่วนใหญ่คำตอบคือ "ไม่" — เราแค่อยากรู้ว่า "อ่านข้อมูลเจ๊ง" ส่วนรายละเอียดว่าเจ๊งเพราะอะไรนั้น ดูจาก error message ได้ หรือถ้าอยากรู้ลึกก็ค่อยเจาะเข้าไปดูทีหลัง

เทคนิคนี้เรียกว่า "การห่อหุ้ม exception" (wrapping exceptions)

1. สร้างคลาส `ReadError` ขึ้นมาเป็นตัวแทนของ error ทุกชนิดที่เกี่ยวกับ "การอ่านข้อมูล"
2. ฟังก์ชัน `readUser` จะจับ error ที่เกิดภายใน (ทั้ง `ValidationError` และ `SyntaxError`) แล้วสร้าง `ReadError` ขึ้นมาแทน
3. ออบเจ็กต์ `ReadError` จะเก็บ error ต้นทางไว้ในพร็อพเพอร์ตี้ `cause`

โค้ดที่เรียก `readUser` ก็แค่เช็ค `ReadError` อย่างเดียว ไม่ต้องไล่เช็คทุกชนิดอีกต่อไป ถ้าต้องการรายละเอียดก็ดูจาก `cause` ได้เลย

มาดูโค้ดเต็มๆ กัน:

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

โค้ดนี้ `readUser` ทำตามที่อธิบายไว้ — จับ syntax error กับ validation error แล้ว throw เป็น `ReadError` แทน (error ที่ไม่รู้จักก็โยนต่อตามปกติ)

โค้ดข้างนอกก็แค่เช็ค `instanceof ReadError` อย่างเดียวเป็นอันจบ ไม่ต้องมาไล่เช็คทุกชนิดของ error อีก

ท่านี้เรียกว่า "การห่อหุ้ม exception" (wrapping exceptions) — เอา error ระดับล่างมา "ห่อ" ไว้ใน `ReadError` ที่เป็น error ระดับสูงกว่า เป็นเทคนิคที่ใช้กันเยอะมากใน object-oriented programming

## สรุป

- เราสร้าง error class เองได้โดย extend จาก `Error` หรือคลาส built-in error อื่นๆ แค่อย่าลืมตั้ง `name` และเรียก `super` ให้เรียบร้อย
- ใช้ `instanceof` เช็คชนิดของ error ได้ ใช้กับคลาสลูกก็ได้เหมือนกัน แต่บางทีได้ error จากไลบรารีภายนอก ไม่มีทางเข้าถึงคลาส — ก็เช็คจากพร็อพเพอร์ตี้ `name` แทนได้
- การห่อหุ้ม exception เป็นเทคนิคที่ใช้บ่อย — ฟังก์ชันจับ error ระดับล่าง แล้วสร้าง error ระดับสูงขึ้นมาแทน error ต้นทางจะเก็บไว้ในพร็อพเพอร์ตี้อย่าง `err.cause` แต่จะไม่เก็บก็ได้ ไม่ได้บังคับ
