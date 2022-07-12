/**
 * 命令模式
 * 这是一种接受命令再统一执行的模式
 */
var Stock = /** @class */ (function () {
    function Stock() {
        this.name = "";
        this.quantity = 0;
        this.name = "ABC";
        this.quantity = 10;
    }
    Stock.prototype.buy = function () {
        console.log("Stock [ Name: " + this.name +
            ",Quantity: " + this.quantity + " ] bought");
    };
    Stock.prototype.sell = function () {
        console.log("Stock [ Name: " + this.name +
            ",Quantity: " + this.quantity + " ] sold");
    };
    return Stock;
}());
var BuyStock = /** @class */ (function () {
    function BuyStock(abcStock) {
        this.abcStock = abcStock;
    }
    BuyStock.prototype.execute = function () {
        this.abcStock.buy();
    };
    return BuyStock;
}());
var SellStock = /** @class */ (function () {
    function SellStock(abcStock) {
        this.abcStock = abcStock;
    }
    SellStock.prototype.execute = function () {
        this.abcStock.sell();
    };
    return SellStock;
}());
var Broker = /** @class */ (function () {
    function Broker() {
        this.orderList = [];
    }
    Broker.prototype.takeOrder = function (order) {
        this.orderList.push(order);
    };
    Broker.prototype.placeOrders = function () {
        for (var _i = 0, _a = this.orderList; _i < _a.length; _i++) {
            var order = _a[_i];
            order.execute();
        }
        this.orderList = [];
    };
    return Broker;
}());
var abcStock = new Stock();
var buyStockOrder = new BuyStock(abcStock);
var sellStockOrder = new SellStock(abcStock);
var broker = new Broker();
broker.takeOrder(buyStockOrder);
broker.takeOrder(buyStockOrder);
broker.takeOrder(buyStockOrder);
broker.takeOrder(sellStockOrder);
broker.takeOrder(sellStockOrder);
broker.placeOrders();
