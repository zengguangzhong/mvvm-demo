function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        debugger
        var dep = new Dep();  // 闭包。 dep在设置属性值、获取属性值的时候，一直存在，没销毁.因为通过属性，比如counter可能在多个地方使用，就会有多个Watcher实例，这些实例都会push到一个数组中，在counter更新的时候，会执行数组里面的每个update方法。
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {  // 首次调用observe()的时候，Dep.target是null。需要在调用了compile后，添加watcher的时候，触发watcher实例的this.get()方法才会调用到这里
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                debugger
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    debugger
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {  //订阅Watcher实例
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() { 
        this.subs.forEach(function(sub) {
            sub.update();  // 调用订阅者的update方法，通知变化
        });
    }
};

Dep.target = null;