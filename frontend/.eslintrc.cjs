module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		"plugin:import/recommended",
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'airbnb',
		'airbnb-typescript',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest', sourceType: 'module', project: true,
		tsconfigRootDir: './tsconfig.json'
	},
	plugins: ['react-refresh', '@typescript-eslint', "import"],
	rules: {
		'react-refresh/only-export-components': 'warn',
		"@typescript-eslint/quotes": "off",
		'@typescript-eslint/indent': 'off',
		'no-tabs': 'off',
		'no-trailing-spaces': 'off',
		'linebreak-style': 'off',
		'eol-last': 'off'
	},
}
