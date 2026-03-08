function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // จำอาร์กิวเมนต์ล่าสุดไว้เรียกหลังช่วงพักเย็น
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // ถ้าไม่ได้อยู่ในช่วงพักเย็น ให้เข้าสู่สถานะพักเย็น
    func.apply(this, arguments);

    isThrottled = true;

    // วางแผนรีเซ็ต isThrottled หลังจากหน่วงเวลา
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // ถ้ามีการเรียกที่ถูกเพิกเฉย savedThis/savedArgs จะเก็บค่าล่าสุดไว้
        // เรียก wrapper แบบ recursive เพื่อรันฟังก์ชันและตั้งช่วงพักเย็นอีกครั้ง
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}