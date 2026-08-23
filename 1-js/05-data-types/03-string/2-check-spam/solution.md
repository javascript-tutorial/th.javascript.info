ถ้าต้องการค้นหาโดยไม่แยกตัวพิมพ์เล็ก-ใหญ่ ให้เปลี่ยนสตริงเป็นตัวพิมพ์เล็กก่อนแล้วค่อยค้นหา:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
