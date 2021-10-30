<template>
     <div class="home-page">
        <headerComponent/>
        <h1>Bienvenue sur Groupomania!</h1>
        <p>Partagez du contenue avec vos collègues..</p>
        <button @click="newMessageRedirection" class="btn new-message-btn">Ecrire un nouveau message!</button>
        <div id="message-container" >
            <!-- Use to display all message by method displayMessageRequest -->
        </div>
        <footerComponent/>
    </div>
</template>




<script>
import router from '../router/index'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'
import messageCard from '../components/messageCard.vue'
import Vue from 'vue'
export default ({
    name: 'home',
    components: {
        headerComponent,
        footerComponent,
    },
    methods: {
        newMessageRedirection: function() { //pour creer un nouveau message
            router.push('/new');
        },
        displayAllRequest: function() {

        }
    },
    mounted() {
        localStorage.removeItem("messageId"); //messageId defini dasn le back auth
        console.log("messageId: " + localStorage.messageId);
        fetch('http://localhost:3000/api/message') //chemin definie dans app.js backend pour recuperer tout les message
        .then(function(res){
            if(res.ok){
                console.log("dans fetch!");
                return res.json();
            }
            else {
                console.log("dans else!");
            }
        })
        .then(function(res){ //fonction pour afficher les message
            console.log("dans then2!");
            for (let i in res){
                console.log("dans for!");
                console.log(res);
                console.log(res.length);
                let date = res[i].datetime.split("T")[0];
                let time = res[i].datetime.split("T")[1].split('Z')[0];
                let messageCardClass = Vue.extend(messageCard)  //importer components messageCard
                console.log("voila: " + messageCardClass);
                let newMessageInstance = new messageCardClass({ //creer nouvelle instances pour les props depuis messageCard
                    propsData: {
                        title: res[i].title,
                        date: date,
                        time: time,
                        username: res[i].username,
                        content: res[i].content,
                        modifyMessagePath: "/message/"+res[i].message_id,  //definis dans controllers message AS
                        buttonText: "Voir le message"
                    }
                });
                console.log(newMessageInstance);
                const messageContainer = document.getElementById("message-container");
                const messageContainerFirstChild = messageContainer.firstChild;
                const mountNode = document.createElement("div");
                mountNode.id = "mount-node";
                messageContainer.insertBefore(mountNode, messageContainerFirstChild);
                newMessageInstance.$mount("#mount-node") //mounter l'instance dans l'element mountNode
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