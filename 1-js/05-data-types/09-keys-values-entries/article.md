
# Object.keys, values, entries

มาหยุดพักจากโครงสร้างข้อมูลแต่ละตัวสักครู่ แล้วมาพูดถึงการวนซ้ำผ่านโครงสร้างเหล่านั้นกัน

ในบทที่แล้ว เราเห็นเมธอด `map.keys()`, `map.values()`, `map.entries()` กันมาแล้ว

เมธอดเหล่านี้เป็น "กฎสากล" ที่ตกลงกันว่าควรนำไปใช้กับโครงสร้างข้อมูลทุกประเภท ถ้าเราสร้างโครงสร้างข้อมูลขึ้นมาเอง ก็ควรนำไปใช้ด้วยเช่นกัน

เมธอดเหล่านี้รองรับใน:

- `Map`
- `Set`
- `Array`

ออบเจ็กต์ธรรมดาก็มีเมธอดในแบบเดียวกัน แต่ไวยากรณ์จะแตกต่างออกไปเล็กน้อย

## Object.keys, values, entries

สำหรับออบเจ็กต์ธรรมดา มีเมธอดต่อไปนี้:

- [Object.keys(obj)](mdn:js/Object/keys) -- คืนค่าอาร์เรย์ของ key ทั้งหมด
- [Object.values(obj)](mdn:js/Object/values) -- คืนค่าอาร์เรย์ของ value ทั้งหมด
- [Object.entries(obj)](mdn:js/Object/entries) -- คืนค่าอาร์เรย์ของคู่ `[key, value]`

สังเกตความแตกต่าง (เทียบกับ Map):

|             | Map              | Object       |
|-------------|------------------|--------------|
| วิธีเรียกใช้ | `map.keys()`  | `Object.keys(obj)` ไม่ใช่ `obj.keys()` |
| คืนค่า     | iterable    | อาร์เรย์จริงๆ                     |

ความแตกต่างแรกคือ เราต้องเรียก `Object.keys(obj)` ไม่ใช่ `obj.keys()`

ทำไมถึงเป็นแบบนี้? เหตุผลหลักคือความยืดหยุ่น ออบเจ็กต์เป็นพื้นฐานของโครงสร้างที่ซับซ้อนทุกอย่างใน JavaScript ดังนั้น เราอาจมีออบเจ็กต์ของเราเองเช่น `data` ที่มีเมธอด `data.values()` เป็นของตัวเอง แต่เรายังสามารถเรียก `Object.values(data)` กับมันได้อยู่ดี

ความแตกต่างที่สองคือ เมธอดในกลุ่ม `Object.*` คืนค่าเป็นอาร์เรย์จริงๆ ไม่ใช่แค่ iterable เหตุผลส่วนใหญ่เป็นเรื่องของประวัติศาสตร์การพัฒนาภาษา

ตัวอย่างเช่น:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

ตัวอย่างการใช้ `Object.values` เพื่อวนซ้ำผ่าน value ของพร็อพเพอร์ตี้:

```js run
let user = {
  name: "John",
  age: 30
};

// วนซ้ำผ่าน value
for (let value of Object.values(user)) {
  alert(value); // John แล้วก็ 30
}
```

```warn header="Object.keys/values/entries ไม่สนใจพร็อพเพอร์ตี้ที่เป็น Symbol"
เช่นเดียวกับลูป `for..in` เมธอดเหล่านี้จะข้ามพร็อพเพอร์ตี้ที่ใช้ `Symbol(...)` เป็น key

โดยทั่วไปนี่เป็นเรื่องที่สะดวกดี แต่ถ้าต้องการ symbolic key ด้วย ก็มีเมธอดแยกต่างหากชื่อ [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) ที่คืนค่าเป็นอาร์เรย์ของ symbolic key เท่านั้น นอกจากนี้ยังมีเมธอด [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ที่คืนค่า key *ทั้งหมด*
```


## การแปลงออบเจ็กต์

ออบเจ็กต์ขาดเมธอดหลายอย่างที่อาร์เรย์มี เช่น `map`, `filter` และอื่นๆ

ถ้าอยากใช้เมธอดเหล่านั้น ให้ใช้ `Object.entries` ตามด้วย `Object.fromEntries` ดังนี้:

1. ใช้ `Object.entries(obj)` เพื่อดึงอาร์เรย์ของคู่ key/value จาก `obj`
2. ใช้เมธอดของอาร์เรย์กับอาร์เรย์นั้น เช่น `map` เพื่อแปลงคู่ key/value
3. ใช้ `Object.fromEntries(array)` กับอาร์เรย์ผลลัพธ์เพื่อแปลงกลับเป็นออบเจ็กต์

ตัวอย่างเช่น ถ้ามีออบเจ็กต์ราคาสินค้า และต้องการคูณราคาทุกอย่างด้วย 2:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // แปลง prices เป็นอาร์เรย์ แล้ว map แต่ละคู่ key/value ให้เป็นคู่ใหม่
  // จากนั้น fromEntries แปลงกลับเป็นออบเจ็กต์
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

อาจดูซับซ้อนในตอนแรก แต่พอใช้สักครั้งสองครั้งก็จะเข้าใจได้เอง เทคนิคนี้ช่วยให้เราต่อโซ่การแปลงข้อมูลได้อย่างทรงพลังมาก
