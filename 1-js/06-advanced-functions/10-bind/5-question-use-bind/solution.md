
ที่เกิดข้อผิดพลาดเพราะ `askPassword` ได้รับฟังก์ชัน `loginOk/loginFail` ไปลอยๆ โดยไม่ได้ผูกกับออบเจ็กต์

พอเรียกฟังก์ชันเหล่านี้ `this` จึงกลายเป็น `undefined`

มาใช้ `bind` ผูก context กัน:

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
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

ทีนี้ก็ทำงานได้แล้ว

อีกวิธีหนึ่งคือใช้ arrow function:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

วิธีนี้ก็ใช้ได้ดีเหมือนกัน

แต่จะมีความเสี่ยงเล็กน้อยในกรณีที่ซับซ้อนกว่านี้ คือถ้า `user` เปลี่ยนค่า*หลัง*เรียก `askPassword` แต่*ก่อน*ที่ผู้ใช้จะตอบรหัสผ่านและเรียก `() => user.loginOk()` ค่าของ `user` ก็อาจจะไม่ใช่ตัวเดิมแล้ว
