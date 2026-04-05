# Error ใน setTimeout

ลองดูว่า `.catch` จะทำงานไหม? ช่วยอธิบายคำตอบด้วย

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
