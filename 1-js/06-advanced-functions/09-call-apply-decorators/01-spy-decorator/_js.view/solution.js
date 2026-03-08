function spy(func) {

  function wrapper(...args) {
    // ใช้ ...args แทน arguments เพื่อเก็บอาร์เรย์ "จริงๆ" ใน wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
