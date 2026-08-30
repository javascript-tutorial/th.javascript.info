importance: 5

---

# แปลง border-left-width เป็น borderLeftWidth

เขียนฟังก์ชัน `camelize(str)` สำหรับแปลงสตริงที่มีคำคั่นด้วยขีดกลาง เช่น `"my-short-string"` ให้เป็น camel case เช่น `"myShortString"`

วิธีแปลงคือลบขีดกลางทั้งหมด แล้วเปลี่ยนอักษรตัวแรกของทุกคำที่ตามหลังขีดกลางให้เป็นตัวพิมพ์ใหญ่

ตัวอย่าง:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

คำใบ้: ใช้ `split` แยกสตริงเป็นอาร์เรย์ แปลงสมาชิก แล้วใช้ `join` รวมกลับเป็นสตริง
