# Destructuring assignment

โครงสร้างข้อมูลที่ใช้บ่อยที่สุดสองอย่างใน JavaScript คือ `Object` และ `Array`

- ออบเจ็กต์ช่วยให้เราสร้างหน่วยเดียวที่เก็บข้อมูลโดยใช้ key
- อาร์เรย์ช่วยให้เราเก็บข้อมูลเป็นรายการที่มีลำดับ

อย่างไรก็ตาม เวลาที่เราส่งสิ่งเหล่านี้ไปให้ฟังก์ชัน บางครั้งก็ไม่ต้องการข้อมูลทั้งหมด อาจต้องการแค่บางส่วนเท่านั้น

*Destructuring assignment* คือไวยากรณ์พิเศษที่ช่วยให้เรา "แกะ" อาร์เรย์หรือออบเจ็กต์ออกเป็นตัวแปรหลายตัวได้ในทีเดียว ซึ่งบางครั้งสะดวกกว่ามาก

destructuring ยังทำงานได้ดีกับฟังก์ชันที่มีพารามิเตอร์จำนวนมาก มีค่าเริ่มต้น และอื่นๆ อีกมาก เดี๋ยวเราจะเห็นกัน

## Array destructuring

ตัวอย่างการแตกอาร์เรย์ออกเป็นตัวแปร:

```js
// มีอาร์เรย์ที่เก็บชื่อและนามสกุล
let arr = ["John", "Smith"]

*!*
// destructuring assignment
// กำหนด firstName = arr[0]
// และ surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

ทีนี้เราทำงานกับตัวแปรได้เลย แทนที่จะอ้างอิง index ของอาร์เรย์

ดูดีมากเมื่อใช้ร่วมกับ `split` หรือเมธอดอื่นๆ ที่คืนค่าเป็นอาร์เรย์:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

ไวยากรณ์นี้เรียบง่ายดี แต่ก็มีรายละเอียดที่น่าสนใจอยู่บ้าง มาดูตัวอย่างเพิ่มเติมเพื่อทำความเข้าใจให้ลึกขึ้นกัน

````smart header="\"Destructuring\" ไม่ได้แปลว่า \"ทำลาย\""
เรียกว่า "destructuring assignment" เพราะมัน "แตกโครงสร้าง" โดยการคัดลอกค่าไปใส่ตัวแปร แต่อาร์เรย์ต้นฉบับไม่ได้ถูกแก้ไขแต่อย่างใด

มันเป็นแค่วิธีเขียนที่สั้นกว่านี้:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="ข้ามสมาชิกที่ไม่ต้องการด้วยเครื่องหมายจุลภาค"
สมาชิกของอาร์เรย์ที่ไม่ต้องการสามารถข้ามได้ด้วยเครื่องหมายจุลภาคเพิ่มเติม:

```js run
*!*
// ไม่ต้องการสมาชิกตัวที่สอง
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

ในโค้ดด้านบน สมาชิกตัวที่สองของอาร์เรย์ถูกข้ามไป ตัวที่สามถูกกำหนดให้กับ `title` และสมาชิกที่เหลือก็ถูกข้ามเช่นกัน (เพราะไม่มีตัวแปรรับ)
````

````smart header="ใช้ได้กับ iterable ใดๆ ทางขวามือ"

จริงๆ แล้ว เราใช้ได้กับ iterable ใดก็ได้ ไม่ใช่แค่อาร์เรย์:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
ใช้ได้เพราะภายในแล้ว destructuring assignment ทำงานโดยการ iterate ค่าทางขวา มันคือน้ำตาลทางไวยากรณ์ของการใช้ `for..of` กับค่าทางขวาของ `=` แล้วกำหนดค่าให้ตัวแปร
````


````smart header="กำหนดให้สิ่งใดก็ได้ทางซ้ายมือ"
เราใช้ "สิ่งที่รับการกำหนดค่าได้" ทางซ้ายมือก็ได้

เช่น พร็อพเพอร์ตี้ของออบเจ็กต์:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="วนลูปด้วย .entries()"
ในบทก่อน เราได้เห็นเมธอด [Object.entries(obj)](mdn:js/Object/entries) แล้ว

เราใช้มันร่วมกับ destructuring เพื่อวนลูปผ่าน key-value ของออบเจ็กต์ได้:

```js run
let user = {
  name: "John",
  age: 30
};

// วนลูปผ่าน key-value
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John แล้วก็ age:30
}
```

โค้ดที่คล้ายกันสำหรับ `Map` จะง่ายกว่า เพราะมัน iterable อยู่แล้ว:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map iterate เป็นคู่ [key, value] สะดวกมากสำหรับ destructuring
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John แล้วก็ age:30
}
```
````

````smart header="เทคนิคสลับค่าตัวแปร"
มีเทคนิคที่รู้จักกันดีในการสลับค่าของตัวแปรสองตัวโดยใช้ destructuring assignment:

```js run
let guest = "Jane";
let admin = "Pete";

// สลับค่า: ให้ guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (สลับสำเร็จ!)
```

เราสร้างอาร์เรย์ชั่วคราวที่มีสองตัวแปร แล้ว destructure มันในลำดับที่สลับกัน

วิธีนี้ใช้สลับมากกว่าสองตัวแปรก็ได้
````

### The rest '...'

โดยปกติแล้ว ถ้าอาร์เรย์ยาวกว่ารายการตัวแปรทางซ้าย สมาชิก "ส่วนเกิน" จะถูกละทิ้ง

ตัวอย่างเช่น ที่นี่นำแค่สองรายการ ที่เหลือถูกละทิ้ง:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// รายการที่เหลือไม่ได้ถูกกำหนดให้ที่ไหน
```

ถ้าอยากเก็บทุกอย่างที่เหลือด้วย เราสามารถเพิ่มพารามิเตอร์อีกตัวที่รับ "ส่วนที่เหลือ" โดยใช้จุดสามจุด `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// rest คืออาร์เรย์ของสมาชิก เริ่มตั้งแต่ตัวที่ 3
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

ค่าของ `rest` คืออาร์เรย์ของสมาชิกที่เหลือ

เราตั้งชื่อตัวแปรอื่นแทน `rest` ได้ แค่ต้องมีจุดสามจุดอยู่ข้างหน้าและวางไว้เป็นตัวสุดท้ายใน destructuring assignment:

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// ตอนนี้ titles = ["Consul", "of the Roman Republic"]
```

### Default values

ถ้าอาร์เรย์สั้นกว่ารายการตัวแปรทางซ้าย จะไม่เกิด error แต่ค่าที่ขาดหายไปจะเป็น undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

ถ้าต้องการค่า "เริ่มต้น" มาแทนที่ค่าที่ขาดหายไป สามารถระบุได้ด้วย `=`:

```js run
*!*
// ค่าเริ่มต้น
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (มาจากอาร์เรย์)
alert(surname); // Anonymous (ใช้ค่าเริ่มต้น)
```

ค่าเริ่มต้นอาจเป็นนิพจน์ที่ซับซ้อนหรือแม้แต่การเรียกฟังก์ชันก็ได้ และจะถูกประเมินผลเฉพาะเมื่อไม่มีค่าให้เท่านั้น

ตัวอย่างเช่น เราใช้ฟังก์ชัน `prompt` สำหรับค่าเริ่มต้นสองตัว:

```js run
// เรียก prompt เฉพาะสำหรับ surname เท่านั้น
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (มาจากอาร์เรย์)
alert(surname); // แล้วแต่ที่ป้อนใน prompt
```

สังเกตว่า `prompt` จะทำงานเฉพาะกับค่าที่ขาดหาย (`surname`) เท่านั้น

## Object destructuring

destructuring assignment ใช้ได้กับออบเจ็กต์ด้วย

ไวยากรณ์พื้นฐานคือ:

```js
let {var1, var2} = {var1:…, var2:…}
```

ทางขวามือเป็นออบเจ็กต์ที่มีอยู่แล้วที่เราต้องการแตกออกเป็นตัวแปร ส่วนทางซ้ายมือมี "รูปแบบ" ที่คล้ายออบเจ็กต์สำหรับพร็อพเพอร์ตี้ที่ต้องการ ในรูปแบบง่ายที่สุดก็คือรายชื่อตัวแปรใน `{...}`

ตัวอย่างเช่น:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

พร็อพเพอร์ตี้ `options.title`, `options.width` และ `options.height` ถูกกำหนดให้กับตัวแปรที่ตรงกัน

ลำดับไม่สำคัญ แบบนี้ก็ใช้ได้:

```js
// เปลี่ยนลำดับใน let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

รูปแบบทางซ้ายมืออาจซับซ้อนกว่านี้ได้ โดยระบุการจับคู่ระหว่างพร็อพเพอร์ตี้กับตัวแปร

ถ้าต้องการกำหนดพร็อพเพอร์ตี้ให้กับตัวแปรที่มีชื่อต่างกัน เช่น ให้ `options.width` ไปอยู่ในตัวแปรชื่อ `w` เราระบุชื่อตัวแปรได้ด้วยเครื่องหมายทวิภาค:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { พร็อพเพอร์ตี้ต้นทาง: ตัวแปรปลายทาง }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

เครื่องหมายทวิภาคหมายถึง "อะไร : ไปที่ไหน" ในตัวอย่างด้านบน พร็อพเพอร์ตี้ `width` ไปที่ `w`, `height` ไปที่ `h` และ `title` ถูกกำหนดให้กับชื่อเดิม

สำหรับพร็อพเพอร์ตี้ที่อาจไม่มีอยู่ เราตั้งค่าเริ่มต้นได้ด้วย `"="` แบบนี้:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

เช่นเดียวกับอาร์เรย์หรือพารามิเตอร์ของฟังก์ชัน ค่าเริ่มต้นอาจเป็นนิพจน์หรือการเรียกฟังก์ชันก็ได้ และจะถูกประเมินผลเฉพาะเมื่อไม่มีค่าให้

ในโค้ดด้านล่าง `prompt` ถามค่าสำหรับ `width` แต่ไม่ถามสำหรับ `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (แล้วแต่ค่าที่ได้จาก prompt)
```

เราใช้ทั้งเครื่องหมายทวิภาคและเครื่องหมายเท่ากับร่วมกันก็ได้:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

ถ้ามีออบเจ็กต์ที่ซับซ้อนและมีหลายพร็อพเพอร์ตี้ เราดึงเฉพาะที่ต้องการมาได้:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// ดึงเฉพาะ title มาเป็นตัวแปร
let { title } = options;

alert(title); // Menu
```

### The rest pattern "..."

แล้วถ้าออบเจ็กต์มีพร็อพเพอร์ตี้มากกว่าจำนวนตัวแปรที่เรามีล่ะ? เราเก็บบางส่วนแล้วกำหนด "ส่วนที่เหลือ" ไว้ที่ไหนได้ไหม?

เราใช้ rest pattern ได้เหมือนกับที่ทำกับอาร์เรย์ ซึ่งบราวเซอร์เก่าบางตัว (IE) ไม่รองรับ แต่ใช้ Babel แก้ได้ บราวเซอร์สมัยใหม่ใช้ได้ทั้งนั้น

ดูตัวอย่าง:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = พร็อพเพอร์ตี้ชื่อ title
// rest = ออบเจ็กต์ที่เก็บพร็อพเพอร์ตี้ที่เหลือ
let {title, ...rest} = options;
*/!*

// ตอนนี้ title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="ข้อควรระวังถ้าไม่มี `let`"
ในตัวอย่างด้านบน ตัวแปรถูกประกาศไว้ในการกำหนดค่า: `let {…} = {…}` แน่นอนว่าเราใช้ตัวแปรที่มีอยู่แล้วได้ โดยไม่ต้องมี `let` แต่มีข้อระวัง

แบบนี้จะไม่ทำงาน:
```js run
let title, width, height;

// เกิดข้อผิดพลาดในบรรทัดนี้
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

ปัญหาคือ JavaScript ตีความ `{...}` ในโค้ดหลัก (ที่ไม่ได้อยู่ในนิพจน์อื่น) ว่าเป็น code block ซึ่งใช้จัดกลุ่มคำสั่งได้แบบนี้:

```js run
{
  // code block
  let message = "Hello";
  // ...
  alert( message );
}
```

ดังนั้น JavaScript จึงสันนิษฐานว่าเป็น code block และเกิด error ทั้งๆ ที่เราต้องการ destructuring

เพื่อบอก JavaScript ว่าไม่ใช่ code block เราครอบนิพจน์ด้วยวงเล็บ `(...)`:

```js run
let title, width, height;

// โอเคแล้ว
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Nested destructuring

ถ้าออบเจ็กต์หรืออาร์เรย์มีออบเจ็กต์หรืออาร์เรย์ซ้อนกันอยู่ข้างใน เราใช้รูปแบบทางซ้ายมือที่ซับซ้อนขึ้นเพื่อดึงข้อมูลจากส่วนที่ลึกกว่าได้

ในโค้ดด้านล่าง `options` มีออบเจ็กต์อีกตัวอยู่ใน `size` และมีอาร์เรย์ใน `items` รูปแบบทางซ้ายมือของการกำหนดค่ามีโครงสร้างเดียวกันเพื่อดึงค่าออกมา:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destructuring assignment แบ่งเขียนหลายบรรทัดเพื่อความชัดเจน
let {
  size: { // ใส่ size ที่นี่
    width,
    height
  },
  items: [item1, item2], // กำหนด items ที่นี่
  title = "Menu" // ไม่มีในออบเจ็กต์ (ใช้ค่าเริ่มต้น)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

พร็อพเพอร์ตี้ทั้งหมดของออบเจ็กต์ `options` ยกเว้น `extra` ที่ไม่อยู่ทางซ้ายมือ ถูกกำหนดให้กับตัวแปรที่ตรงกัน:

![](destructuring-complex.svg)

สุดท้ายเราได้ตัวแปร `width`, `height`, `item1`, `item2` และ `title` จากค่าเริ่มต้น

สังเกตว่าไม่มีตัวแปรสำหรับ `size` และ `items` เพราะเราดึงเนื้อหาข้างในออกมาแทน

## Smart function parameters

มีบางครั้งที่ฟังก์ชันมีพารามิเตอร์จำนวนมาก ส่วนใหญ่เป็นพารามิเตอร์ optional ซึ่งพบบ่อยในส่วน user interface ลองนึกภาพฟังก์ชันที่สร้างเมนู อาจมีความกว้าง ความสูง หัวข้อ รายการ และอื่นๆ

วิธีเขียนฟังก์ชันแบบนี้ที่ไม่ดีคือ:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

ปัญหาในทางปฏิบัติคือต้องจำลำดับของอาร์กิวเมนต์ ปกติ IDE จะช่วยเราได้ โดยเฉพาะถ้าโค้ดมี documentation ที่ดี แต่ก็ยังยุ่งยาก อีกปัญหาคือจะเรียกฟังก์ชันยังไงเมื่อพารามิเตอร์ส่วนใหญ่ใช้ค่าเริ่มต้นได้

แบบนี้เหรอ?

```js
// undefined ตรงที่ค่าเริ่มต้นใช้ได้
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

ดูน่าเกลียดมาก และยิ่งอ่านไม่รู้เรื่องเลยถ้ามีพารามิเตอร์มากขึ้น

destructuring มาช่วยได้!

เราส่งพารามิเตอร์เป็นออบเจ็กต์ แล้วให้ฟังก์ชัน destructure เป็นตัวแปรทันที:

```js run
// ส่งออบเจ็กต์ไปให้ฟังก์ชัน
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...แล้วมันแตกออกเป็นตัวแปรทันที
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – มาจาก options
  // width, height – ใช้ค่าเริ่มต้น
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

เราใช้ destructuring ที่ซับซ้อนกว่านี้ได้ด้วย ทั้งออบเจ็กต์ซ้อนและการแมปด้วยทวิภาค:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width ไปที่ w
  height: h = 200, // height ไปที่ h
  items: [item1, item2] // สมาชิกแรกของ items ไปที่ item1 ตัวที่สองไปที่ item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

ไวยากรณ์แบบเต็มเหมือนกับ destructuring assignment:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

สำหรับออบเจ็กต์ของพารามิเตอร์ จะมีตัวแปร `varName` สำหรับพร็อพเพอร์ตี้ `incomingProperty` โดยมีค่าเริ่มต้นเป็น `defaultValue`

พึงระวังว่า destructuring แบบนี้สันนิษฐานว่า `showMenu()` ต้องได้รับอาร์กิวเมนต์ ถ้าต้องการให้ทุกค่าใช้ค่าเริ่มต้น ต้องระบุออบเจ็กต์ว่าง:

```js
showMenu({}); // โอเค ทุกค่าใช้ค่าเริ่มต้น

showMenu(); // แบบนี้จะ error
```

แก้ได้โดยกำหนดให้ `{}` เป็นค่าเริ่มต้นของออบเจ็กต์พารามิเตอร์ทั้งหมด:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

ในโค้ดด้านบน ออบเจ็กต์อาร์กิวเมนต์ทั้งหมดจะเป็น `{}` โดยค่าเริ่มต้น จึงมีของให้ destructure เสมอ

## Summary

- Destructuring assignment ช่วยให้แมปออบเจ็กต์หรืออาร์เรย์ไปยังตัวแปรหลายตัวได้ทันที
- ไวยากรณ์แบบเต็มสำหรับออบเจ็กต์:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    หมายความว่าพร็อพเพอร์ตี้ `prop` จะไปที่ตัวแปร `varName` และถ้าไม่มีพร็อพเพอร์ตี้นั้น จะใช้ค่า `default`

    พร็อพเพอร์ตี้ที่ไม่มีการแมปจะถูกคัดลอกไปยังออบเจ็กต์ `rest`

- ไวยากรณ์แบบเต็มสำหรับอาร์เรย์:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

    สมาชิกแรกไปที่ `item1` ตัวที่สองไปที่ `item2` ที่เหลือทั้งหมดสร้างเป็นอาร์เรย์ `rest`

- ดึงข้อมูลจากอาร์เรย์/ออบเจ็กต์ที่ซ้อนกันได้ โดยรูปแบบทางซ้ายมือต้องมีโครงสร้างเดียวกับทางขวามือ
