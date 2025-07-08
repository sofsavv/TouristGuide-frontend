<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">RAF turisticki vodic</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul v-if="user && !isArticleRoute" class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{name: 'destinations'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'destinations'}">Destinations</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'articles'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'articles'}">Articles</router-link>
                    </li>
                    <li v-if="isAdmin" class="nav-item">
                        <router-link :to="{name: 'users'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'users'}">Users</router-link>
                    </li>
                </ul>

                <ul v-else class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{name: 'home'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'home'}">CMS</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'main'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'main'}">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'find'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'find'}">Articles By Destination</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'most-read'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'most-read'}">Most Read</router-link>
                    </li>
                </ul>

                <div v-if="user && !isArticleRoute" class="ml-auto d-flex align-items-center">
                    <span class="mr-3">{{ user.email }}</span>
                    <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
                        <button class="btn btn-outline-secondary" type="submit">Logout</button>
                    </form>
                </div>

            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            user: null,
        };
    },
    computed: {
        canLogout() {
            return this.$route.name !== 'login';
        },
        isAdmin() {
            return this.user && this.user.role === 'admin';
        },
        isArticleRoute() {
            return this.$route.name === 'single-article' || this.$route.name === 'most-read'
                                || this.$route.name === 'main' || this.$route.name === 'find';
        },
    },
    methods: {
        logout() {
            localStorage.removeItem('jwt');
            this.user = null;
            this.$router.push({name: 'home'});
        },
        loadUser() {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                const payload = JSON.parse(atob(jwt.split('.')[1]));
                this.user = {
                    role: payload.role,
                    email: payload.sub
                };
            }
        },
    },
    mounted() {
        this.loadUser();
        this.$root.$on('user-logged-in', this.loadUser);
    },
    beforeDestroy() {
        this.$root.$off('user-logged-in', this.loadUser);
    }
}
</script>

<style scoped>
</style>