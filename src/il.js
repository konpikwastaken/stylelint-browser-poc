'use strict';
const lazy = (mod, fn, id) => {
    const realId = id.slice(id.lastIndexOf('/') + 1);
    return mod === undefined
        ? require(/* webpackInclude: /\.js$/, webpackMode: "eager" */ `../node_modules/stylelint/lib/rules/` + realId)
        : mod;
};

module.exports = fn => {
    return id => {
        let mod;

        const handler = {
            get: (target, property) => {
                mod = lazy(mod, fn, id);
                return Reflect.get(mod, property);
            },
            apply: (target, thisArg, argumentsList) => {
                mod = lazy(mod, fn, id);
                return Reflect.apply(mod, thisArg, argumentsList);
            },
            construct: (target, argumentsList) => {
                mod = lazy(mod, fn, id);
                return Reflect.construct(mod, argumentsList);
            }
        };

        // eslint-disable-next-line prefer-arrow-callback
        return new Proxy(function() {}, handler);
    };
};
