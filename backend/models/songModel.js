// نموذج أغنية (Song)
export default class Song {
  constructor(id, title, artist, audio_url) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.audio_url = audio_url;
  }
}
