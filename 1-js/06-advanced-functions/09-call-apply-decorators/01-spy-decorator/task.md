importance: 5

---

# Spy decorator

สร้าง decorator `spy(func)` ที่คืนค่า wrapper ซึ่งบันทึกทุกการเรียกใช้ฟังก์ชันไว้ในพร็อพเพอร์ตี้ `calls`

แต่ละการเรียกจะถูกบันทึกเป็นอาร์เรย์ของอาร์กิวเมนต์

ตัวอย่าง:

```js
function work(a, b) {
  alert( a + b ); // work เป็นฟังก์ชันหรือเมธอดอะไรก็ได้
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

P.S. decorator ตัวนี้มีประโยชน์สำหรับ unit testing บางครั้ง รูปแบบขั้นสูงของมันคือ `sinon.spy` ในไลบรารี [Sinon.JS](http://sinonjs.org/)
