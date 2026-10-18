คำตอบคือ `undefined`

`bind` คืนฟังก์ชัน (function) ใหม่ ซึ่งเป็นออบเจ็กต์ (object) คนละตัวกับ `sayHi` และไม่ได้คัดลอกพร็อพเพอร์ตี้ (property) `test` มาด้วย จึงอ่าน `bound.test` ได้เป็น `undefined`
