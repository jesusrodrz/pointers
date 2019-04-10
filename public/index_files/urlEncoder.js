
var Utils = {};
Utils = (function () {

    function encodeURL(url) {
        var s = getJSessionID();
        if (s !== undefined) {
            var sup = url.indexOf("?");
            if (sup === -1) {
                sup = url.length;
            }
            var l = url.substr(0, sup);
            var r = "";
            if (sup > -1) {
                r = url.substr(sup, url.length);
            }
            url = l + ";jsessionid=" + s + r;
        }
        return url;
    }

    function getJSessionID() {
        var jsessionid = 'jsessionid';
        var regex = new RegExp('[\\?&;]' + jsessionid + '=([^&?#]*)');
        var results = regex.exec(location.href);
        if (results !== null) {
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
        return undefined;
    }

    return {
        encodeURL: encodeURL
    };
}());