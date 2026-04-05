
# เขียน "rethrow" ใหม่ด้วย async/await

ด้านล่างคือตัวอย่าง "rethrow" เขียนมันใหม่โดยใช้ `async/await` แทน `.then/catch`

แถมยังให้ตัดการ recursion ออก แล้วเปลี่ยนเป็น loop ใน `demoGithubUser` แทน — ด้วย `async/await` ทำได้ง่ายมาก

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// ถามชื่อผู้ใช้ซ้ำจนกว่า github จะคืน user ที่ถูกต้อง
function demoGithubUser() {
  let name = prompt("ใส่ชื่อ?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`ชื่อเต็ม: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("ไม่พบผู้ใช้นี้ กรุณาลองใหม่อีกครั้ง");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
