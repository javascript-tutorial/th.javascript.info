importance: 5

---

# คีย์ (key) ที่ได้จาก map.keys()

เราต้องการเก็บคีย์ที่ได้จาก `map.keys()` ไว้ในตัวแปร (variable) เป็นอาร์เรย์ (array) เพื่อใช้เมธอด (method) ของอาร์เรย์ เช่น `.push`

แต่โค้ดนี้กลับทำงานไม่ได้:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

เพราะอะไร และต้องแก้โค้ดอย่างไรจึงจะเรียก `keys.push` ได้?
