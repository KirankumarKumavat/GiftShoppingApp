
/**
 * @param string
 * check email is valid or not
 */
export function isValidEmail(string) {
   string = string.replace(/\s/g, '')
   // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (reg.test(string) === true) {
      return true
   }
   return false
}

/**
 * @param string
 * check email is valid or not
 */
export function isValidPassword(string) {
   string = string.replace(/\s/g, '')
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
   const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,18})");
   const mediumRegex = new RegExp("r'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!% *?&]{6,18})';")
   if (strongRegex.test(string) === true) {
      return true
   }
   return false;
}
