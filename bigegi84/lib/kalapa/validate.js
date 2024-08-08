define(() => {
  return (obj, rule) => {
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
