// es5

var info = {};
(function() {
	var userAgent = navigator.userAgent;
	var appName = navigator.appName;
	var appVersion = navigator.appVersion;

	info.userAgent = userAgent;
	info.appName = appName;
	info.appVersion = appVersion;
})();

// es6

const info = {};

{
	const userAgent = navigator.userAgent;
	const appName = navigator.appName;
	const appVersion = navigator.appVersion;

	info.userAgent = userAgent;
	info.appName = appName;
	info.appVersion = appVersion;
}