const app = Vue.createApp({
    data() {
        return {
            cars: [],
            page: 1,
            perPage: 10,
            loading: true,          // ⭐ 新增：控制 skeleton UI
            fallbackImage: "https://via.placeholder.com/300x160?text=No+Image"
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.cars.length / this.perPage);
        },

        paginatedCars() {
            const start = (this.page - 1) * this.perPage;
            return this.cars.slice(start, start + this.perPage);
        }
    },

    methods: {
        async fetchCars() {
            this.loading = true;   // 顯示 skeleton

            try {
                const res = await fetch("http://localhost:8080/api/car");
                if (!res.ok) throw new Error("API 回傳錯誤");

                const data = await res.json();

                // ⭐ 對應前面結構：加上合法圖片欄位 fallback
                this.cars = (data || []).map(c => ({
                    ...c,
                    validImage: c.image_path || this.fallbackImage
                }));

            } catch (err) {
                console.error("取得車輛資料失敗:", err);
                this.cars = [];
            } finally {
                this.loading = false;  // 隱藏 skeleton
            }
        },

        onImgError(event) {
            event.target.src = this.fallbackImage;
        },

        gotoDetail(car) {
            alert(`前往車輛詳細頁面（ID=${car.id}）\n（尚未實作頁面）`);
        },

        gotoBuy(car) {
            alert(`前往購買頁面（ID=${car.id}）\n（尚未實作頁面）`);
        }
    },

    mounted() {
        this.fetchCars();
    }
});

app.mount("#app");
