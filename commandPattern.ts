/**
 * 命令模式
 * 这是一种接受命令再统一执行的模式
 */
 // 买卖中可以买和卖，但是这是一个执行就实施的操作，不利于挂单。
 class Stock {
  name= ""
  quantity=0
  constructor() {
      this.name = "ABC";
      this.quantity = 10;
  }
  buy(){
     console.log("Stock [ Name: " + this.name + 
     ",Quantity: " + this.quantity +" ] bought");
  }
  sell(){
      console.log("Stock [ Name: " + this.name + 
     ",Quantity: " + this.quantity +" ] sold");
  }
}


// 同时只有使用了execute才真正执行。
class BuyStock {
  abcStock
  constructor(abcStock){
     this.abcStock = abcStock;
  }
  execute() {
      this.abcStock.buy();
  }
}

class SellStock{
  abcStock
  constructor(abcStock){
      this.abcStock = abcStock;
  }
  execute() {
      this.abcStock.sell();
  }
}


// 那么我们可以使用一个列表orderList来接受挂单了，使用takeOrder提交挂单，同时到达交易时间，我们再使用placeOrders来进行交易处理。

class Broker {
  orderList
  constructor() {
      this.orderList = [];
  }
  takeOrder(order){
     this.orderList.push(order);      
  }
  placeOrders(){
     for (const order of this.orderList) {
        order.execute();
     }
     this.orderList = [];
  }
}

// 使用的时候就更加直观和更加参数化了。
const abcStock = new Stock();
const buyStockOrder = new BuyStock(abcStock);
const sellStockOrder = new SellStock(abcStock);
const broker = new Broker();
broker.takeOrder(buyStockOrder);
broker.takeOrder(buyStockOrder);
broker.takeOrder(buyStockOrder);
broker.takeOrder(sellStockOrder);
broker.takeOrder(sellStockOrder);
broker.placeOrders()
