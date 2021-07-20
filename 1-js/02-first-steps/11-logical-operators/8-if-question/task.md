importance: 5

---

# ปัญหาของ "if"

จากคำสั่ง "if" ทั้งสาม `alert` ตัวไหนจะทำงานบ้าง

และผลลัพธ์สุดท้ายภายใน `if(...)` จะเป็นอะไร

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```

