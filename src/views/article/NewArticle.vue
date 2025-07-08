<template>
    <div class="new-article">
        <h2>Add New Article</h2>
        <form @submit.prevent="addArticle">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="article.title" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="destination">Destination:</label>
                <select id="destination" v-model="article.destination" class="form-control" required>
                    <option v-for="destination in destinations" :key="destination.destinationId" :value="destination.destinationId">
                        {{ destination.destination }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="text">Text:</label>
                <textarea id="text" v-model="article.text" class="form-control" required></textarea>
            </div>
            <div class="form-group">
                <label for="activities">Activities (comma-separated):</label>
                <input type="text" id="activities" v-model="activities" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "NewArticle",
    data() {
        return {
            article: {
                title: '',
                destination: '',
                text: '',
            },
            activities: '',
            destinations: [] // Assume you load this from an API or a store
        };
    },
    methods: {
        addArticle() {
            const activitiesArray = this.activities.split(',').map(activity => activity.trim());
            const newArticle = { ...this.article, activities: activitiesArray };
            this.$axios.post('/api/articles', newArticle)
                .then(() => {
                    this.$router.push({ name: 'articles' });
                })
                .catch(error => {
                    console.error("Error adding article:", error);
                });
        },
    },
    created() {
        this.$axios.get('/api/destinations').then(response => {
            this.destinations = response.data;
        });
    }
}
</script>

<style scoped>

</style>