importance: 5

---

# การเรียกในบริบทของอาร์เรย์

ผลลัพธ์คืออะไร และทำไม?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
