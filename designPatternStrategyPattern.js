/**
 * 策略模式
 * 策略和策略之间实现解耦
 */
//开始 ================================== 三种策略
var OperationAdd = /** @class */ (function () {
    function OperationAdd() {
    }
    OperationAdd.prototype.doOperation = function (num1, num2) {
        return num1 + num2;
    };
    return OperationAdd;
}());
var OperationSubstract = /** @class */ (function () {
    function OperationSubstract() {
    }
    OperationSubstract.prototype.doOperation = function (num1, num2) {
        return num1 - num2;
    };
    return OperationSubstract;
}());
var OperationMultiply = /** @class */ (function () {
    function OperationMultiply() {
    }
    OperationMultiply.prototype.doOperation = function (num1, num2) {
        return num1 * num2;
    };
    return OperationMultiply;
}());
//结束 ================================== 三种策略
// 根据策略来变更行为的上下文
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = null;
        this.strategy = strategy;
    }
    Context.prototype.executeStrategy = function (num1, num2) {
        return this.strategy.doOperation(num1, num2);
    };
    return Context;
}());
// 执行
var context = new Context(new OperationAdd());
console.log("10 + 5 =" + context.executeStrategy(10, 5));
context = new Context(new OperationSubstract());
console.log("10 - 5 = " + context.executeStrategy(10, 5));
