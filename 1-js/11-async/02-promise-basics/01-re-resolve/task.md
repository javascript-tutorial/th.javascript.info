
# Re-resolve a promise?


ผลลัพธ์ของโค้ดด้านล่างคืออะไร?

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
