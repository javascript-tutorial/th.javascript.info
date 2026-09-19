importance: 5

---

# เรียงลำดับตามพร็อพเพอร์ตี้ (property)

เราต้องการเรียงลำดับออบเจ็กต์ (object) ในอาร์เรย์ (array) ต่อไปนี้:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

ปกติเราเขียนฟังก์ชัน (function) เปรียบเทียบค่าให้ `sort` ได้แบบนี้:

```js
// เรียงตามชื่อ (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// เรียงตามอายุ (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

ถ้าอยากเขียนให้สั้นลงเป็นแบบนี้ล่ะ?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

ให้เขียนฟังก์ชัน `byField` เพื่อให้เราใช้ `byField(fieldName)` แทนการเขียนฟังก์ชันเปรียบเทียบเองทุกครั้งได้ โดย `fieldName` คือชื่อพร็อพเพอร์ตี้ที่ต้องการใช้เรียงลำดับ เช่น `name` หรือ `age`
