<template>
<div id="login-page">
    <div>
        <div class="img-container">
            <img class="logo-img" src="../assets/icon-left-font-monochrome-white.svg" alt="groupomania logo"/>
        </div>
        <h1>Bienvenue sur Groupomania!</h1>
        <p>Connectez-vous ou Inscrivez-vous pour visualiser ce que vos collegues ont partagée</p>
        <div id="signup-login-selector">
            <button id="login" class="login-page-form-select-btn btn" @click="showLoginForm = !showLoginForm, showSignupForm = !showSignupForm, menuSelector">Log In</button>
            <button id="signup" class="login-page-form-select-btn btn" @click="showSignupForm = !showSignupForm, showLoginForm = !showLoginForm, menuSelector">Sign Up</button>
        </div>
        <div class="signupLogin">
            <div id="signup-form" v-show="showSignupForm">
                <h2>Créez un compte</h2>
                <input class="login-page-form-input" type="email" id="signup-email" required>
                <label for="signup-email">Adresse e-mail</label>
                <input class="login-page-form-input" type="text" id="signup-username" required>
                <label for="signup-username">Nom d'utilisateur</label>
                <input type="password" id="signup-password" required>
                <label class="login-page-form-input" for="signup-password">Mot de passe</label>
                <button class="send-btn btn" id="signup-send" @click="signupSend">Envoyer</button>
                <p id="unauthorized-message"></p>
            </div>
            <div id="login-form" v-show="showLoginForm">
                <h2>Connexion</h2>
                <input class="login-page-form-input" type="email" id="login-email" required>
                <label for="login-email">Adresse e-mail</label>
                <input class="login-page-form-input" type="password" id="login-password" required>
                <label for="login-password">Mot de passe</label>
                <button class="send-btn btn" id="login-send" @click="loginSend">Envoyer</button>
                <p id="unauthorized-message"></p>
            </div>
        </div>
    </div>
    <footerComponent/>
</div>
</template>

<script>
import router from '../router/index'
import footerComponent from '../components/footer.vue'
export default ({
    name: 'loginSignup',
    components: {
        footerComponent,
    },
    data: function() {
        return {
            showLoginForm: false,
            showSignupForm: true
        }
    },
    methods: {
        menuSelector: function() {
            let showLoginForm;
            let showSignupForm;
            if(showLoginForm == true){
                showSignupForm = false;
            }
            if(showSignupForm == true){
                showLoginForm = false;
            }
        },
        loginSend: function() { //connection
            const loginPassword = document.getElementById("login-password");
            const loginEmail = document.getElementById("login-email");
            const parameter = {
                method: "POST",
                headers: {"Content-Type": "application/Json"},
                body: JSON.stringify({
                    email: loginEmail.value,
                    password: loginPassword.value
                })
            }
            fetch("http://localhost:3000/api/user/login", parameter)
            .then(function(res){
                if(res.ok){
                    res.json()
                    .then(function(res){
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('email', loginEmail.value );
                    localStorage.setItem('userId', res.userId)
                    console.log("Connexion réussie");
                    router.push('home');
                    })
                } else {
                    const unauthorizedMessage = document.getElementById("unauthorized-message");
                    unauthorizedMessage.innerHTML = "Une erreur est survenue! Créez un compte dabbord!";
                }
            })
            .catch();
        },
        signupSend: function() { //inscription
            const signupPassword = document.getElementById("signup-password");
            const signupEmail = document.getElementById("signup-email");
            const signupUsername = document.getElementById("signup-username");
            const parameter = {
                method: "POST",
                headers: {"Content-Type": "application/Json"},
                body: JSON.stringify({
                    email: signupEmail.value,
                    username: signupUsername.value,
                    password: signupPassword.value
                })
            }
            fetch("http://localhost:3000/api/user/signup", parameter)
            .then(function(res){
                if(res.ok){
                    res.json()
                    .then(function(res){
                        localStorage.setItem('userId', res.userId);
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('email', signupEmail.value );
                        localStorage.setItem('username', signupUsername.value);
                        router.push('home');
                        console.log("Connexion effectuée avec succès !");
                    })
                } else {
                        const unauthorizedMessage = document.getElementById("unauthorized-message");
                        unauthorizedMessage.innerHTML = "Une erreur est survenue! Si vous avez deja un compte connecter vous!";
                }
            })
            .catch(function(err){
                console.log(err);
                const unauthorizedMessage = document.getElementById("unauthorized-message");
                unauthorizedMessage.innerHTML = "Une erreur est survenue! Si vous avez deja un compte connecter vous!";
            });

        }
    }
})
</script>

<style lang="scss">
.img-container{
    background-color: #060c52;
}
label{
    color: white;
}
.login-page-form-select-btn {
    border: 2px solid #d1d1d1;
    width: 30%;
}
.signupLogin{
    border: 4px solid #ff8383;
    background: #060c52;
    padding: 2%;
}
#login {
    margin-right: 10%;
    margin-bottom: 2%;
}
#signup {
    margin-left: 10%;
    margin-bottom: 2%;
}
#signup-form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 25%;
}
#login-form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 25%;
}
.send-btn {
    margin-top: 5%;
    width: 50%!important;
    margin-left: 25%;
}
.btn:hover {
    background-color: #ff8383;
    color: white;
}
#unauthorized-message{
    color: white;
}
@media only screen and (max-width: 600px) {
.logo-img {
    width: 50%;
}
}
</style>