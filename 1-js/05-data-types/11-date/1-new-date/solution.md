คอนสตรักเตอร์ (constructor) `new Date` ในรูปแบบนี้ใช้เขตเวลาท้องถิ่น (local time zone) อยู่แล้ว จุดที่ต้องระวังคือหมายเลขเดือนเริ่มนับจากศูนย์

เดือนกุมภาพันธ์จึงใช้หมายเลข `1`

ตัวอย่างนี้ระบุปี เดือน วัน และเวลาเป็นตัวเลข:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
หรือจะสร้างวันที่จากสตริง (string) ก็ได้:

```js run
//new Date(datastring)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
```
