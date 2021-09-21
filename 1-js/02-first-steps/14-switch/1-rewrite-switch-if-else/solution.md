เพื่อที่จะให้ตรงกับการทำงานของคำสั่ง `switch`, คำสั่ง `if` จึงต้องให้ `'==='`

ตามสตริงที่ให้มา `'=='` ก็ใช้ได้งานตามที่คาดหวังเช่นกัน

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

โปรดทราบ: รูปประโยค `browser == 'Chrome' || browser == 'Firefox' …` ควรแบ่งเป็นหลายๆบรรทัดเพื่อให้อ่านง่ายขึ้น

แต่อย่างไรก็ตาม ในกรณีนี้คำสั่ง `switch` ก็ดูสะอาดและเข้าใจง่ายกว่า
