# การแปลงออบเจ็กต์เป็นค่าปฐมภูมิ

เกิดอะไรขึ้นเมื่อเรานำออบเจ็กต์ไปบวก (`obj1 + obj2`) ลบ (`obj1 - obj2`) หรือแสดงผลด้วย `alert(obj)`?

ใน JavaScript เราไม่สามารถกำหนดพฤติกรรมของตัวดำเนินการเมื่อใช้กับออบเจ็กต์ได้เอง แตกต่างจากบางภาษาเช่น Ruby หรือ C++ ที่สามารถใช้เมท็อดพิเศษเพื่อควบคุมการทำงานของตัวดำเนินการได้ 

<<<<<<< HEAD
ในกรณีเหล่านี้ ออบเจ็กต์จะถูกแปลงเป็นค่าปฐมภูมิ (primitive value) โดยอัตโนมัติก่อน จากนั้นการดำเนินการจะเกิดขึ้นกับค่าปฐมภูมินั้น และส่งผลลัพธ์กลับมาเป็นค่าปฐมภูมิเช่นกัน
=======
JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

นี่เป็นข้อจำกัดที่สำคัญ: ผลลัพธ์ของ `obj1 + obj2` (หรือการดำเนินการทางคณิตศาสตร์อื่นๆ) ไม่สามารถเป็นออบเจ็กต์ได้ 

<<<<<<< HEAD
ดังนั้น เราจึงไม่สามารถนิยามออบเจ็กต์ที่แทนเวกเตอร์หรือเมทริกซ์ แล้วคาดหวังให้การบวกออบเจ็กต์เหล่านั้นเข้าด้วยกัน ทำให้ได้เวกเตอร์หรือเมทริกซ์ใหม่ที่ "รวม" ค่าเข้าด้วยกัน ข้อจำกัดนี้ทำให้ไม่สามารถเขียนโค้ดในลักษณะนั้นได้เลย
=======
That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ด้วยเหตุนี้ การทำงานทางคณิตศาสตร์โดยใช้ออบเจ็กต์จึงมีใช้น้อยมากในโปรเจ็กต์จริง และถ้าเกิดขึ้นมักจะเป็นเพราะข้อผิดพลาดในการเขียนโค้ดมากกว่า

<<<<<<< HEAD
ในบทความนี้ เราจะเรียนรู้กระบวนการแปลงออบเจ็กต์เป็นค่าปฐมภูมิ และวิธีควบคุมกระบวนการนั้นด้วยตัวเอง โดยมีจุดประสงค์ 2 ประการ:
=======
So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

1. เพื่อเข้าใจสิ่งที่เกิดขึ้นเมื่อมีข้อผิดพลาดในการเขียนโค้ด ที่ทำให้เกิดการแปลงโดยไม่ตั้งใจ
2. เพื่อศึกษากรณียกเว้นที่การแปลงดังกล่าวมีประโยชน์และให้ผลลัพธ์ที่ถูกต้อง เช่น การลบหรือเปรียบเทียบวันที่ (Date)

## ขั้นตอนการแปลง

<<<<<<< HEAD
ใน JavaScript มี 3 ประเภทของการแปลงออบเจ็กต์เป็นค่าปฐมภูมิ ซึ่งเรียกว่า "hint" (คำใบ้) ขึ้นอยู่กับสถานการณ์ที่เกิดขึ้น ดังนี้:
=======
1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

`"string"`
: สำหรับการแปลงเป็น string เมื่อเราต้องการนำออบเจ็กต์ไปใช้ในบริบทที่คาดหวังค่า string เช่น `alert(obj)`

`"number"`
: สำหรับการแปลงเป็นตัวเลข เช่น ในการคำนวณทางคณิตศาสตร์ `let num = Number(obj)`, `let n = +obj`, `let delta = date1 - date2`, `let greater = user1 > user2` เป็นต้น ฟังก์ชันคณิตศาสตร์ส่วนใหญ่ก็ใช้การแปลงแบบนี้ด้วย

    Most built-in mathematical functions also include such conversion.

`"default"`
: เกิดขึ้นน้อยครั้ง เมื่อตัวดำเนินการ "ไม่แน่ใจ" ว่าคาดหวังข้อมูลประเภทใด เช่น ตัวดำเนินการบวกเลขฐานสอง `+` ที่ยอมรับทั้ง string และตัวเลข ดังนั้นจึงใช้ hint นี้เมื่อได้รับออบเจ็กต์มา นอกจากนี้ตัวดำเนินการเปรียบเทียบ `==` กับ string, number หรือ symbol ก็ใช้ hint `"default"` เช่นกัน

<<<<<<< HEAD
ในทางปฏิบัติ สถานการณ์อาจง่ายกว่านี้เล็กน้อย ออบเจ็กต์ส่วนใหญ่ (ยกเว้น Date) จะใช้การแปลงแบบ `"default"` เหมือนกับ `"number"` และเราก็ควรทำเช่นนั้น แต่ก็ยังจำเป็นต้องรู้จักทั้ง 3 ประเภท เพื่อให้เข้าใจว่ามันมีประโยชน์อย่างไร
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

**เมื่อต้องการแปลงออบเจ็กต์เป็นค่าปฐมภูมิ JavaScript จะพยายามค้นหาและเรียกใช้เมท็อดต่างๆ ตามลำดับดังนี้:**

<<<<<<< HEAD
1. เรียกใช้ `obj[Symbol.toPrimitive](hint)` หากมีการกำหนดเมท็อดนี้ไว้ โดย `Symbol.toPrimitive` เป็นสัญลักษณ์ในตัวของระบบ
2. มิฉะนั้น ถ้า hint เป็น `"string"` จะลองเรียก `obj.toString()` และ `obj.valueOf()` อย่างใดอย่างหนึ่งที่มีอยู่
3. มิฉะนั้น ถ้า hint เป็น `"number"` หรือ `"default"` จะลองเรียก `obj.valueOf()` และ `obj.toString()` อย่างใดอย่างหนึ่งที่มีอยู่
=======
    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Symbol.toPrimitive

วิธีแรกคือใช้ symbol ในตัว `Symbol.toPrimitive` เป็นชื่อเมท็อดสำหรับแปลงออบเจ็กต์ โดยใช้ดังนี้:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // โค้ดสำหรับแปลงออบเจ็กต์นี้เป็นค่าปฐมภูมิ
  // ต้องคืนค่าเป็นค่าปฐมภูมิ
  // hint จะเป็นหนึ่งใน "string", "number", "default"
};
```

ถ้ามีเมท็อด `Symbol.toPrimitive` มันจะถูกเรียกใช้สำหรับทุก hint และไม่จำเป็นต้องใช้เมท็อดอื่นอีก

ตัวอย่างเช่น ออบเจ็กต์ `user` ใช้เมท็อดนี้:

```js
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// ตัวอย่างการแปลง:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

<<<<<<< HEAD
จะเห็นว่า `user` กลายเป็น string หรือตัวเลข ขึ้นอยู่กับรูปแบบการแปลง โดยใช้แค่เมท็อดเดียว `user[Symbol.toPrimitive]` ในการจัดการทุกกรณี
=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## toString/valueOf

ถ้าไม่มี `Symbol.toPrimitive` JavaScript จะมองหาเมท็อด `toString` และ `valueOf` แทน:

<<<<<<< HEAD
- สำหรับ hint ชนิด `"string"` จะเรียก `toString` ก่อน หากไม่มีหรือคืนค่าเป็นออบเจ็กต์ จะไปเรียก `valueOf` แทน (ดังนั้น `toString` จึงมีความสำคัญมากกว่าในการแปลงเป็น string)
- สำหรับ hint ชนิด `"number"` หรือ `"default"` จะเรียก `valueOf` ก่อน หากไม่มีหรือคืนค่าเป็นออบเจ็กต์ จะไปเรียก `toString` แทน (ดังนั้น `valueOf` จึงมีความสำคัญมากกว่าในการคำนวณ)
=======
- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

เมท็อด `toString` และ `valueOf` มาจากสมัยเก่า ก่อนที่จะมีแนวคิดเรื่อง symbol เป็นเมท็อดชื่อ string ธรรมดาที่ให้วิธีการแปลงแบบ "โบราณ"

โดยเมท็อดเหล่านี้ต้องคืนค่าปฐมภูมิ หาก `toString` หรือ `valueOf` คืนค่าเป็นออบเจ็กต์ ก็จะถูกละเลยเสมือนไม่มีการกำหนดเมท็อดนั้นไว้เลย

ออบเจ็กต์ทั่วไปมีเมท็อด `toString` และ `valueOf` ค่าเริ่มต้นดังนี้:

- `toString` คืนค่าเป็น string `"[object Object]"`
- `valueOf` คืนออบเจ็กต์ตัวมันเอง

ตัวอย่างเช่น:

```js
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

ดังนั้น หากใช้ออบเจ็กต์แทนที่ที่คาดหวังค่า string เช่นใน `alert` โดยปกติแล้วจะแสดงผลเป็น `[object Object]`

ส่วน `valueOf` ที่คืนออบเจ็กต์ตัวมันเองนั้น ไม่มากมีประโยชน์ มีการกล่าวถึงไว้ที่นี่เพื่อความครบถ้วนเท่านั้น ซึ่งเป็นแบบนี้มาตั้งแต่สมัยแรกด้วยบางเหตุผล ส่วนใหญ่แล้วมักจะถือว่ามันไม่มีอยู่

มาลองใช้เมท็อดเหล่านี้ในการกำหนดพฤติกรรมการแปลงเป็นแบบของเราเองกัน

ตัวอย่างเช่น ที่นี่ `user` จะทำงานแบบเดียวกับตัวอย่างก่อนหน้า แต่ใช้ `toString` กับ `valueOf` แทน `Symbol.toPrimitive`:

```js
let user = {
  name: "John",
  money: 1000,

  // สำหรับ hint "string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // สำหรับ hint "number" หรือ "default"
  valueOf() {
    return this.money;
  }
};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

โดยทั่วไปแล้ว มักต้องการจุดรวมศูนย์เดียวในการจัดการการแปลงออบเจ็กต์ให้เป็นค่าปฐมภูมิทั้งหมด ในกรณีนี้เราจะใช้แค่ `toString` อย่างเดียว ทำให้มันเป็นตัวจัดการหลักในการแปลง ดังตัวอย่าง:

```js
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

หากไม่มี `Symbol.toPrimitive` และ `valueOf` เมท็อด `toString` ก็จะรับผิดชอบการแปลงออบเจ็กต์เป็นค่าปฐมภูมิทั้งหมดเอง

### การแปลงสามารถคืนค่าปฐมภูมิประเภทใดก็ได้

สิ่งสำคัญที่ต้องทราบเกี่ยวกับเมท็อดทั้งหมดที่ใช้ในการแปลงออบเจ็กต์ คือ พวกมันไม่จำเป็นต้องคืนค่าปฐมภูมิประเภทที่ตรงกับ hint เสมอไป

<<<<<<< HEAD
ไม่มีข้อบังคับว่า `toString` ต้องคืนค่าเป็น string เสมอ หรือ `Symbol.toPrimitive` ต้องคืนตัวเลขเมื่อ hint เป็น `"number"` 
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

สิ่งเดียวที่จำเป็นคือ เมท็อดเหล่านั้นต้องคืนค่าปฐมภูมิ ไม่ใช่ออบเจ็กต์

```smart header="หมายเหตุทางประวัติศาสตร์"
สมัยก่อน ถ้า `toString` หรือ `valueOf` คืนออบเจ็กต์ ก็จะไม่เกิด error แต่ค่านั้นจะถูกละเลย (เสมือนไม่มีการกำหนดเมท็อดนั้นไว้) นั่นเป็นเพราะไม่มีแนวคิดเรื่อง "error" ที่ดีพอใน JavaScript สมัยนั้น

<<<<<<< HEAD
ในทางตรงข้าม `Symbol.toPrimitive` มีกฎเข้มงวดกว่า มันต้องคืนค่าปฐมภูมิเท่านั้น ไม่เช่นนั้นจะเกิด error
=======
In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

## การแปลงอื่นๆ

อย่างที่เราได้เรียนรู้มา มีตัวดำเนินการและฟังก์ชันหลายตัวที่ดำเนินการแปลงชนิดข้อมูล เช่น การคูณ `*` จะแปลงตัวถูกดำเนินการให้เป็นตัวเลข

<<<<<<< HEAD
หากเราส่งออบเจ็กต์เป็นอาร์กิวเมนต์ การคำนวณจะประกอบด้วย 2 ขั้นตอน:
1. ออบเจ็กต์จะถูกแปลงให้เป็นค่าปฐมภูมิ (ตามกฎที่อธิบายข้างต้น)
2. หากจำเป็นสำหรับการดำเนินการต่อไป ค่าปฐมภูมินั้นจะถูกแปลงอีกครั้ง
=======
If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If necessary for further calculations, the resulting primitive is also converted.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

ตัวอย่างเช่น:

```js
let obj = {
  // toString จัดการการแปลงทั้งหมดเมื่อไม่มีเมท็อดอื่น
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4 ออบเจ็กต์ถูกแปลงเป็น "2", จากนั้น "2" จึงถูกคูณด้วย 2
```

1. การคูณ `obj * 2` ขั้นแรกจะแปลง `obj` ให้เป็นค่าปฐมภูมิ ซึ่งจะเป็น string `"2"` (จาก `toString`)
2. จากนั้น `"2" * 2` จะกลายเป็น `2 * 2` (string ถูกแปลงเป็นตัวเลข)

บวกด้วย `+` ก็มีกฎพิเศษเหมือนกัน:

```js
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj + 2); // 22 ("2" + 2), การแปลงเป็น string เกิดขึ้น
=======
alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

การบวก `obj + 2` ในตอนแรกจะแปลง `obj` เป็นค่าปฐมภูมิ (ซึ่งเป็น string `"2"`) จากนั้นจึงเกิดการต่อ string `"2" + 2 = "22"`

ในทางตรงข้าม การลบ `-` และตัวดำเนินการเปรียบเทียบอื่นๆ เช่น `<` `>` จะแปลงทั้งสอง operand ให้เป็นตัวเลขเสมอ:

<<<<<<< HEAD
```js
let obj = {
  toString() {
    return "2";
  }
};

alert(obj - 2); // 0 ("2" - 2), การแปลงเป็นตัวเลขเกิดขึ้น
```
=======
There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

นี่คือตารางสรุประบุว่าตัวดำเนินการใช้การแปลงแบบใด:

<<<<<<< HEAD
| ตัวดำเนินการ | การแปลงตัวถูกดำเนินการ |
|--------------|----------------------|
| + | ทำการต่อ string ถ้าสามารถแปลงได้ เช่น `"1" + "2" = "12"`, `"1" + 2 = "12"` |
| - | แปลงเป็นตัวเลข |
| * / | แปลงเป็นตัวเลข |
| == | แปลงเป็นตัวเลข แต่ `null` กับ `undefined` จะถูกเปรียบเทียบโดยไม่มีการแปลง |
| < > >= <= | แปลงเป็นตัวเลข |
| + (unary) | แปลงเป็นตัวเลข |


## สรุป

การแปลงออบเจ็กต์เป็นค่าปฐมภูมิจะถูกเรียกใช้โดยอัตโนมัติ โดยฟังก์ชันและตัวดำเนินการหลายตัวที่คาดหวังให้ข้อมูลเป็นค่าปฐมภูมิ

มีการแปลง 3 แบบ:
- `"string"` (สำหรับ `alert` และตัวดำเนินการที่ต้องการ string)  
- `"number"` (สำหรับการคำนวณทางคณิตศาสตร์)
- `"default"` (สำหรับตัวดำเนินการบางตัวเท่านั้น)

ซึ่งมีระบุไว้ชัดเจนในสเปคว่าตัวดำเนินการแต่ละตัวใช้การแปลงแบบใด

ลำดับขั้นตอนการแปลงคือ:

1. เรียกใช้ `obj[Symbol.toPrimitive](hint)` หากมีการกำหนดไว้
2. มิฉะนั้น ถ้า hint คือ `"string"`
    - ลองเรียก `obj.toString()` และ `obj.valueOf()` ตามลำดับ เลือกอันแรกที่ใช้ได้ 
3. มิฉะนั้น ถ้า hint คือ `"number"` หรือ `"default"`
    - ลองเรียก `obj.valueOf()` และ `obj.toString()` ตามลำดับ เลือกอันแรกที่ใช้ได้

ในทางปฏิบัติ การใช้เมท็อด `obj.toString()` เพียงอย่างเดียวเป็นตัวจัดการหลักในการแปลงออบเจ็กต์เป็น string มักจะพอเพียง และถูกใช้เพื่ออธิบายข้อมูลของออบเจ็กต์ในรูปแบบที่อ่านได้ง่าย โดยมักใช้ในการล็อก (log) และดีบั๊ก
=======
1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
