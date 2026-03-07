describe("formatDate", function() {
  it("แสดง 1ms ที่แล้วเป็น \"เมื่อกี้นี้\"", function() {
    assert.equal(formatDate(new Date(new Date - 1)), 'เมื่อกี้นี้');
  });

  it('"30 วินาทีที่แล้ว"', function() {
    assert.equal(formatDate(new Date(new Date - 30 * 1000)), "30 วินาทีที่แล้ว");
  });

  it('"5 นาทีที่แล้ว"', function() {
    assert.equal(formatDate(new Date(new Date - 5 * 60 * 1000)), "5 นาทีที่แล้ว");
  });

  it("วันที่เก่ากว่าแสดงในรูปแบบ DD.MM.YY HH:mm", function() {
    assert.equal(formatDate(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
  });

});
