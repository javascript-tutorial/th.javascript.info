importance: 5

---

# Error ตอนสร้างอินสแตนซ์

โค้ดด้านล่างมี `Rabbit` สืบทอดจาก `Animal`

แต่น่าเสียดาย ออบเจ็กต์ `Rabbit` สร้างไม่ได้ อะไรผิดพลาด? ลองแก้ดู
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
