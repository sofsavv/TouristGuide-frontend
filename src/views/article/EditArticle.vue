<template>
    <div class="edit-article">
        <h2>Edit Article</h2>
        <form @submit.prevent="updateArticle">
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
    name: "EditArticle",
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            article: {
                title: '',
                destination: '',
                text: '',
            },
            activities: [],
            destinations: [],
        };
    },
    methods: {
        updateArticle() {

            this.$axios.put(`/api/articles/${this.id}`, this.article)
                .then(() => {
                    this.$router.push({ name: 'articles' });
                }).catch(error => {
                    console.error("Failed to update article:", error);
                });
        },
        loadArticle() {
            this.$axios.get(`/api/articles/${this.id}`)
                .then(response => {
                    this.article = response.data;
                })
                .catch(error => {
                    console.error("Error loading article:", error);
                });
        },
        loadActivities() {
            this.$axios.get(`/api/activities/article/${this.id}`).then(response => {
                this.activities = response.data;
            }).catch(error => {
                console.error("Error loading activities:", error);
            });
        },
        loadDestinations(){
            this.$axios.get('/api/destinations').then(response => {
                this.destinations = response.data;
            });
        }
    },
    created() {
        this.loadArticle();
        this.loadDestinations();
        this.loadActivities();
    }
}
</script>

<style scoped>

</style>