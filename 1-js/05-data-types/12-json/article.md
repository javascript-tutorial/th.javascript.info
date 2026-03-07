# เมธอด JSON และ toJSON

สมมติว่าเรามีออบเจ็กต์ที่ซับซ้อนและต้องการแปลงเป็นสตริง เพื่อส่งผ่านเครือข่ายหรือเพื่อ log ข้อมูล

แน่นอนว่าสตริงนั้นควรรวมพร็อพเพอร์ตี้ที่สำคัญทั้งหมดไว้ด้วย

เราอาจทำการแปลงแบบนี้:

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

...แต่ระหว่างพัฒนา อาจมีการเพิ่มพร็อพเพอร์ตี้ใหม่ เปลี่ยนชื่อ หรือลบพร็อพเพอร์ตี้เก่าออก การอัปเดต `toString` ทุกครั้งอาจกลายเป็นเรื่องยุ่งยาก เราอาจลองวนลูปผ่านพร็อพเพอร์ตี้ แต่ถ้าออบเจ็กต์ซับซ้อนและมีออบเจ็กต์ซ้อนอยู่ข้างใน ก็ต้องแปลงออบเจ็กต์เหล่านั้นด้วย

โชคดีที่ไม่จำเป็นต้องเขียนโค้ดจัดการทั้งหมดนี้เอง เพราะมีวิธีที่แก้ปัญหานี้ไว้แล้ว

## JSON.stringify

[JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) เป็นรูปแบบทั่วไปสำหรับแสดงค่าและออบเจ็กต์ ถูกกำหนดไว้ในมาตรฐาน [RFC 4627](https://tools.ietf.org/html/rfc4627) เดิมทีสร้างขึ้นสำหรับ JavaScript แต่ภาษาอื่นๆ อีกมากก็มีไลบรารีรองรับ JSON ด้วย ทำให้ใช้ JSON แลกเปลี่ยนข้อมูลได้ง่าย เมื่อฝั่ง client ใช้ JavaScript และ server เขียนด้วย Ruby/PHP/Java หรืออะไรก็ตาม

JavaScript มีเมธอดสำหรับจัดการ:

- `JSON.stringify` — แปลงออบเจ็กต์เป็น JSON
- `JSON.parse` — แปลง JSON กลับเป็นออบเจ็กต์

ลองดูตัวอย่างการใช้ `JSON.stringify` กับข้อมูลนักเรียน:
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

เมธอด `JSON.stringify(student)` รับออบเจ็กต์แล้วแปลงเป็นสตริง

สตริง `json` ที่ได้นี้เรียกว่าออบเจ็กต์ที่ถูก *JSON-encoded* หรือ *serialized* หรือ *stringified* หรือ *marshalled* และพร้อมส่งผ่านเครือข่ายหรือเก็บไว้ใน data store ทั่วไปแล้ว


สิ่งสำคัญคือ ออบเจ็กต์ที่ถูก JSON-encoded มีความแตกต่างจาก object literal ทั่วไปหลายอย่าง:

- สตริงใช้เครื่องหมายคำพูดคู่ ใน JSON ไม่มีคำพูดเดี่ยวหรือ backtick ดังนั้น `'John'` จะกลายเป็น `"John"`
- ชื่อพร็อพเพอร์ตี้ก็ใส่เครื่องหมายคำพูดคู่ด้วย นั่นเป็นกฎบังคับ ดังนั้น `age:30` จะกลายเป็น `"age":30`

`JSON.stringify` ยังใช้กับค่า primitive ได้ด้วย

JSON รองรับชนิดข้อมูลดังนี้:

- ออบเจ็กต์ `{ ... }`
- อาร์เรย์ `[ ... ]`
- Primitive:
    - สตริง,
    - ตัวเลข,
    - บูลีน `true/false`,
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

JSON เป็นสเปซิฟิเคชันที่เป็นอิสระจากภาษาโปรแกรมและเก็บได้แต่ข้อมูล ดังนั้น `JSON.stringify` จะข้ามพร็อพเพอร์ตี้บางอย่างที่เป็น JavaScript เฉพาะ

โดยเฉพาะ:

- พร็อพเพอร์ตี้ที่เป็นฟังก์ชัน (เมธอด)
- คีย์และค่าที่เป็น Symbol
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

ส่วนใหญ่แล้วก็ไม่มีปัญหา แต่ถ้าไม่ต้องการแบบนี้ เดี๋ยวเราจะดูวิธีปรับแต่งกระบวนการนี้

สิ่งที่ดีคือออบเจ็กต์ที่ซ้อนกันก็รองรับและแปลงโดยอัตโนมัติ

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
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

ข้อจำกัดสำคัญคือต้องไม่มี circular reference

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

การแปลงล้มเหลวเพราะมี circular reference: `room.occupiedBy` อ้างอิง `meetup` และ `meetup.place` อ้างอิง `room`:

![](json-meetup.svg)


## การกรองและแปลงค่า: replacer

ไวยากรณ์เต็มของ `JSON.stringify` คือ:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: ค่าที่ต้องการเข้ารหัส

replacer
: อาร์เรย์ของพร็อพเพอร์ตี้ที่ต้องการเข้ารหัส หรือฟังก์ชัน `function(key, value)`

space
: จำนวน space สำหรับการจัดรูปแบบ

ส่วนใหญ่ `JSON.stringify` ใช้กับอาร์กิวเมนต์แรกเท่านั้น แต่ถ้าต้องการปรับแต่งกระบวนการแทนที่ เช่น กรอง circular reference ออก ก็ใช้อาร์กิวเมนต์ที่สองได้

ถ้าส่งอาร์เรย์ของพร็อพเพอร์ตี้เข้าไป จะเข้ารหัสเฉพาะพร็อพเพอร์ตี้เหล่านั้น

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

ดูเหมือนจะเข้มงวดเกินไปหน่อย เพราะรายการพร็อพเพอร์ตี้นี้ถูกนำไปใช้กับโครงสร้างออบเจ็กต์ทั้งหมด ทำให้ออบเจ็กต์ใน `participants` ว่างเปล่า เนื่องจาก `name` ไม่อยู่ในรายการ

มาใส่พร็อพเพอร์ตี้ทุกตัวยกเว้น `room.occupiedBy` ที่จะทำให้เกิด circular reference:

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

ตอนนี้ทุกอย่างยกเว้น `occupiedBy` ถูก serialize แล้ว แต่รายการพร็อพเพอร์ตี้ค่อนข้างยาว

โชคดีที่เราใช้ฟังก์ชันแทนอาร์เรย์เป็น `replacer` ได้

ฟังก์ชันนี้จะถูกเรียกสำหรับทุกคู่ `(key, value)` และควรคืนค่าที่ "แทนที่" ซึ่งจะถูกใช้แทนค่าเดิม หรือคืน `undefined` ถ้าต้องการข้ามค่านั้น

ในกรณีของเรา เราคืน `value` "ตามเดิม" สำหรับทุกอย่างยกเว้น `occupiedBy` และส่ง `undefined` เพื่อข้ามมัน:

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

สังเกตว่าฟังก์ชัน `replacer` ได้รับทุกคู่ key/value รวมถึงออบเจ็กต์ที่ซ้อนกันและรายการในอาร์เรย์ด้วย โดยทำงานแบบ recursive และค่าของ `this` ภายใน `replacer` คือออบเจ็กต์ที่มีพร็อพเพอร์ตี้ปัจจุบันอยู่

การเรียกครั้งแรกพิเศษเป็น เพราะใช้ "wrapper object" พิเศษ: `{"": meetup}` กล่าวอีกอย่างคือ คู่ `(key, value)` แรกมี key ว่างเปล่า และ value คือออบเจ็กต์เป้าหมายทั้งหมด นั่นเป็นเหตุผลที่บรรทัดแรกในตัวอย่างข้างต้นเป็น `":[object Object]"`

แนวคิดคือเพื่อให้ `replacer` มีพลังมากที่สุดเท่าที่จะเป็นไปได้ โดยมีโอกาสวิเคราะห์และแทนที่หรือข้ามแม้แต่ออบเจ็กต์ทั้งหมดหากจำเป็น


## การจัดรูปแบบ: space

อาร์กิวเมนต์ที่สามของ `JSON.stringify(value, replacer, space)` คือจำนวน space สำหรับการจัดรูปแบบที่อ่านง่าย

ก่อนหน้านี้ ออบเจ็กต์ที่ stringify แล้วทั้งหมดไม่มีการเยื้องหรือ space เพิ่มเติม ซึ่งก็เพียงพอถ้าต้องการส่งออบเจ็กต์ผ่านเครือข่าย แต่อาร์กิวเมนต์ `space` ใช้สำหรับแสดงผลให้อ่านง่ายขึ้นเท่านั้น

ตรงนี้ `space = 2` บอกให้ JavaScript แสดงออบเจ็กต์ที่ซ้อนกันบนหลายบรรทัด โดยเยื้อง 2 space ข้างใน:

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

อาร์กิวเมนต์ที่สามยังเป็นสตริงได้ด้วย ในกรณีนั้นสตริงจะถูกใช้แทนจำนวน space สำหรับการเยื้อง

พารามิเตอร์ `space` ใช้เพื่อการ log และแสดงผลที่อ่านง่ายเท่านั้น

## toJSON แบบกำหนดเอง

เหมือนกับ `toString` สำหรับการแปลงเป็นสตริง ออบเจ็กต์อาจมีเมธอด `toJSON` สำหรับการแปลงเป็น JSON ซึ่ง `JSON.stringify` จะเรียกโดยอัตโนมัติถ้ามีอยู่

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

จะเห็นว่า `date` `(1)` กลายเป็นสตริง เพราะออบเจ็กต์ Date ทั้งหมดมีเมธอด `toJSON` ในตัวที่คืนค่าสตริงในรูปแบบนั้น

ทีนี้มาเพิ่ม `toJSON` แบบกำหนดเองให้ออบเจ็กต์ `room` `(2)`:

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

จะเห็นว่า `toJSON` ถูกใช้ทั้งกับการเรียกโดยตรง `JSON.stringify(room)` และเมื่อ `room` ซ้อนอยู่ในออบเจ็กต์ที่เข้ารหัสอื่น


## JSON.parse

ในการ decode สตริง JSON เราต้องใช้เมธอด [JSON.parse](mdn:js/JSON/parse)

ไวยากรณ์:
```js
let value = JSON.parse(str[, reviver]);
```

str
: สตริง JSON ที่ต้องการ parse

reviver
: ฟังก์ชัน function(key,value) ที่ไม่บังคับ จะถูกเรียกสำหรับทุกคู่ `(key, value)` และสามารถแปลงค่าได้

ตัวอย่าง:

```js run
// อาร์เรย์ที่ถูก stringify
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

หรือสำหรับออบเจ็กต์ที่ซ้อนกัน:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

JSON อาจซับซ้อนแค่ไหนก็ได้ ออบเจ็กต์และอาร์เรย์สามารถมีออบเจ็กต์และอาร์เรย์อื่นซ้อนอยู่ได้ แต่ต้องเป็นไปตามรูปแบบ JSON เดียวกัน

นี่คือข้อผิดพลาดที่พบบ่อยใน JSON ที่เขียนด้วยมือ (บางครั้งต้องเขียนเองเพื่อ debug):

```js
let json = `{
  *!*name*/!*: "John",                     // ข้อผิดพลาด: ชื่อพร็อพเพอร์ตี้ไม่มีเครื่องหมายคำพูด
  "surname": *!*'Smith'*/!*,               // ข้อผิดพลาด: ใช้คำพูดเดี่ยวสำหรับค่า (ต้องใช้คู่)
  *!*'isAdmin'*/!*: false                  // ข้อผิดพลาด: ใช้คำพูดเดี่ยวสำหรับ key (ต้องใช้คู่)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // ข้อผิดพลาด: ไม่อนุญาต "new" ใช้ได้แค่ค่าพื้นฐาน
  "friends": [0,1,2,3]              // ตรงนี้ถูกต้อง
}`;
```

นอกจากนี้ JSON ไม่รองรับ comment ถ้าใส่ comment ใน JSON จะทำให้ไม่ valid

มีรูปแบบอื่นชื่อ [JSON5](https://json5.org/) ที่อนุญาต unquoted keys, comment ฯลฯ แต่เป็น library แยกต่างหาก ไม่ได้อยู่ในสเปซิฟิเคชันของภาษา

JSON ที่ใช้กันทั่วไปเข้มงวดขนาดนี้ ไม่ใช่เพราะผู้พัฒนาขี้เกียจ แต่เพื่อให้สามารถสร้างอัลกอริทึม parsing ที่ง่าย เชื่อถือได้ และรวดเร็วมาก

## การใช้ reviver

สมมติว่าเราได้รับออบเจ็กต์ `meetup` ที่ถูก stringify มาจาก server

ข้อมูลนั้นมีหน้าตาแบบนี้:

```js
// title: (ชื่อการประชุม), date: (วันที่ประชุม)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...และตอนนี้เราต้องการ *deserialize* มัน เพื่อแปลงกลับเป็นออบเจ็กต์ JavaScript

มาทำด้วยการเรียก `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // เกิดข้อผิดพลาด!
*/!*
```

อุ๊ย! เกิดข้อผิดพลาด!

ค่าของ `meetup.date` เป็นสตริง ไม่ใช่ออบเจ็กต์ `Date` แล้ว `JSON.parse` จะรู้ได้อย่างไรว่าควรแปลงสตริงนั้นเป็น `Date`?

มาส่งฟังก์ชัน reviving ให้กับ `JSON.parse` เป็นอาร์กิวเมนต์ที่สอง โดยคืนค่าทุกอย่าง "ตามเดิม" ยกเว้น `date` จะกลายเป็น `Date`:

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

อนึ่ง วิธีนี้ใช้ได้กับออบเจ็กต์ที่ซ้อนกันด้วย:

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

- JSON เป็นรูปแบบข้อมูลที่มีมาตรฐานเป็นของตัวเองและมีไลบรารีรองรับในภาษาโปรแกรมส่วนใหญ่
- JSON รองรับออบเจ็กต์ธรรมดา อาร์เรย์ สตริง ตัวเลข บูลีน และ `null`
- JavaScript มีเมธอด [JSON.stringify](mdn:js/JSON/stringify) สำหรับ serialize เป็น JSON และ [JSON.parse](mdn:js/JSON/parse) สำหรับอ่านจาก JSON
- ทั้งสองเมธอดรองรับฟังก์ชัน transformer สำหรับการอ่าน/เขียนอย่างชาญฉลาด
- ถ้าออบเจ็กต์มี `toJSON` จะถูกเรียกโดย `JSON.stringify`
