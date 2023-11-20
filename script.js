// DOM elements
const movieSearchInput = document.getElementById('movie-search')

// Variables
let page = 1

// Event listeners
let timeout
movieSearchInput.addEventListener('input', () => {
	clearTimeout(timeout)

	timeout = setTimeout(() => {
		fetchMovies()
	}, 1000)
})

// Functions
const fetchMovies = async (page) => {
	try {
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieSearchInput.value}&type=movie&page=${page}`
		)

		const data = await response.json()
		renderMovies(data)
	} catch (error) {
		console.log(error)
	}
}
