<template>
    <div class="new-destination">
        <h2>Add New Destination</h2>
        <form @submit.prevent="addDestination">
            <div class="form-group">
                <label for="destinationName">Destination Name</label>
                <input type="text" id="destinationName" v-model="destination.destination" required />
            </div>
            <div class="form-group">
                <label for="destinationDescription">About</label>
                <textarea id="destinationDescription" v-model="destination.about" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Destination</button>
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: "NewDestination",
    data() {
        return {
            destination: {
                destination: '',
                about: ''
            },
            errorMessage: ''
        };
    },
    methods: {
        addDestination() {
            this.$axios.get('/api/destinations').then(response => {
                const existingDestinations = response.data;
                const isDuplicate = existingDestinations.some(d => d.destination === this.destination.destination);
                if (isDuplicate) {
                    this.errorMessage = 'Destination with this name already exists.';
                    return;
                }

                this.$axios.post('/api/destinations', this.destination).then(() => {
                    this.$router.push({name: 'destinations'});
                });
            });
        }
    }
}
</script>

<style scoped>

</style>