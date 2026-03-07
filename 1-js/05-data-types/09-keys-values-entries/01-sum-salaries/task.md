importance: 5

---

# รวมเงินเดือน

มีออบเจ็กต์ `salaries` ที่เก็บเงินเดือนจำนวนไม่แน่นอน

เขียนฟังก์ชัน `sumSalaries(salaries)` ที่คืนค่าผลรวมของเงินเดือนทั้งหมด โดยใช้ `Object.values` และลูป `for..of`

ถ้า `salaries` ว่างเปล่า ผลลัพธ์ต้องเป็น `0`

ตัวอย่าง:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
