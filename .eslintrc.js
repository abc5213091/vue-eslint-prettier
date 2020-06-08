// http://eslint.org/docs/user-guide/configuring

module.exports = {
    // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    root: true,
    env: {
        node: true
    },
    globals: {
        $: true,
        jquery: true,
        CountUp: true,
        Swiper: true,
        ActiveXObject: true
    },
    extends: ['plugin:vue/recommended', 'prettier', 'prettier/vue'],
    // add your custom rules here
    rules: {
        'vue/no-use-v-if-with-v-for': ['error', { allowUsingIterationVar: true }],
        'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
        indent: [2, 4, { SwitchCase: 1 }],
        'one-var': [0, 'always'],
        'no-tabs': 0,
        // 'no-console': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-unused-expressions': 0

        // 'prettier/prettier': [
        //     'error',
        //     {
        //         semi: false,
        //         singleQuote: true,
        //         printWidth: 300,
        //         trailingComma: 'none',
        //         arrowParens: 'avoid',
        //         tabWidth: 4,
        //         useTabs: false
        //     }
        // ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
