<template>
   <div id="construction-page">
        <headerComponent/>
        <h2 class="h2_title">Bientôt vous pourrez partager des contenues multimédia!</h2>
        <div id="construction-alert">
            <h3 id="construction-title">Page en construction!</h3>
            <p id="construction-text">Cette page est en cours de construction pour des nouvelles fonctionnalités<br/>Merci de bien vouloir nous excuser pour le désagrèment.</p>
            <button class="btn" id="return-button">Retour à l'acceuil</button>
        </div>
        <footerComponent/>
    </div>
</template>

<script>
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'
export default ({
    name:"construction",
    components: {
        headerComponent,
        footerComponent
    }
})
</script>

<style lang="scss">
.h2_title{
    color: #060c52;
}
#construction-title {
    width: 50%;
    margin-left: 25%;
    color: #060c52;
}
#construction-text{
    color: #060c52;
}
#construction-alert {
    margin-top: 5%;
    border: 2px solid #060c52;
}
#return-button {
    width: 80%!important;
    margin-bottom: 5%;
}
</style>