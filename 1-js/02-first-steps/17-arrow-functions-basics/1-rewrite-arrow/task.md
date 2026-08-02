
# เขียนใหม่โดยใช้ arrow function

เปลี่ยนนิพจน์ฟังก์ชันในโค้ดด้านล่างให้เป็น arrow function:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
