importance: 5

---

# แสดงผล linked list

สมมติเรามี linked list (ตามที่อธิบายในบท <info:recursion>):

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

เขียนฟังก์ชัน `printList(list)` ที่แสดงสมาชิกใน list ทีละตัว

เขียนคำตอบ 2 แบบ: ใช้ลูป และใช้การเรียกซ้ำ

แบบไหนดีกว่ากัน? แบบเรียกซ้ำ หรือไม่เรียกซ้ำ?
