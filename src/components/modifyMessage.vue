<template>
    <div id="modify-message-page">
        <headerComponent/>
        <div id="modify-message-display">
        </div>
        <div id="modify-message-container">
            <h1 id="modify-message-form-title">Entrez ci-dessous votre nouveau message:</h1>
            <textarea id="modify-message-form-text" maxlength="255" required></textarea>
            <div id="modify-message-form-btn">
                <button id="modify-message-form-modifiy" class="btn" @click="sendModifiedMessage">Modifier</button>
                <button id="modify-message-form-delete" class="btn" @click="deleteMessage">Supprimer</button>
                <p id="unauthorized-message"></p>
            </div>
        </div>
        <footerComponent/>
    </div>
</template>

<script>
import router from '../router/index';
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'
import messageCard from '../components/messageCard.vue'
import { createApp } from 'vue'
export default ({
    name: 'newMessage',
    components: {
        headerComponent,
        footerComponent,
    },
    mounted() {
         //methode = redirection
        if(!localStorage.getItem('token')){
            router.push('/');
        }else {
            fetch("http://localhost:3000/api/message/"+localStorage.getItem("messageId")) //recuperer message par Id
            .then(function(res){
                if(res.ok){
                    return res.json();
                }
                    const unauthorizedMessage = document.getElementById("unauthorized-message")
                    unauthorizedMessage.innerHTML = "Vous n'êtes pas authorisé(e) à modifier ce message!";
            })
            .then(function(res){
                const date = res[0].datetime.split("T")[0];
                const time = res[0].datetime.split("T")[1].split('Z')[0];
                let propsData = {
                    title: res[0].title,
                    date: date,
                    time: time,
                    username: res[0].username,
                    content: res[0].content,
                    buttonText: "Retourner a la page d'acceuil",
                    modifyMessagePath: "/home"
                }

                const modifyMessageDisplay = document.getElementById("modify-message-display");
                const modifyMessageDisplayFirstChild = modifyMessageDisplay.firstChild;
                const mountNode = document.createElement("div");
                mountNode.id ="mount-node";
                modifyMessageDisplay.insertBefore(mountNode, modifyMessageDisplayFirstChild);
                createApp(messageCard, propsData).mount('#mount-node');
            })
            .catch();
        }
    },
     methods: {
        sendModifiedMessage: function() { //envoie du message modifie
            console.log("token from ls: " + localStorage.getItem("token"));
            const modifyMessageFormText = document.getElementById("modify-message-form-text");
            const parameters = {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/Json",
                    "Authorization": localStorage.getItem("token")
                    },
                body: JSON.stringify({
                    id: parseInt(localStorage.getItem("messageId")),
                    content: modifyMessageFormText.value,
                    token: localStorage.getItem("token"),
                    user_id: parseInt(localStorage.getItem("userId")),
                })
            };
            //console.log("parameters: " + parameters);
            fetch("http://localhost:3000/api/message/"+localStorage.getItem("messageId"), parameters)
            .then(function(res) {
                if (res.ok){
                    console.log("message modifié enregistrée dans la BDD avec succès!");
                    router.push("/home");
                } else {
                    const unauthorizedMessage = document.getElementById("unauthorized-message");
                    unauthorizedMessage.innerHTML = "Vous n'êtes pas authorisé(e) à moddifier ce message!";
                }
            })
            .catch((error) => {
              console.error(error);
            });
        },
        deleteMessage: function() { //suppression du message!
            const parameters = {
                method: "DELETE",
                headers: {
                    "Content-Type": "Application/Json",
                    "Authorization": localStorage.getItem("token")
                    },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    user_id: parseInt(localStorage.getItem("userId")),
                    })
            }
            fetch("http://localhost:3000/api/message/"+localStorage.getItem("messageId"), parameters)
            .then(function(res) {
                if (res.ok) {
                    console.log("Message supprimé de la base de données");
                    localStorage.removeItem("messageId");
                    router.push("/home");
                } else {
                    const unauthorizedMessage = document.getElementById("unauthorized-message");
                    unauthorizedMessage.innerHTML = "Vous n'êtes pas authorisé(e) à supprimer ce message!";
                }
            })
            .catch(function(err){
                console.log(err);
                const unauthorizedMessage = document.getElementById("unauthorized-message");
                unauthorizedMessage.innerHTML = "Vous n'êtes pas authorisé(e) à supprimer ce message!";
            });
        }
    }
})
</script>

<style lang="scss">
#modify-message-form-title{
    font-size: large;
}
#modify-message-form-delete{
    margin-left: 2%;
    margin-top: 1%;
}
#unauthorized-message{
    color: #060c52;
}
</style>