
export function setSessionItem(key,value){
    sessionStorage.setItem(key,value)
}

export function getSessionItem(key){
    return sessionStorage.getItem(key)
}