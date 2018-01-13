BSNotification = {
    /**
     * Creates desktop notification
     * @param  {String} title
     * @param  {String} body Message
     * @param  {Image} image Icon
     * @return {void}
     */
    desktop: function(title, body, image) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        var notification = new Notification(title, {
            icon: image,
            body: body,
        });

        notification.onclick = function() {
            window.focus();
        };
    }
}