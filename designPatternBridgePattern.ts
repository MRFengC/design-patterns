/**
 * 桥接模式
 * 设计目的是不让下层的组件的变化，影响上层的调用
 */


// 有两个类，但是它们有很多不确定性，可能在后续会变修改，
 class RedCircle {
  drawCircle(radius, x, y) {
     console.log("Drawing Circle[ color: red, radius: "
        + radius +", x: " +x+", "+ y +"]");
  }
}
class GreenCircle {
  drawCircle(radius, x, y) {
     console.log("Drawing Circle[ color: green, radius: "
        + radius +", x: " +x+", "+ y +"]");
  }
}

// 虽然它们不确定性，但是对外功能还是要相对稳定。所以我们要定义抽象层Shape，和实现层Circle，保持对外暴露的方法始终是draw。

class Shape {
  drawAPI
  constructor(drawAPI) {
    if(new.target === Shape) {
      throw new Error("这个类必须被实例")
    }

    this.drawAPI = drawAPI;
  }
}

class Circle extends Shape {
  x;
  y;
  z;
  radius
  constructor(x, y,radius,drawAPI) {
    super(drawAPI);
    this.x = x;  
    this.y = y;  
    this.radius = radius;
  }

  draw() {
    this.drawAPI.drawCircle(this.radius, this.x, this.y);
  }
}

/**
 * 即使基础组件发生变化，也不影响上层的调用。例子中RedCircle和GreenCircle作为了基础组件，
 * 假设方法drawCircle进行了更名或调用方法发生变更，但是在抽象层Shape依旧是draw，只能修改Circle的draw内容来修改，但是对外依然能保持draw方法的调用。
 */