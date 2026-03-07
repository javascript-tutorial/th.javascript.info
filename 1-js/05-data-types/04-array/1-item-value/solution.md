ผลลัพธ์คือ `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

เนื่องจากอาร์เรย์เป็นออบเจ็กต์ ทั้ง `shoppingCart` และ `fruits` จึงชี้ไปยังอาร์เรย์เดียวกัน
