const element = document.querySelector(".block-componentcomp-demo1 .block__content .comp_demo1");

customElements.define("my-block", class extends HTMLElement {
  constructor() {
    super();
    const parent = this.parentElement;
    console.log(parent);
    const config = { ...parent.dataset }; 
    const item = config.conf2; // How many items on page. Define within the "Configure block"
    const title = config.conf1; // Block title. Define within the "Configure block"
    document.querySelector("my-block").insertAdjacentHTML("afterbegin", `<h3>${title}</h3>`);
    const url = config.apiUrl; // API url. Define within the "Configure block"
    const div = document.createElement("div");
    div.classList.add("wrapper");

    async function displayUser() {
      const response = await fetch(url);
      const json = await response.json();
      const users = json.data;
      const user = users.length && users.map(data => {
        return `
          <div class="item">
            <h5>${data.first_name} ${data.last_name}</h5>
            <p>${data.email}</p>
          </div>
          `;
      }).join('');

      div.innerHTML = user;

      const paginationNumbers = document.getElementById("pagination-numbers");
      const paginatedList = document.querySelector(".wrapper");
      const listItems = paginatedList.querySelectorAll(".item");
      const paginationLimit = item;
      const pageCount = Math.ceil(users.length / paginationLimit);
      let currentPage;

      const appendPageNumber = (index) => {
        const pageNumber = document.createElement("button");
        pageNumber.classList.add("pagination-number");
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);
        paginationNumbers.appendChild(pageNumber);
      };

      const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
          appendPageNumber(i);
        }
      };

      const handleActivePageNumber = () => {
        document.querySelectorAll(".pagination-number").forEach((button) => {
          button.classList.remove("active");
          
          const pageIndex = Number(button.getAttribute("page-index"));
          if (pageIndex == currentPage) {
            button.classList.add("active");
          }
        });
      };
      
      const setCurrentPage = (pageNum) => {
        currentPage = pageNum;

        handleActivePageNumber();

        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        listItems.forEach((item, index) => {
          item.classList.add("hidden");
          if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
          }
        });
      };
      
      window.addEventListener("load", () => {
        getPaginationNumbers();
        setCurrentPage(1);

        document.querySelectorAll(".pagination-number").forEach((button) => {
          const pageIndex = Number(button.getAttribute("page-index"));
          if (pageIndex) {
            button.addEventListener("click", () => {
              setCurrentPage(pageIndex);
            });
          }
        });
      });
    }
    this.appendChild(div);
    displayUser();
  }
});







