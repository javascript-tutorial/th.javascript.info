**พร็อพเพอร์ตี้ (property) ชื่อ `full` จะอยู่ใน `rabbit`**

ในการเรียก `rabbit.eat()` ค่า `this` คือออบเจ็กต์ (object) หน้าจุด ซึ่งก็คือ `rabbit` บรรทัด `this.full = true` จึงกำหนดค่าให้ `rabbit.full`

ลองแยกการค้นหาเมธอด (method) ออกจากการเรียกเมธอดนั้น

JavaScript ค้นหา `eat` และพบเมธอดนี้ในโปรโตไทป์ (prototype) คือ `animal` จากนั้นจึงเรียกเมธอดโดยให้ `this` เป็น `rabbit`
