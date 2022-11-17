// 工厂模式是比较常用的设计模式之一，那么什么叫工厂模式呢？简单来说，就是你需要什么东西不直接使用new的方法生成实例，然后统一通过工厂进行生产加工再生成实例。
interface ShapeModel {
    draw: ()=> void;
}

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

// 建立一个专门生产形状的工厂来生产它们了
class Factory {
    getShape(shapType: string):ShapeModel | null{
        switch (shapType){
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

// 测试
const shapeFactory = new Factory();
const shape1 = shapeFactory.getShape('CIRCLE')
shape1&&shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2&&shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3&&shape3.draw();