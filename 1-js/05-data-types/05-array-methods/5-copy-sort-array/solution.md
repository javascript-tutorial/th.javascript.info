ใช้ `slice()` คัดลอกอาร์เรย์ (array) แล้วเรียก `sort()` เพื่อเรียงลำดับสำเนานั้น:

```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert( sorted );
alert( arr );
```
