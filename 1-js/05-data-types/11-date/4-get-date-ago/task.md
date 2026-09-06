importance: 4

---

# ย้อนหลังไปหลายวัน ตรงกับวันที่เท่าไร

สร้างฟังก์ชัน (function) `getDateAgo(date, days)` ที่คืนค่าวันที่ในเดือนเมื่อย้อนหลังจาก `date` ไป `days` วัน

เช่น ถ้าวันนี้เป็นวันที่ 20 แล้ว `getDateAgo(new Date(), 1)` ควรคืนค่า `19` และ `getDateAgo(new Date(), 2)` ควรคืนค่า `18`

ฟังก์ชันต้องทำงานได้ถูกต้องแม้ `days=365` หรือมากกว่านั้น:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1 (1 มกราคม 2015)
alert( getDateAgo(date, 2) ); // 31 (31 ธันวาคม 2014)
alert( getDateAgo(date, 365) ); // 2 (2 มกราคม 2014)
```

ฟังก์ชันต้องไม่แก้ไขค่า `date` ที่รับเข้ามา
