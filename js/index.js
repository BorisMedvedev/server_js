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
	cardNewsNode.href = `/post.html?id=${id}`;
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
	const newsPaginatorFirst = document.createElement("a");
	const newsPaginatorPrev = document.createElement("a");
	const newsPaginatorCurrent = document.createElement("a");
	const newsPaginatorLast = document.createElement("a");
	const newsPaginatorNext = document.createElement("a");

	const logicCreateBtns = () => {
		newsPaginatorNode.innerText = "";
		newsPaginatorFirst.classList.add("news-paginator__first", "btn");
		newsPaginatorFirst.innerText = "первая";
		newsPaginatorNext.classList.add("news-paginator__next", "btn");
		newsPaginatorNext.innerText = pagination.page + 1 + " " + "  >>";
		newsPaginatorPrev.classList.add("news-paginator__prev", "btn");
		newsPaginatorPrev.innerText = "<<  " + " " + (pagination.page - 1);
		newsPaginatorCurrent.classList.add(
			"news-paginator__current",
			"btn",
			"btn_hidden"
		);
		newsPaginatorCurrent.innerText =
			"Текущая страница № " + pagination.page + " из " + pagination.pages;
		newsPaginatorLast.classList.add("news-paginator__last", "btn");
		newsPaginatorLast.innerText = "Последняя " + pagination.pages;
		newsPaginatorNode.append(newsPaginatorFirst);
		newsPaginatorNode.append(newsPaginatorPrev);
		newsPaginatorNode.append(newsPaginatorCurrent);
		newsPaginatorNode.append(newsPaginatorNext);
		newsPaginatorNode.append(newsPaginatorLast);

		if (pagination.page === 1) {
			newsPaginatorFirst.classList.add("btn_hidden");
			newsPaginatorPrev.classList.add("btn_hidden");
			newsPaginatorPrev.innerText = pagination.page;
			newsPaginatorLast.href = `/index.html?page=${pagination.pages}`;
			newsPaginatorNext.href = `/index.html?page=${pagination.page + 1}`;
		} else {
			newsPaginatorFirst.classList.remove("btn_hidden");
			newsPaginatorPrev.classList.remove("btn_hidden");
		}
		if (pagination.page === pagination.pages) {
			newsPaginatorLast.classList.add("btn_hidden");
			newsPaginatorNext.classList.add("btn_hidden");
			newsPaginatorNext.innerText = pagination.page;
			newsPaginatorFirst.href = `/index.html?page=1}`;
			newsPaginatorPrev.href = `/index.html?page=${pagination.page - 1}`;
		} else {
			newsPaginatorLast.classList.remove("btn_hidden");
			newsPaginatorNext.classList.remove("btn_hidden");
		}

		if (pagination.page !== pagination.pages && pagination.page !== 1) {
			// не первая и не последняя страница
			newsPaginatorFirst.href = `/index.html?page=1`;
			newsPaginatorLast.href = `/index.html?page=${pagination.pages}`;
			newsPaginatorNext.href = `/index.html?page=${pagination.page + 1}`;
			newsPaginatorPrev.href = `/index.html?page=${pagination.page - 1}`;
		}
	};

	const addEventListeners = () => {};

	logicCreateBtns();
	addEventListeners();

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

function getUrlParam(param) {
	const pageParams = new URLSearchParams(window.location.search);
	return pageParams.get(param);
}

function initApp() {
	const urlParamPage = getUrlParam("page");

	if (urlParamPage === null) {
		printNewsByPage(1);
	} else {
		printNewsByPage(urlParamPage);
	}
}

initApp();

// console.log(getUrlParam("abc"));

// const cardNews = createCardNews({
// 	id: 1,
// 	title: "title",
// 	user_id: 23,
// 	body: "asdsadadq asd qw dq wq qd qwqwd qwd",
// });

// console.log(cardNews);

// / предположим, что мы открыли страницу .../index.html?x=1&y=xyz // значение window.location.search в таком случае будет "?x=1&y=xyz" const pageParams = new URLSearchParams(window.location.search); pageParams.get('x'); // "1" pageParams.get('y'); // "xyz" pageParams.get('z'); // null, нет такого параметра
