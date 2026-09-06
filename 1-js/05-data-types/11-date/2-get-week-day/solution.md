เมธอด (method) `date.getDay()` คืนค่าหมายเลขวันในสัปดาห์ โดยเริ่มนับจากวันอาทิตย์

เราจึงสร้างอาร์เรย์ (array) ที่เรียงชื่อวันตามลำดับนี้ แล้วใช้หมายเลขที่ได้เลือกชื่อวันจากอาร์เรย์:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 มกราคม 2014
alert( getWeekDay(date) ); // FR
```
