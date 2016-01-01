// Karma configuration
// Generated on Fri Jan 01 2016 15:41:07 GMT+0900 (JST)

module.exports = function(config) {
    config.set({
	frameworks: ['jasmine'],

	files: [
		'src/*.ts',
		'spec/*.ts'
	],

	exclude: [
	],

	preprocessors: {
	    'scipts/*.ts': ['typescript'],
	    'spec/*.ts': ['typescript']
	},

	reporters: ['progress'],

	port: 9876,

	colors: true,

	logLevel: config.LOG_INFO,

	autoWatch: true,

	browsers: ['Chrome'],

	singleRun: false,

	concurrency: Infinity,

	typescriptPreprocessor: {
	    // options passed to the typescript compiler
	    options: {
		sourceMap: false,     // (optional) Generates corresponding .map file.
		target: 'ES5',        // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
		module: 'commonjs',   // (optional) Specify module code generation: 'commonjs' or 'amd'
		noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
		noResolve: false,     // (optional) Skip resolution and preprocessing.
		removeComments: true  // (optional) Do not emit comments to output.
	    },
	    // extra typing definitions to pass to the compiler (globs allowed)
	    typings: [
		'typings/tsd.d.ts'
	    ]
	},
    })
}
