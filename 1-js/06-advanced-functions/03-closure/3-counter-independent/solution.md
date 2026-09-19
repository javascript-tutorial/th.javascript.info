คำตอบคือ **`0` แล้วตามด้วย `1`**

ฟังก์ชัน (function) `counter` กับ `counter2` เกิดจากการเรียก `makeCounter` คนละครั้ง

แต่ละฟังก์ชันจึงมี Lexical Environment ชั้นนอกแยกกัน และแต่ละชั้นมีตัวแปร (variable) `count` ของตัวเอง การเรียก `counter` จึงไม่เปลี่ยนค่าตัวนับของ `counter2`
