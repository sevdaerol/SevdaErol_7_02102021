<template>
    <div id="footer_container">
        <footer>
            <nav>
            <router-link to="">Mentions légales & Conditions Générale</router-link>
            <router-link to="">À propos</router-link>
            <router-link to="">Contacter-nous</router-link>
            <router-link to="">Groupomania - Site officiel</router-link>
            </nav>
        </footer>
    </div>
</template>

<script>
export default ({
    name:'footerComponent',
})
</script>

<style lang="scss">
#footer_container{
    margin-top: 3%;
}
a{
    color: white;
    margin-right: 3%;
    margin-left: 3%;
    text-decoration: none;
}
@media only screen and (max-width: 530px) {
    body{
        margin: 0%;
    }
    #footer_container{
        display: flex;
    }
    footer{
        width: auto;
    }
    a{
        font-size: small;
    }
}
</style>