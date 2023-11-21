// DOM elements
const movieSearchInput = document.getElementById('movie-search')
const movieListSection = document.getElementById('movie-list')

const errorElement = document.getElementById('error')
const loadingElement = document.getElementsByClassName('loading')

const paginationDiv = document.getElementById('pagination')
const prevButton = document.getElementById('prev-page')
const nextButton = document.getElementById('next-page')
const currentPage = document.getElementById('current-page')

// Variables
let page = 1

// Event listeners
let timeout
movieSearchInput.addEventListener('input', () => {
	toggleLoading.addLoading()
	clearTimeout(timeout)

	timeout = setTimeout(() => {
		page = 1
		fetchMovies()

		console.log('added')
	}, 1000)
})

prevButton.addEventListener('click', () => {
	if (page > 1) {
		page--
		fetchMovies()
	}
})

nextButton.addEventListener('click', () => {
	if (page < 100) {
		page++
		console.log(page)
		fetchMovies()
	}
})

// Functions

const fetchMovies = async () => {
	toggleLoading.addLoading()

	const response = await fetch(
		`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieSearchInput.value}&type=movie&page=${page}`
	)
	const data = await response.json()

	if (data.Response === 'False') {
		errorElement.classList.remove('hidden')
		errorElement.innerText = data.Error
	} else {
		errorElement.classList.add('hidden')
		renderMovies(data)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	toggleLoading.removeLoading()
}

const renderMovies = (data) => {
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

	if (data.totalResults > 1) {
		paginationDiv.classList.remove('hidden')
	} else {
		paginationDiv.classList.add('hidden')
	}

	if (page === 1) {
		prevButton.disabled = true
	} else {
		prevButton.disabled = false
	}

	if (page === Math.ceil(data.totalResults / 10)) {
		nextButton.disabled = true
	} else {
		nextButton.disabled = false
	}

	currentPage.textContent = page
}

const toggleLoading = {
	addLoading: () => {
		Array.from(loadingElement).forEach((item) => {
			item.classList.remove('hidden')
		})
	},
	removeLoading: () => {
		Array.from(loadingElement).forEach((item) => {
			item.classList.add('hidden')
		})
	},
}
