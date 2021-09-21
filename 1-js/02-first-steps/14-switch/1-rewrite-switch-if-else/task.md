importance: 5

---

# ลองมาแปลงคำสั่งจาก "switch" เป็น "if"

เขียนโค้ดโดยใช้ `if..else` โดยให้สอดคล้องกับ `switch` ด้านล่าง:

```js
switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;

  default:
    alert( 'We hope that this page looks ok!' );
}
```

