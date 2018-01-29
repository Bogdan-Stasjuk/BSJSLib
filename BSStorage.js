BSStorage = {
    set: function(value, completion) {
        chrome.storage.sync.set({
            key: value
        }, completion);
    },
    get: function(completion) {
        chrome.storage.sync.get({
            key: BSStorageDefaults.get()
        }, function(items) {
            var value = items.key;
            console.bslogx("Did get values: " + value);
            completion(value);
        });
    },
    clear: function() {
        chrome.storage.sync.clear();
    }
}