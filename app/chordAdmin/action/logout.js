chordAdmin.action.logout = () => {
  localStorage.removeItem("chordAdmin-apiToken");
  chordAdminStore.token = null;
  chordAdminStore.isLogin = true;
};
