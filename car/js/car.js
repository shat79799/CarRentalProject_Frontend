const { createApp } = Vue;

createApp({
  data() {
    return {
      cars: [],            // 原始資料
      filteredCars: [],    // 篩選後資料

      brands: [],          // 下拉選單：品牌
      models: [],          // 下拉選單：車型

      selectedBrand: "",
      selectedModel: "",

      currentPage: 1,
      pageSize: 10,

      defaultImage: "https://via.placeholder.com/400x250?text=No+Image"
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredCars.length / this.pageSize);
    },

    paginatedCars() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredCars.slice(start, start + this.pageSize);
    }
  },

  methods: {
    generateFakeCars() {
      const brands = ["Toyota", "Honda", "Mazda", "Ford", "Nissan"];
      const models = {
        Toyota: ["Altis", "Corolla Cross", "Yaris"],
        Honda: ["Civic", "Fit", "CR-V"],
        Mazda: ["Mazda 3", "CX-5", "CX-30"],
        Ford: ["Focus", "Kuga", "Fiesta"],
        Nissan: ["Sentra", "Tiida", "X-Trail"]
      };

      for (let i = 1; i <= 50; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const model = models[brand][Math.floor(Math.random() * models[brand].length)];

        const fakeImage =
          Math.random() > 0.5
            ? `https://picsum.photos/seed/${i}/400/250`
            : ""; // 一半故意做無效圖片

        this.cars.push({
          id: i,
          brand,
          model,
          seat: 4 + Math.floor(Math.random() * 4),
          year: 2010 + Math.floor(Math.random() * 15),
          cc: 1200 + Math.floor(Math.random() * 1800),
          image: fakeImage,
          validImage: fakeImage || this.defaultImage
        });
      }

      this.filteredCars = [...this.cars];

      this.brands = [...new Set(this.cars.map(c => c.brand))];
      this.models = [...new Set(this.cars.map(c => c.model))];
    },

    applyFilter() {
      this.filteredCars = this.cars.filter(car => {
        const brandMatch =
          !this.selectedBrand || car.brand === this.selectedBrand;

        const modelMatch =
          !this.selectedModel || car.model === this.selectedModel;

        return brandMatch && modelMatch;
      });

      this.currentPage = 1; // 重置分頁
    },

    onImageError(car) {
      car.validImage = this.defaultImage;
    }
  },

  mounted() {
    this.generateFakeCars();
  }
}).mount("#app");
