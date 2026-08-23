importance: 5

---

# ตัดข้อความให้สั้นลง

สร้างฟังก์ชัน `truncate(str, maxlength)` เพื่อตรวจความยาวของ `str` ถ้ายาวเกิน `maxlength` ให้ตัดท้าย `str` แล้วใส่อักขระจุดไข่ปลา `"…"` แทน เพื่อให้สตริงมีความยาวเท่ากับ `maxlength`

ฟังก์ชันต้องคืนสตริงที่ตัดแล้ว หรือคืนสตริงเดิมถ้าไม่ต้องตัด

ตัวอย่างเช่น:

```js
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
```
