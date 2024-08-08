define(() => {
  return (obj) => {
    // var observer = Observer();
    var obj = {
      a: 1,
      b: 2,
    };
    var newObj = {};
    for (var [key] of Object.entries(obj)) {
      newObj["_" + key] = obj[key];
    }
    for (var [key] of Object.entries(newObj)) {
      Object.defineProperty(newObj, key.slice(1), {
        get() {
          return newObj[key];
        },
        set(value) {
          newObj[key] = value;
        },
      });
    }
    console.log(newObj);
    return newObj;
  };
});
