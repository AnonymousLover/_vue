/**
 * @author nimin
 *
 */
import { forEach, toJson, isObject, isBrowser } from './common'
import $log from './log'

export default {
    stringFormat(){
        for (var fmt = arguments[0], ndx = 1; ndx < arguments.length; ++ndx) {
            fmt = fmt.replace(new RegExp('\\{' + (ndx - 1) + '\\}', "g"), toJson(arguments[ndx]));
        }
        return fmt;
    },
    parseParams(str){
        return str.split('&').reduce(function (params, param) {
            var paramSplit        = param.split('=').map(function (value) {
                return decodeURIComponent(value.replace('+', ' '));
            });
            params[paramSplit[0]] = paramSplit[1];
            return params;
        }, {});
    },
    // http request success converter.
    httpRespDataConverter(data, status) {
        let code    = data.code || data.resultCode || '',
            message = data.message || data.resultMsg || '';
        if (status == 200) {
            //"1000"表示业务逻辑成功！,"1022"-业务走不下去的错误, "2022"-表示系统未知错误
            delete data.resultCode;
            delete data.resultMsg;
        } else {
            code    = code || status;
            message = message || "[" + code + " : 服务器未知错误]";
        }
        return {code: code, message: message, data: data};
    },
    tracking(eventId, mapObject) {
        try {
            if (Agent && isObject(mapObject)) {
                var map = new hashMap();
                forEach(mapObject, function (value, key) {
                    map.put(key, value)
                });
                Agent.customizeEvent(eventId, map);
            } else if (Agent) Agent.clickEvent(eventId);
        } catch (e) {
            $log.error(e);
        }
    },
    getBrowser() {
        let ua = isBrowser ? window.navigator.userAgent : '';
        return {
            isWX    : /micromessenger/i.test(ua),
            isQQ    : /mqqbrowser|qq/i.test(ua),
            isUC    : /ucbrowser/i.test(ua),
            isWeiBo : /weibo/i.test(ua),
            isSafari: /safari/i.test(ua) && !/mqqbrowser/i.test(ua),
            isChrome: /chrome/i.test(ua) && !/mqqbrowser/i.test(ua)
        }
    }
}