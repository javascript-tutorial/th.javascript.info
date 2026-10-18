importance: 5

---

# ใช้ bound function เป็นเมธอด (method)

เมื่อนำฟังก์ชัน (function) ที่ได้จาก `bind` มาใช้เป็นเมธอด โค้ดนี้จะแสดงค่าอะไร?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

