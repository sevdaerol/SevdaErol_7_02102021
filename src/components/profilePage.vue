<template>
    <div id="user-page">
        <headerComponent/>
        <div id="user-profile">
            <div id="user-profile-img">
                <img src="../assets/user-icon.png" alt="Photo de profil"/>
            </div>
            <div id="user-profile-info">
                <h4 id="user-profile-info-username">Nom d'utilisateur : {{ username }}</h4>
                <h4 id="user-profile-info-email">Adresse e-mail : {{email}}</h4>
            </div>
        </div>
        <div id="user-btn-container">
            <button id="user-return-btn" class="btn" @click="returnToHome">Retourner à l'acceuil</button>
            <button id="user-delete-btn" class="btn" @click="deleteProfile">Supprimer mon compte</button>
        </div>
        <footerComponent/>
    </div>
</template>

<script>
import router from '../router/index'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'

export default ({
    name:"profilePage",
    components: {
        headerComponent,
        footerComponent
    },
    data: function() {
        return {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email")
        }
    },
    methods: {
        deleteProfile: function() { //suppression du compte
            const authHeaders = {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "Application/Json"
            };
            const parameters = {
                method: "DELETE",
                headers: authHeaders,
                body: JSON.stringify({token: localStorage.getItem("token")})
            };
            fetch("http://localhost:3000/api/user/delete/"+localStorage.getItem('userId'), parameters)
            .then(function(res){
                if(res.ok){
                    console.log("Votre compte à bien été supprimé!");
                    router.push("/login");
                }
            })
            .catch(function(){
                console.log("Une erreur est survenue! Merci de réessayer plus tard.");
            });
        },
        returnToHome: function() { //redirection vers la page d'acceuil
            router.push("home");
        }
    }
})
</script>

<style lang="scss">

h4{
    color: #060c52;
}
#user-btn-container{
    display: flex;
    justify-content: space-around;
}
#user-profile-info{
    display: flex;
    flex-direction: column;
}
#user-profile {
    margin-top: 5%;
}
#user-return-btn {
    background-color: #060c52;
    color: white;
}
#user-delete-btn {
    background-color: #060c52;
    color: white;
}
</style>