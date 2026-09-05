importance: 5

---

# แปลง border-left-width เป็น borderLeftWidth

เขียนฟังก์ชัน (function) `camelize(str)` ที่แปลงสตริง (string) ซึ่งคั่นคำด้วยขีดกลาง เช่น `"my-short-string"` ให้เป็นรูปแบบ camelCase อย่าง `"myShortString"`

ให้ลบขีดกลางทั้งหมด แล้วเปลี่ยนตัวอักษรแรกของคำที่ตามหลังขีดกลางเป็นตัวพิมพ์ใหญ่

ตัวอย่าง:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

คำใบ้: ใช้ `split` แยกสตริงเป็นอาร์เรย์ (array) ปรับแต่ละคำ แล้วใช้ `join` รวมกลับเป็นสตริง
