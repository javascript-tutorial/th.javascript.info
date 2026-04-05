
# วงกลมเคลื่อนไหวด้วย promise

เขียนฟังก์ชัน `showCircle` ใน solution ของโจทย์ <info:task/animate-circle-callback> ใหม่ โดยให้คืน promise แทนที่จะรับ callback

การใช้งานแบบใหม่:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

ให้เอา solution ของโจทย์ <info:task/animate-circle-callback> เป็นฐาน
