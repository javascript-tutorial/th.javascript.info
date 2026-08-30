importance: 5

---

# คัดลอกและเรียงลำดับอาร์เรย์

เรามีอาร์เรย์ของสตริงชื่อ `arr` และต้องการสำเนาที่เรียงลำดับแล้ว โดยไม่แก้ไข `arr`

สร้างฟังก์ชัน `copySorted(arr)` ซึ่งคืนสำเนาตามเงื่อนไขนี้

```js
let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (ไม่เปลี่ยนแปลง)
```
