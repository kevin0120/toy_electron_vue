import Cookies from 'js-cookie'
import { vuexStore } from '.';
import { TOKEN_HEAD, global_var } from '@/global/globalVars';

const inMinutes = 1.0 / 1440.0

const inSeconds = 1.0 / 86400.0


export const expires_10s = new Date(new Date() * 1 + 10 * 1000);


export function expiresDate(sec) {
    return new Date(new Date() * 1 + sec * 1000);
}


export function setCookieExpires(key, value, expires) {
    Cookies.set(key, value, { expires: expires });
}


export function setCookieExpSeconds(key, value, sec) {
    Cookies.set(key, value, { expires: sec * inSeconds });
}

export function setCookieExpMinutes(key, value, minutes) {
    Cookies.set(key, value, { expires: minutes * inMinutes });
}

export function setCookie(key, value) {
    Cookies.set(key, value);
}

export function getAllCookies() {
    return Cookies.get() // => { name: 'value' }
}

export function getCookie(key) {
    return Cookies.get(key)
}

export function removeCookie(key) {
    Cookies.remove(key)
}


export function removeAllCookies() {
    Object.keys(Cookies.get()).forEach((cookieName) => {
        var neededAttributes = {
        };
        Cookies.remove(cookieName, neededAttributes);
    });
}



export function checkLogin() {
    let token = getCookie(TOKEN_HEAD)
    if (token) {
        try {
            token = JSON.parse(token)
        } catch (error) {
            token = null
            vuexStore.state.f_status.user = "guest";
            vuexStore.state.f_status.permissions = {};
            return;
        }
        // console.log(token);
        if (token.USER) {
            vuexStore.state.f_status.user = token.USER
        }
        else {
            vuexStore.state.f_status.user = "guest";
        }
        if (token.PERMISSIONS)
        {
            vuexStore.state.f_status.permissions = token.PERMISSIONS;
            vuexStore.state.f_status.group_id = token.GROUPID;
        }
        else {
            vuexStore.state.f_status.permissions = {};
        }
        if (token.TOKEN) {
            global_var.TOKEN = token.TOKEN;
        }
    } else {
        vuexStore.state.f_status.user = "guest";
        vuexStore.state.f_status.permissions = {};
    }
}
