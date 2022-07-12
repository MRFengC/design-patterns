/**
 * 策略模式
 * 策略和策略之间实现解耦
 */

interface IOperationModal {
  doOperation: (num1: number, num2:number)=> number
}

//开始 ================================== 三种策略
class OperationAdd implements IOperationModal {
  doOperation (num1, num2){
    return num1 + num2;
  }
}

class OperationSubstract implements IOperationModal {
  doOperation(num1, num2){
    return num1 - num2
  }
}

class OperationMultiply implements IOperationModal{
  doOperation(num1, num2){
    return num1 * num2
  }
}


//结束 ================================== 三种策略

// 根据策略来变更行为的上下文
class Context {
  strategy = null as unknown as IOperationModal;
  constructor( strategy: IOperationModal){
    this.strategy = strategy;
  }
  executeStrategy (num1, num2){
    return this.strategy.doOperation(num1, num2)
  }
}

// 执行
let context = new Context(new OperationAdd());
console.log("10 + 5 =" + context.executeStrategy(10 , 5) );

context = new Context(new OperationSubstract());      
console.log("10 - 5 = " + context.executeStrategy(10, 5));
