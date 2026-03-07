# ทำความรู้จัก Rest parameters และ spread syntax 

ในภาษา JavaScript จะมี built-in ฟังก์ชั่นที่ช่วยทำงานให้เราต่าง ๆ มากมาย

ยกตัวอย่าง:

- `Math.max(arg1, arg2, ..., argN)` -- หาจำนวนที่มีค่ามากที่สุดในกลุ่ม.
- `Object.assign(dest, src1, ..., srcN)` -- ก๊อบปี้ค่าของ `src1..N` ไปที่ `dest`.
- และอื่น ๆ อีกมากมาย

ในบทนี้ เราจะมาเรียนรู้ built-in ฟังก์ชั่นอีกรูปแบบนึง ได้แก่ Rest parameters และ spread syntax

## Rest parameters `...`

ฟังก์ชั่นที่สามารถรับ arguments กี่ตัวก็ได้ ไม่ว่าจะตั้งค่าแบบไหน

ตัวอย่าง:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

ในโค้ดตัวอย่างนี้ จะไม่เกิด error จากการที่มีตัวแปรที่มากไป แต่ ฟังก์ชั่น sum จะถูกคำนวนจาก arguments แค่ 2 ตัวแรกเท่านั้น

parameters ที่เหลือสามารถเขียนเพิ่มในฟังก์ชั่นได้ผ่านการใช้จุดสามจุด `...` แล้วตามด้วยชื่อของ array นั้น โดยจุดหมายถึง การรวม parameters ที่เหลือใน array ด้วย

ยกตัวอย่าง การรวม arguments ทั้งหมดใน array `args`:

```js run
function sumAll(...args) { // args คือชื่อของ array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

เราสามารถใช้ parameters ตัวแรก ๆ เป็นตัวแปร และรวม parameter ที่เหลือใน Rest parameters ได้

ตัวอย่างการให้ 2 parameter แรกเป็นตัวแปร และรวม parameter ที่เหลือใน array ที่ชื่อว่า `titles`

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // parameter ที่เหลือจะถูกรวมใน titles array
  // ตัวอย่าง titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="The rest parameters ต้องอยู่ท้ายสุด"
เพราะ Rest parameters จะรวม arguments ที่เหลืออยู่ทั้งหมด ดังนั้นการเขียนแบบในตัวอย่างด้านล่างจะไม่สมเหตุสมผลและ ก่อให้เกิด error:

```js
function f(arg1, ...rest, arg2) { // arg2 หลังจาก ...rest ?!
  // error
}
```

ฉะนั้น `...rest` ต้องอยู่ท้ายสุด
````

## ตัวแปร "arguments"

มี object นึงที่ทำหน้าที่เหมือน array เรียกว่า `arguments` ที่ภายในจะมี argument เรียงตาม index

ยกตัวอย่าง

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // เราสามารถวนซ้ำกับมันได้
  // for(let arg of arguments) alert(arg);
}

// แสดงผลเป็น: 2, Julius, Caesar
showName("Julius", "Caesar");

// แสดงผลเป็น: 1, Ilya, undefined (no second argument)
showName("Ilya");
```

ในสมัยก่อนที่จะมี rest parameters การใช้ `arguments` เป็นวิธีที่จะรวมทุก ๆ arguments ของฟังก์ชั่นนั้น ๆ ซึ่งคุณอาจจะเห็นได้จากในโค้ดเก่า ๆ

แต่ข้อเสียของ `arguments` คือมันมีความเป็น array และยังสามารถวนซ้ำกับมันเพื่ออ่านค่า argument แต่ละตัวได้ แต่มันก็ไม่ใช่ array เพราะมันไม่สามารถเรียกใช้ array methods ได้ เช่นเราไม่สามารถใช้ `arguments.map(...)` ได้

แม้มันจะมีทุก ๆ arguments แต่เราไม่สามารถเรียกใช้บางส่วนแบบที่ rest parameters ทำได้

ดังนั้นเมื่อเราจะใช้ฟีเจอร์นี้ rest parameters จึงเหมาะสมกว่า

````smart header="Arrow functions จะไม่มี `\"arguments\"`"
ถ้าเราจะเรียกใช้ object `arguments` จาก arrow function มันจะได้ผลลัพธ์เหมือนฟังก์ชั่นปกติทั่วไป

ตัวอย่าง:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

ถ้าเราจำได้ arrow functions จะไม่มี `this` เป็นของตัวเอง และตอนนี้เราก็รู้แล้วว่า arrow functions ก็ไม่มี object `arguments` เหมือนกัน
````


## Spread syntax [#spread-syntax]

จากที่เราได้เห็นการดึง array จากกลุ่มของ parameters แล้ว

แต่ในบางครั้งเราต้องการทำสิ่งตรงกันข้าม

อย่างเช่น built-in ฟังก์ชั่น [Math.max](mdn:js/Math/max) ที่จะหาจำนวนที่มีค่ามากที่สุดในกลุ่ม:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

เรามี array ที่มีค่าดังนี้ `[3, 5, 1]`. เราจะเรียกใช้ `Math.max` กับมันได้อย่างไร ?

การเรียกใช้แบบ "as is" คงจะไม่เวิร์ค เพราะ `Math.max` จะรับค่าเฉพาะ arguments ที่เป็นตัวเลข ไม่ใช่ array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

และเราก็ไม่สามารถเรียกใช้ตัวแปรแต่ละตัวจาก array แบบนี้ได้ในโค้ด `Math.max(arr[0], arr[1], arr[2])`, เพราะเราไม่มีทางรู้ได้เลยว่าใน array จะมีตัวแปรกี่ตัว ในการทำงานจริงคงจะไม่ได้มีแค่ตัวสองตัว หรือบางทีอาจจะไม่มีเลย นั่นแหละคือปัญหา

*Spread syntax* จะเข้ามาช่วยเหลือ โดยหน้าตามันจะเหมือนกับ rest parameters แถมยังใช้ `...` เหมือนกันอีก แต่การทำงานค่อนข้างแตกต่างกัน

เมื่อ `...arr` ถูกใช้ในการเรียกฟังก์ชั่นมันจะกระจาย object `arr` ออกมาเป็นกลุ่มของ arguments.

ตัวอย่างเช่น `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (กระจาย array ออกเป็นกลุ่มของ arguments)
```

นอกจากนี้เรายังสามารถใช้ Spread syntax ได้มากกว่าหนึ่งตัว:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

หรือเราจะผสม Spread syntax กับตัวแปรธรรมดาก็ย่อมได้:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

และ Spread syntax ยังสามารถใช้เพื่อรวม array 2 อันเข้าด้วยกัน:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, ต่อด้วย arr, ต่อด้วย 2, ต่อด้วย arr2)
```

ในตัวอย่างข้างต้น เราใช้ array เพื่อสาธิตการใช้ spread syntax แต่อะไรก็ตามที่เราสามารถวนซ้ำกับมันได้ก็สามารถทำแบบนี้ได้เช่นกัน

ยกตัวอย่าง เราสามารถใช้ spread syntax เพื่อที่จะแปลง string เป็น array of characters:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

หลักการทำงานของ Spread syntax คือการใช้การวนซ้ำรวม elements แบบที่ `for..of` ทำ

ดังนั้นสำหรับ string, `for..of` จะคืนค่ามาเป็น characters และ `...str` จะคืนค่ามาเป็น `"H","e","l","l","o"`. ในรูปแบบของ array of string `[...str]`.

สำหรับงานบางประเภท เราสามารถใช้ `Array.from`, เพราะมันสามารถแปลงข้อมูลใด ๆ ที่เราสามารถวนซ้ำกับมันได้ (เช่น string) ให้เป็น array ได้:

```js run
let str = "Hello";

// Array.from แปลงข้อมูลใด ๆ ที่เราสามารถวนซ้ำกับมันได้ให้เป็น array
alert( Array.from(str) ); // H,e,l,l,o
```

ผลลัพธ์ที่ได้จะเหมือนกับ `[...str]`.

แต่ทั้งนี้ทั้ง ก็ยังมีความแตกต่างระหว่าง `Array.from(obj)` และ `[...obj]`:

- `Array.from` สามารถทำงานกับข้อมูลที่เป็น array-likes และข้อมูลที่เราสามารถวนซ้ำกับมันได้
- Spread syntax ทำงานได้กับแค่ข้อมูลที่เราสามารถวนซ้ำกับมันได้

ดังนั้น สำหรับการเปลี่ยนบางสิ่งให้กลายเป็น array, `Array.from` ดูจะเหมาะสมมากกว่า


## การก๊อบปี้ array/object

จำได้มั้ยว่าเราเคยพูดถึง `Object.assign()` [in the past](info:object-copy#cloning-and-merging-object-assign)?

เราสามารถทำแบบ `Object.assign()` ได้ ผ่านการใช้ spread syntax.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // กระจาย array ออกมาเป็นกลุ่มของ parameters
                        // จากนั้นนำผลลัพธ์ไปสร้าง array ตัวใหม่
*/!*

// แล้ว array ตัวใหม่ กับ array ตัวเดิมมีค่าเหมือนกันมั้ย ?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// แล้ว array 2 ตัวนั้นถูกอ้างอิงจากที่เดียวกันหรือป่าว ?
alert(arr === arrCopy); // false (ไม่ได้ถูกอ้างอิงจากที่เดียวกัน)

// การเปลี่ยน array ต้นแบบ จะไม่เปลี่ยนค่า array ตัวใหม่:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

จำไว้ว่า มันเป็นไปได้ที่จะทำเหมือนกัน ตอนที่เราจะก๊อปปี้ object:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // กระจาย object ออกมาเป็นกลุ่มของ parameters
                          // จากนั้นนำผลลัพธ์ไปสร้าง object ตัวใหม่
*/!*

// แล้ว object ตัวใหม่ กับ object ตัวเดิมมีค่าเหมือนกันมั้ย ?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// แล้ว object 2 ตัวนั้นถูกอ้างอิงจากที่เดียวกันหรือป่าว ?
alert(obj === objCopy); // false (ไม่ได้ถูกอ้างอิงจากที่เดียวกัน)

// การเปลี่ยน object ต้นแบบ จะไม่เปลี่ยนค่า object ตัวใหม่:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

ด้วยวิธีการนี้จะทำให้การเขียนก๊อปปี้ object เขียนได้สั้นกว่า `let objCopy = Object.assign({}, obj)` หรือสำหรับ array คือ `let arrCopy = Object.assign([], arr)` ดังนั้นเราจึงใช้พยายามใช้มันบ่อย ๆ เท่าที่จะทำได้


## สรุป

เมื่อเราเห็น `"..."` ในโค้ด, มันอาจจะเป็น rest parameters หรือ spread syntax ก็ได้

แต่มันก็มีวิธีง่าย ๆ ในการแยกแยะความแตกต่างระหว่างสองสิ่งนี้

- เมื่อ `...` ปรากฏอยู่ที่ด้านท้ายของ parameters ในฟังก์ชั่น, มันคือ "rest parameters" ซึ่งจะรวม argument ที่เหลือใน array
- เมื่อ `...` ปรากฏอยู่ ตอนที่เรียกใช้ฟังก์ชั่น, มันคือ "spread syntax" ซึ่งจะกระจาย array ออกมาเป็นกลุ่มของ parameter

Patterns การใช้งาน:

- Rest parameters มักใช้กับฟังก์ชั่นที่สามารถรับ arguments กี่ตัวก็ได้
- Spread syntax จะใช้กับการเรียกใช้ array ในฟังก์ชั่น ที่ในฟังก์ชั่นนั้นอาจจะมีหลาย arguments

ทั้งสองอย่างนี้ช่วยให้เราทำงานกับ array ของ parameters ได้ง่ายยิ่งขึ้น

ตัว arguments ในฟังก์ชั่นยังคงสามารถเรียกใช้ผ่าน "old-style" `arguments`: array-like iterable object ได้เหมือนเดิม
