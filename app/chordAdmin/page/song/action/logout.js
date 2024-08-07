define((require) => {
  return () => {
    localStorage.removeItem("chordAdmin-apiToken");
    chordAdminStore.token = null;
    chordAdminStore.isLogin = true;
  };
});
