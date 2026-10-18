
สาเหตุคือ `askPassword` ได้รับเพียงค่าฟังก์ชัน (function) `loginOk` และ `loginFail` โดยไม่ได้เก็บออบเจ็กต์ (object) `user` ที่เป็นเจ้าของเมธอด (method) มาด้วย

เมื่อเรียกผ่าน `ok()` หรือ `fail()` ใน strict mode ค่า `this` จึงเป็น `undefined` และอ่าน `this.name` ไม่ได้

เราใช้ `bind` ผูก `user` เป็น `this` ให้ทั้งสองฟังก์ชันก่อนส่งให้ `askPassword` ได้:

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

ไม่ว่า `askPassword` จะเรียก `ok()` หรือ `fail()` ฟังก์ชันที่ถูกเรียกก็จะได้รับ `this` เป็น `user`

อีกวิธีคือใช้ arrow function ครอบการเรียกเมธอด:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

วิธีนี้ทำงานได้กับตัวอย่างเช่นกัน เพราะเรียกเมธอดผ่าน `user` ตามปกติ โดย `prompt` จะรอคำตอบก่อน แล้ว `askPassword` จึงเรียกคอลแบ็ก (callback) ทันที ก่อนคืนการทำงานให้โค้ดภายนอก

แต่ถ้าปรับ `askPassword` ให้รับคำตอบและเรียกคอลแบ็กภายหลัง ต้องระวังว่าตัวแปร (variable) `user` อาจเปลี่ยนค่าไปก่อนคอลแบ็กทำงาน arrow function จะอ่านค่าของ `user` ในตอนนั้น ส่วน `bind` จะยังใช้ออบเจ็กต์ที่ผูกไว้ตั้งแต่แรก
