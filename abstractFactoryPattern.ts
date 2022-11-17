// 其实抽象工厂，简单来说就是工厂的工厂，因为一般来说一个工厂只负责加载一类组件，那么你有很多小类组件需要生产，那么势必会有很多小类的工厂。那么你最终生产一个大类，那就要很多小类的工厂负责生产。那么如何更方便的管理或者说生产这些工厂呢？那就用生产工厂的工厂来生成吧。
// 这是之前上文说的形状工厂(加命名空间， 因为与工厂模式重复)
namespace AbstractFactoryPattern{
    // 形状的接口
    interface ShapeModel {
        draw: ()=> void;
    }
    
    // 定义形状
    // 定义三个图形
    class Circle implements ShapeModel {
        draw() {
            console.log('i ` am a circle')
        }
    }

    class Rectangle implements ShapeModel {
        draw() {
            console.log('i am a rectangle')
        }
    }

    class Square implements ShapeModel {
        draw() {
            console.log('I`m a square');
            
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

    interface ColorModel {
        fill: ()=> void
    }
    // 定义颜色
    class Red implements ColorModel{
        fill() {
            console.log("fill red")
        }
    }
    class Blue implements ColorModel {
        fill() {
            console.log("fill blue")
        }
    }
    class Green implements ColorModel {
        fill() {
            console.log("fill green")
        }
    }
    class ColorFactory {
        getColor(color): ColorModel | null{
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

    // 重点 增加工厂。其实就是在外层再加一层
    export  class FactoryProducer {
        static getFactory(choice) {
            switch (choice){
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
    const shapeFactory =  AbstractFactoryPattern.FactoryProducer.getFactory('SHAPE');
    // 通过工厂拿各种形状
    const shape1 = shapeFactory&&shapeFactory.getShape('CIRCLE') ;
    shape1.draw();
    const shape2 = shapeFactory&&shapeFactory.getShape('RECTANGLE') as ShapeModel;
    shape2.draw();
    const shape3 = shapeFactory&&shapeFactory.getShape('SQUARE') as ShapeModel;
    shape3.draw();
    //通过抽象工厂拿颜色工厂
    const colorFactory = AbstractFactoryPattern.FactoryProducer.getFactory('COLOR');
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
}


