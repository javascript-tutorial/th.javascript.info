importance: 5

---

# ใช้ `this` ใน object literal

ฟังก์ชัน `makeUser` ด้านล่างคืนค่าเป็นออบเจ็กต์

เมื่อรันบรรทัด `alert( user.ref.name )` จะเกิดอะไรขึ้น เพราะอะไร

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // ผลลัพธ์คืออะไร
```
