<template>
     <div id="new-message-form-page">
        <headerComponent/>
        <div id="new-message-form">
            <h1 id="new-message-form-header">Nouveau Message</h1>
            <div class="form-container">
                <input id="new-message-form-title" class="new-message-input" maxlength="50" type="text" required>
                <p>Titre (50 caractères maximum)</p>
                <textarea id="new-message-form-text" class="new-message-input" maxlength="255" required></textarea>
                <p>Rédigez votre message!</p>
                <div class="form-btn">
                    <button class="btn home-redirection-btn" @click="homePageRedirection">Retourner a l'acceuil</button>
                    <button id="new-message-form-send" class="btn" @click="sendNewMessage">Envoyer le message</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router/index'
import headerComponent from './header.vue'
export default ({
    name: 'newMessage',
    components: {
        headerComponent
    },
    methods: {
        homePageRedirection: function() {
            router.push("/home");
        },
        sendNewMessage: function() { //creer nouveau message!
            //console.log("test", localStorage.getItem("token"));
            const newMessageFormTitle = document.getElementById("new-message-form-title");
            const newMessageFormText = document.getElementById("new-message-form-text");
            const parameters = {
                method: "POST",
                headers: {
                    "Content-Type": "Application/Json",
                    "Authorization": localStorage.getItem("token")
                    },
                body: JSON.stringify({
                    user_id: parseInt(localStorage.getItem("userId")),
                    title: newMessageFormTitle.value,
                    content: newMessageFormText.value,
                    token: localStorage.getItem("token")
                })
            };
            console.log(parameters);
            fetch("http://localhost:3000/api/message", parameters)
            .then(function(res) {
                if (res.ok){
                    console.log("Nouveau Message crée!");
                    router.push('home');
                }
            })
            .catch(function(){
                console.log("Message non envoyé!");
            });
        }
    },
    mounted() {
        //methode = redirection
        if(!localStorage.getItem('token')){
            router.push('/');
        }
    }
})
</script>

<style lang="scss">
#new-message-form {
    display: flex;
    flex-direction: column;

}
.form-container {
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;
}
textarea {
    height: 70%;
    width: 70%;
}
.new-message-input {
    width: 50%;
    margin-left: 25%;
    border: 2px solid;
}
.btn{
    background-color: #060c52;
    color: white;
}
.form-btn{
    display: flex;
    justify-content: space-evenly;
}
</style>