```js run demo
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647;
    yield value;
  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```

สังเกตว่าทำแบบเดียวกันด้วยฟังก์ชันปกติก็ได้นะ:

```js run
function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return value;
  }
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073
```

ใช้งานได้เหมือนกัน แต่เสียความสามารถในการวนลูปด้วย `for..of` และใช้ generator composition ไป ซึ่งอาจมีประโยชน์ในที่อื่นๆ
