importance: 2

---

# เรียกเมธอดต่อกัน (Chaining)

เรามีออบเจ็กต์ `ladder` สำหรับขึ้นลงบันได:

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // แสดงขั้นปัจจุบัน
    alert( this.step );
  }
};
```

ถ้าต้องเรียกหลายเมธอดตามลำดับ เราเขียนแยกกันแบบนี้ได้:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

แก้โค้ดของ `up`, `down` และ `showStep` ให้เรียกต่อกันได้แบบนี้:

```js
ladder.up().up().down().showStep().down().showStep(); // แสดง 1 แล้วตามด้วย 0
```

ไลบรารี JavaScript หลายตัวนิยมใช้รูปแบบนี้
