/**
 * 适配器模式是作为两个不同接口的一种聚合，把比如说SD卡适配器，无论使用TF或SD卡或者其它卡，对外输出都是USB接口。
 * 两个不同类，含有相同功能的不同函数，通过加一层类，类内部：1.变量保存当前创建的类，2.创建类函数，3.启用功能函数
 */


// 首先我们有两个设备一个是Vlc播放器，一个是Mp4播放器，一个需要使用playVlc按钮来播放，一个要使用playMp4来播放。
 class VlcPlayer {
  playVlc(fileName) {
     console.log("Playing vlc file. Name: "+ fileName);      
  }
}
class Mp4Player  {
  playMp4(fileName) {
      console.log("Playing mp4 file. Name: "+ fileName);      
  }
}

// 但是我就想通过一个播放按钮来播放，我不管他是什么播放设备，这个时候，我们就需要一个适配器来做这个事情。
class MediaAdapter {
  static advancedMusicPlayer
  constructor(audioType){
      switch(audioType) {
          case 'vlc':
              MediaAdapter.advancedMusicPlayer = new VlcPlayer();
              break;
          case 'mp4':
              MediaAdapter.advancedMusicPlayer = new Mp4Player();
              break;
      }
  }
  play(audioType, fileName) {
      switch(audioType) {
          case 'vlc':
              MediaAdapter.advancedMusicPlayer.playVlc(fileName);
              break;
          case 'mp4':
              MediaAdapter.advancedMusicPlayer.playMp4(fileName);
              break;
      }
  }
}

// 通过适配器我们可以把各种设备桥接到一个音频设备上。
class AudioPlayer{
  static mediaAdapter;
  play(audioType, fileName) {
      switch(audioType) {
          case 'mp3':
              console.log("Playing mp3 file. Name: "+ fileName);
              break;
          case 'vlc':
          case 'mp4':
                  AudioPlayer.mediaAdapter = new MediaAdapter(audioType);
                  AudioPlayer.mediaAdapter.play(audioType, fileName);
              break;
          default:
              console.log("Invalid media. "+
                  audioType + " format not supported");
              break;
      }
  }  
}


const audioPlayer = new AudioPlayer();
 audioPlayer.play("mp3", "beyond the horizon.mp3");
 audioPlayer.play("mp4", "alone.mp4");
 audioPlayer.play("vlc", "far far away.vlc");
 audioPlayer.play("avi", "mind me.avi");
  /**
  * output:
  * Playing mp3 file. Name: beyond the horizon.mp3
  * Playing mp4 file. Name: alone.mp4
  * Playing vlc file. Name: far far away.vlc
  * Invalid media. avi format not supported
  */