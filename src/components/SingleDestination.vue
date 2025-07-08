<template>
    <div class="single-destination">

        <h2>Articles for {{ destination.destination }}</h2>
        <AllArticles :destinationId="destination.destinationId"></AllArticles>

    </div>
</template>

<script>
import AllArticles from "@/views/article/AllArticles.vue";

export default {
    name: "SingleDestination",
    components: {AllArticles},
    props: {
        destination: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>

</style>