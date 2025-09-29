# บทนำสู่ JavaScript

มาดูกันว่า JavaScript มีลักษณะพิเศษอะไรบ้าง เราสามารถทำอะไรได้ด้วยภาษานี้ และมันเข้ากันได้ดีกับเทคโนโลยีใดบ้าง

## JavaScript คืออะไร?

*JavaScript* ถูกสร้างขึ้นเพื่อ "ทำให้เว็บเพจมีชีวิตชีวา"

โปรแกรมที่เขียนด้วยภาษานี้เรียกว่า *สคริปต์* ซึ่งสามารถแทรกลงในโค้ด HTML ของเว็บเพจได้โดยตรง และทำงานโดยอัตโนมัติเมื่อเพจนั้นโหลดขึ้นมา

สคริปต์จะถูกเตรียมและประมวลผลในรูปแบบข้อความธรรมดา ไม่จำเป็นต้องมีขั้นตอนการเตรียมหรือคอมไพล์พิเศษใดๆ ก่อนการทำงาน 

ในแง่นี้ JavaScript แตกต่างจากภาษา [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) อย่างชัดเจน

```smart header="ทำไมถึงมีชื่อว่า <u>Java</u>Script?"
เมื่อ JavaScript ถูกสร้างขึ้นในยุคแรก มันมีชื่อว่า "LiveScript" แต่เนื่องจากในขณะนั้น Java กำลังได้รับความนิยมอย่างสูง จึงมีการตัดสินใจว่าการนำเสนอภาษาใหม่นี้ในฐานะ "น้องชาย" ของ Java จะช่วยให้เป็นที่สนใจมากขึ้น

แต่เมื่อมันค่อยๆ พัฒนาไป ในที่สุด JavaScript ก็กลายเป็นภาษาที่มีเอกลักษณ์เฉพาะตัวอย่างสมบูรณ์ มีมาตรฐานของตัวเองที่เรียกว่า [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) และปัจจุบันไม่มีความเกี่ยวข้องใดๆ กับ Java อีกต่อไป
```

ในยุคปัจจุบัน JavaScript สามารถทำงานได้ไม่เพียงแค่ในเบราว์เซอร์ แต่ยังรันได้บนเซิร์ฟเวอร์หรืออุปกรณ์ใดๆ ที่มีโปรแกรมพิเศษที่เรียกว่า [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine)

เบราว์เซอร์แต่ละตัวมี engine ของตัวเองฝังอยู่ในตัว บางครั้งเรียกว่า "JavaScript virtual machine"

Engine แต่ละตัวมีชื่อเรียก (codename) ที่แตกต่างกัน เช่น:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- ใน Chrome, Opera และ Edge
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- ใน Firefox
- ...มีชื่อเรียกอื่นๆ อีก เช่น "Chakra" ใน IE, "JavaScriptCore", "Nitro" และ "SquirrelFish" ใน Safari เป็นต้น

จำคำศัพท์เหล่านี้ไว้จะเป็นประโยชน์ เพราะมักจะถูกกล่าวถึงในบทความสำหรับนักพัฒนาบ่อยๆ เราก็จะใช้มันเช่นกัน ตัวอย่างเช่น ถ้ามีการพูดว่า "ฟีเจอร์ X รองรับโดย V8" ซึ่งหมายความว่ามันน่าจะทำงานได้ใน Chrome, Opera และ Edge

```smart header="engine ทำงานอย่างไร?"

Engine มีกระบวนการทำงานที่ค่อนข้างซับซ้อน แต่พื้นฐานแล้วไม่ยาก

<<<<<<< HEAD
1. Engine (ที่ฝังมากับเบราว์เซอร์) อ่าน ("parse") สคริปต์
2. แล้วแปลง ("compile") สคริปต์ให้เป็นภาษาเครื่อง
3. จากนั้นก็รันโค้ดภาษาเครื่องได้อย่างรวดเร็ว
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Engine จะใช้เทคนิคการปรับแต่งในทุกขั้นตอน มันจะติดตามข้อมูลของสคริปต์ที่ผ่านการคอมไพล์แล้ว วิเคราะห์การไหลของข้อมูล และใช้ข้อมูลที่ได้จากการวิเคราะห์นั้นมาปรับแต่งรหัสภาษาเครื่องให้ดีขึ้นไปอีก 
```

## JavaScript ในเบราว์เซอร์ทำอะไรได้บ้าง?

<<<<<<< HEAD
JavaScript สมัยใหม่เป็นภาษาโปรแกรมที่ "ปลอดภัย" มันไม่สามารถเข้าถึงระดับล่างของหน่วยความจำหรือซีพียูได้โดยตรง เพราะถูกออกแบบมาเพื่อใช้งานในเบราว์เซอร์ที่ไม่จำเป็นต้องใช้ฟีเจอร์เหล่านั้น
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

ความสามารถของ JavaScript นั้นขึ้นอยู่กับสภาพแวดล้อมที่มันทำงานอยู่เป็นอย่างมาก เช่น [Node.js](https://wikipedia.org/wiki/Node.js) ช่วยเสริมความสามารถให้ JavaScript สามารถอ่านหรือเขียนแฟ้มใดๆ ก็ได้ ส่งคำขอผ่านเน็ตเวิร์ค เป็นต้น

ส่วน JavaScript ในเบราว์เซอร์นั้น สามารถทำอะไรก็ตามที่เกี่ยวข้องกับการจัดการเว็บเพจ การโต้ตอบกับผู้ใช้ และเว็บเซิร์ฟเวอร์

ตัวอย่างเช่น JavaScript ในเบราว์เซอร์สามารถ:

- เพิ่ม HTML ใหม่ลงในหน้าเว็บ เปลี่ยนแปลงเนื้อหาที่มีอยู่ แก้ไขรูปแบบ (style) ของหน้าเว็บ
- ตอบสนองต่อการกระทำของผู้ใช้ เช่นการคลิกเมาส์ การเลื่อนเคอร์เซอร์ และการกดปุ่ม
- ส่งคำขอไปยังเซิร์ฟเวอร์ผ่านเครือข่าย ดาวน์โหลดและอัปโหลดไฟล์ (เรียกกันว่า [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) และ [COMET](https://en.wikipedia.org/wiki/Comet_(programming)))
- รับและตั้งค่าคุกกี้ ถามคำถามผู้ใช้ แสดงข้อความ
- จำข้อมูลฝั่งไคลเอนต์ ("local storage")

## JavaScript ในเบราว์เซอร์ทำอะไรไม่ได้บ้าง? 

<<<<<<< HEAD
ความสามารถของ JavaScript ในเบราว์เซอร์มีข้อจำกัดเพื่อความปลอดภัยของผู้ใช้ มีจุดประสงค์เพื่อป้องกันหน้าเว็บที่ไม่น่าไว้วางใจจากการเข้าถึงข้อมูลส่วนตัว หรือทำให้ข้อมูลของผู้ใช้เสียหาย
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

ตัวอย่างของข้อจำกัดเหล่านั้น ได้แก่:

- JavaScript ในหน้าเว็บไม่สามารถอ่าน/เขียน/คัดลอกไฟล์ในฮาร์ดดิสก์ หรือเรียกใช้โปรแกรมอื่นๆ ได้โดยตรง มันไม่มีสิทธิ์เข้าถึงฟังก์ชันระบบของระบบปฏิบัติการเองโดยตรง

    เบราว์เซอร์รุ่นใหม่ๆ อนุญาตให้มันทำงานกับไฟล์ได้บ้าง แต่การเข้าถึงนั้นจะถูกจำกัดมากและต้องได้รับการยินยอมจากผู้ใช้ เช่นการ "ลาก" ไฟล์ลงในหน้าเว็บ หรือเลือกผ่านแท็ก `<input>`

<<<<<<< HEAD
    มีวิธีโต้ตอบกับกล้อง ไมโครโฟน และอุปกรณ์อื่นๆ ได้ แต่ต้องได้รับอนุญาตอย่างชัดเจนจากผู้ใช้เสมอ เพราะฉะนั้นหน้าเว็บที่ใช้ JavaScript จะไม่สามารถเปิดเว็บแคมแอบดูโดยไม่ให้ผู้ใช้สังเกตเห็นและส่งข้อมูลไปยัง [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) ได้ 
- แท็บ/วินโดว์ที่แตกต่างกันโดยปกติแล้วไม่รู้จักกัน แม้ในบางครั้งที่อาจทำได้ เช่นเมื่อหน้าต่างหนึ่งใช้ JavaScript เปิดหน้าต่างอื่นขึ้นมา แต่แม้ในกรณีนี้ JavaScript จากหน้าหนึ่งก็ไม่สามารถเข้าถึงหน้าอื่นได้หาก URL ของหน้านั้นมาจากโดเมน โปรโตคอล หรือพอร์ตที่ต่างกัน เรียกว่า "Same Origin Policy"

    สิ่งนี้จำเป็นต้องทำเพื่อให้มีการยินยอมและทำความเข้าใจ *ระหว่างหน้าเว็บทั้งสองฝ่าย* ในการแลกเปลี่ยนข้อมูล และต้องใช้โค้ด JavaScript พิเศษเพื่อจัดการเรื่องนี้ เราจะกล่าวถึงเรื่องนี้ในบทเรียนข้างหน้า

    ข้อจำกัดนี้ก็เพื่อความปลอดภัยของผู้ใช้ด้วยเช่นกัน ไม่ควรให้หน้า `http://anysite.com` ที่เปิดอยู่ในแท็บหนึ่ง สามารถเข้าถึง URL `http://gmail.com` ในอีกแท็บของเบราว์เซอร์ ซึ่งอาจจะขโมยข้อมูลจากที่นั่นไปได้
- JavaScript ติดต่อสื่อสารกับเซิร์ฟเวอร์ที่หน้านั้นมาจากได้โดยง่าย แต่ความสามารถในการรับข้อมูลจากโดเมนหรือไซต์อื่นๆ นั้นถูกจำกัด เป็นไปได้แต่ต้องมีข้อตกลงชัดเจนจากเซิร์ฟเวอร์ปลายทาง (แสดงด้วย HTTP header) เป็นข้อจำกัดทางความปลอดภัยอีกเช่นกัน

![](limitations.svg)

ข้อจำกัดเหล่านี้ไม่มีการบังคับใช้เลยหาก JavaScript ทำงานนอกเบราว์เซอร์ เช่นบนเซิร์ฟเวอร์ สำหรับเบราว์เซอร์สมัยใหม่ก็อนุญาตให้ปลั๊กอิน/ส่วนขยายขอสิทธิ์เพิ่มเติมได้
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

## อะไรที่ทำให้ JavaScript โดดเด่นเป็นเอกลักษณ์?

JavaScript มีอย่างน้อย *3 คุณสมบัติ* ที่โดดเด่น:

```compare
+ ผสานเข้ากับ HTML/CSS ได้อย่างลงตัว
+ ทำสิ่งง่ายๆ ได้อย่างง่ายดาย  
+ รองรับโดยเบราว์เซอร์หลักทั้งหมด และเปิดใช้งานเป็นค่าเริ่มต้น
```

JavaScript เป็นเทคโนโลยีเบราว์เซอร์เพียงอย่างเดียวที่รวมทั้ง 3 คุณสมบัตินี้เข้าด้วยกัน

<<<<<<< HEAD
ด้วยคุณสมบัติเฉพาะตัวเหล่านี้ ทำให้ JavaScript กลายเป็นเครื่องมือที่ได้รับความนิยมอย่างกว้างขวางในการสร้างส่วนติดต่อผู้ใช้บนเบราว์เซอร์
=======
That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

อย่างไรก็ตาม ปัจจุบัน JavaScript ยังสามารถใช้สร้างเซิร์ฟเวอร์ แอปพลิเคชันมือถือ และอื่นๆ ได้อีกด้วย

## ภาษาที่ถูก "transpile" เป็น JavaScript

ไวยากรณ์ของ JavaScript อาจไม่ตอบโจทย์ความต้องการของทุกคน แต่ละคนต้องการฟีเจอร์ที่แตกต่างกันไป

<<<<<<< HEAD
ซึ่งเป็นเรื่องที่เข้าใจได้ เพราะแต่ละโปรเจกต์และความต้องการของแต่ละคนมีความแตกต่างกัน
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

ดังนั้น จึงมีภาษาโปรแกรมใหม่ๆ เกิดขึ้นมากมายในช่วงไม่นานมานี้ โดยภาษาเหล่านี้จะถูก *transpile* (แปลง) เป็น JavaScript ก่อนที่จะทำงานในเบราว์เซอร์

เครื่องมือสมัยใหม่ทำให้ขั้นตอนการ transpile เป็นไปได้อย่างรวดเร็วและโปร่งใส ทำให้นักพัฒนาสามารถเขียนโค้ดด้วยภาษาอื่น แล้วแปลงเป็น JavaScript โดยอัตโนมัติเบื้องหลังได้

<<<<<<< HEAD
ตัวอย่างของภาษาเหล่านั้น ได้แก่:

- [CoffeeScript](https://coffeescript.org/) เป็น "syntactic sugar" สำหรับ JavaScript โดยนำเสนอไวยากรณ์ที่กระชับกว่า ช่วยให้เราเขียนโค้ดได้ชัดเจนและถูกต้องมากขึ้น เป็นที่นิยมในหมู่นักพัฒนา Ruby
- [TypeScript](https://www.typescriptlang.org/) เน้นการเพิ่ม "strict data typing" เพื่อให้การพัฒนาและดูแลระบบที่ซับซ้อนง่ายขึ้น พัฒนาโดย Microsoft 
- [Flow](https://flow.org/) ก็เพิ่ม data typing เช่นกัน แต่ในรูปแบบที่แตกต่างออกไป พัฒนาโดย Facebook
- [Dart](https://www.dartlang.org/) เป็นภาษาแยกต่างหากที่มี engine เป็นของตัวเอง สามารถทำงานในสภาพแวดล้อมที่ไม่ใช่เบราว์เซอร์ได้ (เช่น แอปมือถือ) และยังสามารถ transpile เป็น JavaScript ได้ พัฒนาโดย Google
- [Brython](https://brython.info/) เป็น transpiler ที่แปลง Python เป็น JavaScript ทำให้สามารถเขียนแอปด้วย Python บริสุทธิ์ได้โดยไม่ต้องใช้ JavaScript  
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) เป็นภาษาโปรแกรมสมัยใหม่ที่กระชับและปลอดภัย สามารถกำหนดเป้าหมายไปที่เบราว์เซอร์หรือ Node ได้
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

มีภาษาอื่นๆ อีกมากมาย แม้จะใช้ภาษาเหล่านี้ก็จริง แต่การศึกษา JavaScript เองก็ยังมีความจำเป็น เพื่อให้เข้าใจอย่างถ่องแท้ว่ากำลังทำอะไรอยู่

## สรุป

- JavaScript ถูกสร้างขึ้นมาเพื่อใช้เป็นภาษาสำหรับเบราว์เซอร์โดยเฉพาะ แต่ปัจจุบันก็ถูกนำไปใช้ในสภาพแวดล้อมอื่นๆ มากมาย
- ในปัจจุบัน JavaScript มีบทบาทสำคัญในฐานะภาษาเบราว์เซอร์ที่ได้รับการยอมรับอย่างกว้างขวางที่สุด โดยสามารถทำงานร่วมกับ HTML/CSS ได้อย่างลงตัว  
- มีภาษาอีกหลายภาษาที่ถูก "transpile" เป็น JavaScript และมีฟีเจอร์เสริมบางอย่าง แนะนำให้ลองศึกษาคร่าวๆ หลังจากที่เชี่ยวชาญ JavaScript แล้ว
