<template>
    <div class="destinations">
        <h1 class="mt-4">Destinations</h1>

        <button class="btn btn-primary mb-3" @click="addDestination">New Destination</button>

        <div class="row">
            <div class="col-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Destination</th>
                        <th scope="col">About</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="destination in destinations" :key="destination.destinationId" @click="selectedDestination = destination">
                        <th scope="row">{{ destination.destinationId }}</th>
                        <td>
                            <router-link :to="{ name: 'single-destination', params: { destination: destination } }">
                                {{ destination.destination }}
                            </router-link>
                        </td>
                        <td>{{ destination.about | shortText}}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click.stop="editDestination(destination)">Edit</button>
                            <button class="btn btn-danger btn-sm" @click.stop="deleteDestination(destination)">Delete</button>
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
// import SingleDestination from "@/components/SingleDestination.vue";
export default {
    // components: {SingleDestination},
    filters: {
        shortText(value) {
            if (value.length < 30) {
                return value;
            }
            return value.slice(0, 30) + '...'
        }
    },
    data() {
        return {
            selectedDestination: null,
            destinations: [],
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
        }
    },
    created() {
        this.loadDestinations();
    },
    methods: {
        loadDestinations(){
            this.$axios.get('/api/destinations', {
                params: {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                }
            }).then((response) => {
                console.log(response.data);
                this.destinations = response.data;
                this.totalPages = response.data.totalPages;
            });
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.loadDestinations();
        },
        addDestination() {
            this.$router.push({ name: 'new-destination' });
        },
        editDestination(destination) {
            this.$router.push({ name: 'edit-destination', params: { id: destination.destinationId } });
        },
        deleteDestination(destination) {
            this.$axios.get(`/api/articles/filter?destination=${destination.destinationId}`).then(response => {
                if (response.data.length > 0) {
                    alert('Cannot delete this destination because there are articles associated with it.');
                    return;
                }
                this.$axios.delete(`/api/destinations/${destination.destinationId}`).then(() => {
                    this.loadDestinations();
                });
            });
        },
    }
}
</script>

<style scoped>

</style>