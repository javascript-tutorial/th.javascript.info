
# เขียนใหม่ด้วย arrow function

แทน Function Expression ด้วย arrow function ในโค้ดข้างล่าง:

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
