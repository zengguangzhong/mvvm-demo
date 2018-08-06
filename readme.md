
转载自：https://segmentfault.com/a/1190000006599500#articleHeader6。




Watcher，Dep，Observer源码解读：https://juejin.im/post/5a734b6cf265da4e70719386

深度解析 Vue 响应式原理：https://juejin.im/post/5b5eb69a5188251af86bfe00






主要是加了些注释：

实现mvvm的双向绑定，就必须要实现以下几点：
1. 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2. 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

Observer: 为所有数据添加监听器 Dep

Dep (监听器), data 中每个对象(和子对象)都有持有一个该对象, 当所绑定的数据有变更时, dep.notify() 方法被调用, 通知 Watcher

Compile (HTML指令解析器)，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

Watcher，作为连接 Observer 和 Compile 的桥梁，当 Compile 解析指令时会生成一个 Watcher 并给它绑定一个 update 方法 , 并添加到当前正在解析的指令所依赖的对象的 Dep 对象上

