// LocalStorage'dan izleme listesi verisini al veya boş bir dizi kullan
document.addEventListener("DOMContentLoaded", () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const watchlistUl = document.getElementById("watchlist");
  const addMovieForm = document.getElementById("addMovieForm");
  const newMovieInput = document.getElementById("newMovie");
  const clearWatchedMoviesButton = document.getElementById("clearWatchedMovies");

  // Sayfaya kayıtlı filmleri yükle
  function renderWatchlist() {
    watchlistUl.innerHTML = "";  // Sayfadaki tüm listeyi temizle
    watchlist.forEach((movie, index) => {
      const li = document.createElement("li");

      // Film için checkbox oluştur
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `movie-${index}`;
      checkbox.checked = movie.watched; // Film için checkbox oluştur
      checkbox.addEventListener("change", () => {
        watchlist[index].watched = checkbox.checked; // İzlenen durumu güncelle
        localStorage.setItem("watchlist", JSON.stringify(watchlist)); // LocalStorage'a kaydet
      });

      // Film başlığı için label oluştur
      const label = document.createElement("label");
      label.htmlFor = `movie-${index}`;
      label.textContent = movie.title;

      // Li elemanına checkbox ve label'ı ekle
      li.appendChild(checkbox);
      li.appendChild(label);
      watchlistUl.appendChild(li); // Sayfada görüntüle
    });
  }

  // Yeni film ekle
  if (addMovieForm) {
    addMovieForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Formun default davranışını engelle
      const newMovieTitle = newMovieInput.value.trim(); // Girilen film adını al
      if (newMovieTitle) {
        watchlist.push({ title: newMovieTitle, watched: false }); // Yeni film ekle
        localStorage.setItem("watchlist", JSON.stringify(watchlist)); // LocalStorage'a kaydet
        newMovieInput.value = ""; // Input alanını temizle
        renderWatchlist(); // Listeyi yeniden render et
      }
    });
  }

  // İzlenen filmleri sil
  if (clearWatchedMoviesButton) {
    clearWatchedMoviesButton.addEventListener("click", () => {
      // İzlenen filmleri filtrele ve sadece izlenmeyenleri tut
      const unwatchedMovies = watchlist.filter(movie => !movie.watched);
      
      // LocalStorage'da güncelle
      localStorage.setItem("watchlist", JSON.stringify(unwatchedMovies));
      
      // Sayfadaki listeyi anında güncelle
      watchlist.length = 0; // Mevcut watchlist'i temizle
      watchlist.push(...unwatchedMovies); // Sadece izlenmeyenleri ekle
      renderWatchlist(); // Listeyi hemen yeniden render et
    });
  }

  renderWatchlist(); // Sayfa yüklendiğinde listeyi göster
});
