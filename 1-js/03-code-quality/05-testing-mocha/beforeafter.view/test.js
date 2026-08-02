describe("test", function() {
  
   // ปกติ Mocha จะรอเทสต์ 2 วินาทีก่อนตัดสินว่าเทสต์มีปัญหา
  
  this.timeout(200000); // บรรทัดนี้เพิ่มเวลารอเป็น 200,000 มิลลิวินาที

  // เราต้องเพิ่มเวลาเพราะใช้ฟังก์ชัน alert หากกดปุ่ม "OK" ช้า เทสต์จะไม่ผ่าน
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
