$('#tombolCari').on('click', function () {
  const namaFilm = $('#cariFilm').val();
  
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=dca61bcc&s='${namaFilm}'`,
    success: function (res) {
      const statusAPI = res.Response;
  
      if (statusAPI === 'True') {
        const data = res.Search;
        let cards = '';
  
        data.forEach(films => {
          cards += rowCards(films);
        });
  
        $('.container-film').html(cards);
  
        /* Ketika Modal Detail Film Diklik */
        $('.modal-detail-button').on('click', function () {
          const imdbID = $(this).data('imdbid');
  
          $.ajax({
            url: `http://www.omdbapi.com/?apikey=dca61bcc&i=${imdbID}`,
            success: function (film) {
              const detailFilm = dataFilm(film);
  
              $('.modal-body').html(detailFilm);
            },
            error: function (e) {
              console.log(e.responseJSON);
            }
          });
        });
        /* Akhir Ketika Modal Detail Film Diklik */
  
      }else{
        $('.container-film').html("Maaf yaa.. Film tidak ditemukan :(");
      }
    },
    error: function (e){
      console.log(e.responseJSON);
    }
  });
});


$('#closeButton').on('click', function () {
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

  $('.modal-body').html(isiAwal);
});

function rowCards (films) {
  return `<div class="col-lg-3 col-md-4 my-3 mx-auto">
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

function dataFilm (film) {
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