importance: 5

---

# ทำไมแฮมสเตอร์ทั้งสองตัวถึงอิ่ม?

เรามีแฮมสเตอร์สองตัว: `speedy` และ `lazy` สืบทอดจากออบเจ็กต์ `hamster`

เวลาให้อาหารตัวหนึ่ง อีกตัวก็อิ่มด้วย ทำไมถึงเป็นแบบนั้น? แก้ยังไงดี?

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

