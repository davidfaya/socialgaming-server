 const validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}
    if (username.trim() === '')
        errors.username = 'Username must not be empty'
    if (email.trim() === '')
        errors.email = 'Email must not be empty'
    else {
        const regX = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regX)) {
          errors.email = 'Email must be a valid email address'
        }
    }
    if (password.trim() === '')
        errors.password = 'Password must not be empty'
    else if (password !== confirmPassword)
        errors.confirmPassword = 'Passwords must match'

    return {
        errors,
        valid: Object.keys(errors).length < 1       //if not errors then registration is valid
    }
}

const validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === '')
        errors.username = 'Username must not be empty'
    if (password.trim() === '')
        errors.username = 'Password must not be empty'

    return {
        errors,
        valid: Object.keys(errors).length < 1       //if not errors then registration is valid
    }
}
module.exports = { validateRegisterInput, validateLoginInput}


