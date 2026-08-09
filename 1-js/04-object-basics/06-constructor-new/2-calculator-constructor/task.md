importance: 5

---

# สร้าง `Calculator` ด้วย `new`

สร้างฟังก์ชันคอนสตรักเตอร์ `Calculator` สำหรับสร้างออบเจ็กต์ที่มี 3 เมธอด:

- `read()` เรียก `prompt` เพื่อรับค่าสองค่าจากผู้ใช้ แล้วเก็บไว้ในพร็อพเพอร์ตี้ของออบเจ็กต์ชื่อ `a` และ `b` ตามลำดับ
- `sum()` คืนผลบวกของพร็อพเพอร์ตี้ทั้งสอง
- `mul()` คืนผลคูณของพร็อพเพอร์ตี้ทั้งสอง

ตัวอย่างการใช้งาน:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
