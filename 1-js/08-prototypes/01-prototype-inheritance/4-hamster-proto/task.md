importance: 5

---

# ทำไม speedy กินแล้ว lazy ถึงอิ่มด้วย?

แฮมสเตอร์สองตัวชื่อ `speedy` กับ `lazy` ต่างก็สืบทอดจากออบเจ็กต์ (object) ชื่อ `hamster`

เราให้อาหารเฉพาะ `speedy` แต่กลับเห็น `apple` ในท้องของ `lazy` ด้วย เพราะอะไร? จะแก้โค้ดอย่างไรให้แฮมสเตอร์แต่ละตัวเก็บเฉพาะอาหารที่ตัวเองกิน?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// ตัวนี้หาอาหารเจอ
speedy.eat("apple");
alert( speedy.stomach ); // apple

// ตัวนี้ก็มีด้วย ทำไม? แก้ด้วยนะ
alert( lazy.stomach ); // apple
```

