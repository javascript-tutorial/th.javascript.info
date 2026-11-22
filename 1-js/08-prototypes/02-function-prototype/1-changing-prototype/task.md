importance: 5

---

# เมื่อเปลี่ยนค่า prototype

เราจะสร้าง `rabbit` ด้วย `new Rabbit()` แล้วลองเปลี่ยน `Rabbit.prototype` หรือแก้หรือลบพร็อพเพอร์ตี้ (property) ชื่อ `eats` ดูว่าแต่ละกรณีส่งผลต่อค่าของ `rabbit.eats` อย่างไร

ทั้งสี่ข้อเริ่มจากโค้ดชุดเดียวกันนี้ ให้พิจารณาแต่ละข้อแยกกัน

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


1. ถ้าเพิ่มบรรทัดที่เน้นไว้หลังจากสร้าง `rabbit` แล้ว `alert` จะแสดงอะไร?

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

2. ถ้าเปลี่ยนบรรทัดที่เน้นเป็น `Rabbit.prototype.eats = false` จะได้ผลอย่างไร?

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

3. ถ้าบรรทัดที่เน้นคือ `delete rabbit.eats` ล่ะ?

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

4. ข้อสุดท้าย ถ้าใช้ `delete Rabbit.prototype.eats` แล้ว `alert` จะแสดงอะไร?

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
