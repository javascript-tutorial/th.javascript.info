
โน้ตอธิบายอยู่ใต้โค้ด:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

โน้ต:

1. ฟังก์ชัน `loadJson` กลายเป็น `async`
2. แทนที่ `.then` ทั้งหมดด้วย `await`
3. เขียน `return response.json()` แทนการ await ก็ได้ แบบนี้:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    โค้ดด้านนอกก็ต้อง `await` promise นั้นเองอยู่ดี ในกรณีนี้ผลไม่ต่างกัน
4. error ที่โยนออกมาจาก `loadJson` ถูกจัดการด้วย `.catch` ที่ด้านนอก ใช้ `await loadJson(…)` ตรงนั้นไม่ได้ เพราะไม่ได้อยู่ใน `async` function
