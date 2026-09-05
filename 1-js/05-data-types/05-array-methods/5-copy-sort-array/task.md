importance: 5

---

# คัดลอกและเรียงลำดับอาร์เรย์ (array)

กำหนดให้ `arr` เป็นอาร์เรย์ของสตริง (string) เราต้องการสำเนาที่เรียงลำดับแล้ว โดยให้ `arr` คงเดิม

เขียนฟังก์ชัน (function) `copySorted(arr)` ที่คืนค่าสำเนาดังกล่าว

```js
let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (อาร์เรย์เดิมไม่เปลี่ยน)
```
