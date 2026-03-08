function makeCounter() {
  let count = 0;

  // ... โค้ดของคุณ ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // ตั้งค่าตัวนับใหม่

alert( counter() ); // 10

counter.decrease(); // ลดค่าตัวนับลง 1

alert( counter() ); // 10 (แทนที่จะเป็น 11)
