

1. ใช้ wrapper function หรือ arrow function ก็ได้:

    ```js
    askPassword(() => user.login(true), () => user.login(false));
    ```

    วิธีนี้จะเข้าถึง `user` จากตัวแปรภายนอก แล้วเรียกเมธอดตามปกติ

2. หรือสร้าง partial function จาก `user.login` โดยผูก `user` เป็น context พร้อมกำหนดอาร์กิวเมนต์ตัวแรกไว้:


    ```js
    askPassword(user.login.bind(user, true), user.login.bind(user, false));
    ```
