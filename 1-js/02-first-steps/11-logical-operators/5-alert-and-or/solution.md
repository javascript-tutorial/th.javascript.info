คำตออบคือ `3`

```js run
alert( null || 2 && 3 || 4 );
```

AND `&&` จะทำงานก่อน `||` เสมอ

ดังนั้นผลลัพธ์ของ `2 && 3 = 3`จากนิพจน์ข้างต้นจึงได้ว่า

```
null || 3 || 4
```

ตอนนี้ค่า truthy แรกที่เจอก็คือ `3`

