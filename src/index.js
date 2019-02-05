import { lint } from 'stylelint';
import standardConfig from 'stylelint-config-standard';

// element handles
const input = document.getElementById('input');
const output = document.getElementById('output');

// event bindings
const setListener = (element, event, handler) => {
    const eventArray = Array.isArray(event) ? event : [event];

    eventArray.forEach(e => {
        element.removeEventListener(e, handler);
        element.addEventListener(e, handler);
    });
};
const domLoadedHandler = () => {
    setListener(input, ['change', 'keyup', 'onkeyup', 'onchange'], main);
    main();
};
setListener(document, 'DOMContentLoaded', domLoadedHandler);

// ----- The guts
function renderWarnings(warnings) {
    const parsedWarnings = [];

    for (const w of warnings) {
        parsedWarnings.push(`Line ${w.line}, Col ${w.column}: ${w.text}`);
    }

    output.innerText = !warnings.length ? 'No warnings.' : parsedWarnings.join('\n');
}

function renderError(message) {
    output.innerHTML = message;
}

function lintCSS(options) {
    lint(options).then(output => {
        renderWarnings(output.results[0].warnings);
    });
    // disabled during dev, i want the full stack
    // .catch(err => {
    //     renderError(`Failed to lint CSS! \n\n ${err}`);
    // });
}

const options = require('./rules/ruleset.config').default;
function main() {
    lintCSS({
        code: input.value,
        config: options
    });
}
