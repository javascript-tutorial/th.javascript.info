importance: 5

---

# เทสต์นี้มีปัญหาตรงไหน?

ลองหาว่าเทสต์ของ `pow` ด้านล่างเขียนไม่ดีตรงไหน

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

ป.ล. เทสต์นี้เขียนถูกไวยากรณ์และรันผ่านตามปกติ
