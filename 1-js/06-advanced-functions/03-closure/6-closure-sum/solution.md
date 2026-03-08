วงเล็บชั้นที่สองจะทำงานได้ วงเล็บชั้นแรกต้องคืนค่าเป็นฟังก์ชัน

แบบนี้:

```js run
function sum(a) {

  return function(b) {
    return a + b; // ดึงค่า "a" จาก Lexical Environment ชั้นนอก
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

