/* eslint-env node*/
/*
    prettier config file
    ---
    documentation: https://prettier.io/docs/en/configuration.html
*/

/**
 * @type {import("@types/prettier").Config}
 */
module.exports = {
	// length that the printer will wrap on
	// default: 80
	printWidth: 100,

	// the number of spaces per indent level
	// default: 2
	tabWidth: 4,

	// indent lines with tabs instead of spaces
	// default: false
	useTabs: true,

	// print semi colons at the end of statements
	// default: true
	semi: true,

	// use single quotes instead of double
	// default: false
	singleQuote: false,

	// change when properties in objects are quoted
	// default: 'as-needed'
	quoteProps: "consistent",

	// use single quotes in jsx
	// default: false
	jsxSingleQuote: false,

	// print tailing commas wherever possible
	// default: 'es5'
	trailingComma: "es5",

	// print spaces between backets in object literals
	// default: true
	bracketSpacing: true,

	// include parens around sole arrow function parameter
	// default: 'always'
	arrowParens: "always",

	// require pragma
	// default false
	requirePragma: false,

	// insert pragma
	// default: false
	insertPragma: false,

	// wrap markdown text as-is
	// default: 'preserve'
	proseWrap: "preserve",

	// html whitespace sensitivity
	// default: 'css'
	htmlWhitespaceSensitivity: "css",

	// end of line
	// default: 'lf' (line-feed \n)
	endOfLine: "lf",
};
