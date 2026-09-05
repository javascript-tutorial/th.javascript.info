
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

สังเกตว่า arrow function ในตัวอย่างนี้ใช้วงเล็บ `()` ครอบออบเจ็กต์ (object) ที่จะคืนค่า

ถ้าเขียนแบบนี้จะใช้ไม่ได้:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

arrow function เขียนได้สองรูปแบบ คือแบบที่ตามด้วยนิพจน์ (expression) `value => expr` และแบบที่มีบล็อก (block) คำสั่ง `value => {...}`

ในโค้ดข้างบน JavaScript จะมอง `{` หลัง `=>` ว่าเป็นจุดเริ่มต้นของบล็อกคำสั่ง หากต้องการคืนค่าออบเจ็กต์จึงต้องใช้วงเล็บ `()` ครอบไว้:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

เมื่อครอบด้วยวงเล็บแล้ว JavaScript จะอ่านส่วนนี้เป็นนิพจน์ออบเจ็กต์และคืนค่าได้ตามต้องการ
