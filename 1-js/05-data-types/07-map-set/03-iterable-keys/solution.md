
สาเหตุคือ `map.keys()` คืนค่า iterable ที่นำไปวนซ้ำได้ แต่ค่านั้นไม่ใช่อาร์เรย์ (array) จึงไม่มีเมธอด (method) `.push`

ให้ใช้ `Array.from` แปลงเป็นอาร์เรย์ก่อน แล้วจึงเรียก `.push` ได้:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
