class News {
	constructor() {
		// this.container = document.getElementById('add-news-btn');
		// this.container.innerText = 'Добавить новость';
		this.formWrapper = document.getElementById('form-wrapper');
		this.mainContainer = document.getElementById('main-container');
		this.newsList = localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : [];
		// this.addNewsBtn = document.getElementById('add-news-btn');
		this.link = document.getElementById('link');
		this.text = document.getElementById('text');
		this.reason = document.getElementById('reason');
		this.counter = 0;
		this.formElement = document.querySelector('form');
		this.tableBody = document.getElementById('table-body');

		this.dataNews = [

			{
				link: "https://www.bhvr.com/dead-by-daylight-partners-with-titan-comics-to-release-first-comic-book/", 
				text: "Спровоцировать интерес сообщества игры",
				reason: "Краткое описание уже знакомого сюжета"
		},
			{
				link: "https://www.cdprojekt.com/en/media/news/the-witcher-3-wild-hunt-arrives-on-next-gen-this-december/", 
				text: "Привлечь новую и удержать нынешнюю аудиторитю",
				reason: "Краткое и понятное описание"
		},
			{
				link: "https://www.bhvr.com/dead-by-daylight-partners-with-titan-comics-to-release-first-comic-book/", 
				text: "Спровоцировать интерес сообщества игры",
				reason: "Краткое описание уже знакомого сюжета"
		},
			{
				link: "https://www.bhvr.com/dead-by-daylight-partners-with-titan-comics-to-release-first-comic-book/", 
				text: "Спровоцировать интерес сообщества игры",
				reason: "Краткое описание уже знакомого сюжета"
		},
			{
				link: "https://www.bhvr.com/dead-by-daylight-partners-with-titan-comics-to-release-first-comic-book/", 
				text: "Спровоцировать интерес сообщества игры",
				reason: "Краткое описание уже знакомого сюжета"
		}
		]


	}

	// Retrikeivng our news list from the localSto

	displayNews() {
		const items = this.dataNews;



		if (this.dataNews.length === 0) {
			this.mainContainer.style.display = 'none';
		} else {
			this.mainContainer.style.display = 'flex';
		}

		let res = items
			.map((item, index) => {
				return `<tr>
			<td> <a href=${item.lin}>${item.link} </a></td>
			<td >${item.text}</td>
			<td >${item.reason}</td>
		</tr>`;
			})
			.join('');

		this.tableBody.innerHTML = res;
	}

	// Opening form and validating input fields, if one of the requirec fields are not filled, no data submission

	handleForm() {
		

		this.addNewsBtn.addEventListener('click', () => {
			if (this.counter % 2 === 0) {
				this.container.innerText = 'Закрыть';

				this.formElement.style.display = 'flex';

				this.formElement.addEventListener('submit', (e) => {
					e.preventDefault();

					let validData = false;

					let linkValue = document.getElementById('link').value;
					let textValue = document.getElementById('text').value;
					let reasonValue = document.getElementById('reason').value;

					let inputs = document.querySelectorAll('form input');

					for (let item of inputs) {
						if (item.value === '') {
							item.setAttribute('input-error', 'true');
						} else {
							item.removeAttribute('input-error');
						}
					}

					if (linkValue !== '' && textValue !== '' && reasonValue !== '') {
						validData = true;
					}

					if (validData) {
						const data = {
							link: linkValue,
							text: textValue,
							reason: reasonValue
						};

						this.newsList = [ ...this.newsList, data ];

						this.displayNews(this.newsList);
						localStorage.setItem('news', JSON.stringify(this.newsList));

						document.getElementById('link').value = '';
						document.getElementById('text').value = '';
						document.getElementById('reason').value = '';
						this.formElement.style.display = 'none';
						this.container.innerText = 'Добавить новость';
						this.counter++;
					}
				});

				this.counter++;
			} else {
				this.container.innerText = 'Добавить новость';
				this.formElement.style.display = 'none';
				this.counter++;
			}
		});
	}

	// Initializing app

	run() {
		// this.handleForm();
		this.displayNews();
	}
}

const news = new News();
news.run();
