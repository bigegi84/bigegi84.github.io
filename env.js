define((require) => {
  var _apiUrl = {
    arenhost: 'https://bigegi84.my.id/bigegi84-api-lumen/index.php',
    bigegi84_oa15s: 'http://192.168.1.42:8080/bigegi84-api-lumen/index.php',
    bigegi84_oa37f: 'http://192.168.1.43:8080/bigegi84-api-lumen/index.php',
    localhost: 'http://localhost:840/bigegi84-api-lumen/index.php',
  }
  return {
    get apiUrl() {
      switch (window.location.hostname) {
        case 'bigegi84.github.io':
          return _apiUrl.arenhost
        case '192.168.1.43':
          return _apiUrl.bigegi84_oa37f
        case 'localhost':
          //   return _apiUrl.arenhost
          // return _apiUrl.bigegi84_oa15s
          //   return _apiUrl.bigegi84_oa37f
          return _apiUrl.localhost
        default:
          return _apiUrl.localhost
      }
    },
  }
})
