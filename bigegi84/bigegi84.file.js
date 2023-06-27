const bigegi84File = {
  get: (url) => {
    return new Promise((resolve) => {
      $.ajax({
        url,
        method: "GET",
        xhrFields: {
          responseType: "blob",
        },
        success: async (data) => {
          const text = await data.text();
          resolve(text);
        },
      });
    });
  },
};
