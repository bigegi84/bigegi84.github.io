define(() => {
  var ApiUrl = {
    ArenHost: 'https://bigegi84.my.id/bigegi84-api-lumen/index.php',
    bigegi84_oa15s: 'http://192.168.1.42:8080/bigegi84-api-lumen/index.php',
    bigegi84_oa37f: 'http://192.168.1.43:8080/bigegi84-api-lumen/index.php',
    Localhost: 'http://localhost:840/bigegi84-api-lumen/index.php',
  }
  return {
    get apiUrl() {
      switch (window.location.hostname) {
        case 'bigegi84.github.io':
          return ApiUrl.ArenHost
        case '192.168.1.43':
          return ApiUrl.bigegi84_oa37f
        case 'localhost':
          // return _apiUrl.bigegi84_oa15s
          //   return _apiUrl.bigegi84_oa37f
          return ApiUrl.ArenHost
        // return _apiUrl.localhost
        default:
          return ApiUrl.Localhost
      }
    },
  }
})
