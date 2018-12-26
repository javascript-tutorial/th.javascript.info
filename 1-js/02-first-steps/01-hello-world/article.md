# Hello, world!

สิ่งที่จะพูดต่อไปนี้เกี่ยวกับจะจาวาสคริปเพียวๆ ฉะนั้นหากต้องการความรู้เกี่ยวกับเนื้อหาเพิ่มเติมอย่าง NodeJS มีทางเลือกอื่นๆเพิ่มเติมมากมาย 

เราจะต้องมีสภาพแวดล้อมที่เอาไว้ให้สคริปเราทำงาน และ เพราะว่าหนังสือนี้ออนไลน์ เว็บเบราเซอร์เลยเป็นทางเลือกที่ดี เราได้เตรียมคำสั่งสำหรับเบราเซอร์ (อย่าง `alert`) ดังนั้น ผู้อ่านจะไม่ต้องใช้เวลาไปกับการติดตั้งสภาพแสดล้อมอื่นๆ เพื่อให้จาวาสคริปทำงานอย่าง NodeJS เนื้อหาในส่วนของเบราเซอร์จะอธิบายในรายละเอียดใบ[บทถัดไป](/ui)

ก่อนอื่น เรามาดูวิธีติดสคริปให้กับหน้าเว็บกัน สำหรับสภาพแวดล้อมแบบเซิฟเวอร์หรือ NodeJS เราเพียงพิมพ์คำสั่ง `"node my.js"` เพื่อให้สคริปเราทำงาน

## แท็ก "สคริป"

โปแกรมที่เขียนโดยจาวาสคริปสามารถแทรกลงใน HTML ด้วยแท็ก `<script>` เช่นนี้

ตัวอย่าง:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
เราสามารถสั่งโปรแกรมทำงานได้โดยการคลิกปุ่ม "Play" อยู่มุมขวาบน
```

แท็ก `<script>` จะอุดมไปด้วยโค้ดภาษาจาวาสคริป ซึ่งจะทำงานเองโดยอัตโนมัติเมื่อเบราเซอร์พบ


## สถานการณ์ในปัจจุบัน

แท็ก `<script>` ในปัจจุบันไม่ค่อยเป็นที่นิยมแล้วในทุกวันนี้ แต่เราจะเห็นได้จากโค้ดเก่าๆ:
มีอะทริบบิวทฺ `type` เป็น: <code>&lt;script <u>type</u>=...&gt;</code>

  : มาตรฐาน HTML4 เดิมแท็กสคริปจะต้องมี type ระบุเอาไว้ด้วย โดยมักจะเป็น `type="text/javascript"` แต่ตอนนี้ไม่ต้องทำแบบนี้แล้ว มาตรฐานปัจจุบันได้ไปเปลี่ยนความหมายของอะทริบบิวทฺตัวนี้ไปทั้งหมด มาตรฐานตอนนี้สามารถใช้เป็นจาวาสคริปโมดูล แต่หัวข้อนี้ยากเกินไป ซึ่งเราจะเอาไว้พูดถึงทีหลัง

อะทริบบิวทฺ `language` : <code>&lt;script <u>language</u>=...&gt;</code>
  : อะทริบบิวทฺนี้มีไว้แสดงภาษาของสคริป อะทริบบิวทฺตัวนี้ไม่มีเหตุผลต้องใช้แล้ว เพราะว่าจาวาสคริปเป็นภาษาทั่วไปที่ใช้กับเว็บอยู่แล้ว
 The `language` attribute
 
คอมเม้นท์ก่อนและหลังแท็กสคริป
  : จะต้องเป็นคู่มือหรือหนังสือที่คร่ำครึมาก ที่จะเจอคอมเม้นท์อยู่ในแท็กสคริปอย่างนี้

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```
    
    ทริคนี้ไม่เป็นที่นิยมแล้วในจาวาสคริปปัจจุบัน คอมเม้นท์เหล่านี้ถูกใช้เพื่อซ่อนโค้ดจาวาสคริปจากเบราเซอร์เก่าๆ ที่ไม่รู้จักแท็ก <script> ฉะนั้นเบราเซอร์สมัยปัจจุบันจะไม่เจอปัญหานี้แล้ว หากเราเจอโค้ดนี้ที่ใดก็แสดงว่าโค้ดนั้นถูกเขียนเอาไว้นานมาก

## สคริปภายนอก

ถ้าเรามีโค้ดจาวาสคิรปมากมาย เราสามารถวางไว้ในไฟล์ที่แยกกันได้

ไฟล์สคริปจะถูกระบุอยู่ในอะทริบบิวทฺ `src` 

```html
<script src="/path/to/script.js"></script>
```

ที่ `/path/to/script.js` เป็น absolute path ของไฟล์สคริป 
Here `/path/to/script.js` is an absolute path to the file with the script (from the site root).

แต่เราสามารถใช้ relative path ได้หากทั้งไฟล์สคริปและไฟล์ HTML อยู่ในแฟ้มเดียวกัน ตัวอย่าง `src="script.js"` 

เรายังสามารถใช้ URL ได้ด้วย ตัวอย่าง: 

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

ติดหลายสคริปก็ได้ โดยใช้หลายแท็กสคริป

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
As a rule, only the simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit of a separate file is that the browser will download it and then store it in its [cache](https://en.wikipedia.org/wiki/Web_cache).

After this, other pages that want the same script will take it from the cache instead of downloading it. So the file is actually downloaded only once.

That saves traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and the code inside.

This won't work:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

We must choose: either it's an external `<script src="…">` or a regular `<script>` with code.

The example above can be split into two scripts to work:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Summary

- We can use a `<script>` tag to add JavaScript code to the page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the web-page. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves from it. We'll be using a browser as a way to run JavaScript, which is very convenient for online reading, but yet one of many.
