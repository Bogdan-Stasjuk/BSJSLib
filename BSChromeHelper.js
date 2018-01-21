class BSChromeHelper {
    static getActiveTab(completion) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            console.bslogx("BSChromeHelper.getActiveTab: tabs =", tabs);

            var activeTab = tabs[0];
            if (activeTab && activeTab !== undefined) {
                completion(activeTab);
            } else {
                console.bslog("BSChromeHelper.getActiveTab: activeTab =", activeTab);
            }
        });
    }
}