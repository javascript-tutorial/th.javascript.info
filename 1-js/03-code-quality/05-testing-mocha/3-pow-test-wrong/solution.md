ตัวอย่างนี้ชี้ให้เห็นกับดักที่เจอได้บ่อยเวลาเขียนเทสต์

จริง ๆ แล้วโค้ดกำลังทดสอบ 3 กรณี แต่จับมารวมไว้ในฟังก์ชันเดียวและเรียก `assert` 3 ครั้ง

แบบนี้อาจเขียนง่ายกว่า แต่เมื่อเกิด error เราจะมองไม่ออกทันทีว่ากรณีไหนเป็นต้นเหตุ

ยิ่งถ้า error โผล่ขึ้นมากลางลำดับการทำงานที่ซับซ้อน เราต้องย้อนหาว่าตอนนั้นข้อมูลมีค่าอะไรบ้าง กลายเป็นว่าต้อง *ดีบักตัวเทสต์* อีกที

ทางที่ดีกว่าคือแยกแต่ละกรณีเป็นบล็อก `it` พร้อมเขียนอินพุตและผลลัพธ์ให้เห็นชัด

เช่น:
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

เราแทน `it` ตัวเดิมด้วย `describe` แล้วแยกแต่ละกรณีเป็น `it` ของตัวเอง ถ้าเทสต์พัง ชื่อเทสต์จะบอกชัดว่าใช้ค่าอะไรและคาดหวังผลลัพธ์เท่าไร

ถ้าต้องการแยกรันเฉพาะเทสต์เดียว ให้เปลี่ยน `it` เป็น `it.only`:


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha จะรันบล็อกนี้เพียงบล็อกเดียว
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
