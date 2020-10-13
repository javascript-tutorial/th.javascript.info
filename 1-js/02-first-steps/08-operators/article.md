# ตัวดำเนินการ เบื้องต้น และ คณิตศาสตร์

ตัวดำเนินการในโลกโปรแกรมมิ่ง เราเคยได้เรียนกันมาแล้วสมัยโรงเรียน นั่นก็คือ การบวก `+` การลบ `-` การคูณ `*` การหาร `/` และ ตัวอื่นๆ

ในบทนี้ เราจะเริ่มด้วยตัวดำเนินการ ง่ายๆ จากนั้นจะเจาะไปที่ตัวดำเนินการ ในจาวาสคริปต์ ซึ่งจะไม่เหมือนกับตัว operator ที่เราเคยเรียนที่โรงเรียน

## คำว่า:  "เดี่ยว (unary)", "คู่ (binary)", "ตัวถูกดำเนินการ (operand)"

ก่อนที่เราจะเข้าเรื่อง ขออธิบายศัพท์เหล่านี้เพิ่มเติมอีกนิด

- *ตัวถูกดำเนินการ* (operand) -- หมายถึง ตัวเลขหรือตัวแปรในสมการใด ๆ ที่ถูกดำเนินการ ด้วยตัวดำเนินการ (operator) หรือ "เครื่องหมายทางคณิตศาสตร์" ตัวอย่างเช่น `5 * 2` มีตัวถูกดำเนินการ 2 ตัว ด้านซ้ายคือ `5` และด้านขวาคือ `2` บางคนก็เรียกว่าอาร์กิวเม้นท์ (arguments) แทนตัวถูกดำเนินการ (operands)
- ตัวดำเนินการ (operator) เดี่ยว *unary* หมายถึง การมีตัวถูกดำเนินการ (operand) เพียงแค่ตัวเดียว อย่างเช่น การเติมเครื่องหมายลบไว้ที่ข้างหน้าตัวแปร (negation) เพื่อกลับค่าบวก ให้เป็นค่าลบ

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1
    ```
- ตัวดำเนินการ (operator) คู่ *binary* หมายถึง การมีตัวถูกดำเนินการ (operand) สองตัวนั่นเอง อย่างเช่น การลบกันของแปรสองตัว

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // ได้ 2 เกิดจากการลบกันของตัวแปรสองตัว
    ```

    ตามสองตัวอย่างด้านบน เราได้เห็นการดำเนินการสองแบบ ที่ใช้เครื่องหมายลบร่วมกัน การลบแบบเดี่ยว จะกลับค่าจากบวกเป็นลบ จากลบเป็นบวก การลบแบบคู่ จะลบค่าตัวหน้าด้วยค่าตัวหลัง

## คณิต

สัญลักษณ์ทางคณิตศาสตร์ที่สามารถใช้ได้ในจาวาสคริปต์ได้แก่:

- บวก `+`,
- ลบ `-`,
- คูณ `*`,
- หาร `/`,
- เศษเหลือ `%`,
- ยกกำลัง `**`.

มีสี่ตัวแรกที่ตรงไปตรงมา ขณะที่เศษเหลือใช้ `%` และยกกำลังใช้ `**`

### เศษเหลือ %

ตัวดำเนินการเศษเหลือจะใช้ `%` ถึงหน้าตาจะเหมือนเปอร์เซ็นต์ แต่ในจาวาสคริปต์จะไม่ใช่เปอร์เซ็นต์

ผลลัพธ์ของ `a % b` คือ[เศษเหลือ](https://en.wikipedia.org/wiki/Remainder) ของจำนวนเต็ม `a` หารด้วย `b`

ตัวอย่างเช่น

```js run
alert( 5 % 2 ); // 1, เศษเหลือของ 5 หารด้วย 2
alert( 8 % 3 ); // 2, เศษเหลือของ 8 หารด้วย 3
```

### ยกกำลัง **

ตัวดำเนินการยกกำลัง จะใช้ดอกจันสองตัว และ `a ** b` หมายถึง `a` คูณตัวเองเป็นจำนวน `b` ครั้ง

ตัวอย่างเช่น

```js run
alert( 2 ** 2 ); // 4  (2 คูณกัน 2 ครั้ง)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 ครั้ง)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 ครั้ง)
```
ในทางคณิตศาสตร์ เราสามารถยกกำลังตัวเลขที่ไม่ใช่จำนวนเต็ม อย่าง การยกกำลังด้วย square root `1/2`
Mathematically, :

```js run
alert( 4 ** (1/2) ); // 2 (ยกกำลังของ 1/2 เหมือน square root)
alert( 8 ** (1/3) ); // 2 (ยกกำลังขอฝ 1/3 เหมือน cubic root)
```


## รวมสตริงด้วย +

เป็นฟีเจอร์ของจาวาสคริปต์ ที่ไม่มีในคณิตศาสตร์โรงเรียน

โดยปกติแล้ว เราจะเห็นแต่การใช้เครื่องหมายบวก `+` กับตัวเลข

แต่ หากเราใช้เครื่องหมายบวกกับสตริง มันจะเป็นการต่อสตริงสองชุดไว้ด้วยกัน

```js
let s = "my" + "string";
alert(s); // mystring
```

โปรดจำไว้ว่าหากตัวถูกดำเนินการเป็นสตริง อีกตัวก็จะถูกแปลงเป็นสตริงด้วย

ตัวอย่างเช่น:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

เห็นไหม ไม่สำคัญว่าสตริงจะอยู่ด้านซ้าย หรืือด้านขวา หากมีสตริง สิ่งใดไม่ใช่สตริงจะถูกแปลงทั้งหมด

ตัวอย่างที่ยากขึ้นมาอีกหน่อย:

```js run
alert(2 + 2 + '1' ); // ได้ "41" ไม่ใช่ "221"
```

ทีนี้ ตัวดำเนินการตัวแรกจะทำงานก่อน รวมผลลัพธ์ระหว่าง `2 + 2` จะได้ `4` ถัดไป `+` จะบวกสตริง `1` ก็จะกลายเป็น `4 + '1' = 41`

ตัวดำเนินการ `+` แบบคู่เป็นตัวดำเนินการเพียงตัวเดียวที่สามารถรวมสตริงได้ ตัวดำเนินการอื่นๆจะใช้งานได้กับตัวเลข และจะแปลงข้อมูลชนิดอื่นให้เป็นตัวเลขด้วย

ตัวอย่างของการลบ และการหาร

```js run
alert( 6 - '2' ); // 4, จะแปลงสตริง '2' เป็นตัวเลข
alert( '6' / '2' ); // 3, จะแปลงสตริงทั้งสองตัวเป็นตัวเลข
```

## แปลงข้อมูลเป็นตัวเลขด้วยเครื่องหมายบวก

เครื่องหมาย `+` เราสามารถใช้ได้สองแบบ แบบคู่ (binary) ตามตัวอย่างด้านบน และ แบบเดี่ยว (unary)

บวกแบบเดี่ยว (unary) หากเราเพิ่มเครื่องหมายบวก ไว้ข้างหน้าตัวแปร จะเป็นการแปลงข้อมูลที่ไม่ใช่ตัวเลข ให้เป็นตัวเลข

ตัวอย่างเช่น

```js run
// แปลงตัวเลข ก็จะได้ตัวเลขเหมือนเดิม
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// แปลงจากข้อมูลที่ไม่ใช่ตัวเลข
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

จริงๆแล้ว ก็เหมือนกับใช้ฟังชั่นก์ `Number(...)` แต่สั้นกว่า

ในงานจริวเรามักจะเปลี่ยนสตริงเป็นตัวเลขอยู่บ่อยๆเหมือนกัน เช่น เรากำลังรับค่าที่กรอกในแท็ก `form` เพราะค่าที่อยู่ในแท็กนี้มักจะเป็นสตริงเสมอ เพราะหากเราจับบวกเลย

มันจะก็กลายเป็นการนำสตริงมาต่อกันแทน

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // ได้ "23" ซึ่งเกิดจากการต่อสตริง 
```

หากเราต้องการให้สตริงเป้นตัวเลข เราต้องแปลงเป็นตัวเลขก่อนแล้วค่อยจับมาบวกกัน

```js run
let apples = "2";
let oranges = "3";

*!*
// ทั้งสองตัวแปรถูกแปรเป็นตัวเลขก่อน แล้วบวกกัน
alert( +apples + +oranges ); // 5
*/!*

// หรือจะใช้เป็นฟังชั่นก์เพื่อป้องกันความสับสน
// alert( Number(apples) + Number(oranges) ); // 5
```

สำหรับมุมมองของนักคณิตศาสตร์ การที่มีเครื่องหมายบวกเยอะ อาจจะดูแปลกๆ แต่จากมุมมองของโปรแกรมเมอร์ ก็แค่แปลงเป็นตัวเลขก่อน จากนั้นก็นำตัวเลขทั้งสองตัวมาบวกกัน

แล้วทำไมเครื่องหมายบวกหน้าตัวแปรถึงดำเนินการก่อน เครื่องหมายบวกอีกตัว นั่นก็เพราะว่าเครื่องหมายบวกหน้าตัวแปรมีวรรณะสูงกว่า *(higher precedence)*

## ศักดิ์ของโอเปอเรเตอร์แต่ละตัว (Operator precedence)

หากนิพนธ์ (expression) มีตัวดำเนินการมากกว่าหนึ่งตัว ลำดับการทำงานก่อน-หลังจะถูกนิยามจากวรรณะ *(precedence)* ของโอเปอเรเตอร์แต่ละตัว หรือ ตัวดำเนินการที่มีวรรณะสูงกว่าตัวอื่นๆ จะถูกดำเนินการก่อน

ทบทวนความรู้คณิตศาสตร์สมัยเรียน สมมุติว่ามีนิพจน์อย่าง `1 + 2 * 2` ตัวคูณจะดำเนินการก่อน จากนั่นถึงค่อยบวก นี่คือความต่างวรรณะในแต่ละเครื่องหมาย โดยคูณมีวรรณะสูงกว่าบวกนั่นเอง

การใช้วงเล็บสามารถแทนที่ความต่างทางวรรณะตรงนี้ได้ หากเราต้องการให้บวกก่อนแล้วค่อยคูณ เราก็จะเขียนเป็น `(1 + 2) * 2` แทน

ตัวดำเนินการในจาวาสคริปต์มีหมายเลข บ่งบอกความสูงวรรณะของตัวเองไว้อยู่แล้ว หากมีตัวเลขที่สูง วรรณะก็จะสูง หากต่างวรรณะกัน การดำเนินการจะเริ่มจากตัววรรณะสูงก่อนเสมอ หากศักดิ์เท่ากัน ดำเนินการจะเริ่มจากซ้ายไปขวาเหมือนปกติ

ตารางด้านล่างสรุปมาจาก [ศักดิ์ของโอเปอเรเตอร์](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (ไม่จำเป้นต้องจำทั้งหมด จำแค่ตัว operator เดี่ยว (unary) จะมีศักดิ์สูงกว่า operator คู่เสมอ (binary)):

| หมายเลขวรรณะ | ชื่อ | หน้าตาเครื่องหมาย |
|------------|------|------|
| ... | ... | ... |
| 17 | unary plus | `+` |
| 17 | unary ลบ | `-` |
| 16 | ยกกำลัง | `**` |
| 15 | คูณ | `*` |
| 15 | หาร | `/` |
| 13 | บวก | `+` |
| 13 | ลบ | `-` |
| ... | ... | ... |
| 3 | การ assign | `=` |
| ... | ... | ... |

เราจะเห็นว่าบรรดาบวกแบบเดี่ยวมีหมายเลขวรรณะเป็น 16 ซึ่งสูงกว่าบวกแบบคู่ซึ่งมีแค่ 13 นี่จึงเป็นเหตุผลว่าทำไม `"+apples + +oranges" จึงแปลงเป็นตัวเลขก่อนบวก

## การกำหนดค่า (Assignment)

การกำหนดค่า (assignment) หรือเครื่องหมาย `=` ก็เป็นตัวดำเนินการเช่นเดียวกัน แถมยังมีชื่อในตารางวรรณะด้านบนด้วย โดยมีหมายเลขวรรณะอยู่ที่ `3`

นี่เป็นเหตุผลว่าทำไม เวลาเราประกาศตัวแปรแบบ `x = 2 * 2 + 1` จะคำนวณด้านขวาให้เสร็จก่อน แล้วค่อยนำผลลัพธ์สุดท้าย มาเก็บไว้ใน `x`

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### การกำหนดค่า คือ การส่งค่ากลับ

การกำหนดค่า `=` ไม่ได้มีอะไรพิสดาร แต่มีนัยบางอย่างซ่อนอยู่ 

ตัวดำเนินการส่วนใหญ่ในจาวาสคริปต์จะส่งค่ากลับเสมอ ที่เห็นชัดๆก็คือ `+` และ `-` แต่ก็รวมถึง `=` ด้วย

การเรียก `x = value` คือ การเขียน `value` ไปเก็บใน `x` *หรืออีกนัยหนึ่งคือส่ง value ไปกลับหา x*.

ด้านล่างคือตัวอย่างการใช้ตัวกำหนดค่า (assignment) เป็นส่วนหนึ่งนิพจน์ (expression) ที่ซับซ้อน

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

จากตัวอย่างด้านบน ผลลัพธ์จากนิพจน์ (expression) อย่าง `(a = b + 1)` เป็นค่าที่สุดท้ายจะถูกเก็บ (assigned) ไปที่ `a` (นั่นก็คือ `3`) จากนั่นก็เป็น `3 - 3` ผลลัพธ์สุดท้ายก็จะเก็บไว้ใน `c` ต่อไป

แปลกๆดีใช่ไหม การเข้าใจการทำงาน ช่วยให้เราเข้าใจไลบรารี่อื่นๆของจาวาสคริปต์ด้วย เพราะบางครั้งเราจะเห็นไลบรารี่ชาวบ้านเขียนแบบนี้

แต่ๆ อย่าเขียนโค้ดแบบนี้ มันก็ดูเท่ดี แต่จะทำให้คนอื่นอ่านโค้ดเราไม่เข้าใจ และก็ดูไม่สะอาดสักเท่าไหร่

### การกำหนดค่าตัวแปรหลายตัวพร้อมกัน

อีกฟีเจอร์ที่น่าสนใจของจาวาสคริปต์คือ การกำหนดค่าตัวแปรหลายตัวพร้อมกัน

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

การกำหนดค่าพร้อมกัน จะเริ่มจากขวาไปซ้าย เริ่มแรก `2 + 2` ก่อน เมื่อบวกกันเสร็จ ค่าที่ได้จะส่งคืนไปหา ตัวแปรที่อยู่ด้านซ้าย `c`, `b` และ `a` สุดท้าย ตัวแปรทั้งสามก็จะมีค่าเดียวกัน

ก็... ถ้าอยากให้อ่านง่ายๆ ก็แบ่งกำหนดค่าทีละตัวในแต่ละบรรทัดดีกว่า

```js
c = 2 + 2;
b = c;
a = c;
```
แบบนี้จะอ่านง่าย มองปุ๊ปก็รู้ปั๊ปว่าตรงนี้ทำอะไร

## Modify-in-place

เรามักจะต้องใช้ตัวดำเนินการกับตัวแปรและเก็บผลลัพธ์ใหม่ไว้ในตัวแปรเดียวกัน

ตัวอย่าง

```js
let n = 2;
n = n + 5;
n = n * 2;
```

หรือสามารถทำให้สั้นลงได้โดยการใช้ `+=` และ `*=`:

```js run
let n = 2;
n += 5; // ทีนี้ n = 7 (เหมือนกับ n = n + 5)
n *= 2; // ทีนี้ n = 14 (เหมือนกับ n = n * 2)

alert( n ); // 14
```

การทำแบบนี้เรียกว่าตัวดำเนินการแบบ "modify-and-assign" สามารถใช้ได้กับตัวดำเนินการทางคณิตศาสตร์ทุกตัวอย่าง: `/=`, `-=`, อื่นๆ

ตัวดำเนินการดังกล่าวมีศักดิ์เทียบกับ การกำหนดค่า (assignment) ดังนั้นจะทำงานก็ต่อเมื่อ จบการคำนวณหมดแล้ว

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (ด้านขวาจะทำงานก่อน 3 + 5 ก่อนแล้วค่อยคูณ 2, เหมือนกับ n *= 8)
```

## การเพิ่ม/การลด

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

การเพิ่ม หรือ การลด ตัวเลขทีละหนึ่ง เป็นการดำเนินการทางตวัเลขที่พบบ่อยที่สุดในโปรแกรมมิ่ง

จนต้องมีสัญลักษณ์พิเศษขึ้นมา สำหรับการดำเนินการนี้โดยเฉพาะ:

- **Increment** จะใช้ `++` การเพิ่มค่าในตัวแปรทีละ 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // ทำงานเหมือนกับ counter = counter + 1 แต่สั้นกว่า
    alert( counter ); // 3
    ```
- **Decrement** จะใช้ `--` การลดค่าในตัวแปรทีละ 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // ทำงานเหมือนกับ counter = counter - 1 แต่สั้นกว่า
    alert( counter ); // 1
    ```

```warn
การเพิ่ม การลด จะใช้ได้กับตัวแปรเท่านั้น หากไม่เชื่อลอง `5++` ดูก็ได้ จะได้ error มาแทนผลลัพธ์
```

ตัวดำเนินการ `++` และ `--` สามารถใส่ไว้ข้างหน้าตัวแปร หรือข้างหลังตัวแปรก็ได้

- ตัวดำเนินการอยู่ข้างหลังแบบนี้ เรียกว่า "postfix form": `counter++`.
- ตัวดำเนินการอยู่ข้างหน้าแบบนี้ เรียกว่า "prefix form": `++counter`.

ทั้งสอง statements ทำเหมือนกัน ก็คือบวกตัวแปร `counter` ด้วย `1`

แล้วมีความแตกต่างอะไรไหม? ที แต่เราจะเห็นได้เฉพาะเวลาที่ค่าส่งกลับมาจาก `++/--` แล้ว 

ช่วยให้กระจ่างอีกที อย่างที่เรารู้ ตัวดำเนินการทุกอย่างล้วนคืนค่ากลับ กาเพิ่ม การลดก็ไม่มีข้อยกเว้น โดยแบบ prefix form จะส่งค่าใหม่กลับมา แต่ postfix form จะส่งค่าเก่ากลับมา (ก่อนจะเพิ่มหรือลดไปหนึ่ง)

จะเห็นความแตกต่าง ได้จากตัวอย่าง:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

ในบรรทัด `(*)`, *prefix* form `++counter` เพิ่ม `counter` ไปหนึ่ง และส่งค่าใหม่กลับ `2` ดังนั้น `alert` ก็เลยโชว์ `2`.

ทีนี้มาดูแบบ postfix form:

```js run
let counter = 1;
let a = counter++; // (*) เปลี่ยนจาก ++counter เป็น counter++

alert(a); // *!*1*/!*
```

In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment a value but use its previous value, we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) chapter on MDN when a need arises.

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
