import users from '../fixtures/users.json'
import login from '../support/pages/LoginPage';

describe('login', () => {
    it('Deve logar com perfil de admin', () => {
        const user = users.login_success


        login.doLogin(user)

        cy.contains('.logged-user', 'Olá, ' + user.name)
            .should('be.visible')
    });

    it('Não deve logar com email não cadastrado', () => {
        const user = users.email_not_found

        login.doLogin(user)
        login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')

    });

    it.only('Não deve logar com emails inválido', () => {
        const emails = users.invalid_emails

        login.go()

        emails.forEach((u) => {
            login.fill(u)
            login.submit()
            login.popUpHave('Insira um email válido.')
            login.popUpBack()
        });

    });

    it('Não deve logar com email em branco', () => {
        const user = users.empty_email

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')
    });

    it('Não deve logar com senha em branco', () => {
        const user = users.empty_email

        login.doLogin(user)
        login.popUpHave('Os campos email e senha são obrigatórios.')
    });

    it('Não deve logar com senha incorreta', () => {
        const user = users.invalid_password

        login.doLogin(user)
        login.popUpHave('Suas credenciais são inválidas, por favor tente novamente!')
    });
});

