// получаешь айди поста
// если айди есть то  надо загрузить этот пост с комментариями
// иначе сделать переадресацию на главную страницу
function httpGetPage(id) {
	return fetch(`https://gorest.co.in/public-api/posts/${id}`)
		.then((res) => res.json())
		.catch((err) => console.error(err));
}

const newsWrapperNode = document.querySelector(".wrapper");
