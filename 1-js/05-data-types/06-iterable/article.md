
# Iterables

ออบเจ็กต์ที่เป็น *iterable* คือการขยายแนวคิดของอาร์เรย์ออกไป กล่าวคือ เป็นแนวคิดที่ช่วยให้เราสามารถใช้ออบเจ็กต์ใดก็ได้ใน `for..of` loop

แน่นอนว่าอาร์เรย์เป็น iterable แต่ยังมี built-in object อื่นอีกมากมายที่เป็น iterable เช่นกัน อย่างสตริงก็เป็น iterable ด้วย

ถ้าออบเจ็กต์ไม่ใช่อาร์เรย์ในทางเทคนิค แต่แทนค่าคอลเล็กชัน (list, set) ของบางอย่าง การใช้ `for..of` ก็เป็นไวยากรณ์ที่ดีในการวนซ้ำ มาดูกันว่าจะทำให้มันใช้งานได้อย่างไร


## Symbol.iterator

ทำความเข้าใจแนวคิดของ iterable ได้ง่ายที่สุดด้วยการสร้างขึ้นมาเอง

สมมติว่าเรามีออบเจ็กต์ที่ไม่ใช่อาร์เรย์ แต่ดูเหมาะสมสำหรับ `for..of`

เช่น ออบเจ็กต์ `range` ที่แทนช่วงของตัวเลข:

```js
let range = {
  from: 1,
  to: 5
};

// เราอยากให้ for..of ทำงานได้:
// for(let num of range) ... num=1,2,3,4,5
```

เพื่อให้ออบเจ็กต์ `range` เป็น iterable (และทำให้ `for..of` ใช้งานได้) เราต้องเพิ่มเมธอดชื่อ `Symbol.iterator` ให้กับออบเจ็กต์ (ซึ่งเป็น built-in symbol พิเศษที่มีไว้สำหรับเรื่องนี้โดยเฉพาะ)

1. เมื่อ `for..of` เริ่มทำงาน จะเรียกเมธอดนั้นหนึ่งครั้ง (หรือเกิดข้อผิดพลาดถ้าไม่พบเมธอด) เมธอดนั้นต้องคืนค่าเป็น *iterator* ซึ่งก็คือออบเจ็กต์ที่มีเมธอด `next`
2. จากนั้น `for..of` จะทำงาน *กับออบเจ็กต์ที่ได้รับคืนมาเท่านั้น*
3. เมื่อ `for..of` ต้องการค่าถัดไป จะเรียก `next()` บนออบเจ็กต์นั้น
4. ผลลัพธ์ของ `next()` ต้องอยู่ในรูป `{done: Boolean, value: any}` โดย `done=true` หมายความว่าลูปสิ้นสุดแล้ว มิฉะนั้น `value` คือค่าถัดไป

นี่คือโค้ดที่ implement ครบถ้วนสำหรับ `range` พร้อมคำอธิบาย:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. การเรียก for..of ครั้งแรกจะเรียกฟังก์ชันนี้
range[Symbol.iterator] = function() {

  // ...ซึ่งคืนค่าเป็นออบเจ็กต์ iterator:
  // 2. จากนั้น for..of จะทำงานกับออบเจ็กต์ iterator ด้านล่างเท่านั้น โดยขอค่าถัดไปจากมัน
  return {
    current: this.from,
    last: this.to,

    // 3. next() จะถูกเรียกในแต่ละรอบของ for..of loop
    next() {
      // 4. ต้องคืนค่าในรูปออบเจ็กต์ {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// ตอนนี้ใช้งานได้แล้ว!
for (let num of range) {
  alert(num); // 1, แล้วก็ 2, 3, 4, 5
}
```

สิ่งสำคัญของ iterable คือการแยกหน้าที่กันอย่างชัดเจน (separation of concerns)

- ออบเจ็กต์ `range` เองไม่มีเมธอด `next()`
- แต่จะสร้างออบเจ็กต์อีกตัวที่เรียกว่า "iterator" ขึ้นมาจากการเรียก `range[Symbol.iterator]()` และเมธอด `next()` ของมันจะสร้างค่าสำหรับการวนซ้ำ

ดังนั้นออบเจ็กต์ iterator จึงแยกออกจากออบเจ็กต์ที่มันวนซ้ำ

ในทางเทคนิค เราสามารถรวมทั้งสองเข้าด้วยกัน และใช้ `range` เองเป็น iterator เพื่อให้โค้ดกระชับขึ้น

แบบนี้:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, แล้วก็ 2, 3, 4, 5
}
```

ตอนนี้ `range[Symbol.iterator]()` คืนค่าเป็นออบเจ็กต์ `range` เอง ซึ่งมีเมธอด `next()` ที่จำเป็น และจำสถานะการวนซ้ำปัจจุบันไว้ใน `this.current` กระชับขึ้นไหม? ใช่เลย และบางครั้งก็เหมาะสมดีเช่นกัน

ข้อเสียคือตอนนี้จะมี `for..of` สองตัวรันพร้อมกันบนออบเจ็กต์เดียวกันไม่ได้ เพราะทั้งสองจะแบ่งปันสถานะการวนซ้ำร่วมกัน เนื่องจากมี iterator แค่ตัวเดียวคือออบเจ็กต์นั่นเอง แต่ว่า for-of แบบขนานสองตัวเป็นเรื่องที่พบได้น้อยมาก แม้แต่ในสถานการณ์ async

```smart header="Infinite iterators"
Infinite iterators ก็เป็นไปได้เช่นกัน ตัวอย่างเช่น `range` จะกลายเป็นอนันต์เมื่อกำหนด `range.to = Infinity` หรือเราอาจสร้างออบเจ็กต์ iterable ที่สร้างลำดับตัวเลขสุ่ม (pseudorandom) ต่อเนื่องไปเรื่อยๆ ก็ได้ ซึ่งก็มีประโยชน์เช่นกัน

ไม่มีข้อจำกัดสำหรับ `next` มันสามารถคืนค่าได้เรื่อยๆ ซึ่งเป็นเรื่องปกติ

แน่นอนว่า `for..of` loop ที่วนซ้ำ iterable แบบนี้จะไม่มีวันสิ้นสุด แต่เราหยุดมันได้เสมอด้วย `break`
```


## สตริงเป็น iterable

อาร์เรย์และสตริงเป็น built-in iterables ที่ใช้บ่อยที่สุด

สำหรับสตริง `for..of` จะวนซ้ำผ่านตัวอักษรแต่ละตัว:

```js run
for (let char of "test") {
  // ทำงาน 4 รอบ: หนึ่งรอบต่อหนึ่งตัวอักษร
  alert( char ); // t, แล้วก็ e, แล้วก็ s, แล้วก็ t
}
```

และยังทำงานได้ถูกต้องกับ surrogate pairs อีกด้วย!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, แล้วก็ 😂
}
```

## การเรียก iterator โดยตรง

เพื่อความเข้าใจที่ลึกขึ้น มาดูวิธีใช้ iterator โดยตรงกัน

เราจะวนซ้ำสตริงแบบเดียวกันกับ `for..of` แต่ด้วยการเรียกโดยตรง โค้ดนี้สร้าง string iterator และดึงค่าออกมา "ด้วยมือ":

```js run
let str = "Hello";

// ทำงานเหมือนกับ
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // แสดงตัวอักษรทีละตัว
}
```

วิธีนี้ไม่ค่อยจำเป็นนัก แต่ให้การควบคุมกระบวนการมากกว่า `for..of` ตัวอย่างเช่น เราสามารถแบ่งกระบวนการวนซ้ำออกได้: วนซ้ำไปสักพัก หยุด ทำอย่างอื่น แล้วค่อยกลับมาทำต่อในภายหลัง

## Iterables และ array-likes [#array-like]

คำศัพท์สองคำนี้ดูเหมือนกัน แต่จริงๆ แล้วต่างกันมาก ควรทำความเข้าใจให้ดีเพื่อหลีกเลี่ยงความสับสน

- *Iterables* คือออบเจ็กต์ที่ implement เมธอด `Symbol.iterator` ดังที่อธิบายไว้ข้างต้น
- *Array-likes* คือออบเจ็กต์ที่มี index และ `length` จึงดูเหมือนอาร์เรย์

เมื่อใช้ JavaScript สำหรับงานจริงในเบราว์เซอร์หรือสภาพแวดล้อมอื่น เราอาจพบออบเจ็กต์ที่เป็น iterable หรือ array-like หรือทั้งสองอย่าง

ตัวอย่างเช่น สตริงเป็นทั้ง iterable (`for..of` ใช้ได้กับมัน) และ array-like (มี numeric index และ `length`)

แต่ iterable อาจไม่ใช่ array-like ก็ได้ และในทางกลับกัน array-like ก็อาจไม่ใช่ iterable ก็ได้

ตัวอย่างเช่น `range` ในตัวอย่างข้างต้นเป็น iterable แต่ไม่ใช่ array-like เพราะไม่มีพร็อพเพอร์ตี้แบบ index และ `length`

และนี่คือออบเจ็กต์ที่เป็น array-like แต่ไม่ใช่ iterable:

```js run
let arrayLike = { // มี index และ length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// เกิดข้อผิดพลาด (ไม่มี Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

ทั้ง iterable และ array-like มักจะ *ไม่ใช่อาร์เรย์* ไม่มีเมธอด `push`, `pop` เป็นต้น ซึ่งค่อนข้างไม่สะดวกถ้าเรามีออบเจ็กต์แบบนั้นและต้องการทำงานกับมันเหมือนกับอาร์เรย์ เช่น ถ้าอยากใช้ array methods กับ `range` จะทำอย่างไร?

## Array.from

มีเมธอด [Array.from](mdn:js/Array/from) ที่รับ iterable หรือ array-like และสร้างอาร์เรย์ "จริงๆ" จากมัน จากนั้นเราก็เรียก array methods ได้

ตัวอย่างเช่น:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (เมธอดทำงานได้แล้ว)
```

`Array.from` ที่บรรทัด `(*)` รับออบเจ็กต์มา ตรวจสอบว่าเป็น iterable หรือ array-like แล้วสร้างอาร์เรย์ใหม่และคัดลอกทุกรายการเข้าไป

เหมือนกันสำหรับ iterable:

```js run
// สมมติว่า range มาจากตัวอย่างข้างต้น
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (การแปลง array toString ทำงานได้)
```

ไวยากรณ์ครบถ้วนของ `Array.from` ยังรองรับอาร์กิวเมนต์ "mapping" เพิ่มเติมได้:
```js
Array.from(obj[, mapFn, thisArg])
```

อาร์กิวเมนต์ที่สองแบบเลือกได้คือ `mapFn` ซึ่งเป็นฟังก์ชันที่จะถูกนำไปใช้กับแต่ละ element ก่อนที่จะเพิ่มเข้าไปในอาร์เรย์ และ `thisArg` ช่วยให้เรากำหนดค่า `this` ให้กับมันได้

ตัวอย่างเช่น:

```js run
// สมมติว่า range มาจากตัวอย่างข้างต้น

// ยกกำลังสองตัวเลขแต่ละตัว
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

ที่นี่เราใช้ `Array.from` เพื่อแปลงสตริงให้เป็นอาร์เรย์ของตัวอักษร:

```js run
let str = '𝒳😂';

// แยก str ออกเป็นอาร์เรย์ของตัวอักษร
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

ต่างจาก `str.split` ตรงที่อาศัยคุณสมบัติ iterable ของสตริง ดังนั้นเหมือนกับ `for..of` จึงทำงานได้ถูกต้องกับ surrogate pairs

ในทางเทคนิค มันทำสิ่งเดียวกับ:

```js run
let str = '𝒳😂';

let chars = []; // Array.from ทำลูปแบบเดียวกันภายใน
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...แต่กระชับกว่า

เรายังสามารถสร้างฟังก์ชัน `slice` ที่รองรับ surrogate pairs ได้อีกด้วย:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// เมธอดดั้งเดิมไม่รองรับ surrogate pairs
alert( str.slice(1, 3) ); // ขยะ (สองชิ้นจาก surrogate pairs ต่างคู่กัน)
```


## สรุป

ออบเจ็กต์ที่ใช้ใน `for..of` ได้เรียกว่า *iterable*

- ในทางเทคนิค iterable ต้องมีเมธอดชื่อ `Symbol.iterator`
    - ผลลัพธ์ของ `obj[Symbol.iterator]()` เรียกว่า *iterator* ซึ่งจัดการกระบวนการวนซ้ำต่อไป
    - iterator ต้องมีเมธอดชื่อ `next()` ที่คืนค่าเป็นออบเจ็กต์ `{done: Boolean, value: any}` โดย `done:true` บ่งบอกว่ากระบวนการวนซ้ำสิ้นสุดแล้ว มิฉะนั้น `value` คือค่าถัดไป
- เมธอด `Symbol.iterator` ถูกเรียกอัตโนมัติโดย `for..of` แต่เราก็เรียกมันโดยตรงได้เช่นกัน
- Built-in iterables เช่นสตริงหรืออาร์เรย์ก็มี `Symbol.iterator` ให้มาด้วย
- String iterator รู้จัก surrogate pairs


ออบเจ็กต์ที่มีพร็อพเพอร์ตี้แบบ index และ `length` เรียกว่า *array-like* ออบเจ็กต์เหล่านี้อาจมีพร็อพเพอร์ตี้และเมธอดอื่นด้วย แต่ขาด built-in methods ของอาร์เรย์

ถ้าลองดูใน specification จะเห็นว่า built-in methods ส่วนใหญ่ถูกออกแบบมาให้ทำงานกับ iterable หรือ array-like แทน "real" arrays เพราะนั่นเป็นแนวคิดที่เป็นนามธรรมมากกว่า

`Array.from(obj[, mapFn, thisArg])` สร้างอาร์เรย์ "จริงๆ" จาก iterable หรือ array-like `obj` จากนั้นเราสามารถเรียก array methods บนมันได้ อาร์กิวเมนต์เพิ่มเติม `mapFn` และ `thisArg` ช่วยให้เราใช้ฟังก์ชันกับแต่ละรายการได้
