/**
 * 访问者模式
 */
/**
 * 首先我们定义一组设备（把观察者类放进来，把自己的this传进去）
 * */
var Keyboard = /** @class */ (function () {
    function Keyboard() {
    }
    Keyboard.prototype.accept = function (computerPartVisitor) {
        computerPartVisitor.visit(this);
    };
    return Keyboard;
}());
var Monitor = /** @class */ (function () {
    function Monitor() {
    }
    Monitor.prototype.accept = function (computerPartVisitor) {
        computerPartVisitor.visit(this);
    };
    return Monitor;
}());
var Mouse = /** @class */ (function () {
    function Mouse() {
    }
    Mouse.prototype.accept = function (computerPartVisitor) {
        computerPartVisitor.visit(this);
    };
    return Mouse;
}());
// 定义电脑为一种设备，同时集成了其它设备
var Computer = /** @class */ (function () {
    function Computer() {
        this.parts = [];
        this.parts = [new Mouse(), new Keyboard(), new Monitor];
    }
    Computer.prototype.accept = function (computerPartVisitor) {
        for (var i = 0; i < this.parts.length; i++) {
            this.parts[i].accept(computerPartVisitor);
        }
        computerPartVisitor.visit(this);
    };
    return Computer;
}());
var ComputerPartDisplayVisitor = /** @class */ (function () {
    function ComputerPartDisplayVisitor() {
    }
    ComputerPartDisplayVisitor.prototype.visit = function (device) {
        console.log("Displaying " + device.constructor.name);
    };
    return ComputerPartDisplayVisitor;
}());
var computer = new Computer();
computer.accept(new ComputerPartDisplayVisitor());
