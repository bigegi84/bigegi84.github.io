chordAdminSong.action.createOne = async () => {
  try {
    const res = await axios.post(
      chordAdminState.apiUrl + "/song/createOne",
      {
        title: chordAdminSongStore.form.title,
        lyric: chordAdminSongStore.form.lyric,
        artist_name: chordAdminSongStore.form.artist_name,
      },
      {
        headers: {
          "jwt-token": chordAdminStore.token,
        },
      }
    );
    if (res.data.status == "ok") {
      chordAdminSong.http.readMany();
      alertify.success("Berhasil.");
    }
  } catch (e) {}
};
