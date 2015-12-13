BSStorageDefaults = {
	apiKey: "api",
	
	apiNameMS: "Microsoft",
	apiNameYA: "Yandex",

	langKeyDetect: "detect", 

	get: function() {
		return {
			api: this.apiNameMS,
			from: this.langKeyDetect,
			to: "en",
			fontSize: "17px"
		}
	}
}