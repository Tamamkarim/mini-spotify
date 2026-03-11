// تحكم الأغاني (Song Controller)
export const getAllSongs = (req, res) => {
  // منطق جلب جميع الأغاني
  res.send("get all songs");
};

export const uploadSong = (req, res) => {
  // منطق رفع أغنية جديدة
  res.send("upload song");
};
