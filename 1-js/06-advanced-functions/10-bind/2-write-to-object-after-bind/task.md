importance: 5

---

# ฟังก์ชันที่ผูกแล้วใช้เป็นเมธอด

ผลลัพธ์จะเป็นอะไร?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

