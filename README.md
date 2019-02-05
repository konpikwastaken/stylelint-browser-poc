# Goals
This is a quick proof of concept to get stylelint working in the browser.  It is not meant to be used and has not been used in production (the resulting bundle is ~2MB)

Loosely based on https://github.com/m-allanson/stylelint-browser-demo but updated to latest webpack and [this thread](https://github.com/stylelint/stylelint/issues/3935).

# Live Preview
Live preview can be viewed at 
https://konpikwastaken.github.io/stylelint-browser-poc/

# Getting started
- Clone this repo
- Run `yarn`
- Run `yarn start-dev`
- Brower should open

# Notes, Observations, and Comments
- `il.js` is a modified copy & paste of [lazy-import](https://github.com/sindresorhus/import-lazy).  Looks like there are some late imports, so, by swap out the lazy-import module and falling back to webpacks context resolution works since we know where the rules are going to be loaded from.  Perhaps this could be rewritten to use a context-sensitive dynamic import.
- `fs.js` is just a small browser polyfill created just to provide mock values.
- The engine should be refactored & decoupled from anything that depends on an actual file system (e.g. reading configs, etc). Majority of the time was spent working around assumptions that the execution environment has IO access (e.g. `path`, `fs`).
- Importing a ruleset directly from an NPM package hits a few IO requests, while setting a config does not, so the workaround for that was to manually import & merge the rulesets.