```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
อีกวิธีคือใช้ `Object.values` ร่วมกับ `reduce` เพื่อหาผลรวมของเงินเดือน:

```js
// reduce วนซ้ำผ่านอาร์เรย์ของเงินเดือน
// แล้วบวกสะสมทีละตัว
// และคืนค่าผลลัพธ์สุดท้าย
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
