importance: 5

---

# เรียกฟังก์ชันผ่านอาร์เรย์

ผลลัพธ์คืออะไร และทำไม?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
