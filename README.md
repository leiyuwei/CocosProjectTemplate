## 一个简单的框架

- `eval` 处理事件, 根据事件更新`state`
- `render` 根据`state`渲染，可以由多个绑定到State里面各个Behavior上
- `state` 明确定义的State, 内部由一个以上的BehaviorSubject构成
- `Action` 定义该组件可能会产生的交互行为，包括
  - UI交互 
  - 网络请求
  - 定时器

```typescript
const {ccclass, property} = cc._decorator

interface State {
    count: BehaviorSubject<number>;
}

type Action = Type<"Inc", Unit> | Type<"Dec", Unit> | Type<"Set", number>

@ccclass
export class Example1 extends BaseComponent<State, Action> {
    @property(cc.Button)
    minusButton: cc.Button = null;
    @property(cc.Button)
    plusButton: cc.Button = null;
    @property(cc.Label)
    contentLabel: cc.Label = null;
    @property(cc.Button)
    maxButton: cc.Button = null;

    readonly MAX_SIZE = 999;

    start () {
        this.actions = new Subject<Action>();
        this.minusButton.node.on(TOUCH_END, () => this.actions.next({typeName: "Dec", value: unit}));
        this.plusButton.node.on(TOUCH_END, () => this.actions.next({typeName: "Inc", value: unit}));
        this.maxButton.node.on(TOUCH_END, () => this.actions.next({typeName: "Set", value: this.MAX_SIZE}));
        this.state = {
            count: new BehaviorSubject<number>(200)
        };
        this.actions.subscribe(this.eval.bind(this));
        this.state.count.subscribe(this.render.bind(this))
    }

    render(count: number) {
        this.contentLabel.string = String(count);
    }

    eval (action: Action) {
        switch (action.typeName) {
            case "Dec": {
                let count = this.state.count.getValue();
                if (count > 0) {
                    modify(this.state.count, add(__, -1))
                }
                break;
            }
            case "Inc": {
                let count = this.state.count.getValue();
                if (count < this.MAX_SIZE) {
                    modify(this.state.count, add(__, 1))
                }
                break;
            }
            case "Set": {
                modify(this.state.count, always(action.value));
                break;
            }
        }
    }
}
```

## 定义ADT类型

```typescript
type Type<T, U> = {typeName: T, value: U}

type RemoteData<Ok, Err> 
    = Type<"NotAsked", Unit> 
    | Type<"Loading", Unit> 
    | Type <"Success", Ok> 
    | Type <"Failure", Err>
```

参考Purescript/Haskell定义ADT
```haskell
data RemoteData e a
  = NotAsked
  | Loading
  | Failure e
  | Success a
```