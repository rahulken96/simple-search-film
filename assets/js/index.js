//Tombol Cari Film
const tombolCari = document.querySelector('#tombolCari');
tombolCari.addEventListener('click', function() {
  const namaFilm = document.querySelector('#cariFilm').value;
  fetch(`http://www.omdbapi.com/?apikey=dca61bcc&s='${namaFilm}'`)
    .then(response => response.json())
    .then(dataFilm => {
      const film = dataFilm.Search;
      const statusFilm = dataFilm.Response;
      const cardsFilm = document.querySelector('.container-film');
      let cards = '';

      if (statusFilm === 'True') {
        film.forEach(item => cards += rowCards(item));
        cardsFilm.innerHTML = cards;

        /* Tombol Detail Film */
        const tombolDetail = document.querySelectorAll('.modal-detail-button');
        tombolDetail.forEach(btn => {
          btn.addEventListener('click', function() {
            const imdbID = this.dataset.imdbid;

            fetch(`http://www.omdbapi.com/?apikey=dca61bcc&i=${imdbID}`)
              .then(response => response.json())
              .then(film => {
                const modalFilm = detailModalFilm(film);
  
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = modalFilm;
              });
          });
        });
        /* Akhir Tombol Detail Film */
      }else{
        cardsFilm.innerHTML = "Maaf yaa.. Film tidak ditemukan :(";
      }
    })
    .catch(err => console.info(err))
});

//Tombol Tutup
const tombolTutup = document.querySelector('#closeButton');
tombolTutup.addEventListener('click', function() {
  const isiAwal = `<div class="container-fluid">
                    <div class="row">
                      <div class="col-md-3">
                        <img src="" alt="" class="img-fluid">
                      </div>
                      <div class="col-md">
                        <ul class="list-group">
                          <li class="list-group-item"><h4></h4></li>
                          <li class="list-group-item"><strong></strong></li>
                          <li class="list-group-item"><strong></strong></li>
                          <li class="list-group-item"><strong></strong></li>
                          <li class="list-group-item"><strong></strong></li>
                          <li class="list-group-item"><strong></strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>`;
  
  const modalDetail = document.querySelector('.modal-body');
  modalDetail.innerHTML = isiAwal;
});

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