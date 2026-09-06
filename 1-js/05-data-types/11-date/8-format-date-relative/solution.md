นำวันที่และเวลาปัจจุบันมาลบด้วย `date` เพื่อหาระยะเวลาที่ผ่านมาจนถึงตอนนี้

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // ผลต่างในหน่วยมิลลิวินาที

  if (diff < 1000) { // น้อยกว่า 1 วินาที
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // แปลง diff เป็นวินาที

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // แปลง diff เป็นนาที
  if (min < 60) {
    return min + ' min. ago';
  }

  // จัดรูปแบบวันที่
  // เติมศูนย์หน้าวัน เดือน ชั่วโมง และนาทีที่มีหลักเดียว
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // ใช้สองหลักสุดท้ายของแต่ละส่วน

  // รวมแต่ละส่วนเป็นวันที่และเวลา
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// วันที่และเวลาของเมื่อวาน เช่น 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

อีกวิธีหนึ่ง:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.floor(diffMs / 1000);
  let diffMin = Math.floor(diffSec / 60);
  let diffHour = diffMin / 60;

  // จัดรูปแบบวันที่และเวลา
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
