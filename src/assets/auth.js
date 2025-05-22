/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-20 23:25:40                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-04-20 23:54:01                               *
 * @FilePath              : docs-web/src/assets/auth.js                       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

// This function is from Sage login page, login.js
const authToken = (login, password) => {
  // convert to UTF8 (only works for characters with code points up to 65535)
  let s = login.toLocaleLowerCase() + ':' + password
  let i = s.length
  while (--i >= 0) {
    const c = s.charCodeAt(i)
    if (c > 127) {
      if (c < 2047) {
        s = s.substr(0, i) + String.fromCharCode(192 | (c >> 6), 128 | (c & 0x3f)) + s.substr(i + 1)
      } else {
        s =
          s.substr(0, i) +
          String.fromCharCode(224 | (c >> 12), 128 | ((c >> 6) & 0x3f), 128 | (c & 0x3f)) +
          s.substr(i + 1)
      }
    }
  }
  // !!! btoa not supported on IE??
  return 'Basic ' + window.btoa(s)
}
const isEmail = (str) => {
  // Regular expression to match a valid email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/
  return emailRegex.test(str)
}

export { authToken, isEmail }
