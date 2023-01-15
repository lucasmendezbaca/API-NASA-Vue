const { createApp } = Vue
const NASA_URL = 'https://api.nasa.gov/planetary/apod?';
const API_KEY = 'api_key=qDNrEUMgNU8CN5gHKk8D7O6zjb20s6kn2DnKvCIU';
const NUMBER_PICTURES = '&count=9'

createApp({
    data() {
    return {
        pictures: undefined,
        pictureDetail: '',
        dayFilter: '',
    }
    },
    methods: {
        cerrarMenu() {
            this.pictureDetail = '';
        },
        getPictures(params) {
            axios.get(NASA_URL + API_KEY + params)
                .then((response) => {
                    if(this.pictures) {
                        this.pictures = this.pictures.concat(response.data);
                    } else {
                        this.pictures = response.data.length ? response.data : [response.data];
                    }
                })
        },
        getNewPictures() {
            this.pictures = undefined;
            this.dayFilter = '';
            this.getPictures(NUMBER_PICTURES);
        },
        getPicture() {
            this.pictures = undefined;
            this.getPictures('&date=' + this.dayFilter);
        },
        getPicturesScroll() {
            if(window.scrollY + window.innerHeight >= document.body.offsetHeight) {
                this.getPictures(NUMBER_PICTURES);
            }
        },
    },
    mounted() {
        this.getPictures('&count=9');
        window.addEventListener('scroll', this.getPicturesScroll);
    }
}).mount('#app')
