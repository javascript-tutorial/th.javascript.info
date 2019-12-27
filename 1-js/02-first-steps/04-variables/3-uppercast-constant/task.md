importance: 4

---

# const แบบพิมพ์ใหญ่

ลองพิจารณาจากโค้ดดังต่อไปนี้

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

เรามีตัวแปร `birthday` และ `age` ที่จะถูกคำนวณจากค่าเริ่มต้นอย่าง `birthday` ด้วยความช่วยเหลือจากฟังก์ชั่น `someCode` (ในตอนนี้ยังไม่ต้องรู้จักฟังก์ชั่น เพราะยังไม่ใช่ประเด็นในตอนนี้)

จะให้ชื่อตัวแปรไหนเป็น ตัวพิมพ์เล็ก หรือ ตัวใหญ่ดีตัวแปร `birthday` ดีไหม? หรือตัวแปร `age` หรือจะทั้งคู่ดีละ

```js
const BIRTHDAY = '18.04.1982'; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```

