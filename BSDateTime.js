class BSDateTime {
	static currentTime() {
        let date = new Date();
        return ("00" + date.getHours()).substr(-2) + ":" + ("00" + date.getMinutes()).substr(-2) + ":" + ("00" + date.getSeconds()).substr(-2);
	}
}