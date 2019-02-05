// hard-code the rulesets & fake extending
const recommended = require('stylelint-config-recommended');
const standard = require('stylelint-config-standard');

export default {
    rules: {
        ...recommended.rules,
        ...standard.rules
    }
};
