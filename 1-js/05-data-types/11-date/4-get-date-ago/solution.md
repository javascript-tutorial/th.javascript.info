เริ่มจากนำวันที่ในเดือนของ `date` มาลบด้วยจำนวนวันที่ต้องการย้อนหลัง:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

แต่ฟังก์ชัน (function) นี้แก้ไข `date` ไปด้วย ซึ่งผิดเงื่อนไขของโจทย์ โค้ดที่เรียกใช้ฟังก์ชันไม่ได้คาดว่าวันที่ที่ส่งเข้ามาจะเปลี่ยนไป

เราจึงสร้างสำเนาของวันที่ แล้วแก้ไขเฉพาะสำเนา:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1 (1 มกราคม 2015)
alert( getDateAgo(date, 2) ); // 31 (31 ธันวาคม 2014)
alert( getDateAgo(date, 365) ); // 2 (2 มกราคม 2014)
```
