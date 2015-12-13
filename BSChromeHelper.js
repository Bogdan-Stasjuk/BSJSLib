BSChromeHelper = {
	getCurrentTab: function (callback) {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			callback(tabs[0]);
		});
	}
}