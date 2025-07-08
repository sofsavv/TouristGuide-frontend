<template>
    <div class="edit-destination">
        <h2>Edit Destination</h2>
        <form @submit.prevent="updateDestination">
            <div class="form-group">
                <label for="destinationName">Destination Name</label>
                <input type="text" id="destinationName" v-model="destination.destination" required />
            </div>
            <div class="form-group">
                <label for="destinationDescription">Description</label>
                <textarea id="destinationDescription" v-model="destination.about" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update Destination</button>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditDestination",
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            destination: {
                destination: '',
                about: ''
            },
            errorMessage: ''
        };
    },
    created() {
        this.loadDestination();
    },
    methods: {
        loadDestination() {

            this.$axios.get(`/api/destinations/${this.id}`).then(response => {
                this.destination = response.data;
            });
        },
        updateDestination() {
            this.$axios.put(`/api/destinations/${this.id}`, this.destination).then(() => {
                this.$router.push({ name: 'destinations' });
            }).catch(() => {
                this.errorMessage = 'Failed to update destination.';
            });
        }
    }
}
</script>

<style scoped>

</style>