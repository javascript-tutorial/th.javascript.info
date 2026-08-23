importance: 5

---

# ตรวจหาสแปม

เขียนฟังก์ชัน `checkSpam(str)` ที่คืน `true` ถ้า `str` มี 'viagra' หรือ 'XXX' อยู่ ถ้าไม่มีให้คืน `false`

ฟังก์ชันต้องไม่แยกตัวพิมพ์เล็ก-ใหญ่:

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```
