importance: 4

---

# กรองแอนาแกรม (anagram)

[แอนาแกรม](https://en.wikipedia.org/wiki/Anagram) คือคำที่มีตัวอักษรเหมือนกัน และมีตัวอักษรแต่ละตัวจำนวนเท่ากัน แต่เรียงลำดับต่างกัน

ตัวอย่าง:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

เขียนฟังก์ชัน (function) `aclean(arr)` ที่รับอาร์เรย์ (array) ของคำ แล้วคืนค่าอาร์เรย์ที่กรองคำซึ่งเป็นแอนาแกรมกันให้เหลือเพียงคำเดียวต่อกลุ่ม

ตัวอย่าง:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" หรือ "PAN,cheaters,era"
```

แต่ละกลุ่มต้องเหลือคำเพียงคำเดียว จะเลือกเก็บคำใดในกลุ่มก็ได้ โดยถือว่าตัวพิมพ์เล็กกับตัวพิมพ์ใหญ่เป็นตัวอักษรเดียวกัน เช่น `"nap"` กับ `"PAN"` อยู่กลุ่มเดียวกัน
