importance: 5

---

# แสดงสมาชิกของ linked list ทีละตัว

สมมติว่าเรามี linked list ที่แต่ละสมาชิกเชื่อมไปยังตัวถัดไปในทิศทางเดียว ตามที่อธิบายในบท <info:recursion>:

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

เขียนฟังก์ชัน (function) `printList(list)` ที่แสดงค่าของสมาชิกใน linked list ทีละตัวตามลำดับ

เขียนคำตอบ 2 แบบ โดยใช้ลูป (loop) และใช้การเรียกซ้ำ (recursion)

ระหว่างแบบใช้ลูปกับแบบเรียกซ้ำ วิธีไหนดีกว่ากัน?
