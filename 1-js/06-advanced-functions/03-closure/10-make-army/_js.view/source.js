function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // ฟังก์ชัน shooter
      alert( i ); // ควรแสดงหมายเลขของมัน
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // shooter หมายเลข 0 แสดง 10
army[5](); // หมายเลข 5 ก็แสดง 10 เช่นกัน...
// ... shooters ทุกตัวแสดง 10 แทนที่จะเป็น 0, 1, 2, 3...
*/
