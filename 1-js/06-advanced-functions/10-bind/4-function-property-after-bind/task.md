importance: 5

---

# พร็อพเพอร์ตี้ของฟังก์ชันหลัง bind

ฟังก์ชันมีค่าเก็บอยู่ในพร็อพเพอร์ตี้ หลังจาก `bind` แล้วค่านั้นจะเปลี่ยนไหม? เพราะอะไร?

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

