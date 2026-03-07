
# Object.keys, values, entries

มาพักจากโครงสร้างข้อมูลแต่ละตัวสักครู่ แล้วมาคุยเรื่องการวนซ้ำผ่านข้อมูลเหล่านั้นกัน

บทที่แล้วเราได้รู้จัก `map.keys()`, `map.values()`, `map.entries()` กันไปแล้ว

เมธอดพวกนี้ถือเป็นแบบแผนสากล — ทุกโครงสร้างข้อมูลควรมีเมธอดเหล่านี้ ถ้าสร้างโครงสร้างข้อมูลขึ้นมาเอง ก็ควรมีเมธอดเหล่านี้ด้วยเช่นกัน

รองรับในโครงสร้างต่อไปนี้:

- `Map`
- `Set`
- `Array`

ออบเจ็กต์ธรรมดาก็มีเมธอดในแบบเดียวกัน แต่ไวยากรณ์ต่างออกไปเล็กน้อย

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

ข้อแรกคือต้องเรียก `Object.keys(obj)` ไม่ใช่ `obj.keys()`

ทำไมถึงเป็นแบบนี้? เพราะต้องการความยืดหยุ่น จำไว้ว่าออบเจ็กต์คือรากฐานของทุกโครงสร้างใน JavaScript เราอาจสร้างออบเจ็กต์อย่าง `data` ที่มีเมธอด `data.values()` เป็นของตัวเอง — แต่ยังเรียก `Object.values(data)` ได้เสมอ

ข้อสองคือ `Object.*` คืนค่าเป็นอาร์เรย์จริงๆ ไม่ใช่แค่ iterable เหตุผลส่วนใหญ่เป็นเรื่องของประวัติศาสตร์ภาษา

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

// วนซ้ำผ่าน value ทั้งหมด
for (let value of Object.values(user)) {
  alert(value); // John แล้วก็ 30
}
```

```warn header="Object.keys/values/entries ไม่สนใจพร็อพเพอร์ตี้ที่เป็น Symbol"
เช่นเดียวกับลูป `for..in` เมธอดเหล่านี้จะข้ามพร็อพเพอร์ตี้ที่ใช้ `Symbol(...)` เป็น key

ส่วนใหญ่ก็สะดวกดี แต่ถ้าต้องการ symbolic key ด้วย ใช้ [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) ซึ่งคืนค่าเป็นอาร์เรย์ของ symbolic key โดยเฉพาะ หรือจะใช้ [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) ที่คืนค่า key *ทั้งหมด* ก็ได้
```


## การแปลงออบเจ็กต์

ออบเจ็กต์ไม่มีเมธอดหลายตัวที่อาร์เรย์มี เช่น `map`, `filter` เป็นต้น

ถ้าอยากใช้เมธอดพวกนั้น ให้จับคู่ `Object.entries` กับ `Object.fromEntries` ดังนี้:

1. ใช้ `Object.entries(obj)` เพื่อดึงอาร์เรย์ของคู่ key/value จาก `obj`
2. ใช้เมธอดของอาร์เรย์ เช่น `map` เพื่อแปลงคู่ key/value ตามที่ต้องการ
3. ใช้ `Object.fromEntries(array)` แปลงอาร์เรย์ผลลัพธ์กลับเป็นออบเจ็กต์

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

ดูซับซ้อนตอนแรก แต่ลองใช้สักครั้งสองครั้งก็จะคุ้นเอง เทคนิคนี้ต่อโซ่การแปลงข้อมูลได้อย่างมีพลัง
