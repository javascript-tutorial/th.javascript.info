importance: 5

---

# แก้ฟังก์ชันที่ this หาย

การเรียก `askPassword()` ในโค้ดด้านล่างควรเช็ครหัสผ่าน แล้วเรียก `user.loginOk/loginFail` ตามผลลัพธ์

แต่กลับเกิดข้อผิดพลาด ทำไม?

ให้แก้บรรทัดที่ไฮไลต์ให้ทุกอย่างทำงานถูกต้อง (ห้ามแก้บรรทัดอื่น)

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
