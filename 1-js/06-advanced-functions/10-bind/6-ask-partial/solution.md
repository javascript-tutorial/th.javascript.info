

1. ใช้ wrapper หรือฟังก์ชัน (function) ที่ครอบการเรียก `user.login` โดยเขียนเป็น arrow function ได้ดังนี้:

    ```js
    askPassword(() => user.login(true), () => user.login(false));
    ```

    แต่ละ wrapper อ่าน `user` จากตัวแปร (variable) ภายนอก แล้วเรียกเมธอด (method) ผ่านออบเจ็กต์ (object) ตามปกติ โดยส่ง `true` หรือ `false` ให้ตรงกับคอลแบ็ก (callback) ที่ถูกเรียก

2. ใช้ `bind` สร้าง partial function จาก `user.login` โดยผูก `user` เป็น `this` และกำหนดอาร์กิวเมนต์ (argument) ตัวแรกเป็น `true` หรือ `false` ไว้ล่วงหน้า:


    ```js
    askPassword(user.login.bind(user, true), user.login.bind(user, false));
    ```
