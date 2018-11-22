
// export function setCookie (name, value, timer) {
//   var strsec = timer
//   var time = new Date()
//   time.setTime(time.getTime() + strsec * 1000 * 60 * 60 * 24)
//   document.cookie = name + '=' + escape(value) + ';expires=' + time.toGMTString()
// }

// export function getCookie (name) {
//   let  arr;
//   let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")

//   if (arr = document.cookie.match(reg)) {
//     return unescape(arr[2])
//   } else {
//     return null
//   }
// }

// export function Delete (name) {
//   this.set(name, '', -1)
// }

//

// export function setCookie(cname, cvalue, exdays) {
//             var d = new Date();
//             d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//             var expires = "expires=" + d.toUTCString();
//          document.cookie = cname + "=" + escape(cvalue) + "; " + expires+"; path=/"   // 这个很重要代表在那个层级下可以访问cookie
//             console.log(d)
//             console.log(document.cookie)
//         }

// 获取cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return unescape(c.substring(name.length, c.length))
  }
  return ''
}

//

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (name, value, expiredays) {
  var exdate = new Date()
  let a = exdate.setTime(exdate.getTime() + (expiredays * 1000 * 60 * 60 * 24))
  console.log(a, expiredays * 1000 * 60 * 60 * 24)
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + '; path=/'
};

// 获取 cookie
// export function getCookie (name) {
//   if (!document.cookie) return
//   name = name + '='
//   var start = document.cookie.indexOf(name)
//   let value = null
//   if (start > -1) {
//     var end = document.cookie.indexOf(';', start)

//     if (end === -1) {
//       end = document.cookie.length
//     }
//     value = unescape(document.cookie.substring(start + name.length, end))
//   }
//   return value
// }

// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + escape(cval) + ';expires=' + exp.toGMTString()
  }
};

// 获取cookie
// export function getCookie (name) {
//   if (name) {
//     var arrCookie = document.cookie.replace(/[ ]/g, '')
//     var arr = arrCookie.split(';')

//     for (let i = 0; arr[i] != undefined; i++ ) {
//       console.log(arr[++i].split('='))
//       let Token = arr[i].split('=')
//       if (Token[0].indexOf(name) !== -1) {
//         return unescape(Token[1])
//       } else {
//         return null
//       }
//     }
//   } else {
//     return null
//   }
// }
