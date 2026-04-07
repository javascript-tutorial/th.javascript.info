importance: 4

---

# const ตัวพิมพ์ใหญ่

ลองดูโค้ดนี้

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

เรามีตัวแปร `birthday` กับ `age` ที่คำนวณจาก `birthday` โดยใช้ฟังก์ชัน `someCode` (ตอนนี้ยังไม่ต้องรู้จักฟังก์ชันก็ได้ ยังไม่ใช่ประเด็น)

ควรเปลี่ยนตัวไหนให้เป็นตัวพิมพ์ใหญ่ดี — `birthday`? หรือ `age`? หรือทั้งคู่?

```js
const BIRTHDAY = '18.04.1982'; // เปลี่ยน birthday เป็นตัวพิมพ์ใหญ่ดีไหม?

const AGE = someCode(BIRTHDAY); // เปลี่ยน age เป็นตัวพิมพ์ใหญ่ดีไหม?
```
