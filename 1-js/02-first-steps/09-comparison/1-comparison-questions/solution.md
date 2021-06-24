

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
2. การเปรียบเทียบตามลำดับ Unicode ดังนั้น `"a"` น้อยกว่า `"p"`
3. การเปรียบเทียบตามลำดับ Unicode ดังนั้น `"2"` มากกว่า `"1"`.
4. ค่า `null` และ `undefined` เท่ากันเสมอ เมื่อเทียบด้วย `==`
5. Strict equality นั้นเข้มงวด มันจะตรวจสอบชนิดของข้อมูลด้วย หากชนิดไม่เหมือนกัน ก็ได้จะ false
6. เหมือนกับข้อ `(4)` `null` จะเท่ากับ `undefined` เท่านั้น
7. เหมือนกับข้อ `(5)`
