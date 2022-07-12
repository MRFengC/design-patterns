/**
 * 状态模式
 * 即类的行为根据状态的改变而改变
 */

// 开始==========================定义两个状态

interface IState{
  doAction:(context:IContent)=>void;
  toString: ()=>string
}

interface IContent{

  state:IState | any
  setState: (state:IState)=>void

  getState:()=>string
}


// 开始类
class StartState implements IState {
  doAction(context:IContent){
    console.log("Player is in start state");
    context.setState(this)
  }

  toString (){
    return "Start State"
  }
}

// 结束类
class StopState  implements IState {
  doAction(context:IContent){
    console.log("Player is in stop state");
    context.setState(this)
  }

  toString (){
    return "Stop State"
  }
}

// 结束==========================定义两个状态

// 定义根据状态，而发生改变的上下文类型。
class Context implements IContent {
  state:IState | any = null;
  constructor () {
    this.state = null
  }

  setState(state:IState){
    this.state = state
  }

  getState(){
    if(!!this.state&&!!this.state.toString){
      return  this.state.toString()
    } else {
      return "没有值"
    }
    
  }
}


const context = new Context();
const startState = new StartState();
startState.doAction(context);

console.log(context.getState());

const stopState = new StopState();
stopState.doAction(context);
console.log(context.getState());