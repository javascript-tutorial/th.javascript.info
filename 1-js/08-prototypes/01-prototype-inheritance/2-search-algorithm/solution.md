
1. เพิ่ม `__proto__` เข้าไป:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. ในเอนจินสมัยใหม่ ด้านประสิทธิภาพแล้วไม่ต่างกัน ไม่ว่าจะดึงพร็อพเพอร์ตี้จากตัวออบเจ็กต์เองหรือจากโปรโตไทป์ เพราะเอนจินจำไว้ว่าเจอพร็อพเพอร์ตี้ที่ไหน แล้วครั้งต่อไปก็ไปหาตรงนั้นเลย

    ยกตัวอย่าง `pockets.glasses` เอนจินจะจำไว้ว่าเจอ `glasses` ที่ `head` แล้วครั้งต่อไปก็ค้นหาตรงนั้นทันที นอกจากนี้ยังฉลาดพอที่จะอัปเดตแคชเมื่อมีการเปลี่ยนแปลง จึงเป็นการ optimize ที่ปลอดภัย
