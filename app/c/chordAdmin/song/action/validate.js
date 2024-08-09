var chordAdminSongValidate = () => {
  const { balance } = chordStore.form.account;
  if (isNaN(parseFloat(balance))) {
    alert("Saldo salah!");
    return false;
  }
  return true;
};
