นำ "วันพรุ่งนี้ เวลา 00:00:00" มาลบด้วยวันที่และเวลาปัจจุบัน จะได้จำนวนมิลลิวินาทีที่เหลือก่อนถึงวันพรุ่งนี้

สร้างวันที่ของวันพรุ่งนี้ก่อน แล้วคำนวณผลต่างดังนี้:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // วันที่ของวันพรุ่งนี้
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // ผลต่างในหน่วยมิลลิวินาที
  return Math.round(diff / 1000); // แปลงเป็นวินาที
}
```

อีกวิธีหนึ่ง:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

หลายประเทศมีการเปลี่ยนเวลาตามเวลาออมแสง (Daylight Saving Time หรือ DST) ทำให้บางวันมี 23 หรือ 25 ชั่วโมง จึงอาจต้องแยกจัดการวันเหล่านี้เป็นกรณีพิเศษ
