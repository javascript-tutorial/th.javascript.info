
function formatDate(date) {
  let diff = new Date() - date; // ความต่างในหน่วยมิลลิวินาที

  if (diff < 1000) { // น้อยกว่า 1 วินาที
    return 'เมื่อกี้นี้';
  }

  let sec = Math.floor(diff / 1000); // แปลงความต่างเป็นวินาที

  if (sec < 60) {
    return sec + ' วินาทีที่แล้ว';
  }

  let min = Math.floor(diff / 60000); // แปลงความต่างเป็นนาที
  if (min < 60) {
    return min + ' นาทีที่แล้ว';
  }

  // จัดรูปแบบวันที่
  // เติมศูนย์นำหน้าสำหรับวัน/เดือน/ชั่วโมง/นาทีที่มีหลักเดียว
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // นำ 2 หลักสุดท้ายของแต่ละส่วน

  // รวมส่วนประกอบเป็นวันที่
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
