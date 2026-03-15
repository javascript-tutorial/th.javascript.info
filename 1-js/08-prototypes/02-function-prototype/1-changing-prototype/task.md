importance: 5

---

# เปลี่ยน "prototype"

ในโค้ดด้านล่าง เราสร้าง `new Rabbit` แล้วลองเปลี่ยน prototype ของมัน

เริ่มต้นเรามีโค้ดนี้:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


1. เราเพิ่มบรรทัดใหม่เข้าไป (ส่วนที่เน้นสี) คราวนี้ `alert` จะแสดงอะไร?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...แล้วถ้าโค้ดเป็นแบบนี้ล่ะ (เปลี่ยนบรรทัดเดียว)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

3. แล้วถ้าเป็นแบบนี้ (เปลี่ยนบรรทัดเดียว)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. แบบสุดท้าย:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
