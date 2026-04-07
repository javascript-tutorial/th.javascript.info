importance: 3

---

# มาสร้างฟอร์ม login ผ่าน prompt กัน

สร้างฟอร์ม login ด้วยฟังก์ชัน `prompt`

ถ้าผู้ใช้กรอก `"Admin"` ก็ใช้ `prompt` ถามรหัสผ่านต่อ — ถ้ากรอกสตริงว่างหรือกด `key:Esc` ให้โชว์ "Canceled" ถ้ากรอกสตริงอื่นให้โชว์ "I don't know you"

กฎการเช็ครหัสผ่าน:

- ถ้ารหัสผ่านเป็น "TheMaster" ให้โชว์ "Welcome!"
- ถ้าไม่ใช่ ให้โชว์ "Wrong password"
- ถ้ากรอกสตริงว่างหรือกด `key:Esc` ให้โชว์ "Canceled"

Schema:

![](ifelse_task.svg)

ใช้บล็อก `if` แบบที่อ่านง่าย — เน้นความชัดเจน

ใบ้: ถ้าไม่ใส่อะไรเลยในช่อง input prompt จะคืนสตริงว่าง `''` กลับมา ถ้ากด `key:ESC` จะคืน `null`

[demo]
