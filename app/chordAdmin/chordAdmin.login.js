const chordAdminLogin = {
  view: () => {
    const username = React.useState("");
    const password = React.useState("");
    React.useState("");
    return (
      <bigegi84View.letsRock
        column={{
          inputTextUsername: username,
          inputTextPassword: password,
          buttonLogin: async () => {
            try {
              const res = await axios.post(
                chordAdminState.url + "/user/login",
                {
                  username: username[0],
                  password: password[0],
                }
              );
              if (res.data.status == "ok") {
                localStorage.setItem("chordAdminToken", res.data.result);
                chordAdminState = res.data.result;
                window.location.reload();
              }
            } catch (e) {}
          },
        }}
      />
    );
  },
};
