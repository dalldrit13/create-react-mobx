const invalidPassword = (pass: string): string => {
  if (!pass) {
    return ('Please enter a password')
  } else if (pass.length < 5) {
    return ('Password must be 5+ characters long')
  } else if (!(/[A-Z]/).test(pass)) {
    return ('Password must include at least 1 capital letter')
  } else if (!(/[a-z]/).test(pass)) {
    return ('Password must include at least 1 lower case letter')
  } else if (!(/[0-9]/).test(pass)) {
    return ('Password must contain at least 1 number')
  } else if (!(/\W|_/g).test(pass)) {
    return ('Password must contain at least 1 symbol')
  } else if (pass.includes(' ')) {
    return ('Passwords should not contain a space')
  } else {
    return ''
  }
}

// Simple regex doesn't cover all edge cases
const emailRegex = /\S+@\S+\.\S+/

const usernameRegex = /^[a-zA-Z0-9_]+$/

function commaNumber(str: string): string {
  return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}


export { invalidPassword, emailRegex, usernameRegex, commaNumber }
export { compressPhoto, uploadPhoto } from "./picture"