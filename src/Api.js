const BASE_API = 'https://172.19.112.1/backend/api';

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
    signUp:async () => {

    }
};
