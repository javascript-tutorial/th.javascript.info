function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // ฟังก์ชัน shooter
      alert( i ); // ควรแสดงหมายเลขของมัน
    };
    shooters.push(shooter);
  }

  return shooters;
}
