importance: 5

---

# สืบทอดจาก SyntaxError

สร้างคลาส `FormatError` ที่สืบทอดมาจากคลาส `SyntaxError` ซึ่งเป็นคลาส built-in

คลาสนี้ต้องรองรับพร็อพเพอร์ตี้ `message`, `name` และ `stack`

ตัวอย่างการใช้งาน:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (เพราะสืบทอดจาก SyntaxError)
```
