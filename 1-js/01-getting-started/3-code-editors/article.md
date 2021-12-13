# Code editors

Code editor เป็นสิ่งที่นักพัฒนามักใช้เวลาร่วมมากที่สุด

โดยจะมี 2 ประเภทหลักๆ นักพัฒนาจะใช้หนึ่งในสองอย่างนี้ คือ IDE และ lightweight editor 

## IDE

คำว่า [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) (Integrated Development Environment) หมายถึงเครื่องมือที่ประกอบด้วยฟีเจอร์มากมายที่ใช้จัดการงานระดับโปรเจ็คต์ IDE จึงไม่ใช่แค่ text editor ธรรมดา แต่เป็น "development environment" เต็มรูปแบบ

IDE โหลดโปรเจค (ที่ประกอบด้วยไฟล์จำนวนมาก) ที่มีฟีเจอร์หลักๆคือ navigation ระหว่างไฟล์, autocompletion, บางตัวจะมี version management system อย่างกิต (git) ให้ด้วย, testing environment และฟีเจอร์ที่จัดการกับโปรเจ็คต์โดยเฉพาะ

หากยังไม่มี IDE ในดวงใจ ลองดู IDE ด้านล่างไว้พิจารณา

- [Visual Studio Code](https://code.visualstudio.com/) (cross-platform, ฟรี).
- [WebStorm](http://www.jetbrains.com/webstorm/) (cross-platform, เสียตัง).

สำหรับผู้ใช้ Windows หลายๆคนอาจมีความสับสนกับชื่อระหว่าง Visual Studio Code กับ Visual Studio ตัวหลังเป็น IDE แบบเสียตัง และดีที่สุดของ IDE สำหรับ Windows โดยเฉพาะฝั่งของ .NET และ JavaScript ก็พอใช้ได้ ยังมีเวอร์ชั่นฟรีให้ใช้ด้วย [Visual Studio Community](https://www.visualstudio.com/vs/community/).

IDE ส่วนมากจะเสียตัง แต่จะมีระยะเวลาทดลองใช้ แต่ค่าใช้จ่ายส่วนนี้มักจะเล็กน้อยเมื่อเทียบกับรายได้ของนักพัฒนาต่างประเทศ เก่งๆ หรือทำงานมาหลายปี ดังนั้นเลือกที่ตัวเองชอบมากที่สุด

## Lightweight editors

"Lightweight editors" ไม่ได้มีฟีเจอร์เทียบเท่า IDE แต่เร็ว สวย และใช้งานง่าย

ส่วนใหญ่มักจะใช้เพื่อเปิดไฟล์แก้ไขได้ทันที

ความแตกต่างระหว่าง IDE กับ Lightweight editors คือ IDE มักจะทำงานในระดับโปรเจค ที่ต้องอาศัยการประมวล โหลดข้อมูลจำนวนมาก หรือวิเคราะห์โครงสร้างในโปรเจ็คต์ และอื่นๆ ส่วนแบบ lightweight จะตอบโจทย์ด้านความเร็ว หากเราต้องการแก้ไขไฟล์แค่ไฟล์เดียว

ในทางปฎิบัติ lightweight editors บางตัวอาจมีปลั๊กอินไว้ติดตั้งเพิ่มเติมด้วย เช่น ตัววิเคราะห์ directory-level syntax และ autocompleters ดังนั้นจึงไม่มีเส้นแบ่งระหว่างตัวที่เป็น IDE กับ lightweight ชัดเจนมากนัก

ก็จะมีตัวเลือกดังต่อไปนี้

<<<<<<< HEAD
- [Atom](https://atom.io/) (cross-platform, ฟรี).
- [Sublime Text](http://www.sublimetext.com) (cross-platform, ให้ทดลองใช้).
- [Notepad++](https://notepad-plus-plus.org/) (Windows, ฟรี).
- [Vim](http://www.vim.org/) and [Emacs](https://www.gnu.org/software/emacs/) IDEs สำหรับโปรแกรมเมอร์ที่แท้จริง
=======
- [Atom](https://atom.io/) (cross-platform, free).
- [Sublime Text](http://www.sublimetext.com) (cross-platform, shareware).
- [Notepad++](https://notepad-plus-plus.org/) (Windows, free).
- [Vim](http://www.vim.org/) and [Emacs](https://www.gnu.org/software/emacs/) are also cool if you know how to use them.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

## อย่าเถียงกันเลย

รายการ editor ข้างที่แนะนำข้างต้น เป็น editor ที่คนรอบข้างที่เป็นนักพัฒนาและตัวผมเองใช้ (แค่ตัวเดียวนะ) เป็นเวลานาน และมีความสุขที่ได้ใช้

มี editor อีกมากมายพร้อมเป็นตัวเลือกสำหรับเรา จงเลือกตัวที่เหมาะกับเรามากที่สุด

ตัว editor เอง ก็เป็นเหมือนเครื่องมืออื่นๆ ดังนั้นเหตุผลจึงขึ้นอยู่กับโปรเจคที่ทำ นิสัย และความชอบของเรามากกว่า
