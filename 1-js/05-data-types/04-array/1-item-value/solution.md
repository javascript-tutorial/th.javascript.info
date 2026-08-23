คำตอบคือ `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

เพราะอาร์เรย์เป็นออบเจ็กต์ ตัวแปร `shoppingCart` กับ `fruits` จึงอ้างถึงอาร์เรย์เดียวกัน
