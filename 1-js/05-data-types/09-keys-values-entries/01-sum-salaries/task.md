importance: 5

---

# รวมเงินเดือน

มีออบเจ็กต์ (object) `salaries` ที่เก็บเงินเดือน โดยจะมีเงินเดือนกี่รายการก็ได้

เขียนฟังก์ชัน (function) `sumSalaries(salaries)` ที่คืนค่าผลรวมของเงินเดือนทั้งหมด โดยใช้ `Object.values` และลูป (loop) `for..of`

ถ้า `salaries` เป็นออบเจ็กต์ว่าง ต้องคืนค่า `0`

ตัวอย่าง:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
