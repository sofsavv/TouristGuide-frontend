<template>
    <div>
        <button class="btn btn-primary mb-3" @click="addArticle">
            New Article
        </button>
        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Text</th>
                        <th scope="col">Time</th>
                        <th scope="col">Author</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="article in articles" :key="article.articleId" @click="readArticle(article)">
                        <th scope="row">{{ article.articleId }}</th>
                        <td>{{ article.title}}</td>
                        <td>{{ article.text | shortText}}</td>
                        <td>{{ article.dateTime}}</td>
                        <td>{{ article.author}}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="editArticle(article)">Edit</button>
                            <button class="btn btn-danger btn-sm" @click="deleteArticle(article)">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="changePage(currentPage - 1)">
                                Previous
                            </button>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page">
                            <button
                                class="page-link"
                                :class="{ active: currentPage === page }"
                                @click="changePage(page)"
                            >
                                {{ page }}
                            </button>
                        </li>
                        <li
                            class="page-item"
                            :class="{ disabled: currentPage === totalPages }"
                        >
                            <button class="page-link" @click="changePage(currentPage + 1)">
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>

// import SingleArticle from "@/components/SingleArticle.vue";

export default {
    name: "AllArticles",
    // components: {SingleArticle},
    filters: {
        shortText(value) {
            if (value.length < 30) {
                return value;
            }
            return value.slice(0, 30) + '...'
        }
    },
    props: {
        destinationId: {
            type: Number,
            required: false,
        },
    },
    data() {
        return {
            selectedArticle: null,
            articles: [],
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
        };
    },
    watch: {
        destinationId: 'loadArticles',
    },
    created() {
        this.loadArticles();
    },
    methods: {
        loadArticles() {
            let apiUrl = '/api/articles';
            if (this.destinationId) {
                apiUrl += `/filter?destination=${this.destinationId}`;
            }
            this.$axios.get(apiUrl,{
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                }
            }).then((response) => {
                this.articles = response.data;
            }).catch(error => {
                console.error("Error loading articles:", error);
            });
        },
        readArticle(article){
            this.selectedArticle = article;
            const articleUrl = this.$router.resolve({ name: 'single-article', params: { id: article.articleId } }).href;
            window.open(articleUrl, '_blank');
        },
        addArticle() {
            this.$router.push({ name: 'new-article' });
        },
        editArticle(article) {
            console.log(article);
            this.$router.push({ name: 'edit-article', params: { id: article.articleId } });
        },
        deleteArticle(article) {
            this.$axios.delete(`/api/articles/${article.articleId}`).then(() => {
                this.loadArticles();
            });
        },
    },
}
</script>

<style scoped>

</style>