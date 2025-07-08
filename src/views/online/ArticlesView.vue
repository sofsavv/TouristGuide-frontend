<template>
    <div class="articles-view">
        <h1>{{ pageTitle }}</h1>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Text</th>
                <th>Destination</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="article in articles" :key="article.articleId">
                <td>{{ article.title }}</td>
                <td>{{ article.text }}</td>
                <td>{{ article.destination }}</td>
                <td>{{ article.dateTime }}</td>
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
</template>

<script>
export default {
    name: "ArticlesView",
    props: {
        type: {
            type: String,
            required: true
        },
        destinationId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            articles: [],
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            totalArticles: 0,
        };
    },
    computed: {
        pageTitle() {
            switch (this.type) {
                case 'latest':
                    return 'Latest Articles';
                case 'most-read':
                    return 'Most Read Articles';
                case 'find':
                    return 'Articles about Destination';
                default:
                    return 'Articles';
            }
        }
    },
    methods: {
        loadArticles(page = 1) {
            this.currentPage = page;
            if(this.type === 'latest'){
                this.$axios.get('/api/articles',{
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                })
                    .then(response => {
                        this.articles = response.data;
                        this.totalArticles = response.data.total;
                    })
                    .catch(error => {
                        console.error("Error fetching articles:", error);
                    });
            }else if(this.type === 'most-read'){
                this.$axios.get('/api/articles/most-read',{
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                })
                    .then(response => {
                        this.articles = response.data;
                        this.totalArticles = response.data.total;
                    })
                    .catch(error => {
                        console.error("Error fetching articles:", error);
                    });
            }else if(this.type === 'find'){
                this.$axios.get(`/api/articles/filter?destination=${this.destinationId}`)
                    .then(response => {
                        this.articles = response.data;
                    })
                    .catch(error => {
                        console.error("Error fetching articles by destination:", error);
                    });
            }
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.loadArticles();
        },
    },
    created() {
        this.loadArticles();
    }
}
</script>

<style scoped>

</style>