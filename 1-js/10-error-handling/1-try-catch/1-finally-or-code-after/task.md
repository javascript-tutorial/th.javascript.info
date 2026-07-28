importance: 5

---

# ใช้ `finally` หรือเขียนโค้ดต่อท้ายดี?

ลองเปรียบเทียบโค้ดสองแบบนี้

1. แบบแรกใช้ `finally` รันโค้ดหลัง `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. แบบที่สองเขียนโค้ดเคลียร์งานไว้ต่อท้าย `try...catch` เลย:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

เราต้องเคลียร์งานหลังทำงานเสร็จแน่นอน ไม่ว่าจะเกิด error หรือไม่ก็ตาม

ถ้าอย่างนั้น ใช้ `finally` มีข้อได้เปรียบกว่าไหม หรือสองแบบนี้ให้ผลเหมือนกัน? ถ้ามีข้อได้เปรียบ ลองยกตัวอย่างกรณีที่มันสำคัญ
