วิธีทำคือให้ทุกเมธอดคืนค่าเป็นออบเจ็กต์ตัวเดิม

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

ladder.up().up().down().showStep().down().showStep(); // แสดง 1 แล้วตามด้วย 0
```

ถ้าต้องเรียกต่อกันยาว ๆ เราแยกแต่ละเมธอดไว้คนละบรรทัดเพื่อให้อ่านง่ายขึ้นได้:

```js
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```
