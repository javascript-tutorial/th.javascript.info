เป็นเพราะคอนสตรักเตอร์ของคลาสลูกต้องเรียก `super()` ก่อน

นี่คือโค้ดที่แก้แล้ว:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // ตอนนี้ใช้ได้แล้ว
*/!*
alert(rabbit.name); // White Rabbit
```
