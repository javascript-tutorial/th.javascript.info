คำตอบคือ `1` ตามด้วย `undefined`.

```js run
alert( alert(1) && alert(2) );
```

เรียกฟังก์ชั่น `alert` จะส่ง `undefined` กลับ (ตัวฟังก์ชั่นมีหน้าที่เพียงแสดงข้อความ ดังนั้นจึงไม่จำเป็นส่งค่าใดๆกลับไป)

เพราะเหตุนี้ `&&` จึงประเมินตัวถูกดำเนินการทางซ้าย (เอาท์พุท `1`) และหยุดทำงานทันที เพราะ `undefined` เป็นค่า falsy และ `&&` จะหาค่า falsy ตัวแรกที่เจอ และส่งค่านั้นกลับไป เป็นอันเสร็จสิ้นการทำงาน

