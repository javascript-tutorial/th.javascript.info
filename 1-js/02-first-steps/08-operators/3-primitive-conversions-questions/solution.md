
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. การบวกสตริงว่างกับเลขหนึ่ง `"" + 1` จะแปลงเลข `1` ให้เป็นสตริง : `"" + 1 = "1"` และ เราก็มี `"1" + 0` ต่อ ก็จะใช้กฎเดียวกัน
2. การลบ `-` (จะเหมือนกับดำเนินการทางคณิตฯอื่นๆ) จะทำงานกับตัวเลขเท่านั้น ดังนั้นจะมันจึงแปลงสตริงว่างให้เป็นเลข `0`
3. การบวกกับสตริง จะต่อท้ายเลข `5` กับสตริง
4. การลบจะแปลงทุกอย่างเป็นตัวเลขเสมอ ดังนั้น `"  -9  "` จึงได้เลข `-9` (จะแปลงโดยที่ไม่สนใจ spaces ที่อยู่รอบเลขลบเก้าเลย)
5. `null` จะกลายเป็นเลข `0` หากถูกแปลงเป็นตัวเลข
6. `undefined` จะเป็นกลายเป็น `NaN` หากถูกแปลงเป็นตัวเลข
ึึ7. space หน้าและหลังจะถูกตัดออก หากแปลงสตริงเป็นตัวเลข หากสตริงมีอักขระพิเศษอย่าง `\t`, `\n` และตามด้วย space ด้านหน้าและหลัง การแปลงเป็นตัวเลขจะตัด space หน้าและหลังออก ส่วน `\t`, `\n` จะกลายเป็นเลข `0`
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
