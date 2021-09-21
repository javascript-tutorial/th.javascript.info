importance: 4

---

# ลองมาแปลงคำสั่งจาก "if" เป็น "switch"

ลองเขียนโค้ดด้านล่างใหม่โดยใช้คำสั่ง `switch` กัน:

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

