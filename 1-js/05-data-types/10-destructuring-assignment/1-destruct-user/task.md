importance: 5

---

# แยกค่าด้วย destructuring assignment

กำหนดออบเจ็กต์ (object) ให้ดังนี้:

```js
let user = {
  name: "John",
  years: 30
};
```

เขียน destructuring assignment เพื่ออ่านค่าจากพร็อพเพอร์ตี้ (property) มาใส่ตัวแปร (variable) ตามเงื่อนไขต่อไปนี้:

- นำค่าของ `name` มาใส่ตัวแปร `name`
- นำค่าของ `years` มาใส่ตัวแปร `age`
- นำค่าของ `isAdmin` มาใส่ตัวแปร `isAdmin` ถ้าไม่มีพร็อพเพอร์ตี้นี้ ให้ใช้ค่า `false`

เมื่อกำหนดค่าแล้ว ตัวแปรควรมีค่าตามตัวอย่างนี้:

```js
let user = { name: "John", years: 30 };

// เขียนโค้ดของคุณทางซ้ายของเครื่องหมายเท่ากับ:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
