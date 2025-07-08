<template>
    <div>
        <div v-if="article" class="article-details">
            <h1>{{ article.title }}</h1>
            <p><strong>Date:</strong> {{ article.dateTime }}</p>
            <p><strong>Author:</strong> {{ article.author }}</p>
            <div class="text-container">
                {{ article.text }}
            </div>

            <div class="activities">
                <p><strong>Tourist Activities:</strong></p>
                <ul>
<!--                    <li v-for="activity in article.activities" :key="activity.id">-->
<!--                        <router-link :to="{ name: 'activity-articles', params: { activityId: activity.id } }">-->
<!--                            {{ activity.name }}-->
<!--                        </router-link>-->
<!--                    </li>-->
                </ul>
            </div>
        </div>

        <!-- Comments Section -->
        <div class="comments-section">
            <h2>Comments</h2>

            <!-- Add Comment Form -->
            <form @submit.prevent="addComment">
                <div class="form-group">
                    <label for="commenterName">Your Name:</label>
                    <input type="text" id="commenterName" v-model="newComment.newAuthor" required />
                </div>
                <div class="form-group">
                    <label for="commentText">Comment:</label>
                    <textarea id="commentText" v-model="newComment.newComment" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit Comment</button>
            </form>

            <!-- List of Comments -->
            <ul class="comments-list">
                <li v-for="comment in comments" :key="comment.commentId">
                    <p><strong>{{ comment.author }}</strong> - {{ comment.dateTime }}</p>
                    <p>{{ comment.comment }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "SingleArticle",
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            article: null,
            comments: [],
            activities:[],
            newComment: {
                newAuthor: '',
                newComment: '',
            }
        };
    },
    created() {
        this.loadArticle();
        this.incrViews();
        this.loadComments();
    },
    methods: {
        incrViews(){
            this.$axios.post(`/api/articles/${this.id}/incr`);
        },
        loadArticle(){
            this.$axios.get(`/api/articles/${this.id}`).then(response => {
                this.article = response.data;
                console.log(this.article);
            }).catch(error => {
                console.error('Error loading article:', error);
            });
        },
        loadComments() {
            this.$axios.get(`/api/articles/${this.id}/comments`).then(response => {
                this.comments = response.data;
                console.log(this.comments);
            }).catch(error => {
                console.error('Error loading comments:', error);
            });

        },
        addComment() {
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            const comment = {
                author: this.newComment.newAuthor,
                comment: this.newComment.newComment,
                dateTime: formattedDate,
                articleId: this.id
            };

            this.$axios.post(`/api/articles/${this.id}/comments`, comment)
                .then(response => {
                    this.comments.push(response.data.comment);
                    this.loadComments();
                    this.newComment.newAuthor = '';
                    this.newComment.newComment = '';
                })
                .catch(error => {
                    console.error('Error adding comment:', error);
                });
        }
    }
}
</script>

<style scoped>
</style>