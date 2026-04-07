

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

เฉลย:

1. ได้ true แน่นอน
2. เปรียบเทียบตามลำดับ Unicode — `"a"` น้อยกว่า `"p"`
3. เปรียบเทียบตามลำดับ Unicode เหมือนกัน — `"2"` มากกว่า `"1"`
4. `null` กับ `undefined` เท่ากันเสมอเมื่อเทียบด้วย `==`
5. Strict equality เข้มงวด — เช็คชนิดข้อมูลด้วย ถ้าชนิดไม่เหมือนกันก็เป็น false
6. เหมือนข้อ `(4)` — `null` เท่ากับ `undefined` เท่านั้น
7. เหมือนข้อ `(5)`
