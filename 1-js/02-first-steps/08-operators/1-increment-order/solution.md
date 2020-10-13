
คำตอบคือ:

- `a = 2`
- `b = 2`
- `c = 2`
- `d = 1`

```js run no-beautify
let a = 1, b = 1;

alert( ++a ); // 2, prefix form ส่งค่าใหม่กลับ
alert( b++ ); // 1, postfix form ส่งค่าเก่ากลับ

alert( a ); // 2, เพิ่มมา 1
alert( b ); // 2, เพิ่มมา 1
```

