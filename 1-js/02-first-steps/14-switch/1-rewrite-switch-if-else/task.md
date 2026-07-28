importance: 5

---

# เขียน "switch" ใหม่ด้วย "if"

เขียนโค้ดต่อไปนี้ใหม่ด้วย `if..else` โดยให้ทำงานเหมือน `switch` เดิม:

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

