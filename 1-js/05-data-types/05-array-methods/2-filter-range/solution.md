```js run demo
function filterRange(arr, a, b) {
  // ใส่วงเล็บครอบนิพจน์เพื่อให้อ่านง่ายขึ้น
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (ค่าที่ตรงตามเงื่อนไข)

alert( arr ); // 5,3,8,1 (ไม่มีการแก้ไข)
```
