
# พร็อพเพอร์ตี้และเมธอดแบบ Static

นอกจากเมธอดปกติแล้ว เรายังกำหนดเมธอดให้กับตัวคลาสโดยตรงได้ด้วย เมธอดแบบนี้เรียกว่า *static*

วิธีประกาศก็แค่เติมคีย์เวิร์ด `static` ไว้หน้าเมธอดในคลาส แบบนี้:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

ซึ่งให้ผลเหมือนกับการกำหนดเมธอดเป็นพร็อพเพอร์ตี้ของคลาสโดยตรง:

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

ค่า `this` ในการเรียก `User.staticMethod()` คือตัวคอนสตรักเตอร์ `User` เอง (ตามกฎ "ออบเจ็กต์ก่อนจุด")

โดยทั่วไปแล้ว เมธอดแบบ static ใช้สำหรับฟังก์ชันที่เกี่ยวข้องกับ "คลาสโดยรวม" ไม่ได้เกี่ยวกับออบเจ็กต์ตัวใดตัวหนึ่ง

สมมติเรามีออบเจ็กต์ `Article` หลายตัว แล้วต้องการฟังก์ชันเปรียบเทียบ

วิธีที่เป็นธรรมชาติคือสร้างเมธอด static ชื่อ `Article.compare`:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// การใช้งาน
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

ตรงนี้เมธอด `Article.compare` ทำหน้าที่เปรียบเทียบบทความจาก "ระดับคลาส" ไม่ใช่เมธอดของบทความตัวใดตัวหนึ่ง แต่เป็นเมธอดของคลาสทั้งคลาส

อีกตัวอย่างหนึ่งคือสิ่งที่เรียกว่า "factory method"

สมมติว่าเราต้องการสร้าง article ได้หลายวิธี:

1. สร้างจากพารามิเตอร์ที่กำหนด (`title`, `date` ฯลฯ)
2. สร้าง article เปล่าที่มีวันที่วันนี้
3. ...หรือวิธีอื่นๆ

วิธีแรกทำได้ผ่านคอนสตรักเตอร์ ส่วนวิธีที่สองทำได้ด้วยเมธอด static ของคลาส

เช่น `Article.createTodays()` ในตัวอย่างนี้:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // จำไว้ว่า this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Today's digest
```

ทีนี้ทุกครั้งที่ต้องการสร้างบทความวันนี้ แค่เรียก `Article.createTodays()` ได้เลย อีกครั้ง นี่ไม่ใช่เมธอดของ article ตัวใดตัวหนึ่ง แต่เป็นเมธอดของคลาสทั้งคลาส

เมธอด static ยังใช้กับคลาสที่ทำงานกับฐานข้อมูลด้วย เช่น ค้นหา/บันทึก/ลบข้อมูล:

```js
// สมมติว่า Article เป็นคลาสสำหรับจัดการบทความ
// เมธอด static สำหรับลบบทความตาม id:
Article.remove({id: 12345});
```

````warn header="เมธอด static ใช้กับออบเจ็กต์แต่ละตัวไม่ได้"
เมธอด static เรียกได้จากคลาสเท่านั้น ไม่ใช่จากออบเจ็กต์แต่ละตัว

เช่น โค้ดนี้จะใช้ไม่ได้:

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

## พร็อพเพอร์ตี้แบบ Static

[recent browser=Chrome]

นอกจากเมธอดแล้ว พร็อพเพอร์ตี้ก็ประกาศเป็น static ได้เช่นกัน หน้าตาเหมือนพร็อพเพอร์ตี้ปกติ แค่เติม `static` ไว้ข้างหน้า:

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

ซึ่งให้ผลเหมือนกับการกำหนดค่าให้ `Article` โดยตรง:

```js
Article.publisher = "Ilya Kantor";
```

## การสืบทอดพร็อพเพอร์ตี้และเมธอดแบบ Static [#statics-and-inheritance]

พร็อพเพอร์ตี้และเมธอดแบบ static สืบทอดได้ด้วย

ตัวอย่างเช่น `Animal.compare` และ `Animal.planet` ในโค้ดด้านล่าง สืบทอดไปยังคลาสลูกและเข้าถึงได้ผ่าน `Rabbit.compare` และ `Rabbit.planet`:

```js run
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// สืบทอดจาก Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit วิ่งด้วยความเร็ว 5.

alert(Rabbit.planet); // Earth
```

ตอนที่เราเรียก `Rabbit.compare` จะไปเรียก `Animal.compare` ที่สืบทอดมา

แล้วมันทำงานอย่างไร? คำตอบคือโปรโตไทป์นั่นเอง อย่างที่คาดเดาได้ คีย์เวิร์ด `extends` ทำให้ `Rabbit` มีการอ้างอิง `[[Prototype]]` ไปยัง `Animal`

![](animal-rabbit-static.svg)

ดังนั้น `Rabbit extends Animal` สร้างการเชื่อมโยง `[[Prototype]]` ถึง 2 จุดด้วยกัน:

1. ฟังก์ชัน `Rabbit` สืบทอดจากฟังก์ชัน `Animal` ผ่านโปรโตไทป์
2. `Rabbit.prototype` สืบทอดจาก `Animal.prototype` ผ่านโปรโตไทป์

ผลลัพธ์คือการสืบทอดทำงานได้ทั้งเมธอดปกติและเมธอด static

มาลองพิสูจน์ด้วยโค้ดกัน:

```js run
class Animal {}
class Rabbit extends Animal {}

// สำหรับ static
alert(Rabbit.__proto__ === Animal); // true

// สำหรับเมธอดปกติ
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## สรุป

เมธอด static ใช้สำหรับฟังก์ชันที่เกี่ยวข้องกับ "คลาสโดยรวม" ไม่ได้เกี่ยวกับอินสแตนซ์ใดอินสแตนซ์หนึ่ง

ตัวอย่างเช่น เมธอดเปรียบเทียบ `Article.compare(article1, article2)` หรือ factory method อย่าง `Article.createTodays()`

ประกาศได้โดยใส่คีย์เวิร์ด `static` ในคลาส

พร็อพเพอร์ตี้แบบ static ใช้เมื่อต้องการเก็บข้อมูลระดับคลาส ซึ่งไม่ได้ผูกกับอินสแตนซ์ใดเช่นกัน

ไวยากรณ์มีดังนี้:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

ในทางเทคนิค การประกาศ static เหมือนกับการกำหนดค่าให้คลาสโดยตรง:

```js
MyClass.property = ...
MyClass.method = ...
```

พร็อพเพอร์ตี้และเมธอดแบบ static สืบทอดได้

เมื่อเขียน `class B extends A` โปรโตไทป์ของคลาส `B` จะชี้ไปยัง `A` นั่นคือ `B.[[Prototype]] = A` ดังนั้นถ้าหาฟิลด์ไม่พบใน `B` ก็จะไปค้นหาต่อใน `A`
