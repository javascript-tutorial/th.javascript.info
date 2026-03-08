importance: 5

---

# เรียงลำดับตามฟิลด์

เรามีอาร์เรย์ของออบเจ็กต์ที่ต้องการเรียงลำดับ:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

วิธีปกติที่ทำกันคือ:

```js
// เรียงตามชื่อ (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// เรียงตามอายุ (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

จะทำให้กระชับกว่านี้ได้ไหม แบบนี้?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

คือแทนที่จะเขียนฟังก์ชันเอง แค่ใส่ `byField(fieldName)` ไปเลย

จงเขียนฟังก์ชัน `byField` ที่ใช้แบบนี้ได้
