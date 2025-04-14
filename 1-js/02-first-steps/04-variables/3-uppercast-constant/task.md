importance: 4

---

# const แบบพิมพ์ใหญ่

ลองพิจารณาจากโค้ดดังต่อไปนี้

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
เรามีตัวแปร `birthday` และ `age` ที่จะถูกคำนวณจากค่าเริ่มต้นอย่าง `birthday` ด้วยความช่วยเหลือจากฟังก์ชั่น `someCode` (ในตอนนี้ยังไม่ต้องรู้จักฟังก์ชั่น เพราะยังไม่ใช่ประเด็นในตอนนี้)
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

จะให้ชื่อตัวแปรไหนเป็น ตัวพิมพ์เล็ก หรือ ตัวใหญ่ดีตัวแปร `birthday` ดีไหม? หรือตัวแปร `age` หรือจะทั้งคู่ดีละ

```js
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
```
