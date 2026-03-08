importance: 5

---

# Partial application สำหรับ login

โจทย์นี้เป็นเวอร์ชันที่ซับซ้อนขึ้นจาก <info:task/question-use-bind>

ออบเจ็กต์ `user` ถูกแก้ไข ตอนนี้แทนที่จะมีสองฟังก์ชัน `loginOk/loginFail` กลับมีฟังก์ชันเดียวคือ `user.login(true/false)`

เราควรส่งอะไรให้ `askPassword` ในโค้ดด้านล่าง เพื่อให้เรียก `user.login(true)` เมื่อรหัสถูก และ `user.login(false)` เมื่อรหัสผิด?

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

ให้แก้เฉพาะส่วนที่ไฮไลต์เท่านั้น

