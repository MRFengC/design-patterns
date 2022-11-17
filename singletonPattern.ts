// 单例模式，简单来说就是一个实例只生产一次
class SingleObject {
    static instance:SingleObject
    constructor() {
        // 防止调用new初始化
        if(new.target != undefined) {
            const errorMsg = "This is single object,Can't use keyword new!";
            const tipMsg = "You should use method getInstance to get instance。";
            throw new Error(`\n${errorMsg}\n${tipMsg}`)
        }
    }
    static getInstance(){
        // 生产单例
        if(SingleObject.instance) {
            return SingleObject.instance;
        }
        SingleObject.instance = SingleObject.prototype;
        return SingleObject.instance;
    }
    showMessage(){
       console.log("Hello World!");
    }
}
const instance = SingleObject.getInstance();
instance.showMessage();
/**
 * output:
 * Hello World!
 */