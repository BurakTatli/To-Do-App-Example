let ul = document.querySelector(".list-group");
const taskName = document.querySelector("#taskName");

let gorevListesi = [
//   { id: 1, gorevAdi: "1. Görev","durum":"tamamlanmis" },
//   { id: 2, gorevAdi: "2. Görev","durum":"bekliyor" },
];

if (localStorage.getItem("gorevListesi") !== null) {
    gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"))
}

let editId;
let isEditTask = false;

gorevPenceresi();
gorevEkle();
hepsiniSil();

function gorevPenceresi() {
  ul.innerHTML = "";

  if (gorevListesi.length == 0) {
    ul.innerHTML = "<p class='m-0 p-2' > Tanımlanmış Bir Görev Yok </p>"
  } else {
    for (let gorev of gorevListesi) {

            let completed = gorev.durum == "tamamlanmis" ? "checked":""
          
      let li = ` 
    <li class="item list-group-item">
        <div class ="left-side">
        <input class="form-check-input me-2" onclick="updateStatus(this)" type="checkbox" ${completed} value="" id="${gorev.id}">
        <label class="form-check-label" for="${gorev.id} ${completed} ">${gorev.gorevAdi} </label>
        </div>
            <div class="right-side">
                    <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    </button>
                    <ul class="dropdown-menu">
                    <li><a onclick="gorevSil(${gorev.id})" class="dropdown-item" href="#"><i class="fa-regular fa-trash-can"></i>  Sil</a></li>
                    <li><a onclick='edit(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pencil"></i>  Edit</a></li>
                    </ul>
            </div>          
    </li>
        `;
      ul.insertAdjacentHTML("beforeend", li);
    }
  }
}

function gorevEkle() {
  document
    .querySelector("#yeniGorevEkle")
    .addEventListener("click", function (e) {
      if (taskName.value == "") {
        alert("Herhangi Bir Görev Girmediniz !");
      } else {
        if (!isEditTask) {
          gorevListesi.push({
            id: gorevListesi.length + 1,
            "gorevAdi": taskName.value,"durum":"bekliyor",
          });
        } else {
          for (let gorev of gorevListesi) {
            if (gorev.id == editId) gorev.gorevAdi = taskName.value;
          }
          isEditTask = false;
        }

        taskName.value = "";
        gorevPenceresi();
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
        // sessionStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
      }
    });
}

function gorevSil(id) {
  let silinecekId;

  for (let index in gorevListesi) {
    if (gorevListesi[index].id == id) {
      silinecekId = index;
    }
  }
  gorevListesi.splice(silinecekId, 1);
  gorevPenceresi();
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}

function hepsiniSil(id) {
  document.querySelector("#hepsiniSil").addEventListener("click", function (e) {
    let silinecekler;

    for (let index in gorevListesi) {
      if (gorevListesi[index].id == id) {
        silinecekler = index;
      }
    }
    gorevListesi.splice(silinecekler);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    gorevPenceresi();
  });
}

function edit(gorevId, gorevIsmi) {
  editId = gorevId;
  isEditTask = true;
  taskName.value = gorevIsmi;
  taskName.focus();
  taskName.classList.add("active");
  localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
  gorevPenceresi();
}

function updateStatus(secilmisGorev) {
    let label = secilmisGorev.nextElementSibling;
    let durum;

    if (secilmisGorev.checked){
        label.classList.add("checked");
        durum = "tamamlanmis"
    }else {
        label.classList.remove ("checked");
        durum = "bekliyor";
    }

    for (let gorev of gorevListesi) {
        if (gorev.id == secilmisGorev.id) {
            gorev.durum = durum;
        }
    }
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
   
}
