
คำตอบคือ:

- `a = 2`
- `b = 2`
- `c = 2`
- `d = 1`

```js run no-beautify
let a = 1, b = 1;

alert( ++a ); // 2, รูปแบบ prefix คืนค่าใหม่กลับมา
alert( b++ ); // 1, รูปแบบ postfix คืนค่าเก่ากลับมา

alert( a ); // 2, เพิ่มมา 1
alert( b ); // 2, เพิ่มมา 1
```

