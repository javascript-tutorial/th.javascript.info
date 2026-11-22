ลองไล่ดูว่าเกิดอะไรขึ้นเมื่อเรียก `speedy.eat("apple")`

1. JavaScript พบเมธอด (method) ชื่อ `eat` ในโปรโตไทป์ (prototype) คือ `hamster` แล้วเรียกเมธอดนั้นโดยให้ `this` เป็น `speedy` ซึ่งเป็นออบเจ็กต์ (object) หน้าจุด

2. ก่อนจะเรียก `push` ในบรรทัด `this.stomach.push(food)` JavaScript ต้องอ่านพร็อพเพอร์ตี้ (property) ชื่อ `stomach` ก่อน จึงเริ่มหาที่ `speedy` แต่ไม่พบ

3. JavaScript จึงค้นหาตามห่วงโซ่โปรโตไทป์ (prototype chain) ต่อและพบ `stomach` ใน `hamster`

4. เมธอด `push` จึงเพิ่มอาหารลงใน*อาร์เรย์ (array) ที่ `hamster.stomach` อ้างถึง*

แฮมสเตอร์ทั้งสองตัวจึงใช้ท้องร่วมกัน

ไม่ว่าจะอ่าน `speedy.stomach` หรือ `lazy.stomach` ก็ได้อาร์เรย์เดียวกันจาก `hamster` เมื่อ `push` เพิ่ม `"apple"` ลงไป เราจึงเห็นอาหารนั้นผ่านทั้งสองชื่อ

ถ้าเปลี่ยนจากการเพิ่มอาหารด้วย `push` เป็นการกำหนดค่าให้ `this.stomach` โดยตรง ผลจะต่างออกไป

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // ใช้ assign แทน this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// ตัวเร็วหาอาหารเจอ
speedy.eat("apple");
alert( speedy.stomach ); // apple

// ตัวขี้เกียจท้องยังว่าง
alert( lazy.stomach ); // <ไม่มีอะไร>
```

บรรทัด `this.stomach = [food]` สร้างอาร์เรย์ใหม่แล้วเก็บไว้ใน `speedy.stomach` ส่วน `lazy.stomach` ยังชี้ไปที่อาร์เรย์ว่างใน `hamster` วิธีนี้แทนที่อาหารเดิมทุกครั้งที่เรียก `eat`

ถ้าอยากให้แฮมสเตอร์เก็บอาหารเพิ่มได้ทุกครั้งที่กิน ให้สร้างอาร์เรย์ `stomach` แยกไว้ในแฮมสเตอร์แต่ละตัว แล้วใช้ `push` ได้ตามเดิม

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// ตัวเร็วหาอาหารเจอ
speedy.eat("apple");
alert( speedy.stomach ); // apple

// ตัวขี้เกียจท้องยังว่าง
alert( lazy.stomach ); // <ไม่มีอะไร>
```

โดยทั่วไป ถ้าพร็อพเพอร์ตี้บอกสถานะเฉพาะของออบเจ็กต์แต่ละตัว ก็ควรเก็บไว้ในตัวออบเจ็กต์นั้น เช่นเดียวกับ `stomach` ของแฮมสเตอร์แต่ละตัวในตัวอย่างนี้
