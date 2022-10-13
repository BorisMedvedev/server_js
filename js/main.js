function httpGetNews(page) {
	return fetch(`https://gorest.co.in/public-api/posts?page=${page}`)
		.then((res) => res.json())
		.catch((err) => console.error(err));
}

function createCardNews({ id, title, user_id, body }) {
	const cardNewsNode = document.createElement("a");

	cardNewsNode.classList.add("card-news");
	cardNewsNode.setAttribute("data-id", id);
	cardNewsNode.setAttribute("data-user-id", user_id);
	cardNewsNode.href = id;
	cardNewsNode.innerHTML = `
		<h1 class="card-news__title">${title}</h1>
		<p class="card-news__description">${body}</p>
	`;

	return cardNewsNode;
}

function printNews(news, newsWrapperNode) {
	newsWrapperNode.innerText = "";

	for (const newsItem of news) {
		const cardNewsNode = createCardNews(newsItem);

		newsWrapperNode.append(cardNewsNode);
	}
}

function printNewsPaginator(pagination, newsPaginatorNode) {
	console.log(pagination);

	newsPaginatorNode.innerText = "";
	const newsPaginatorFirst = document.createElement("a");
	const newsPaginatorPrev = document.createElement("a");

	const newsPaginatorCurrent = document.createElement("a");

	const newsPaginatorLast = document.createElement("a");
	const newsPaginatorNext = document.createElement("a");
	newsPaginatorFirst.classList.add("news-paginator__first", "btn");
	newsPaginatorFirst.innerText = "первая";
	newsPaginatorNext.classList.add("news-paginator__first", "btn");
	newsPaginatorNext.innerText = ">>";
	newsPaginatorPrev.classList.add("news-paginator__first", "btn");
	newsPaginatorPrev.innerText = "<<";
	newsPaginatorCurrent.classList.add(
		"news-paginator__first",
		"btn",
		"btn_hidden"
	);
	newsPaginatorCurrent.innerText =
		"Текущая страница № " + pagination.page + " из " + pagination.pages;
	newsPaginatorLast.classList.add("news-paginator__first", "btn");
	newsPaginatorLast.innerText = "Последняя " + pagination.pages;

	newsPaginatorNode.append(newsPaginatorPrev);
	newsPaginatorNode.append(newsPaginatorFirst);
	newsPaginatorNode.append(newsPaginatorCurrent);
	newsPaginatorNode.append(newsPaginatorLast);
	newsPaginatorNode.append(newsPaginatorNext);
	if (pagination.page == 1) {
		newsPaginatorFirst.classList.add("btn_hidden");
		newsPaginatorPrev.classList.add("btn_hidden");
	} else {
		newsPaginatorFirst.classList.remove("btn_hidden");
		newsPaginatorPrev.classList.remove("btn_hidden");
	}

	if (pagination.page == pagination.pages) {
		newsPaginatorLast.classList.add("btn_hidden");
		newsPaginatorNext.classList.add("btn_hidden");
	} else {
		newsPaginatorLast.classList.remove("btn_hidden");
		newsPaginatorNext.classList.remove("btn_hidden");
	}

	// const newsPaginatorHref = document.querySelectorAll(".btn");
	// newsPaginatorHref.forEach((el) => {
	// 	el.href = pagination.page;
	// });
}

const newsWrapperNode = document.querySelector(".news-wrapper");
const newsPaginatorNode = document.querySelector(".news-paginator");

function printNewsByPage(page) {
	httpGetNews(page).then((res) => {
		const data = res.data;
		const pagination = res.meta.pagination;

		printNewsPaginator(pagination, newsPaginatorNode);
		printNews(data, newsWrapperNode);
	});
}

printNewsByPage(1);

// const cardNews = createCardNews({
//     id: 1,
//     title: "title",
//     user_id: 23,
//     body: "asdsadadq asd qw dq wq qd qwqwd qwd",
// });

// console.log(cardNews);
