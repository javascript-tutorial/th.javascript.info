function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // วันที่ 0 (อาทิตย์) นับเป็น 7 ในระบบยุโรป
    day = 7;
  }

  return day;
}
