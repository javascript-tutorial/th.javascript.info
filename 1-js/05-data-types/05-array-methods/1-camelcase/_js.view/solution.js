function camelize(str) {
  return str
    .split('-') // แยก 'my-long-word' เป็นอาร์เรย์ ['my', 'long', 'word']
    .map(
      // เปลี่ยนอักษรตัวแรกของทุกคำให้เป็นตัวพิมพ์ใหญ่ ยกเว้นคำแรก
      // แปลง ['my', 'long', 'word'] เป็น ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // รวม ['my', 'Long', 'Word'] เป็น 'myLongWord'
}
