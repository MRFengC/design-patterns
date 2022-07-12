/**
 * 访问者模式
 */

/**
 * 首先我们定义一组设备（把观察者类放进来，把自己的this传进去,this可以访问到当前的类名字）
 * */  
class Keyboard {
  accept(computerPartVisitor) {
     computerPartVisitor.visit(this);
  }
}
class Monitor {
  accept(computerPartVisitor) {
     computerPartVisitor.visit(this);
  }
}
class Mouse {
  accept(computerPartVisitor) {
     computerPartVisitor.visit(this);
  }
}

// 定义电脑为一种设备，同时集成了其它设备（把字类子类放到数组里，通过循环把观察者放进去，同时触发访问者的访问函数）

class  Computer {
  parts:any = []
  constructor(){
    this.parts = [new Mouse(), new Keyboard(), new Monitor]
  }

  accept(computerPartVisitor) {
    for(let i = 0; i <this.parts.length; i++){
      this.parts[i].accept(computerPartVisitor);
    }
    computerPartVisitor.visit(this)
  }
}


class ComputerPartDisplayVisitor{
  visit(device){
    console.log(`Displaying ${device.constructor.name}`);
    
  }
}

const computer = new Computer();
computer.accept(new ComputerPartDisplayVisitor());