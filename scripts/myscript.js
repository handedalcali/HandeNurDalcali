document.addEventListener("DOMContentLoaded", () => {
    // Form gönderimi varsa kaydet
    const form = document.getElementById("suggestionForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const nameInput = document.getElementById("name");
        const typeInput = document.getElementById("type");
        const titleInput = document.getElementById("title");
        const categoryInput = document.getElementById("category"); // Düzelttik
  
        // Tüm alanların dolu olup olmadığını kontrol et
        if (!nameInput?.value.trim() || !typeInput?.value.trim() || !titleInput?.value.trim() || !categoryInput?.value.trim()) {
          alert("Tüm alanlar doğru şekilde doldurulmalıdır.");
          return;
        }
  
        // Alanlardan gelen verileri al
        const name = nameInput.value.trim();
        const type = typeInput.value.trim();
        const title = titleInput.value.trim();
        const category = categoryInput.value.trim();
  
        // LocalStorage'dan öneriler al veya yeni bir dizi oluştur
        const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
        suggestions.push({ name, type, title, category });
  
        // Veriyi LocalStorage'a kaydet
        localStorage.setItem("suggestions", JSON.stringify(suggestions));
  
        alert("Önerin kaydedildi!");
        window.location.href = "suggestions.html";  // Yönlendirme yap
      });
    }
  
    // Öneri tablosunu doldur
    const suggestionTable = document.getElementById("suggestionTable");
    if (suggestionTable) {
      const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
      const tbody = document.querySelector("#suggestionTable tbody");
  
      suggestions.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>${item.title}</td>
          <td>${item.category}</td>
          <td class="action-buttons">
            <button class="edit-btn" onclick="editSuggestion(${index})">Düzenle</button>
            <button class="delete-btn" onclick="deleteSuggestion(${index})">Sil</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  });
  
  // Öneriyi sil
  function deleteSuggestion(index) {
    const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    suggestions.splice(index, 1);
    localStorage.setItem("suggestions", JSON.stringify(suggestions));
    window.location.reload();  // Sayfayı yenile
  }
  
  // Öneriyi düzenle
  function editSuggestion(index) {
    const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    const suggestion = suggestions[index];
  
    // Yeni bilgileri almak için prompt
    const newName = prompt("Yeni isim", suggestion.name);
    const newType = prompt("Yeni başlık", suggestion.type);
    const newTitle = prompt("Yeni tür", suggestion.title);
    const newCategory = prompt("Yeni kategori", suggestion.category);
  
    // Düzenleme yapıldığında güncelle
    if (newName && newType && newTitle && newCategory) {
      suggestions[index] = { name: newName, type: newType, title: newTitle, category: newCategory };
      localStorage.setItem("suggestions", JSON.stringify(suggestions));
      window.location.reload();  // Sayfayı yenile
    }
  }
  