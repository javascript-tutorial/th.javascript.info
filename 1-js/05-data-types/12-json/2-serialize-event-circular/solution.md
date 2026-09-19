
```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));

/* 
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

ในตัวอย่างนี้ เมื่อเรียก `replacer` ครั้งแรก `key` จะเป็นสตริง (string) ว่าง `""` และ `value` จะเป็นออบเจ็กต์ (object) `meetup` ทั้งตัว ครั้งนี้ต้องคืน `value` ตามเดิมเพื่อให้แปลงข้อมูลต่อได้ เงื่อนไข `key != ""` จึงมีไว้ยกเว้นการเรียกครั้งแรก ให้คืน `undefined` เฉพาะเมื่อพบพร็อพเพอร์ตี้ (property) ที่อ้างอิงกลับมาที่ `meetup` ในการเรียกครั้งถัดไป
