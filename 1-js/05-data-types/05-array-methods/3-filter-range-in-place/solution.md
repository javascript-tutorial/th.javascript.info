```js run demo
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // ลบค่าที่อยู่นอกช่วง
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // ลบตัวเลขที่ไม่ได้อยู่ในช่วง 1 ถึง 4

alert( arr ); // [3, 1]
```
