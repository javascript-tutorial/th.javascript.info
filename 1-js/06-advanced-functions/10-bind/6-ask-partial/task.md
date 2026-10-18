importance: 5

---

# Partial application สำหรับ login

โจทย์นี้ต่อยอดจาก <info:task/question-use-bind>

คราวนี้ออบเจ็กต์ (object) `user` มีเมธอด (method) `login` เพียงตัวเดียวแทน `loginOk` และ `loginFail` โดยเรียกเป็น `user.login(true)` หรือ `user.login(false)` ตามผลการตรวจรหัสผ่าน

เราควรส่งค่าอะไรให้ `askPassword` เพื่อให้คอลแบ็ก (callback) `ok` เรียก `user.login(true)` เมื่อรหัสผ่านถูกต้อง และคอลแบ็ก `fail` เรียก `user.login(false)` เมื่อไม่ถูกต้อง?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

ให้แก้เฉพาะส่วนที่เน้นไว้เท่านั้น

