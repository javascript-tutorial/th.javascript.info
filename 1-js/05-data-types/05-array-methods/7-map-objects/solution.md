
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

สังเกตว่า arrow function ตรงนี้ต้องมีวงเล็บเพิ่มอีกชั้น

เขียนแบบนี้ไม่ได้:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

arrow function เขียนได้สองแบบ คือแบบไม่มีบล็อกคำสั่ง `value => expr` และแบบมีบล็อกคำสั่ง `value => {...}`

ในโค้ดข้างบน JavaScript จะมอง `{` ว่าเป็นจุดเริ่มต้นของบล็อกคำสั่งในฟังก์ชัน ไม่ใช่จุดเริ่มต้นของออบเจ็กต์ วิธีแก้คือครอบออบเจ็กต์ด้วยวงเล็บกลม:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

เท่านี้ JavaScript ก็รู้แล้วว่าเราต้องการคืนออบเจ็กต์
