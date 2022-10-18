const API_KEY = "ceefb449558d7d7e9a21199aaf646b1f";

const requests = {
    fetchPopular : `/movie/popular?api_key=${API_KEY}&language=ko&page=1`,
    fetchTrending : `/trending/all/day?api_key=${API_KEY}`,
    fetchUpcoming:`/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`,
    fetchTopRated : `/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`
}

export default requests;