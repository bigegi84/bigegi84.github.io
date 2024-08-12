define((require) => {
  return () => {
    localStorage.removeItem("chordAdmin-apiToken");
    chordAdminStore.token = null;
    window.location.hash = "/chordAdmin-";
    window.location.hash = "/chordAdmin";
  };
});
