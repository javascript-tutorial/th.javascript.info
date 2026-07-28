วิธีที่ใช้ `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

วิธีที่ใช้ตัวดำเนินการ `?`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

ถ้า `a == b` จะคืนค่าตัวไหนก็ได้ เพราะทั้งสองค่ามีค่าเท่ากัน
