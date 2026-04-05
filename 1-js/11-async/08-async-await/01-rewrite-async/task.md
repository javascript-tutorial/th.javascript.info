
# เขียนใหม่ด้วย async/await

เขียนโค้ดตัวอย่างนี้จากบท <info:promise-chaining> ใหม่โดยใช้ `async/await` แทน `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
```
