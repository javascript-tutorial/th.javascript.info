
1. กำหนดโปรโตไทป์ (prototype) ของออบเจ็กต์ (object) แต่ละตัวด้วย `__proto__` ให้ `pockets` ชี้ไปที่ `bed` จากนั้น `bed` ชี้ไปที่ `table` และ `table` ชี้ไปที่ `head`

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

2. การอ่าน `pockets.glasses` ซ้ำ ๆ อาจเร็วพอ ๆ กับการอ่าน `head.glasses` เพราะเอนจิน JavaScript (JavaScript engine) สามารถจำตำแหน่งที่พบพร็อพเพอร์ตี้ (property) ไว้ใช้ในการอ่านครั้งถัดไปได้ เวลาที่ใช้จริงขึ้นอยู่กับเอนจินและวิธีวัด

    ตัวอย่างเช่น เมื่ออ่าน `pockets.glasses` แล้วพบ `glasses` ที่ `head` เอนจินอาจเก็บตำแหน่งนี้ไว้ในแคช (cache) ครั้งต่อไปจึงไม่ต้องไล่หาทีละตัวอีก ถ้ามีการเปลี่ยนแปลงที่ทำให้ตำแหน่งเดิมใช้ไม่ได้ เอนจินก็จะเลิกใช้ข้อมูลนั้นและค้นหาใหม่
