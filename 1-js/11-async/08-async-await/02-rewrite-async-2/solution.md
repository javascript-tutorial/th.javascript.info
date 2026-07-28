
ไม่มีเทคนิคพิเศษอะไรเลย แค่เปลี่ยน `.catch` เป็น `try..catch` ใน `demoGithubUser` แล้วใส่ `async/await` ในจุดที่จำเป็น:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// ถามชื่อผู้ใช้ซ้ำจนกว่า github จะคืน user ที่ถูกต้อง
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // ไม่มี error ออกจาก loop
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop ทำงานต่อหลัง alert
        alert("No such user, please reenter.");
      } else {
        // error ที่ไม่รู้จัก โยนต่อออกไป
        throw err;
      }
    }
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
