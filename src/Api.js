const BASE_API = 'http://192.168.100.26/myapp/frontend/backend/api';

export default {
    checkToken:async (token) => {
        const req = await fetch(`${BASE_API}/validate_token.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        //teste
        const json = await req.json();

        return json;
    },
    signIn:async (email, password) => {
        const req = await fetch(`${BASE_API}/login.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const json = await req.json();

        return json;
    },
    signUp:async (firstname, lastname, email, password) => {
        const avatar = 'https://ui-avatars.com/api/?name=' + firstname + '+' + lastname;

        const req = await fetch(`${BASE_API}/user/create.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstname, lastname, email, password, avatar})
        });

        const json = await req.json();

        return json;
    }
};
