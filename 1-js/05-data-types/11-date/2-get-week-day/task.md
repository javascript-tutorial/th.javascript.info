importance: 5

---

# แสดงชื่อวันในสัปดาห์

เขียนฟังก์ชัน (function) `getWeekDay(date)` เพื่อแสดงชื่อวันในสัปดาห์เป็นตัวย่อภาษาอังกฤษ ได้แก่ 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU' ซึ่งหมายถึงวันจันทร์ถึงวันอาทิตย์ตามลำดับ

ตัวอย่าง:

```js no-beautify
let date = new Date(2012, 0, 3);  // 3 มกราคม 2012
alert( getWeekDay(date) );        // ควรแสดง "TU"
```
