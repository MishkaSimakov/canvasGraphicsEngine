import {Utils} from "./Utils";

export const Factory = {
    addGetterSetter(constructor, attr, def?) {
        this.addGetter(constructor, attr, def);
        this.addSetter(constructor, attr);

        this.addOverloadedGetterSetter(constructor, attr, def);
    },
    addGetter(constructor, attr, def?) {
        let method = 'get' + Utils.capitalize(attr);

        constructor.prototype[method] = constructor.prototype[method] ||
            function() {
                return this.attrs[attr] ?? def;
            }
    },
    addSetter(constructor, attr) {
        let method = 'set' + Utils.capitalize(attr);

        constructor.prototype[method] = constructor.prototype[method] ||
            function(value) {
                this.setAttr(attr, value);

                return this;
            }
    },
    addOverloadedGetterSetter(constructor, attr, def?) {
        let getter = 'get' + Utils.capitalize(attr);
        let setter = 'set' + Utils.capitalize(attr);

        constructor.prototype[attr] = function() {
            if (arguments.length) {
                this[setter](arguments[0]);

                return this;
            }

            return this[getter]();
        }
    }
}
