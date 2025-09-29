# คู่มือและข้อกำหนด

หนังสือเล่มนี้เป็น *บทเรียน* ที่มุ่งหวังให้คุณค่อยๆ เรียนรู้ภาษา JavaScript อย่างเป็นขั้นเป็นตอน แต่เมื่อคุณคุ้นเคยกับพื้นฐานแล้ว คุณอาจต้องการแหล่งข้อมูลอ้างอิงเพิ่มเติม ดังนี้

<<<<<<< HEAD
## ข้อกำหนด
=======
This book is a *tutorial*. It aims to help you gradually learn the language. But once you're familiar with the basics, you'll need other resources.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

[ข้อกำหนด ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm) เป็นเอกสารที่มีรายละเอียดเชิงลึก ครบถ้วน และเป็นทางการที่สุดเกี่ยวกับ JavaScript เป็นตัวกำหนดมาตรฐานของภาษานี้

แต่เนื่องจากมีลักษณะเป็นทางการมาก จึงอาจทำความเข้าใจได้ยากในช่วงแรก ดังนั้น หากคุณต้องการแหล่งอ้างอิงที่ถูกต้องที่สุดเกี่ยวกับรายละเอียดต่างๆ ของภาษา ข้อกำหนดนี้คือสิ่งที่คุณควรใช้ แต่อาจไม่เหมาะสำหรับการอ้างอิงในชีวิตประจำวัน

ข้อกำหนดเวอร์ชันใหม่จะถูกปล่อยออกมาเป็นประจำทุกปี ในระหว่างช่วงที่ยังไม่มีการปล่อยเวอร์ชันใหม่ สามารถดูร่างข้อกำหนดล่าสุดได้ที่ <https://tc39.es/ecma262/>

<<<<<<< HEAD
หากคุณต้องการอ่านเกี่ยวกับคุณสมบัติใหม่ล่าสุด รวมถึงคุณสมบัติที่ "ใกล้จะเป็นมาตรฐาน" (หรือที่เรียกว่า "stage 3") สามารถดูได้ที่ <https://github.com/tc39/proposals>
=======
A new specification version is released every year. Between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

นอกจากนี้ ถ้าคุณกำลังพัฒนาเว็บสำหรับเบราว์เซอร์ จะมีข้อกำหนดเพิ่มเติมอื่นๆ ที่กล่าวถึงใน[ส่วนที่สอง](info:browser-environment) ของบทเรียนนี้

## คู่มืออ้างอิง

- **MDN (Mozilla) JavaScript Reference** เป็นคู่มือหลักที่มีตัวอย่างและข้อมูลเชิงลึกอื่นๆ เป็นแหล่งข้อมูลที่ยอดเยี่ยมสำหรับการค้นหารายละเอียดเกี่ยวกับฟังก์ชัน เมท็อด และอื่นๆ ในภาษานี้ 

  สามารถเข้าถึงได้ที่ <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>

<<<<<<< HEAD
  อย่างไรก็ตาม บ่อยครั้งแล้วการค้นหาโดยใช้ Google จะสะดวกกว่า เพียงพิมพ์ "MDN [คำที่ต้องการค้นหา]" เช่น ค้นหา <https://google.com/search?q=MDN+parseInt> เพื่อหาข้อมูลเกี่ยวกับฟังก์ชัน `parseInt`

## ตารางความเข้ากันได้
=======
    You can find it at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for the `parseInt` function.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

JavaScript เป็นภาษาที่มีการพัฒนาอย่างต่อเนื่อง มีการเพิ่มคุณสมบัติใหม่ๆ เป็นประจำ

เพื่อตรวจสอบว่าคุณสมบัติต่างๆ นั้นรองรับโดยเบราว์เซอร์และเอ็นจิ้นอื่นๆ มากน้อยเพียงใด สามารถดูได้จาก:

- <https://caniuse.com> - แสดงตารางการรองรับคุณสมบัติแยกตามหมวดหมู่ เช่น หากต้องการดูว่าเอ็นจิ้นใดบ้างที่รองรับฟังก์ชันการเข้ารหัสลับสมัยใหม่ สามารถค้นหาได้ที่ <https://caniuse.com/#feat=cryptography>

<<<<<<< HEAD
- <https://kangax.github.io/compat-table> - ตารางแสดงคุณสมบัติต่างๆ ของภาษา และระบุว่าเอ็นจิ้นใดรองรับหรือไม่รองรับบ้าง

แหล่งข้อมูลเหล่านี้มีประโยชน์อย่างมากในการพัฒนาจริง เนื่องจากมีข้อมูลที่สำคัญเกี่ยวกับรายละเอียดของภาษา ความเข้ากันได้ และอื่นๆ
=======
- <https://caniuse.com> - per-feature tables of support, e.g. to see which engines support modern cryptography functions: <https://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - a table with language features and engines that support those or don't support.

All these resources are useful in real-life development, as they contain valuable information about language details, their support, etc.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

โปรดจดจำแหล่งอ้างอิงเหล่านี้ (หรือบุ๊กมาร์กหน้านี้ไว้) เพื่อใช้ในยามที่คุณต้องการข้อมูลเชิงลึกเกี่ยวกับคุณสมบัติเฉพาะใดๆ ของภาษา
