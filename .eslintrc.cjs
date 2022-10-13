module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
}
