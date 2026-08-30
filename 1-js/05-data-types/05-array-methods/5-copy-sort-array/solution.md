ใช้ `slice()` สร้างสำเนาก่อน แล้วค่อยเรียงลำดับสำเนานั้น:

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
