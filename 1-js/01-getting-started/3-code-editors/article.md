# Code Editor

Code editor เป็นเครื่องมือที่โปรแกรมเมอร์ใช้เวลาด้วยมากที่สุด

มีสองแบบหลักๆ คือ IDE กับ lightweight editor — dev หลายคนก็ใช้ทั้งสองแบบสลับกันไป

## IDE

[IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) ย่อมาจาก Integrated Development Environment — ไม่ใช่แค่ editor ธรรมดา แต่เป็น "สภาพแวดล้อมพัฒนาครบวงจร" ที่ทำงานในระดับโปรเจ็กต์เลย

IDE โหลดทั้งโปรเจ็กต์เข้ามา (อาจมีหลายไฟล์) ให้เราสลับไฟล์ได้สะดวก มี autocomplete ที่ฉลาดตามบริบทของโปรเจ็กต์ทั้งหมด (ไม่ใช่แค่ไฟล์ที่เปิดอยู่) เชื่อมกับ version control อย่าง [git](https://git-scm.com/) แล้วก็รันเทสต์ได้ด้วย

ยังไม่เคยใช้ IDE? ลองดูพวกนี้:

- [Visual Studio Code](https://code.visualstudio.com/) (รองรับหลายแพลตฟอร์ม, ฟรี) 
- [WebStorm](https://www.jetbrains.com/webstorm/) (รองรับหลายแพลตฟอร์ม, มีค่าใช้จ่าย)

บน Windows ยังมี "Visual Studio" ด้วย — อย่าสับสนกับ "Visual Studio Code" นะ ตัวนี้เป็น IDE ที่แรงมากและเสียค่าใช้จ่าย มีแค่บน Windows เหมาะกับ .NET แต่ใช้กับ JavaScript ก็ดีเหมือนกัน มีเวอร์ชันฟรีชื่อ [Visual Studio Community](https://www.visualstudio.com/vs/community/)

IDE หลายตัวเสียเงิน แต่ก็มีทดลองใช้ฟรี เทียบกับเงินเดือน dev แล้วถือว่าไม่แพง — เลือกตัวที่ถูกใจที่สุดเลย

## Lightweight Editor

Lightweight editor อาจไม่แรงเท่า IDE แต่เปิดไว เบาสบาย ใช้ง่าย

ส่วนใหญ่ใช้เปิดแก้ไฟล์แบบไวๆ

ต่างจาก IDE ยังไงล่ะ? IDE ทำงานระดับโปรเจ็กต์ เลยโหลดนานกว่า ต้องวิเคราะห์โครงสร้างโปรเจ็กต์ก่อน แต่ lightweight editor เปิดไฟล์ปุ๊บใช้ได้ปั๊บ

แต่จริงๆ แล้ว lightweight editor สมัยนี้ก็ลงปลั๊กอินเพิ่มได้เยอะ — ทั้ง syntax analysis และ autocomplete ระดับโฟลเดอร์ เลยแยกจาก IDE ได้ไม่ชัดเท่าไร

มีตัวเลือกมากมาย เช่น:

- [Sublime Text](https://www.sublimetext.com/) (รองรับหลายแพลตฟอร์ม, shareware)
- [Notepad++](https://notepad-plus-plus.org/) (Windows, ฟรี)
- [Vim](https://www.vim.org/) และ [Emacs](https://www.gnu.org/software/emacs/) ก็เจ๋งมากสำหรับคนที่เชี่ยวชาญ

## อย่าทะเลาะกันเรื่องนี้เลย

ที่ยกมาข้างบนเป็นตัวที่ผู้เขียนกับเพื่อนๆ dev ใช้มานานแล้วพอใจ

แน่นอนว่ายังมีตัวเลือกอื่นอีกเพียบ เลือกตัวที่ถูกใจที่สุดเลย

การเลือก editor ก็เหมือนเลือกเครื่องมืออื่นๆ — เป็นเรื่องรสนิยม ขึ้นอยู่กับโปรเจ็กต์ นิสัยการทำงาน และความชอบของแต่ละคน

ความเห็นส่วนตัวของผู้เขียน:

- ใช้ [Visual Studio Code](https://code.visualstudio.com/) ถ้าทำ frontend เป็นหลัก
- แต่ถ้าใช้ภาษา/แพลตฟอร์มอื่นเป็นหลัก โดยมี frontend แค่บางส่วน ก็จะใช้ตัวอื่นแทน เช่น XCode (Mac), Visual Studio (Windows) หรือ IDE จาก Jetbrains (WebStorm สำหรับ JavaScript, PHPStorm สำหรับ PHP, RubyMine สำหรับ Ruby ฯลฯ) — แล้วแต่ภาษาหลักของโปรเจ็กต์
