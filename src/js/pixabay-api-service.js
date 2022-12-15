import Notiflix from "notiflix";

const KEY = "32005488-91a2c39925c46094d47fb920c"
const PIXABAY_URL = "https://pixabay.com/api/"
export default class PixabayService {
    constructor() {
        this.searchQuery = "";
        this.per_page = 40;
        this.page = 1;
        this.totalPages = 0;
    }

    fetchImages() {
        const url = `${PIXABAY_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=false&per_page=${this.per_page}&page=${this.page}`;

        return fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error();
            })
            .then(data => {
                if (data.hits.length > 0) {
                    const totalHits = data.totalHits;
                    this.totalHits = totalHits;
                    this.incrementPage();
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                    return data.hits;
                } else {
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                    return [];
                }
            });
    }

    incrementPage() {
        this.page += 1;
        this.totalPages = Math.round(this.totalHits / this.per_page + 1);
        if (this.totalPages <= this.page) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        console.log(this.totalPages);
        console.log(this.page);
    }


    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}