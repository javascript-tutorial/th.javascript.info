เหตุผลก็คือ prompt ส่งค่าที่ผู้ใช้กรอกมาเป็นสตริง

ตัวแปรทั้งสองตัวก็เลยมีค่าเป็น `"1"` กับ `"2"` ตามลำดับ

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```
ต้องแปลงสตริงเป็นตัวเลขก่อน — เติม `+` ไว้ข้างหน้า หรือใช้ `Number()` ก็ได้

แบบใส่ก่อน `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

หรือใส่ตอน `alert` ก็ได้:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

ใช้ทั้ง unary และ binary `+` ในบรรทัดสุดท้าย ดูแปลกตาดีนะ?
