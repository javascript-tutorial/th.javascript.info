

```js run demo
let userName = prompt("Who's there?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}
```

สังเกตการระยะห่างแนวตั้งภายในบล็อก `if` ในทางเทคนิคไม่จำเป็นต้องมีก็ได้ โค้ดก็ทำงานเหมือนเดิม เราเติมช่องว่างเข้าไปเพื่อให้โค้ดอ่านง่ายขึ้น
