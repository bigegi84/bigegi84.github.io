bigegi84.load = {
  isScriptAlreadyIncluded: (src) => {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++)
      if (scripts[i].getAttribute("src") == src) return true;
    return false;
  },
  loadJS: (src, callback) => {
    var el = document.createElement("script");
    el.type = "text/babel";
    el.src = src;
    el.onload = function () {
      callback();
    };
    // document.body.appendChild(el);
    document.getElementById("bigegi84-load").appendChild(el);
  },
  loadOne: (src, callback) => {
    if (isScriptAlreadyIncluded(src)) callback();
    else loadJS(src, callback);
  },
  load: (src, callback) => {
    if (typeof src === "string") {
      loadOne(src, callback);
    } else {
      var result = [];
      var length = src.length;
      for (var i = 0; i < length; i++) {
        loadOne(src[i], () => {
          result.push(true);
          if (result.length == length) callback();
        });
      }
    }
  },
};
