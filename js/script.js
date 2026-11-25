document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  const links = [
    ["Forside", "index.html"],
    ["Om DMJU", "om-dmju.html"],
    ["Aktiviteter", "aktiviteter.html"],
    ["Modeljernbaner", "modeljernbane.html"],
    ["Klubber", "klubber.html"],
    ["Kontakt", "kontakt.html"]
  ];

  const header = document.querySelector("#site-header");

  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <nav class="navbar navbar-expand-lg p-0" aria-label="Primær navigation">
          <div class="container-fluid px-0">
            <a class="navbar-brand brand" href="index.html">
              <img src="images/figma/logo.png" alt="DMJU logo">
              <span>Dansk Model<br>Jernbane Union</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#main-navigation" aria-controls="main-navigation"
              aria-expanded="false" aria-label="Åbn navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main-navigation">
              <ul class="navbar-nav ms-auto align-items-lg-center">
                ${links.map(([label, url]) => `
                  <li class="nav-item">
                    <a class="nav-link ${currentPage === url ? "active" : ""}" href="${url}">
                      ${label}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  const footer = document.querySelector("#site-footer");

  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 footer-column">
              <a href="om-dmju.html">Om DMJU</a>
              <a href="aktiviteter.html">Aktiviteter</a>
              <a href="modeljernbane.html">Modeljernbane</a>
              <a href="klubber.html">Klubber</a>
              <a href="kontakt.html">Kontakt</a>
            </div>
            <div class="col-md-4 footer-column footer-center">
              <a href="index.html">Forside</a>
              <div class="footer-social">
                <a href="#"><img src="images/figma/facebook.svg" alt="Facebook"><span>Facebook</span></a>
                <a href="#"><img src="images/figma/instagram.png" alt="Instagram"><span>Instagram</span></a>
                <a href="#"><img src="images/figma/youtube.svg" alt="Youtube"><span>Youtube</span></a>
              </div>
            </div>
            <div class="col-md-4 footer-column footer-help">
              <span>Hjælp</span>
              <a href="kontakt.html">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  const clubList = document.querySelector("#club-list");
  const clubs = [
    ["1:87 Byggerne", "Sjælland", "images/Klubber1.jpg"],
    ["Køge Modeljernbane Klub", "Sjælland", "images/Klubber2.jpg"],
    ["Modellerne Kalundborg", "Sjælland", "images/Klubber3.jpg"],
    ["Dansk TT-Klub", "Sjælland", "images/Klubber4.jpeg"],
    ["Goldenspike", "Sjælland", "images/Klubber5.jpg"],
    ["Stevnstoget", "Sjælland", "images/Klubber6.jpeg"],
    ["Puffen", "Fyn", "images/Klubber7.jpg"],
    ["Odense Modeljernbane Klub", "Fyn", "images/Klubber8.jpg"],
    ["Vestfyns Modeljernbane Klub", "Fyn", "images/Klubber9.jpg"],
    ["Bramming Modelbaneklub", "Jylland", "images/Klubber10.jpg"],
    ["Jernbaneklubben af 2002", "Jylland", "images/Klubber11.jpg"],
    ["MIST JUTLAND Märklin Insider", "Jylland", "images/Klubber12.jpg"],
    ["Gudenå Ekspressen", "Jylland", "images/Klubber13.jpg"],
    ["Modeljernbanen Rise Trinbræt", "Jylland", "images/Klubber14.jpg"],
    ["Thy-Jernbane Foreningen", "Jylland", "images/Klubber15.jpg"]
  ];

  const renderClubs = () => {
    if (!clubList) {
      return;
    }

    const query = (document.querySelector("#club-search")?.value || "").toLowerCase();
    const region = document.querySelector("#region")?.value || "Alle områder";
    const filtered = clubs.filter(([name, clubRegion]) => {
      return (!query || name.toLowerCase().includes(query))
        && (region === "Alle områder" || region === clubRegion);
    });

    const groups = ["Sjælland", "Fyn", "Jylland"]
      .filter((group) => region === "Alle områder" || region === group)
      .map((group) => {
        const groupClubs = filtered.filter(([, clubRegion]) => clubRegion === group);
        if (!groupClubs.length) {
          return "";
        }

        return `
          <section class="club-region col-12">
            <h2>${group}</h2>
            <div class="row g-4">
              ${groupClubs.map(([name, clubRegion, image]) => `
                <article class="col-12 col-md-6 col-lg-4 club-item">
                  <div class="club-card card h-100">
                    <img src="${image}" alt="" class="card-img-top">
                    <h3 class="card-title">${name}</h3>
                    <p class="card-text visually-hidden">${clubRegion}</p>
                  </div>
                </article>
              `).join("")}
            </div>
          </section>
        `;
      });

    clubList.innerHTML = groups.join("");
  };

  document.querySelector("#club-search")?.addEventListener("input", renderClubs);
  document.querySelector("#region")?.addEventListener("change", renderClubs);
  document.querySelectorAll("[data-region]").forEach((button) => {
    button.addEventListener("click", () => {
      const region = document.querySelector("#region");
      region.value = button.dataset.region;
      document.querySelectorAll("[data-region]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderClubs();
    });
  });
  renderClubs();

  document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = event.currentTarget.querySelector(".form-status");

    if (status) {
      status.textContent = "Tak for din besked. Vi vender tilbage hurtigst muligt.";
    }
  });
});
