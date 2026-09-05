วิธีหาว่าคำใดเป็นแอนาแกรม (anagram) กันคือแยกแต่ละคำออกเป็นตัวอักษรแล้วเรียงลำดับ ถ้าเป็นแอนาแกรมกัน เมื่อเรียงตัวอักษรแล้วจะได้ข้อความเดียวกัน

ตัวอย่าง:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

เราจะใช้ข้อความที่เรียงตัวอักษรแล้วเป็นคีย์ (key) ของ `Map` และเก็บคำเดิมเป็นค่า แต่ละคีย์จึงเก็บคำไว้ได้เพียงคำเดียว:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // แยกคำเป็นตัวอักษร เรียงลำดับ แล้วนำมาต่อกัน
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

บรรทัด `(*)` เรียกเมธอด (method) ต่อกันเพื่อแปลงเป็นตัวพิมพ์เล็ก แยกเป็นตัวอักษร เรียงลำดับ แล้วนำมาต่อกัน

ลองแยกเป็นหลายบรรทัดเพื่อดูผลของแต่ละขั้น:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

คำว่า `'PAN'` และ `'nap'` จึงได้ข้อความหลังเรียงตัวอักษรเหมือนกันคือ `'anp'`

บรรทัดถัดมาเก็บคำเดิมไว้ใน `Map` โดยใช้ข้อความที่เรียงตัวอักษรแล้วเป็นคีย์:

```js
map.set(sorted, word);
```

ถ้าเจอคำอื่นที่เรียงตัวอักษรแล้วได้ข้อความเดียวกัน คำที่พบทีหลังจะทับค่าของคีย์เดิมใน `Map` แต่ละกลุ่มแอนาแกรมจึงเหลือคำอยู่เพียงคำเดียว

สุดท้าย `map.values()` คืนค่า iterable สำหรับวนอ่านค่าทั้งหมดใน `Map` แล้ว `Array.from` แปลงค่าเหล่านั้นเป็นอาร์เรย์ (array) ผลลัพธ์จึงมีเฉพาะคำที่เก็บไว้ โดยไม่รวมคีย์ที่ใช้จัดกลุ่ม

ในข้อนี้คีย์เป็นสตริง (string) เราจึงใช้ออบเจ็กต์ (object) ธรรมดาแทน `Map` ได้เช่นกัน

โค้ดจะเป็นแบบนี้:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
