type authData = {
    email: string
    pass: string
}

const login = async (authData: authData, callback: Function) => {
    const user = {}
    // TODO - Fazer login
    return callback(user)
}

const recoverPassword = async (email: string, callback: Function) => {
    // TODO - Enviar email recovery
    return callback()
}

export { login, recoverPassword }
