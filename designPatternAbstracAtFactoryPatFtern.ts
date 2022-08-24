/**
 * 抽象工厂，简单来说就是工厂的工厂，因为一般来说一个工厂只负责加载一类组件，那么你有很多小类组件需要生产，那么势必会有很多小类的工厂。那么你最终生产一个大类，那就要很多小类的工厂负责生产。那么如何更方便的管理或者说生产这些工厂呢？那就用生产工厂的工厂来生成吧。
 */


// =================示例1=============================== 
/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
 interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
}

/**
* Concrete Factories produce a family of products that belong to a single
* variant. The factory guarantees that resulting products are compatible. Note
* that signatures of the Concrete Factory's methods return an abstract product,
* while inside the method a concrete product is instantiated.
*/
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
      return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
      return new ConcreteProductB1();
  }
}

/**
* Each Concrete Factory has a corresponding product variant.
*/
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
      return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
      return new ConcreteProductB2();
  }
}

/**
* Each distinct product of a product family should have a base interface. All
* variants of the product must implement this interface.
*/
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
* These Concrete Products are created by corresponding Concrete Factories.
*/
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
      return 'The result of the product A1.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
      return 'The result of the product A2.';
  }
}

/**
* Here's the the base interface of another product. All products can interact
* with each other, but proper interaction is possible only between products of
* the same concrete variant.
*/
interface AbstractProductB {
  /**
   * Product B is able to do its own thing...
   */
  usefulFunctionB(): string;

  /**
   * ...but it also can collaborate with the ProductA.
   *
   * The Abstract Factory makes sure that all products it creates are of the
   * same variant and thus, compatible.
   */
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
* These Concrete Products are created by corresponding Concrete Factories.
*/
class ConcreteProductB1 implements AbstractProductB {

  public usefulFunctionB(): string {
      return 'The result of the product B1.';
  }

  /**
   * The variant, Product B1, is only able to work correctly with the variant,
   * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
   * an argument.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
      const result = collaborator.usefulFunctionA();
      return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {

  public usefulFunctionB(): string {
      return 'The result of the product B2.';
  }

  /**
   * The variant, Product B2, is only able to work correctly with the variant,
   * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
   * an argument.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
      const result = collaborator.usefulFunctionA();
      return `The result of the B2 collaborating with the (${result})`;
  }
}

/**
* The client code works with factories and products only through abstract
* types: AbstractFactory and AbstractProduct. This lets you pass any factory or
* product subclass to the client code without breaking it.
*/
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

/**
* The client code can work with any concrete factory class.
*/
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());


// =================示例2=============================== 

// 形状工厂
class Circle {
  draw() {
      console.log("I'm a circle")
  }
}
class Rectangle {
  draw() {
      console.log("I'm a rectangle")
  }
}
class Square {
  draw() {
      console.log("I'm a square")
  }
}
class ShapeFactory {
  getShape(shapeType){
      switch(shapeType) {
          case 'CIRCLE':
              return new Circle();
          case 'RECTANGLE':
              return new Rectangle();
          case 'SQUARE':
              return new Square();
          default:
              return null;
      }
  }
}


// 加一个颜色工厂
class Red {
  fill() {
      console.log("fill red")
  }
}
class Blue {
  fill() {
      console.log("fill blue")
  }
}
class Green {
  fill() {
      console.log("fill green")
  }
}
class ColorFactory {
  getColor(color){
      switch(color) {
          case 'RED':
              return new Red();
          case 'BLUE':
              return new Blue();
          case 'GREEN':
              return new Green();
          default:
              return null;
      }
  }
}


// 最后添加抽象工厂（通过一个函数去获取工厂函数，再进行实例操作）
class FactoryProducer {
  static getFactory(choice){
      switch(choice) {
          case 'SHAPE':
              return new ShapeFactory();
          case 'COLOR':
              return new ColorFactory();
          default:
              return null;
      }
  }
}


//通过抽象工厂拿形状工厂
const shapeFactory = FactoryProducer.getFactory('SHAPE');
// 通过工厂拿各种形状
const shape1 = shapeFactory.getShape('CIRCLE');
shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3.draw();
//通过抽象工厂拿颜色工厂
const colorFactory = FactoryProducer.getFactory('COLOR');
// 通过工厂拿各种颜色
const color1 = colorFactory.getColor('RED');
color1.fill();
const color2 = colorFactory.getColor('BLUE');
color2.fill();
const color3 = colorFactory.getColor('GREEN');
color3.fill();
/**
 * output：
 * I'm a circle
 * I'm a rectangle
 * I'm a square
 * fill red
 * fill blue
 * fill green
 */
