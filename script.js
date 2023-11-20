// DOM elements
const movieSearchInput = document.getElementById('movie-search')
const movieListSection = document.getElementById('movie-list')

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

const renderMovies = (data, page = 1) => {
	movieListSection.style.opacity = 0
	const fragment = document.createDocumentFragment()

	data.Search.forEach((movie) => {
		const movieContainerDiv = document.createElement('div')
		movieContainerDiv.classList.add('movie-container')

		const imageContainerDiv = document.createElement('div')
		imageContainerDiv.classList.add('image-container')

		if (movie.Poster === 'N/A') {
			imageContainerDiv.innerHTML = `<img
                class="poster"
                src="https://via.placeholder.com/300x450"
                alt="${movie.Title}"
            />`
		} else {
			imageContainerDiv.innerHTML = `<img
                class="poster"
                src="${movie.Poster}"
                alt="${movie.Title}"
            />`
		}

		const subtitleDiv = document.createElement('div')
		subtitleDiv.classList.add('text-center')
		subtitleDiv.innerHTML = `<h3 class="movie-heading">${movie.Title}</h3>
                                    <p class="text-sm">
                                    Released <span class="font-semibold text-accent">${movie.Year}</span>
                                    </p>`

		movieContainerDiv.appendChild(imageContainerDiv)
		movieContainerDiv.appendChild(subtitleDiv)

		fragment.appendChild(movieContainerDiv)
	})

	movieListSection.innerHTML = ''
	movieListSection.appendChild(fragment)
	movieListSection.style.opacity = 1
}