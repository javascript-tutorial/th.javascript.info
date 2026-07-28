แบบที่ใช้ตัวดำเนินการ `?`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

แบบที่ใช้ OR `||` ซึ่งสั้นที่สุด:

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

วงเล็บรอบ `age > 18` ไม่จำเป็นต่อการทำงาน ใส่ไว้เพื่อให้อ่านง่ายขึ้นเท่านั้น
