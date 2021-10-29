<template>
     <div id="header-container">
        <nav>
            <div id="navbar-logo">
                <img src="../assets/icon-left-font-monochrome-white.svg" alt="groupomania logo" id="navbar-logo-image"/>
            </div>
            <div id="navbar-link-container">
                <div class=navbar-link-div>
                    <router-link class="navbar-link" to="/home">Groupomania</router-link>
                </div>
                 <div class=navbar-link-div>
                    <router-link class="navbar-link" to="/construction">Actualité</router-link>
                </div>
                <div class=navbar-link-div>
                    <router-link class="navbar-link" to="/user">Mon profil</router-link>
                </div>
                <div class=navbar-link-div>
                    <router-link class="navbar-link" @click="cleanLocalStorage" to="/">Déconnexion</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'headerComponent',
    methods: {
        cleanLocalStorage: function() {
            localStorage.clear();
        }
    }
}
</script>

<style lang="scss">
#navbar-logo-image{
    max-width: 60%;
}
#header-container {
    height: 30%;
    width: 100%;
    background-color: #060c52;
}
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    background-color: #060c52;
}
#navbar-logo {
    margin-right: 0%
}
#navbar-link-container {
    display: flex;
    width: 40%;
    justify-content: space-between;
    margin-right: 3%;
}
.navbar-link-div {
    width: 30%;
}
.navbar-link {
    text-decoration: none;
    color: white;
}
.navbar-link:hover {
    color: #FFD7D7;
    border-bottom: 3px solid #FFD7D7;
    padding-bottom: 3%;
}
@media only screen and (max-width: 600px) {
    #header-container{
        display: flex;
    }
    #navbar-logo{
        width: 50%;
    }
    #navbar-link-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .navbar-link-div{
        width: auto;
    }
}
</style>