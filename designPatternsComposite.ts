/**
 *组合是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。
 *对于绝大多数需要生成树状结构的问题来说， 组合都是非常受欢迎的解决方案。 组合最主要的功能是在整个树状结构上递归调用方法并对结果进行汇总。
 *组合模式在 TypeScript 代码中很常见， 常用于表示与图形打交道的用户界面组件或代码的层次结构。
 *识别方法： 组合可以通过将同一抽象或接口类型的实例放入树状结构的行为方法来轻松识别。
 *关注点：
 *它由哪些类组成？
 *这些类扮演了哪些角色？
 *模式中的各个元素会以何种方式相互关联？
 */

/**
 * 基类Component为复合对象的简单和复杂对象声明了通用操作。
 */
 abstract class Component {
  protected parent!: Component | null;

  /**
   * 可选地，基础组件可以声明一个接口，用于在树结构中设置和访问组件的父组件。它还可以为这些方法提供一些默认实现。
   */
  public setParent(parent: Component | null) {
      this.parent = parent;
  }

  public getParent(): Component | null {
      return this.parent;
  }

  /**
   * 在某些情况下，在基类Component中定义子管理操作是有益的。这样，您就不需要向客户端代码公开任何具体的组件类，即使是在对象树组装期间。缺点是这些方法对于叶级组件来说是空的。
   */
  public add(component: Component): void { }

  public remove(component: Component): void { }

  /**
   * 您可以提供一个方法，让客户机代码判断组件是否可以包含子组件。
   */
  public isComposite(): boolean {
      return false;
  }

  /**
   * 基组件可能实现一些默认行为，或者把它留给具体的类(通过声明包含行为的方法为“抽象”)。
   */
  public abstract operation(): string;
}

/**
* Leaf类表示组合的结束对象。一片叶子不能有任何孩子。
*通常，实际工作由Leaf对象完成，而Composite对象只委托给其子组件。.
*/
class Leaf extends Component {
  public operation(): string {
      return 'Leaf';
  }
}

/**
* Composite类表示可能有子组件的复杂组件。通常，Composite对象将实际工作委托给它们的子对象，然后“汇总”结果。
*/
class Composite extends Component {
  protected children: Component[] = [];

  /**
   * 复合对象可以向其子列表中添加或删除其他组件(简单或复杂)。
   */
  public add(component: Component): void {
      this.children.push(component);
      component.setParent(this);
  }

  public remove(component: Component): void {
      const componentIndex = this.children.indexOf(component);
      this.children.splice(componentIndex, 1);

      component.setParent(null);
  }

  public isComposite(): boolean {
      return true;
  }

  /**
   * Composite以特定的方式执行其主要逻辑。它递归地遍历所有子节点，收集并汇总它们的结果。
   * 由于组合的子节点将这些调用传递给它们的子节点，因此结果是遍历整个对象树。
   */
  public operation(): string {
      const results: string[] = [];
      for (const child of this.children) {
          results.push(child.operation());
      }

      return `Branch(${results.join('+')})`;
  }
}

/**
* 客户端代码通过基本接口处理所有组件。
*/
function clientCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

/**
* 通过这种方式，客户端代码可以支持简单的叶子组件...
*/
const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
* ...as well as the complex composites.
*/
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

/**
  * 由于子管理操作是在基类Component中声明的，因此客户端代码可以处理任何组件，无论简单还是复杂，而不需要依赖它们的具体类。
*/
function clientCode2(component1: Component, component2: Component) {
  // ...

  if (component1.isComposite()) {
      component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()}`);

  // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);

// Client: I've got a simple component:
// RESULT: Leaf

// Client: Now I've got a composite tree:
// RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf))

// Client: I don't need to check the components classes even when managing the tree:
// RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf)+Leaf)