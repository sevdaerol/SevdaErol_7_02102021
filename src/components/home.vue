<template>
     <div class="home-page">
        <headerComponent/>
        <h1>Bienvenue sur Groupomania!</h1>
        <p>Partagez du contenue avec vos collègues..</p>
        <button @click="newMessageRedirection" class="btn new-message-btn">Ecrire un nouveau message!</button>
        <div id="message-container" >
            <!-- injecter tout les messages ici => template => messageCard -->
        </div>
        <footerComponent/>
    </div>
</template>

<script>
import router from '../router/index'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'
import messageCard from '../components/messageCard.vue'
import { createApp } from 'vue' //pour la version 3 de vue importer createApp!
export default ({
    name: 'home',
    components: {
        headerComponent,
        footerComponent,
    },
    methods: {
        newMessageRedirection: function() { //methode = creer un nouveau message
            router.push('/new');
        },
    },
    mounted() {
        localStorage.removeItem("messageId"); //messageId defini dans => back => auth
        console.log("messageId: " + localStorage.messageId);
        fetch('http://localhost:3000/api/message') //req pour recuperer les messages depuis la bdd
        .then(function(res){
            if(res.ok){
                console.log("dans then/if!");
                return res.json();
            }
            else {
                console.log("dans then/else!");
            }
        })
        .then(function(res){ //fonction pour afficher l'ensemble des messages
            console.log("dans then2!");
            for (let i in res){
                console.log("dans for!");
                console.log(res);
                console.log(res.length);
                let date = res[i].datetime.split("T")[0];
                let time = res[i].datetime.split("T")[1].split('Z')[0];
                let propsData = {
                    title: res[i].title,
                    date: date,
                    time: time,
                    username: res[i].username,
                    content: res[i].content,
                    modifyMessagePath: "/message/"+res[i].message_id,  //definis dans controllers => message (alias)
                    buttonText: "Voir le message"
                }
                console.log("propsdata: " + propsData.title);

                const messageContainer = document.getElementById("message-container");
                const messageContainerFirstChild = messageContainer.firstChild;
                const mountNode = document.createElement("div");
                mountNode.id = "mount-node";
                messageContainer.insertBefore(mountNode, messageContainerFirstChild);
                createApp(messageCard, propsData).mount('#mount-node'); //mount propsData => messageCard => element #mount-node avec createApp
            }
        })
        .catch((error) => {
              console.error(error);
        });
    }
})
</script>

<style lang="scss">
h1, p{
    color: #060c52;
}
.new-message-btn {
    background-color: #ff8383;
    width: 50%;
}
</style>