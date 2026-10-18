importance: 5

---

# แก้ this ที่หายไป

ฟังก์ชัน (function) `askPassword` ด้านล่างควรตรวจรหัสผ่าน แล้วเรียก `user.loginOk` เมื่อรหัสผ่านถูกต้อง หรือ `user.loginFail` เมื่อไม่ถูกต้อง

แต่เมื่อรันโค้ดกลับเกิดข้อผิดพลาด สาเหตุคืออะไร?

ให้แก้เฉพาะบรรทัดที่เน้นไว้ เพื่อให้โปรแกรมทำงานตามที่อธิบาย โดยห้ามแก้บรรทัดอื่น

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk, user.loginFail);
*/!*
```
