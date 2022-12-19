const users = [
    {
        username: 'Ignacio',
        password: '8322',
        admin: true
    }
]

export const logIn = (req, res) => {

    const { username, password } = req.body;

    const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);

    if (index < 0)
        res.status(401).json({ msg: 'Usuario no registrado' });
    else {
        const user = users[index];

        req.session.info = {
            loggedIn: true,
            contador: 1,
            username: user.username,
            admin: user.admin,
        };
        res.json({ msg: `!Bienvenido ${user.username}¡` })
    }
}

export const verifyLogIn = (req, res) => {

    if (req.session.info && req.session.info.loggedIn) {
        req.session.info.contador++;
        res.json({
            msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
        });
    } else {
        res.status(401).json({ msg: 'Usuario no logueado' });
    }
}

export const logout = (req, res) => {

    let username = req.session.info.username;

    req.session.destroy((err) => {

        if (!err) res.send(`Hasta luego ${username}`);
        else res.send({ status: 'Error de Logout', body: err });

    });
}
