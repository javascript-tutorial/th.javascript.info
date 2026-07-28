ถ้าต้องการให้ทำงานเหมือน `switch` ทุกกรณี เงื่อนไข `if` ต้องเปรียบเทียบด้วย `'==='`

แต่ถ้า `browser` เป็นสตริงตามโจทย์ การใช้ `'=='` ก็ให้ผลเหมือนกัน

```js no-beautify
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}
```

เงื่อนไข `browser == 'Chrome' || browser == 'Firefox' …` ค่อนข้างยาว จึงแบ่งเป็นหลายบรรทัดเพื่อให้อ่านง่ายขึ้น

ถึงอย่างนั้น โจทย์นี้ใช้ `switch` แล้วกระชับและเห็นตัวเลือกต่าง ๆ ชัดกว่า
