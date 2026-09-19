# เมธอด (method) ของ JSON และการใช้ toJSON

สมมติว่าเรามีออบเจ็กต์ (object) ที่ซับซ้อน และต้องการแปลงเป็นสตริง (string) เพื่อส่งผ่านเครือข่าย หรือบันทึกไว้ตรวจสอบการทำงาน สตริงที่ได้ควรมีข้อมูลจากพร็อพเพอร์ตี้ (property) สำคัญทั้งหมดของออบเจ็กต์นั้น

เราอาจเขียน `toString` เพื่อแปลงข้อมูลเองได้แบบนี้:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

แต่ระหว่างพัฒนา เราอาจเพิ่ม เปลี่ยนชื่อ หรือลบพร็อพเพอร์ตี้ ทำให้ต้องคอยแก้ `toString` ตามไปด้วย จะเปลี่ยนมาไล่อ่านพร็อพเพอร์ตี้ทีละตัวก็ได้ แต่ถ้ามีออบเจ็กต์ซ้อนอยู่ข้างใน เราก็ต้องเขียนวิธีแปลงออบเจ็กต์เหล่านั้นเพิ่มอีก

JavaScript มีวิธีจัดการเรื่องนี้อยู่แล้ว เราจึงไม่ต้องเขียนโค้ดแปลงข้อมูลทั้งหมดเอง

## JSON.stringify

[JSON](https://en.wikipedia.org/wiki/JSON) ย่อมาจาก JavaScript Object Notation เป็นรูปแบบสำหรับแทนค่าต่าง ๆ รวมถึงออบเจ็กต์ โดยมีคำอธิบายอยู่ในมาตรฐาน [RFC 4627](https://tools.ietf.org/html/rfc4627) แม้เดิมจะออกแบบมาเพื่อ JavaScript แต่ภาษาอื่น ๆ ก็มีไลบรารี (library) สำหรับจัดการ JSON เช่นกัน เราจึงใช้ JSON แลกเปลี่ยนข้อมูลระหว่างโปรแกรมต่างภาษาได้ เช่น ฝั่งไคลเอนต์ (client) ใช้ JavaScript ส่วนฝั่งเซิร์ฟเวอร์ (server) ใช้ Ruby, PHP หรือ Java

JavaScript มีเมธอดสำหรับแปลงข้อมูลไปและกลับดังนี้:

- `JSON.stringify` แปลงออบเจ็กต์เป็นสตริง JSON
- `JSON.parse` แปลงสตริง JSON กลับเป็นออบเจ็กต์

ลองดูตัวอย่างกับข้อมูลนักเรียน:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // เราได้สตริงแล้ว!

alert(json);
*!*
/* ออบเจ็กต์ที่เข้ารหัสเป็น JSON:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

`JSON.stringify(student)` รับออบเจ็กต์แล้วแปลงเป็นสตริง

เมื่อแปลงออบเจ็กต์เป็นสตริงแบบนี้แล้ว เราก็ส่งผ่านเครือข่ายหรือนำไปเก็บไว้ได้ คำที่ใช้เรียกออบเจ็กต์ในรูปแบบนี้มีหลายคำ ได้แก่ *JSON-encoded*, *serialized*, *stringified* และ *marshalled* ซึ่งในที่นี้ล้วนหมายถึงออบเจ็กต์ที่แปลงเป็นข้อความเรียบร้อยแล้ว

รูปแบบ JSON ต่างจากการเขียนออบเจ็กต์ลงในโค้ดโดยตรง หรือที่เรียกว่า object literal อยู่สองจุดสำคัญ:

- สตริงต้องครอบด้วยเครื่องหมายคำพูดคู่ ใช้เครื่องหมายคำพูดเดี่ยวหรือ backtick ครอบสตริงไม่ได้ ดังนั้น `'John'` จึงกลายเป็น `"John"`
- ชื่อพร็อพเพอร์ตี้ต้องครอบด้วยเครื่องหมายคำพูดคู่เช่นกัน ดังนั้น `age:30` จึงกลายเป็น `"age":30`

นอกจากออบเจ็กต์แล้ว `JSON.stringify` ยังใช้กับค่าพื้นฐาน (primitive) ได้ด้วย

JSON รองรับชนิดข้อมูลดังนี้:

- ออบเจ็กต์ `{ ... }`
- อาร์เรย์ (array) `[ ... ]`
- ค่าพื้นฐาน:
    - สตริง
    - ตัวเลข (number)
    - บูลีน (boolean) `true/false`
    - `null`

ตัวอย่าง:

```js run
// ตัวเลขใน JSON ก็คือตัวเลขธรรมดา
alert( JSON.stringify(1) ) // 1

// สตริงใน JSON ยังคงเป็นสตริง แต่ใส่เครื่องหมายคำพูดคู่
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

ผลจาก `JSON.stringify` ทั้งสี่ครั้งนี้เป็นสตริง แม้ `alert` จะแสดง `1` หรือ `true` ให้เห็นเหมือนตอนแสดงตัวเลขหรือบูลีนก็ตาม

JSON เป็นรูปแบบที่ใช้เก็บข้อมูลและไม่ผูกกับภาษาโปรแกรมใดภาษาหนึ่ง จึงมีพร็อพเพอร์ตี้บางแบบของ JavaScript ที่ `JSON.stringify` จะข้ามไป

พร็อพเพอร์ตี้ที่ถูกข้าม ได้แก่:

- พร็อพเพอร์ตี้ที่เก็บฟังก์ชัน (function) หรือก็คือเมธอด
- พร็อพเพอร์ตี้ที่มีคีย์ (key) หรือค่าเป็น `Symbol`
- พร็อพเพอร์ตี้ที่เก็บค่า `undefined`

```js run
let user = {
  sayHi() { // ถูกข้าม
    alert("Hello");
  },
  [Symbol("id")]: 123, // ถูกข้าม
  something: undefined // ถูกข้าม
};

alert( JSON.stringify(user) ); // {} (ออบเจ็กต์ว่างเปล่า)
```

ส่วนใหญ่พฤติกรรมนี้ตรงกับที่เราต้องการอยู่แล้ว แต่ถ้าต้องการแปลงข้อมูลด้วยวิธีอื่น เราจะได้ดูวิธีกันในหัวข้อถัดไป

ถ้ามีออบเจ็กต์ซ้อนอยู่ข้างใน `JSON.stringify` ก็จะแปลงออบเจ็กต์เหล่านั้นให้ด้วย

ตัวอย่าง:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* โครงสร้างทั้งหมดถูกแปลงเป็น string:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]}
}
*/
```

ข้อจำกัดของการแปลงแบบนี้คือ ออบเจ็กต์ที่จะแปลงต้องไม่มีการอ้างอิงวนกลับ (circular reference) เช่น ออบเจ็กต์สองตัวอ้างอิงถึงกันจนวนกลับมาที่เดิม

ตัวอย่าง:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup อ้างอิงถึง room
room.occupiedBy = meetup; // room อ้างอิงถึง meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

ตัวอย่างนี้แปลงเป็น JSON ไม่ได้ เพราะ `meetup.place` อ้างอิงถึง `room` และ `room.occupiedBy` ก็อ้างอิงกลับมาที่ `meetup` ถ้าไล่ตามการอ้างอิงไปเรื่อย ๆ ก็จะวนกลับมาที่ออบเจ็กต์เดิม ดังภาพ:

![](json-meetup.svg)


## การกรองและแปลงค่าด้วย replacer

รูปแบบการเรียก `JSON.stringify` แบบเต็มคือ:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: ค่าที่ต้องการแปลงเป็น JSON

replacer
: อาร์เรย์ของชื่อพร็อพเพอร์ตี้ที่ต้องการเก็บไว้ใน JSON หรือฟังก์ชัน `function(key, value)` ที่กำหนดว่าจะแปลงแต่ละค่าอย่างไร

space
: จำนวนช่องว่างที่ใช้เยื้องข้อความให้อ่านง่าย

โดยทั่วไป เราส่งอาร์กิวเมนต์ (argument) ให้ `JSON.stringify` เพียงตัวแรกก็พอ แต่ถ้าต้องการเลือกว่าจะเก็บหรือแปลงค่าใดบ้าง เช่น ตัดพร็อพเพอร์ตี้ที่ทำให้เกิดการอ้างอิงวนกลับ เราก็ส่ง `replacer` เป็นอาร์กิวเมนต์ตัวที่สองได้

ถ้า `replacer` เป็นอาร์เรย์ของชื่อพร็อพเพอร์ตี้ ผลลัพธ์จะมีเฉพาะพร็อพเพอร์ตี้ที่มีชื่ออยู่ในอาร์เรย์นั้น

ตัวอย่าง:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup อ้างอิงถึง room
};

room.occupiedBy = meetup; // room อ้างอิงถึง meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

ผลลัพธ์นี้เก็บข้อมูลไว้น้อยเกินไป เพราะรายการชื่อพร็อพเพอร์ตี้มีผลกับออบเจ็กต์ทุกชั้น รวมถึงออบเจ็กต์ใน `participants` ด้วย เมื่อไม่มี `name` อยู่ในรายการ ออบเจ็กต์เหล่านั้นจึงเหลือเพียง `{}`

ลองใส่ชื่อพร็อพเพอร์ตี้ที่ต้องการให้ครบ โดยเว้น `occupiedBy` ไว้ เพราะ `room.occupiedBy` ทำให้เกิดการอ้างอิงวนกลับ:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup อ้างอิงถึง room
};

room.occupiedBy = meetup; // room อ้างอิงถึง meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

คราวนี้เราได้ข้อมูลครบ ยกเว้น `occupiedBy` ที่ตั้งใจข้ามไป แต่ก็ต้องเขียนรายการชื่อพร็อพเพอร์ตี้ค่อนข้างยาว

อีกวิธีหนึ่งคือส่งฟังก์ชันเป็น `replacer` แทนอาร์เรย์

`JSON.stringify` จะเรียกฟังก์ชันนี้โดยส่ง `(key, value)` ให้ทีละคู่ สำหรับพร็อพเพอร์ตี้แต่ละตัว `key` คือชื่อ และ `value` คือค่าของพร็อพเพอร์ตี้นั้น ค่าที่ฟังก์ชันคืนมาจะใช้แทนค่าเดิมในการแปลงเป็น JSON ถ้าต้องการข้ามพร็อพเพอร์ตี้นั้น ให้คืน `undefined`

ในตัวอย่างนี้ เราคืน `value` ตามเดิมทุกครั้ง ยกเว้นเมื่อ `key` เป็น `occupiedBy` จึงคืน `undefined` เพื่อข้ามพร็อพเพอร์ตี้นั้น:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup อ้างอิงถึง room
};

room.occupiedBy = meetup; // room อ้างอิงถึง meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* คู่ key:value ที่ส่งให้ replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

สังเกตว่า `replacer` ได้รับคู่ `key` และ `value` ของพร็อพเพอร์ตี้ที่กำลังแปลง รวมถึงพร็อพเพอร์ตี้ในออบเจ็กต์ที่ซ้อนอยู่และสมาชิกในอาร์เรย์ด้วย โดยไล่ลงไปในโครงสร้างทีละชั้น ส่วน `this` ภายใน `replacer` คือออบเจ็กต์ที่มีพร็อพเพอร์ตี้ซึ่งกำลังแปลงอยู่

ก่อนเริ่มแปลงพร็อพเพอร์ตี้ JavaScript จะเรียก `replacer` กับออบเจ็กต์ทั้งตัวก่อน โดยสร้างออบเจ็กต์มาห่อค่าที่ต้องการแปลงไว้อีกชั้น เรียกว่า wrapper object ซึ่งในตัวอย่างนี้มีหน้าตาเป็น `{"": meetup}` คู่ `(key, value)` แรกจึงมี `key` เป็นสตริงว่าง และ `value` เป็นออบเจ็กต์ `meetup` ทั้งตัว บรรทัดแรกจึงแสดง `: [object Object]` โดยไม่มีชื่อคีย์อยู่หน้า `:`

เมื่อ `replacer` ได้รับออบเจ็กต์ทั้งตัวตั้งแต่การเรียกครั้งแรก เราจึงเขียนให้ฟังก์ชันตรวจสอบ แทนที่ หรือข้ามออบเจ็กต์ทั้งตัวได้ด้วย


## การจัดรูปแบบด้วย space

อาร์กิวเมนต์ตัวที่สามของ `JSON.stringify(value, replacer, space)` ใช้กำหนดจำนวนช่องว่างสำหรับเยื้องข้อความให้อ่านง่าย

ตัวอย่างที่ผ่านมาจะได้สตริงที่ไม่มีการเยื้องหรือเติมช่องว่าง ซึ่งเหมาะกับการส่งข้อมูลผ่านเครือข่ายอยู่แล้ว แต่ถ้าต้องการแสดงผลให้อ่านง่ายขึ้น เราใช้ `space` ช่วยจัดรูปแบบได้

เช่น เมื่อกำหนด `space = 2` ผลลัพธ์จะแบ่งเป็นหลายบรรทัด และเยื้องเพิ่มครั้งละ 2 ช่องว่างเมื่อเข้าไปในออบเจ็กต์แต่ละชั้น:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* เยื้องด้วย 2 space:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* สำหรับ JSON.stringify(user, null, 4) ผลลัพธ์จะเยื้องมากกว่า:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

เราส่งสตริงเป็นอาร์กิวเมนต์ตัวที่สามได้เช่นกัน ในกรณีนี้ JavaScript จะใช้สตริงนั้นเยื้องข้อความ แทนการใช้ช่องว่างตามจำนวนที่ระบุ

พารามิเตอร์ (parameter) `space` มีไว้จัดรูปแบบสำหรับบันทึกข้อมูลหรือแสดงผลให้อ่านง่าย

## กำหนดวิธีแปลงข้อมูลด้วย toJSON

เราเคยใช้ `toString` กำหนดวิธีแปลงออบเจ็กต์เป็นสตริงมาแล้ว ในทำนองเดียวกัน เราสร้างเมธอด `toJSON` เพื่อกำหนดค่าที่จะนำไปแปลงเป็น JSON ได้ ถ้าออบเจ็กต์มีเมธอดนี้ `JSON.stringify` จะเรียกให้โดยอัตโนมัติ

ตัวอย่าง:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

ตรง `(1)` ค่า `date` กลายเป็นสตริง เพราะออบเจ็กต์ `Date` มีเมธอด `toJSON` ที่คืนค่าสตริงวันที่ในรูปแบบนี้อยู่แล้ว

ทีนี้ลองเพิ่ม `toJSON` ให้ `room` ตรง `(2)` เพื่อกำหนดค่าที่จะใช้แทนออบเจ็กต์นี้บ้าง:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

`toJSON` ทำงานทั้งเมื่อส่ง `room` ให้ `JSON.stringify(room)` โดยตรง และเมื่อ `room` ซ้อนอยู่ในออบเจ็กต์อื่น ในตัวอย่างนี้ `toJSON` คืนค่า `this.number` จึงได้ค่า `23` แทนออบเจ็กต์ `room` ทั้งสองกรณี


## JSON.parse

ถ้าต้องการอ่านสตริง JSON กลับมาเป็นค่าใน JavaScript ให้ใช้เมธอด [JSON.parse](mdn:js/JSON/parse)

รูปแบบการเรียกใช้:
```js
let value = JSON.parse(str[, reviver]);
```

str
: สตริง JSON ที่ต้องการอ่านกลับมาเป็นค่า

reviver
: ฟังก์ชัน `function(key, value)` สำหรับแปลงค่าที่อ่านได้ โดยจะได้รับ `(key, value)` ทีละคู่ จะส่งฟังก์ชันนี้มาด้วยหรือไม่ก็ได้

ตัวอย่าง:

```js run
// อาร์เรย์ที่ถูก stringify
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

ตัวอย่างที่มีอาร์เรย์ซ้อนอยู่ในออบเจ็กต์:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

JSON ใช้แทนข้อมูลที่ซับซ้อนได้ โดยซ้อนออบเจ็กต์และอาร์เรย์ไว้ข้างในออบเจ็กต์หรืออาร์เรย์อีกที แต่ทุกส่วนยังต้องเขียนตามกฎของ JSON

บางครั้งเราอาจต้องเขียน JSON เองระหว่างหาข้อผิดพลาดในโปรแกรม แทนการให้ `JSON.stringify` สร้างให้ ข้อผิดพลาดที่พบบ่อยมีดังนี้:

```js
let json = `{
  *!*name*/!*: "John",                     // ข้อผิดพลาด: ชื่อพร็อพเพอร์ตี้ไม่มีเครื่องหมายคำพูด
  "surname": *!*'Smith'*/!*,               // ข้อผิดพลาด: ใช้คำพูดเดี่ยวสำหรับค่า (ต้องใช้คู่)
  *!*'isAdmin'*/!*: false                  // ข้อผิดพลาด: ใช้คำพูดเดี่ยวสำหรับ key (ต้องใช้คู่)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // ข้อผิดพลาด: ใช้ "new" ไม่ได้ ต้องเขียนค่าลงไปโดยตรง
  "friends": [0,1,2,3]              // ตรงนี้ถูกต้อง
}`;
```

JSON ไม่อนุญาตให้ใส่คอมเมนต์ (comment) ด้วย ถ้าใส่คอมเมนต์ลงในข้อความ JSON ข้อความนั้นก็จะอ่านด้วย `JSON.parse` ไม่ได้

มีอีกรูปแบบหนึ่งชื่อ [JSON5](https://json5.org/) ที่อนุญาตให้เขียนชื่อคีย์โดยไม่ครอบด้วยเครื่องหมายคำพูด ใส่คอมเมนต์ และเขียนในรูปแบบอื่น ๆ ได้มากขึ้น แต่ต้องใช้ไลบรารีแยกต่างหาก ความสามารถเหล่านี้ไม่ได้เป็นส่วนหนึ่งของ JSON มาตรฐาน

JSON ใช้กฎที่ตายตัว เพื่อให้พัฒนาโปรแกรมอ่านข้อมูลที่เรียบง่าย เชื่อถือได้ และทำงานได้รวดเร็ว

## การใช้ reviver

สมมติว่าเราได้รับข้อมูล `meetup` จากเซิร์ฟเวอร์ โดยข้อมูลนั้นถูกแปลงเป็นสตริง JSON มาแล้ว

ข้อมูลหน้าตาแบบนี้:

```js
// title: (ชื่อการประชุม), date: (วันที่ประชุม)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

เราต้องการแปลงสตริงนี้กลับมาเป็นออบเจ็กต์ JavaScript กระบวนการนี้เรียกว่า *deserialize*

ลองเรียก `JSON.parse` ดู:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // เกิดข้อผิดพลาด!
*/!*
```

โค้ดนี้เกิดข้อผิดพลาด เพราะ `meetup.date` ยังเป็นสตริง จึงเรียก `getDate()` ไม่ได้ `JSON.parse` ไม่รู้ว่าเราต้องการให้สตริงวันที่นี้กลายเป็นออบเจ็กต์ `Date`

เราแก้ได้ด้วยการส่งฟังก์ชัน `reviver` เป็นอาร์กิวเมนต์ตัวที่สองของ `JSON.parse` ให้ฟังก์ชันคืนค่าเดิมทุกครั้ง ยกเว้นเมื่อ `key` เป็น `date` จึงแปลงค่านั้นเป็นออบเจ็กต์ `Date` ก่อนคืนค่า:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // ทำงานได้แล้ว!
```

`reviver` ทำงานกับค่าที่ซ้อนอยู่ข้างในด้วย ตัวอย่างนี้จึงแปลง `date` ของแต่ละออบเจ็กต์ในอาร์เรย์ `meetups` เป็น `Date` ได้เช่นกัน:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // ทำงานได้!
*/!*
```



## สรุป

- JSON เป็นรูปแบบข้อมูลที่มีมาตรฐานของตัวเอง และมีไลบรารีรองรับในภาษาโปรแกรมส่วนใหญ่
- JSON รองรับออบเจ็กต์ธรรมดา อาร์เรย์ สตริง ตัวเลข บูลีน และ `null`
- JavaScript มีเมธอด [JSON.stringify](mdn:js/JSON/stringify) สำหรับแปลงค่าเป็นสตริง JSON และ [JSON.parse](mdn:js/JSON/parse) สำหรับอ่านสตริง JSON กลับมาเป็นค่า
- ทั้งสองเมธอดรับฟังก์ชันสำหรับปรับวิธีแปลงค่าได้ โดยใช้ `replacer` กับ `JSON.stringify` และใช้ `reviver` กับ `JSON.parse`
- ถ้าออบเจ็กต์มีเมธอด `toJSON` อยู่ `JSON.stringify` จะเรียกเมธอดนั้นโดยอัตโนมัติ
