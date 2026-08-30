
function filterRange(arr, a, b) {
  // ใส่วงเล็บครอบนิพจน์เพื่อให้อ่านง่ายขึ้น
  return arr.filter(item => (a <= item && item <= b));
}