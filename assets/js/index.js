//Tombol Cari Film
const tombolCari = document.querySelector("#tombolCari");
tombolCari.addEventListener("click", async function () {
  const namaFilm = document.querySelector("#cariFilm");
  const films = await getFilms(namaFilm.value);

  showCards(films);
});

//Event Binding buat tombol detail film
document.addEventListener("click", async function (element) {
  if (element.target.classList.contains("modal-detail-button")) {
    const imdbID = element.target.dataset.imdbid;
    const detailFilm = await getDetailFilm(imdbID);

    showDetail(detailFilm);
  }
});

function getFilms(keyword) {
  return fetch(`http://www.omdbapi.com/?apikey=dca61bcc&s='${keyword}'`)
    .then((response) => response.json())
    .then((dataFilm) => [
      {
        data: dataFilm.Search,
        status: dataFilm.Response,
      },
    ])
    .catch((err) => console.info(err));
}

function showCards(items) {
  const arr = items[0];
  const film = arr.data;
  const statusFilm = arr.status;

  let cardsFilm = document.querySelector(".container-film");
  let cards = "";

  if (statusFilm === "True") {
    film.forEach((i) => (cards += rowCards(i)));
    cardsFilm.innerHTML = cards;
  } else {
    cardsFilm.innerHTML = "Maaf yaa.. Film tidak ditemukan :(";
  }
}

function getDetailFilm(imdbID) {
  return fetch(`http://www.omdbapi.com/?apikey=dca61bcc&i=${imdbID}`)
    .then((response) => response.json())
    .then((film) => film)
    .catch((err) => console.info(err));
}

function showDetail(detailItem) {
  const modalFilm = detailModalFilm(detailItem);

  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = modalFilm;
}

function rowCards(films) {
  return `<div class="col-lg-3 col-md-4 my-3">
            <div class="card">
              <img src="${films.Poster}" class="img-thumbnail rounded" />
              <div class="card-body">
                <h5 class="card-title">${films.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${films.Type} - ${films.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#detailFilm" data-imdbid="${films.imdbID}">Detail Film</a>
              </div>
            </div>
          </div>`;
}

function detailModalFilm(film) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${film.Poster}" alt="Poster ${film.Title}" class="img-fluid">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${film.Title} (${film.Year})</h4></li>
                  <li class="list-group-item"><strong>Direktur :</strong> ${film.Director}</li>
                  <li class="list-group-item"><strong>Aktor :</strong> ${film.Actors}</li>
                  <li class="list-group-item"><strong>Penulis :</strong> ${film.Writer}</li>
                  <li class="list-group-item"><strong>Plot :</strong> ${film.Plot}</li>
                  <li class="list-group-item"><strong>Rating :</strong> ${film.Rated}</li>
                </ul>
              </div>
            </div>
          </div>`;
}
