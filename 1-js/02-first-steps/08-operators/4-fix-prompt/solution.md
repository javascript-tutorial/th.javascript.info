เหตุผลคือพรอมต์จะส่งค่าอะไรที่ผู้ใช้กรอกมาเป็นสตริง

ดังนั้น ตัวแปรทั้งสองจึงมีค่า `"1"` และ `"2"` ตามลำดับ

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```
เราควรที่จะแปลงสตริงให้เป็นตัวเลขเสียก่อนด้วยเติม `+` ไปข้างหน้ส หรือใช้ `Number()` แทนได้

ตัวอย่างใส่ก่อน `prompt`

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

หรือจะเป็นใน `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

การใช้ทั้ง unary และ binary `+` ในโค้ดบรรทัดล่างสุด ดูตลกดีไหม?
