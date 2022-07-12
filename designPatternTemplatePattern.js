/**
 * 模板模式
 * 当一个类型公开了它的执行方式，其它类型只需按需实现的的时候可以使用这个模式。
 * 写一个类，部分需要实现的类写成空函数。具体使用时候去继承这个基类。
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 鸡肋
var Game = /** @class */ (function () {
    function Game() {
        if (this.play != Game.prototype.play) {
            throw new Error("play mothed is final,can't be modify!");
        }
    }
    Game.prototype.initialize = function () { };
    ;
    Game.prototype.startPlay = function () { };
    ;
    Game.prototype.endPlay = function () { };
    ;
    Game.prototype.play = function () {
        //初始化游戏
        this.initialize();
        //开始游戏
        this.startPlay();
        //结束游戏
        this.endPlay();
    };
    return Game;
}());
// 使用的时候
var Cricket = /** @class */ (function (_super) {
    __extends(Cricket, _super);
    function Cricket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cricket.prototype.endPlay = function () {
        console.log("Cricket Game Finished!");
    };
    Cricket.prototype.initialize = function () {
        console.log("Cricket Game Initialized! Start playing.");
    };
    Cricket.prototype.startPlay = function () {
        console.log("Cricket Game Started. Enjoy the game!");
    };
    return Cricket;
}(Game));
var Football = /** @class */ (function (_super) {
    __extends(Football, _super);
    function Football() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Football.prototype.play = function () {
        console.log("重写");
    };
    Football.prototype.endPlay = function () {
        console.log("Football Game Finished!");
    };
    Football.prototype.initialize = function () {
        console.log("Football Game Initialized! Start playing.");
    };
    Football.prototype.startPlay = function () {
        console.log("Football Game Started. Enjoy the game!");
    };
    return Football;
}(Game));
//测试
var game = new Cricket();
game.play();
console.log('');
game = new Football();
game.play();
