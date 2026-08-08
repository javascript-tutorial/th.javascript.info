function isEmpty(obj) {
  for (let key in obj) {
    // ถ้าเข้ามาในลูปได้ แสดงว่ามีพร็อพเพอร์ตี้
    return false;
  }
  return true;
}
