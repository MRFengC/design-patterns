/**
 * 状态模式
 * 即类的行为根据状态的改变而改变
 */
// 开始类
var StartState = /** @class */ (function () {
    function StartState() {
    }
    StartState.prototype.doAction = function (context) {
        console.log("Player is in start state");
        context.setState(this);
    };
    StartState.prototype.toString = function () {
        return "Start State";
    };
    return StartState;
}());
// 结束类
var StopState = /** @class */ (function () {
    function StopState() {
    }
    StopState.prototype.doAction = function (context) {
        console.log("Player is in stop state");
        context.setState(this);
    };
    StopState.prototype.toString = function () {
        return "Stop State";
    };
    return StopState;
}());
// 结束==========================定义两个状态
// 定义根据状态，而发生改变的上下文类型。
var Context = /** @class */ (function () {
    function Context() {
        this.state = null;
        this.state = null;
    }
    Context.prototype.setState = function (state) {
        this.state = state;
    };
    Context.prototype.getState = function () {
        if (!!this.state && !!this.state.toString) {
            return this.state.toString();
        }
        else {
            return "没有值";
        }
    };
    return Context;
}());
var context = new Context();
var startState = new StartState();
startState.doAction(context);
console.log(context.getState());
var stopState = new StopState();
stopState.doAction(context);
console.log(context.getState());
