/**
 * 责任链模式
 * 这是一种链式结构的一种设计模式，比如如果当前类有义务要做某项事情的时候就必须要去完成(单个对象是一个节点，每个实体的节点调用一个必须要做的节点)
 * 描述：
 * 假设我们的日志系统有三个报错级别，分别是ERROR，DEBUG，INFO。现在我们在做日志系统的时候有一个需求，就是当出现ERROR时要同时打印到ERROR，DEBUG，INFO的控制台上，而出现DEBUG要同时打印到DEBUG，INFO的控制台上，INFO只需要打印到INFO的控制台上。
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
var AbstractLogger = /** @class */ (function () {
    function AbstractLogger() {
        var _newTarget = this.constructor;
        // 下一个责任链的节点
        this.nextLogger = null;
        // 当前的级别
        this.level = null;
        if (_newTarget === AbstractLogger) {
            throw new Error('必须继承');
        }
    }
    AbstractLogger.prototype.setNextLogger = function (nextLogger) {
        this.nextLogger = nextLogger;
    };
    AbstractLogger.prototype.write = function (message) { };
    AbstractLogger.prototype.logMessage = function (level, message) {
        if (this.level <= level) {
            this.write(message);
        }
        if (this.nextLogger !== null) {
            this.nextLogger.logMessage(level, message);
        }
    };
    AbstractLogger.INFO = 1;
    AbstractLogger.DEBUG = 2;
    AbstractLogger.ERROR = 3;
    return AbstractLogger;
}());
//定义不同错误类型
var StandardLogger = /** @class */ (function (_super) {
    __extends(StandardLogger, _super);
    function StandardLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    StandardLogger.prototype.write = function (message) {
        console.warn("Standard Console::Logger: " + message);
    };
    return StandardLogger;
}(AbstractLogger));
var ErrorLogger = /** @class */ (function (_super) {
    __extends(ErrorLogger, _super);
    function ErrorLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    ErrorLogger.prototype.write = function (message) {
        console.error("Error Console::Logger: " + message);
    };
    return ErrorLogger;
}(AbstractLogger));
var FileLogger = /** @class */ (function (_super) {
    __extends(FileLogger, _super);
    function FileLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    FileLogger.prototype.write = function (message) {
        console.log("File Console::Logger: " + message);
    };
    return FileLogger;
}(AbstractLogger));
function getChainOfLoggers() {
    var errorLogger = new ErrorLogger(AbstractLogger.ERROR);
    var fileLogger = new FileLogger(AbstractLogger.DEBUG);
    var standardLogger = new StandardLogger(AbstractLogger.INFO);
    errorLogger.setNextLogger(fileLogger);
    fileLogger.setNextLogger(standardLogger);
    return errorLogger;
}
var loggerChain = getChainOfLoggers();
// 实现级别高的报错依次从当前级别输出到低级别
loggerChain.logMessage(AbstractLogger.INFO, "This is an information.");
console.log('');
loggerChain.logMessage(AbstractLogger.DEBUG, "This is a debug level information.");
console.log('');
loggerChain.logMessage(AbstractLogger.ERROR, "This is an error information.");
