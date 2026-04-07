importance: 4

---

# แปลง "if" เป็น "switch"

ลองเขียนโค้ดข้างล่างใหม่ด้วย `switch`:

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```

