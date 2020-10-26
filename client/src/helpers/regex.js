/**
 * Check if it's a valid email address.
 * @param  {String} str
 * @returns {Boolean} Boolean
 */
export function validateEmail(str) {
    const regex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return regex.test(str);
}

/**
 * Check if the string is A-Z || 0-9
 * @param  {String} str
 * @returns {Boolean} Boolean
 */
export function alphaCheck(str) {
    const regex = RegExp(/^[a-zA-Z0-9]*$/);
    return regex.test(str);
}

/**
 * Check if password has 8 Characters, 1 Uppercase and 1 Number
 * @param  {String} str
 * @returns {Boolean} Boolean
 */
export function passStrength(str) {
    const regex = RegExp(/^(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/);
    return regex.test(str);
}
