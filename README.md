# คู่มือโมเดิร์นจาวาสคริปฉบับภาษาไทย

เรโปนี้เป็นพื้นที่ที่เก็บคู่มือสอนภาษาจาวาสคริปต์ฉบับภาษาไทย มีโฮสต์อยู่ที่เว็บไซต์ <https://javascript.info> โครงการนี้กำลังต้องการผู้ช่วยแปลเป็นอย่างมาก จึงเปิดกว้างและขอต้อนรับทุกคนที่อยากช่วยแปลคู่มือนี้ ให้นักพัฒนาชาวไทยได้อ่านกัน ทางเรามีธรรมเนียมในการแปลเล็กน้อยเพื่อให้ง่ายต่อการ `merge` กับต้นฉบับภาษาอังกฤษนั้นเอง ดังนั้นช่วยอ่านธรรมเนียมด้านล่างก่อนแปลด้วยนะครับ

**อยากมีส่วนร่วมทำได้อย่างไร**
- สามารถดูความคืบหน้าการแปลได้ที่หน้า [Thai Translate Progress](https://github.com/javascript-tutorial/th.javascript.info/issues/1)
- เลือกบทความที่ยังไม่ถูกติ๊กและแปล
- คอมเม้นชื่อหัวข้อที่ต้องการแปล ลงใน [Thai Translate Progress](https://github.com/javascript-tutorial/th.javascript.info/issues/1) issue. ตัวอย่าง `An Introduction to JavaScript`.
    - บอทจะทำการติ๊ก issue ดังกล่าว ทุกคนจะรับทราบว่ามีคนกำลังแปลหัวข้อนี้อยู่
    - คอมเม้นควรมีแค่ชื่อหัวข้อที่จะแปลเท่านั้น
- ทำการ fork repo นี้, แปลและส่ง PR มาเมื่อการแปลเสร็จสิ้น
    - จั่วหัว PR ควรใช้ชื่อเดียวกับหัวข้อบทความ ทีนี้บอทจะมอบหมายเลขให้ issue นั้นๆ

คลิก <https://javascript.info/translate> เพื่อดูรายละเอียดในภาษาอื่นๆ.

Maintainers จะรีวิวและแก้ไขการแปลไปตามความเหมาะสม

หาก maintainers ไม่ตอบ หรือ ต้องการเป็น maintainers กรุณาเขียนคำร้องที่ [repo หลัก](https://github.com/javascript-tutorial/en.javascript.info/issues/new).

**มาช่วยร่วมกันแปลคู่มือจาวาสคริปต์ฉบับภาษาไทย**

ชื่อของผู้มีส่วนร่วมและจำนวน contribution จะแสดงอยู่ในหน้า "About project" เมื่อการแปลถูกเผยแพร่เป็นที่เรียบร้อย

<<<<<<< HEAD
## โครงสร้าง
=======
**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

ในแต่ละบทจะในโฟลเดอร์เป็นของตัวเอง

โดยโฟลเดอร์จะใช้ชื่อ `N-url` N แทนตัวเลขเพื่อให้ง่านต่อการจัดเรียง ส่วน url แทน URL-slug บนเว็บไซต์

ฉะนั้นในหนึ่งโฟลเดอร์จะประกอบด้วย

- `index.md` หมายถึงบทเรียน
- `article.md` หมายถึงบทความ
- `task.md` หมายถึงการบ้าน

ในแต่ละไฟล์จะเริ่มต้นด้วย `# หัวเรื่อง` เนื้อหาทั้งหมดจะเป็นภาษามาร์กดาวน์ สามารถแก้ไขได้ด้วย text editor หรือ IDE ได้ตามความชอบ


## ทริปการแปล

รบกวนคงตัวแบ่งบรรทัดและย่อหน้าไว้อย่างเดิม ไม่ควรเพิ่มบรรทัดใหม่ และไม่ควรลบบรรทัดหรือย่อหน้าที่มีอยู่แล้ว เพื่อให้ง่ายต่อการ merge กับต้นฉบับภาษาอังกฤษ

<<<<<<< HEAD
ถ้าเห็นว่าสำนวนในภาษาอังกฤษหรือภาษาไทยควรปรับปรุงเพิ่มเติม สามารถส่ง PR มาได้เลย

### ข้อกำหนดเพิ่มเติม

- สำหรับคำศัพท์เฉพาะทางโปรแกรมมิ่ง ไม่ควรแปลหรือทับศัพท์ใดๆลงไป ควรละคำดังกล่าวเอาไว้ เช่น "Function Declaration" 
- คำที่เป็น keyword ของภาษาอย่าง `resolved promise`, `slash`, `regexp` และอื่นๆ - ควรตรวจดูอภิธานศัพท์เพิ่มเติมจาก [MDN](https://developer.mozilla.org/th/) หากไม่พบกรุณาละไว้เช่นเดิม

### ข้อความใน Code Blocks

- แปลเฉพาะคอมเม้นต์
- แปลเฉพาะ user-messages และ สตริงตัวอย่าง
- ไม่ควรแปลชื่อตัวแปร, ชื่อคลาส, ชื่อ identifiers
- เมื่อแปลเสร็จอย่าลืมตรวจสอบว่าโค้ดทำงานได้อย่างเดิม

ตัวอย่าง:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ ทำได้ (แปลคอมเม้น)

```js
// ตัวอย่าง
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

❌ ไม่ควรทำ (แปลคลาส):

```js
// ตัวอย่าง
const text = 'Hello, world';
// ".hello" เป็นชื่อคลาสใน HTML
// ไม่ควรแปล
document.querySelector('.สวัสดี').innerHTML = text;
```

### ลิงค์ภายนอก

ในกรณีลิงค์ภายนอกเช่นวิกีพีเดีย อย่าง `https://en.wikipedia.org/wiki/JavaScript` หรือมีบทความภาษาไทยอื่นๆที่มีคุณภาพและน่าเชื่อถือ สามารถแนบลิงค์ไปที่บทความนั้นๆแทน

ตัวอย่าง:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ ทำได้ (en -> th):

```md
[JavaScript](https://th.wikipedia.org/wiki/JavaScript) คือภาษาโปรแกรมมิ่ง
```

จะใช้ลิงค์ไปหาบทความที่ได้รับการแปลแค่บางส่วนใน MDN ก็ได้

ไม่ควรแนบลิงค์บทความที่ไม่ใช่ภาษาไทย

### Metadata

มีบางไฟล์, tasks จะมี YAML metadata อยู่ข้างบน สังเกตได้จาก `---`:

```md
importance: 5
---
...
```

ไม่ควรแปล "importance" และ metadata อื่นๆ

### Anchors

ในบางหัวข้อจะมี `[#anchor]` ปิดท้าย ตัวอย่าง

```md
## Spread operator [#spread-operator]
```

ไม่ควรแปลหรือลบส่วนที่เป็น `[#...]` เพราะมีไว้สำหรับ URL anchors.

## รันในเครื่องส่วนตัว

สามารถรัน localhost เพื่อตรวจสอบการแปลได้คร่าวๆ

วิธีการรันสามารถทำตามได้ที่ <https://github.com/javascript-tutorial/server>. 

สำหรับผู้ที่ใช้ VS Code และ IDE ตระกูล JetBrains สามารถดาวน์โหลดปลั๊กอินเพื่ออำนวยความสะดวกในการเขียนมาร์กดาวน์ได้ดังต่อไปนี้

**VS Code**

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)

**Jetbrains**

- [Markdown Navigator](https://plugins.jetbrains.com/plugin/7896-markdown-navigator/)



♥ 

=======
---  
♥  
Ilya Kantor @iliakan
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
