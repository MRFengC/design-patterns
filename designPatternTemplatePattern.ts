/**
 * 模板模式 
 * 当一个类型公开了它的执行方式，其它类型只需按需实现的的时候可以使用这个模式。
 * 写一个类，部分需要实现的类写成空函数。具体使用时候去继承这个基类。
 */

// 鸡肋
class Game {
  constructor() {
     if(this.play!= Game.prototype.play) {
        throw new Error("play mothed is final,can't be modify!");
     }
  }
  initialize(){};
  startPlay(){};
  endPlay(){};
  play(){
      //初始化游戏
      this.initialize();
      //开始游戏
      this.startPlay();
      //结束游戏
      this.endPlay();
  }
}
// 使用的时候
class Cricket extends Game {
  endPlay() {
     console.log("Cricket Game Finished!");
  }
  initialize() {
     console.log("Cricket Game Initialized! Start playing.");
  }
  startPlay() {
     console.log("Cricket Game Started. Enjoy the game!");
  }
}
class Football extends Game{
  constructor(){
    console.log("Football构造");
    super()
  }
  endPlay() {
     console.log("Football Game Finished!");
  }
  initialize() {
     console.log("Football Game Initialized! Start playing.");
  }
  startPlay() {
     console.log("Football Game Started. Enjoy the game!");
  }
}

//测试
let game = new Cricket();
game.play();
console.log('');
game = new Football();
game.play(); 