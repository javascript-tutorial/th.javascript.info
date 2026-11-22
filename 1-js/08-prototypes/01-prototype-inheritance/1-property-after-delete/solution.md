
1. `true` เพราะ `rabbit` มีพร็อพเพอร์ตี้ (property) ชื่อ `jumps` เป็นของตัวเอง
2. `null` เมื่อลบ `rabbit.jumps` แล้ว JavaScript จึงค้นหาต่อและพบ `jumps` ในโปรโตไทป์ (prototype) คือ `animal`
3. `undefined` เพราะเมื่อลบ `animal.jumps` ด้วยแล้ว JavaScript ก็ค้นหา `jumps` ไม่พบตลอดห่วงโซ่โปรโตไทป์ (prototype chain)
