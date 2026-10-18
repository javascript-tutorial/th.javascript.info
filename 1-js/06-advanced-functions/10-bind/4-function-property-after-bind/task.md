importance: 5

---

# อ่านค่าที่เก็บไว้หลัง bind

ฟังก์ชัน (function) `sayHi` มีพร็อพเพอร์ตี้ (property) `test` เก็บค่า `5` ไว้ เมื่อใช้ `bind` สร้าง `bound` แล้ว `bound.test` จะมีค่าอะไร? เพราะอะไร?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // ผลลัพธ์จะเป็นอะไร? ทำไม?
*/!*
```

