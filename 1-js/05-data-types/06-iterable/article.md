
# Iterables

*Iterable* คือแนวคิดที่ขยายออกมาจากอาร์เรย์ — ช่วยให้เราเอาออบเจ็กต์ใดก็ได้ไปใช้ใน `for..of` loop ได้

อาร์เรย์เป็น iterable อยู่แล้ว แต่ built-in object อื่นๆ ก็เป็น iterable ด้วย อย่างสตริงก็เช่นกัน

ถ้ามีออบเจ็กต์ที่ไม่ใช่อาร์เรย์ แต่แทนคอลเล็กชัน (list, set) ของบางอย่าง `for..of` ก็เป็นวิธีวนซ้ำที่ดีมาก มาดูกันว่าทำให้ใช้งานได้อย่างไร


## Symbol.iterator

วิธีที่เข้าใจง่ายที่สุดคือลองสร้าง iterable ขึ้นมาเอง

สมมติว่ามีออบเจ็กต์ที่ไม่ใช่อาร์เรย์ แต่เหมาะกับ `for..of`

เช่น ออบเจ็กต์ `range` ที่แทนช่วงของตัวเลข:

```js
let range = {
  from: 1,
  to: 5
};

// เราอยากให้ for..of ทำงานได้:
// for(let num of range) ... num=1,2,3,4,5
```

การทำให้ `range` เป็น iterable (เพื่อให้ `for..of` ใช้งานได้) ต้องเพิ่มเมธอดชื่อ `Symbol.iterator` ลงในออบเจ็กต์ ซึ่งเป็น built-in symbol พิเศษสำหรับเรื่องนี้โดยเฉพาะ

1. ตอนที่ `for..of` เริ่มทำงาน จะเรียกเมธอดนั้นหนึ่งครั้ง (ถ้าไม่พบจะเกิดข้อผิดพลาด) เมธอดต้องคืนค่าเป็น *iterator* — ออบเจ็กต์ที่มีเมธอด `next`
2. จากนั้น `for..of` จะทำงาน *กับออบเจ็กต์ที่คืนมาเท่านั้น*
3. ทุกครั้งที่ต้องการค่าถัดไป `for..of` จะเรียก `next()` บนออบเจ็กต์นั้น
4. ผลลัพธ์จาก `next()` ต้องอยู่ในรูป `{done: Boolean, value: any}` — `done=true` แปลว่าลูปจบแล้ว ถ้ายังไม่จบ `value` คือค่าถัดไป

ด้านล่างคือโค้ดครบถ้วนสำหรับ `range` พร้อมคำอธิบาย:

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

จุดสำคัญของ iterable คือการแยกหน้าที่กันอย่างชัดเจน (separation of concerns)

- ตัว `range` เองไม่มีเมธอด `next()`
- แต่เมื่อเรียก `range[Symbol.iterator]()` จะสร้างออบเจ็กต์ "iterator" ขึ้นมาอีกตัว แล้วเมธอด `next()` ของมันทำหน้าที่สร้างค่าในการวนซ้ำ

กล่าวคือ iterator แยกออกจากออบเจ็กต์ที่กำลังวนซ้ำ

ถ้าต้องการให้โค้ดกระชับขึ้น ก็รวมทั้งสองเข้าด้วยกันได้ โดยให้ `range` เป็น iterator ของตัวเองไปเลย

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

ตอนนี้ `range[Symbol.iterator]()` คืนค่าเป็นออบเจ็กต์ `range` เอง ซึ่งมีเมธอด `next()` ครบ และเก็บสถานะการวนซ้ำไว้ใน `this.current` กระชับขึ้นใช่ไหม? ใช่เลย และบางบริบทก็เหมาะดี

ข้อเสียคือ `for..of` สองตัวรันพร้อมกันบนออบเจ็กต์เดียวไม่ได้ เพราะทั้งคู่จะแชร์สถานะร่วมกัน — มี iterator แค่ตัวเดียวคือตัวออบเจ็กต์นั่นเอง แต่ก็ไม่ค่อยมีใครวนแบบขนานสองตัวพร้อมกันอยู่แล้ว แม้แต่ในสถานการณ์ async

```smart header="Infinite iterators"
Infinite iterators เป็นไปได้เช่นกัน เช่น `range` จะกลายเป็นอนันต์เมื่อกำหนด `range.to = Infinity` หรือสร้างออบเจ็กต์ iterable ที่ผลิตลำดับตัวเลขสุ่ม (pseudorandom) ต่อเนื่องไปเรื่อยๆ ก็ได้ ซึ่งมีประโยชน์ในหลายกรณี

`next` ไม่มีข้อจำกัด คืนค่าได้เรื่อยๆ ถือเป็นเรื่องปกติ

แน่นอนว่า `for..of` ที่วนซ้ำ iterable แบบนี้จะไม่มีวันจบ แต่หยุดได้เสมอด้วย `break`
```


## สตริงเป็น iterable

อาร์เรย์กับสตริงเป็น built-in iterables ที่ใช้บ่อยที่สุด

สำหรับสตริง `for..of` จะวนผ่านตัวอักษรทีละตัว:

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

อยากเข้าใจให้ลึกขึ้น ลองใช้ iterator โดยตรงดูกัน

เราจะวนสตริงแบบเดียวกับ `for..of` แต่เรียกเองด้วยมือ โค้ดด้านล่างสร้าง string iterator แล้วดึงค่าออกมาทีละตัว:

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

วิธีนี้ไม่ค่อยจำเป็นนัก แต่ควบคุมได้มากกว่า `for..of` เช่น วนไปสักพัก แล้วหยุด ไปทำอย่างอื่นก่อน แล้วค่อยกลับมาวนต่อทีหลัง

## Iterables และ array-likes [#array-like]

สองคำนี้ดูคล้ายกัน แต่จริงๆ ต่างกันมาก ควรเข้าใจให้ชัดเพื่อไม่ให้สับสน

- *Iterables* คือออบเจ็กต์ที่ implement เมธอด `Symbol.iterator` ตามที่อธิบายไว้ข้างต้น
- *Array-likes* คือออบเจ็กต์ที่มี index และ `length` ทำให้ดูเหมือนอาร์เรย์

ในงานจริงบนเบราว์เซอร์หรือสภาพแวดล้อมอื่น เราอาจเจอออบเจ็กต์ที่เป็น iterable หรือ array-like หรือทั้งสองอย่างพร้อมกัน

สตริงเป็นตัวอย่างที่ดี — เป็นทั้ง iterable (`for..of` ใช้ได้) และ array-like (มี numeric index และ `length`)

แต่ iterable ไม่จำเป็นต้องเป็น array-like และกลับกัน array-like ก็ไม่จำเป็นต้องเป็น iterable

`range` ในตัวอย่างข้างต้นเป็น iterable แต่ไม่ใช่ array-like เพราะไม่มีพร็อพเพอร์ตี้ index และ `length`

ด้านล่างคือออบเจ็กต์ที่เป็น array-like แต่ไม่ใช่ iterable:

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

ทั้ง iterable และ array-like มักจะ *ไม่ใช่อาร์เรย์* ไม่มีเมธอด `push`, `pop` หรืออื่นๆ ซึ่งไม่สะดวกเลยถ้าอยากใช้งานเหมือนอาร์เรย์ เช่น อยากใช้ array methods กับ `range` จะทำอย่างไรดี?

## Array.from

[Array.from](mdn:js/Array/from) คือเมธอดที่รับ iterable หรือ array-like แล้วสร้างอาร์เรย์ "จริงๆ" ออกมา จากนั้นก็เรียก array methods ได้ตามปกติ

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

`Array.from` ที่บรรทัด `(*)` รับออบเจ็กต์มาตรวจว่าเป็น iterable หรือ array-like แล้วสร้างอาร์เรย์ใหม่และคัดลอกทุกรายการเข้าไป

กับ iterable ก็ทำได้เหมือนกัน:

```js run
// สมมติว่า range มาจากตัวอย่างข้างต้น
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (การแปลง array toString ทำงานได้)
```

`Array.from` ยังรองรับอาร์กิวเมนต์ "mapping" เพิ่มเติม:
```js
Array.from(obj[, mapFn, thisArg])
```

`mapFn` คืออาร์กิวเมนต์ที่สองซึ่งเลือกใส่หรือไม่ก็ได้ — เป็นฟังก์ชันที่จะถูกเรียกกับแต่ละ element ก่อนเพิ่มเข้าอาร์เรย์ และ `thisArg` ช่วยกำหนด `this` ให้กับฟังก์ชันนั้นได้

ตัวอย่างเช่น:

```js run
// สมมติว่า range มาจากตัวอย่างข้างต้น

// ยกกำลังสองตัวเลขแต่ละตัว
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

ทีนี้ลองใช้ `Array.from` แปลงสตริงเป็นอาร์เรย์ของตัวอักษรดูบ้าง:

```js run
let str = '𝒳😂';

// แยก str ออกเป็นอาร์เรย์ของตัวอักษร
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

ต่างจาก `str.split` ตรงที่อาศัยคุณสมบัติ iterable ของสตริง จึงเหมือนกับ `for..of` คือรองรับ surrogate pairs ได้ถูกต้อง

จริงๆ แล้ว ภายในมันทำแบบเดียวกับ:

```js run
let str = '𝒳😂';

let chars = []; // Array.from ทำลูปแบบเดียวกันภายใน
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...แต่กระชับกว่านั่นเอง

นอกจากนี้ยังสร้างฟังก์ชัน `slice` ที่รองรับ surrogate pairs ได้ด้วย:

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
    - ผลลัพธ์จากการเรียก `obj[Symbol.iterator]()` คือ *iterator* ซึ่งรับช่วงดูแลกระบวนการวนซ้ำต่อไป
    - iterator ต้องมีเมธอด `next()` ที่คืนค่าเป็น `{done: Boolean, value: any}` — `done:true` หมายความว่าวนซ้ำจบแล้ว ถ้ายังไม่จบ `value` คือค่าถัดไป
- `for..of` เรียก `Symbol.iterator` อัตโนมัติ แต่เรียกโดยตรงก็ได้เช่นกัน
- Built-in iterables เช่นสตริงและอาร์เรย์มี `Symbol.iterator` ติดมาด้วย
- String iterator รองรับ surrogate pairs


ออบเจ็กต์ที่มีพร็อพเพอร์ตี้แบบ index และ `length` เรียกว่า *array-like* อาจมีพร็อพเพอร์ตี้และเมธอดอื่นด้วย แต่ไม่มี built-in methods ของอาร์เรย์

ลองดูใน specification จะเห็นว่า built-in methods ส่วนใหญ่ออกแบบมาให้ทำงานกับ iterable หรือ array-like แทน "real" arrays เพราะเป็นแนวคิดที่ abstract กว่า

`Array.from(obj[, mapFn, thisArg])` สร้างอาร์เรย์จริงๆ จาก iterable หรือ array-like `obj` แล้วใช้ array methods ได้ทันที อาร์กิวเมนต์เสริม `mapFn` และ `thisArg` ช่วยให้ใส่ฟังก์ชัน mapping กับแต่ละรายการได้
