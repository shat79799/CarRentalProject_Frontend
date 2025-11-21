const app = Vue.createApp({
    data() {
        return {
            cars: [],
            filteredCars: [],
            page: 1,
            perPage: 10,

            selectedBrand: "",
            selectedModel: "",

            fallbackImage: "https://via.placeholder.com/300x160?text=No+Image",
        };
    },

    computed: {
        uniqueBrands() {
            return [...new Set(this.cars.map(c => c.brand))];
        },

        uniqueModels() {
            return [...new Set(this.cars.map(c => c.model))];
        },

        totalPages() {
            return Math.ceil(this.filteredCars.length / this.perPage);
        },

        paginatedCars() {
            const start = (this.page - 1) * this.perPage;
            return this.filteredCars.slice(start, start + this.perPage);
        }
    },

    methods: {
        generateFakeData() {
            const brands = ["Toyota", "Honda", "Mazda", "Nissan"]; 
            const models = ["Altis", "Civic", "CX-5", "Sentra", "Yaris", "Accord"]; 

            for (let i = 1; i <= 50; i++) {
                const brand = brands[Math.floor(Math.random() * brands.length)];
                const model = models[Math.floor(Math.random() * models.length)];

                this.cars.push({
                    id: i,
                    brand,
                    model,
                    seat: 4 + Math.floor(Math.random() * 3),
                    year: 2015 + Math.floor(Math.random() * 10),
                    cc: 1500 + Math.floor(Math.random() * 2000),
                    image: Math.random() > 0.5
                        ? `https://picsum.photos/seed/car${i}/400/200`
                        : "https://invalid-url-example.com/not_found.jpg",
                    validImage: ""
                });
            }

            this.cars.forEach(c => c.validImage = c.image);
            this.filteredCars = this.cars;
        },

        onImgError(event) {
            event.target.src = this.fallbackImage;
        },

        applyFilter() {
            this.page = 1;
            this.filteredCars = this.cars.filter(c => {
                return (!this.selectedBrand || c.brand === this.selectedBrand) &&
                       (!this.selectedModel || c.model === this.selectedModel);
            });
        },

        clearFilter() {
            this.selectedBrand = "";
            this.selectedModel = "";
            this.filteredCars = this.cars;
            this.page = 1;
        },

        gotoDetail(car) {
            alert(`前往車輛詳細頁面（ID=${car.id}）\n（尚未實作頁面）`);
        },

        gotoBuy(car) {
            alert(`前往購買頁面（ID=${car.id}）\n（尚未實作頁面）`);
        }
    },

    mounted() {
        this.generateFakeData();
    }
});

app.mount("#app");
