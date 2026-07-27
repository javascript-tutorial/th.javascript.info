# โมเดิร์น JavaScript ฉบับภาษาไทย

คู่มือนี้พาเรียน JavaScript ตั้งแต่พื้นฐาน โดยไม่ถือว่าผู้อ่านต้องเขียนโปรแกรมเป็นมาก่อน

เวลาเว็บกดปุ่มแล้วตอบสนอง เช็กข้อมูลในฟอร์ม หรือโหลดเนื้อหาเพิ่มโดยไม่รีเฟรชหน้า เบื้องหลังมักมี JavaScript ทำงานร่วมกับ HTML และ CSS อยู่ ส่วนงานฝั่งเซิร์ฟเวอร์ก็ใช้ภาษาเดียวกันได้ผ่านแพลตฟอร์มอย่าง Node.js

เราจะเริ่มจากชนิดข้อมูล ตัวแปร ฟังก์ชัน และการควบคุมลำดับการทำงาน แล้วค่อยต่อไปยัง HTML, CSS, อีเวนต์ และ API ทุกบทเน้นให้เข้าใจว่าโค้ดทำอะไร ทำไมจึงทำแบบนั้น และผลที่ได้เกิดขึ้นได้อย่างไร

## อยากมีส่วนร่วมทำได้อย่างไร

- ดูรายการงานได้ที่ [Thai Translate Progress](https://github.com/javascript-tutorial/th.javascript.info/issues/1)
- เลือกบทความที่ยังไม่มีคนรับ แล้วคอมเมนต์ชื่อหัวข้อภาษาอังกฤษใน issue เช่น `An Introduction to JavaScript`
    - บอทจะติ๊กหัวข้อนั้นเพื่อให้ทุกคนรู้ว่ามีคนรับงานแล้ว
    - คอมเมนต์ควรมีแค่ชื่อหัวข้อ
- fork repo นี้ ถ่ายทอด concept ตาม [คู่มือการเขียน](./AGENTS.md) แล้วส่ง PR
    - ใช้ชื่อบทความเป็นชื่อ PR เพื่อให้บอทจับคู่กับ issue ได้

ดูรายละเอียดของโครงการภาษาอื่นได้ที่ <https://javascript.info/translate>

ผู้ดูแลจะรีวิวและปรับเนื้อหาตามความเหมาะสม

ถ้าผู้ดูแลไม่ตอบหรือต้องการเข้ามาช่วยดูแลโครงการ ให้เปิดคำร้องที่ [repo หลัก](https://github.com/javascript-tutorial/en.javascript.info/issues/new)

มาช่วยกันถ่ายทอด JavaScript ให้คนไทยอ่านเข้าใจง่ายขึ้น

ชื่อและจำนวนผลงานของผู้ร่วมโครงการจะแสดงในหน้า "About project" หลังเผยแพร่เรียบร้อยแล้ว

## โครงสร้าง

แต่ละบทอยู่ในโฟลเดอร์ของตัวเอง

ชื่อโฟลเดอร์ใช้รูปแบบ `N-url` โดย `N` เป็นตัวเลขสำหรับเรียงลำดับ และ `url` เป็น slug ของหน้าบนเว็บไซต์

ไฟล์ที่พบบ่อยในแต่ละโฟลเดอร์ ได้แก่

- `index.md` หมายถึงบทเรียน
- `article.md` หมายถึงบทความ
- `task.md` หมายถึงการบ้าน
- `solution.md` หมายถึงเฉลย

เนื้อหาหลักเขียนด้วย Markdown จึงแก้ไขได้ด้วย text editor หรือ IDE ตามถนัด

## รันในเครื่องส่วนตัว

เนื้อหาเป็น Markdown จึงแก้ด้วย editor ที่ถนัดได้เลย ถ้าต้องการดูหน้าตาเหมือนบนเว็บไซต์ ให้ทำตามวิธีใน <https://github.com/javascript-tutorial/server>

ถ้าใช้ VS Code หรือ IDE ตระกูล JetBrains มีปลั๊กอินช่วยเขียน Markdown ดังนี้

**VS Code**

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)

**Jetbrains**

- [Markdown Navigator](https://plugins.jetbrains.com/plugin/7896-markdown-navigator/)

♥

Prasit Tongpradit @EpicHigh - ผู้ดูแล
