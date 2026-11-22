
ผลที่ `alert` แสดงในแต่ละกรณีมีดังนี้

1. `true`

    การกำหนด `Rabbit.prototype = {}` เปลี่ยนโปรโตไทป์ (prototype) ที่ออบเจ็กต์ (object) ตัวใหม่จะได้รับเมื่อเรียก `new Rabbit()` ครั้งต่อไป ส่วน `rabbit` ที่สร้างไว้แล้วมี `[[Prototype]]` เป็นออบเจ็กต์เดิมที่มี `eats: true`

2. `false`

    `Rabbit.prototype` กับ `[[Prototype]]` ของ `rabbit` อ้างถึงออบเจ็กต์ตัวเดียวกัน ตอนสร้าง `rabbit` จึงไม่มีการทำสำเนาพร็อพเพอร์ตี้ (property) ชื่อ `eats` มาไว้บน `rabbit`

    เมื่อกำหนด `Rabbit.prototype.eats = false` เราเปลี่ยนค่าบนออบเจ็กต์ที่ทั้งคู่อ้างถึง การอ่าน `rabbit.eats` จึงได้ `false` เช่นกัน

3. `true`

    `delete rabbit.eats` พยายามลบ `eats` บน `rabbit` เอง แต่ `eats` อยู่บนโปรโตไทป์ จึงไม่มีอะไรถูกลบ และ `rabbit.eats` ยังมีค่าเป็น `true`

4. `undefined`

    คราวนี้ `delete Rabbit.prototype.eats` ลบ `eats` ออกจากโปรโตไทป์โดยตรง เมื่ออ่าน `rabbit.eats` แล้วหา `eats` ไม่พบตลอดห่วงโซ่โปรโตไทป์ (prototype chain) จึงได้ `undefined`
