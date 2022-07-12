/**
 * 责任链模式
 * 这是一种链式结构的一种设计模式，比如如果当前类有义务要做某项事情的时候就必须要去完成(单个对象是一个节点，每个实体的节点调用一个必须要做的节点)
 * 描述：
 * 假设我们的日志系统有三个报错级别，分别是ERROR，DEBUG，INFO。现在我们在做日志系统的时候有一个需求，就是当出现ERROR时要同时打印到ERROR，DEBUG，INFO的控制台上，而出现DEBUG要同时打印到DEBUG，INFO的控制台上，INFO只需要打印到INFO的控制台上。
 */

// 鸡肋
class AbstractLogger {
  constructor() {
    if(new.target === AbstractLogger){
      throw new Error('必须继承')
    }
  }
  static INFO = 1;
  static DEBUG = 2;
  static ERROR = 3;
  // 下一个责任链的节点
  nextLogger:any = null
  // 当前的级别
  level:any = null
  setNextLogger(nextLogger) {
    this.nextLogger = nextLogger;
  }

  write(message) {}

  logMessage(level, message) {
    if(this.level <= level){
      this.write(message);
    }

    if(this.nextLogger !== null){
      this.nextLogger.logMessage(level, message);
    }
  }
}


//定义不同错误类型
class StandardLogger extends AbstractLogger {
  constructor(level){
    super();
    this.level = level
  }

  write(message: any): void {
      console.warn("Standard Console::Logger: " + message);
  }
}

class ErrorLogger extends AbstractLogger {
  constructor(level){
    super();
    this.level = level;
  }
  write(message: any): void {
      console.error("Error Console::Logger: "+message);
  }
}


class FileLogger extends AbstractLogger {
  constructor(level){
      super()
      this.level = level;
  }
  write(message) {    
     console.log("File Console::Logger: " + message);
  }
}

function getChainOfLoggers(){
  const errorLogger = new ErrorLogger(AbstractLogger.ERROR);
  const fileLogger = new FileLogger(AbstractLogger.DEBUG);
  const standardLogger = new StandardLogger(AbstractLogger.INFO);
  errorLogger.setNextLogger(fileLogger);
  fileLogger.setNextLogger(standardLogger);
  return errorLogger;  
}


// 那么我们在使用的时候就只需要使用链式化的对象即可


let loggerChain = getChainOfLoggers();
// 实现级别高的报错依次从当前级别输出到低级别
loggerChain.logMessage(AbstractLogger.INFO, "This is an information.");
console.log('')
loggerChain.logMessage(AbstractLogger.DEBUG,
    "This is a debug level information.");
console.log('')
loggerChain.logMessage(AbstractLogger.ERROR,
    "This is an error information.");