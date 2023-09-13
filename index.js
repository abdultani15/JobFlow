const createBtn = document.querySelector(".create-job-button");
const deleteBtn = document.querySelector(".delete-button");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const selectElement = document.querySelector(".jobCat");
const jobPostingContainer = document.querySelectorAll(".status-main");
const wishlistContainer = jobPostingContainer[0];
let jobs = document.querySelectorAll(".job-posting");

class User {
  constructor(userId, username, email, password) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.postingList = [];
  }

  addJobPosting(jobPosting) {
    this.postingList.push(jobPosting);
  }
}

class JobPosting {
  constructor(jobId, company, title, category) {
    this.jobId = jobId;
    this.company = company;
    this.title = title;
    this.category = category;
    this.status = "wishlist";
    this.date = this.getCurrentDate();
  }

  getCurrentDate() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  createJobElement() {
    const jobPosting = `
    <div class="job-posting" draggable="true">
    <div class="job-logo"><i class="${this.getCategoryIcon()}"></i></div>
    <div class="job-desc">
      <h2 class="company-name">${this.company}</h2>
      <h3 class="company-position">${this.title}</h3>
      <h4 class="company-date">Date: <span>${this.date}</span></h4>
    </div>
  </div>
    `;

    return jobPosting;
  }

  getCategoryIcon() {
    const categoryObj = app.jobCategories.find(
      (categoryObj) => categoryObj.category === this.category
    );
    return categoryObj ? categoryObj.iconClass : "";
  }
}

class App {
  constructor() {
    this.jobCategories = [
      { category: "Information Technology (IT)", iconClass: "bx bxs-server" },
      { category: "Healthcare and Medicine", iconClass: "bx bx-plus-medical" },
      { category: "Finance and Accounting", iconClass: "bx bx-dollar" },
      { category: "Engineering", iconClass: "bx bxs-wrench" },
      { category: "Education and Teaching", iconClass: "bx bxs-book-reader" },
      { category: "Sales and Marketing", iconClass: "bx bxs-cart" },
      { category: "Customer Service", iconClass: "bx bx-headphone" },
      { category: "Hospitality and Tourism", iconClass: "bx bxs-hotel" },
      { category: "Art and Design", iconClass: "bx bxs-paint" },
      { category: "Manufacturing and Production", iconClass: "bx bxs-factory" },
      {
        category: "Government and Public Service",
        iconClass: "bx bxs-briefcase-alt-2",
      },
      { category: "Science and Research", iconClass: "bx bxs-flask" },
      {
        category: "Construction and Architecture",
        iconClass: "bx bxs-building",
      },
      { category: "Transportation and Logistics", iconClass: "bx bxs-bus" },
      { category: "Human Resources (HR)", iconClass: "bx bxs-user-badge" },
      { category: "Legal and Law", iconClass: "bx bx-building" },
      {
        category: "Media and Communication",
        iconClass: "bx bxs-message-square-detail",
      },
      { category: "Retail and Sales", iconClass: "bx bxs-store" },
      {
        category: "Real Estate and Property",
        iconClass: "bx bxs-building-house",
      },
      {
        category: "Environmental and Sustainability",
        iconClass: "bx bxs-leaf",
      },
      { category: "Agriculture and Farming", iconClass: "bx bxs-lemon" },
      { category: "Energy and Utilities", iconClass: "bx bxs-bolt" },
      {
        category: "Nonprofit and Social Services",
        iconClass: "bx bxs-heart",
      },
      { category: "Pharmaceuticals", iconClass: "bx bxs-capsule" },
      {
        category: "Entertainment and Performing Arts",
        iconClass: "bx bxs-microphone",
      },
      { category: "Insurance", iconClass: "bx bxs-shield" },
      { category: "Telecommunications", iconClass: "bx bxs-phone" },
      { category: "Sports and Fitness", iconClass: "bx bx-dumbbell" },
      { category: "Fashion and Beauty", iconClass: "bx bxs-t-shirt" },
      { category: "Food and Beverage", iconClass: "bx bxs-food-menu" },
      { category: "Travel and Tourism", iconClass: "bx bxs-plane" },
      { category: "Aviation and Aerospace", iconClass: "bx bxs-rocket" },
      { category: "Biotechnology", iconClass: "bx bx-dna" },
      { category: "Automotive and Transportation", iconClass: "bx bxs-car" },
      { category: "Consulting", iconClass: "bx bxs-briefcase" },
      { category: "Design and Multimedia", iconClass: "bx bxs-palette" },
      { category: "Music and Audio", iconClass: "bx bxs-music" },
      {
        category: "Writing and Content Creation",
        iconClass: "bx bxs-edit-alt",
      },
      { category: "Research and Analysis", iconClass: "bx bxs-search-alt-2" },
      { category: "Humanities and Social Sciences", iconClass: "bx bxs-book" },
    ];

    this.init();
  }

  init() {
    const form = document.querySelector("#custom-form");
    form.addEventListener("submit", this.createJobPosting.bind(this));
    createBtn.addEventListener("click", this.toggleForm.bind(this, true));
    deleteBtn.addEventListener("click", this.toggleForm.bind(this, false));
    this.populateSelect();
    this.doThings();
    this.attachHandlersToContainers();
  }

  toggleForm(show) {
    popup.style.display = overlay.style.display = show ? "block" : "none";
  }

  populateSelect() {
    this.jobCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.category;
      option.text = category.category;
      selectElement.appendChild(option);
    });
  }

  createJobPosting(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const company = data.get("jobCompany");
    const title = data.get("jobTitle");
    const category = data.get("jobCat");

    if (!company || !title || !category) {
      return;
    }

    const jobId = this.generateJobId();

    const job = new JobPosting(jobId, company, title, category);
    const jobPostingElementHTML = job.createJobElement();

    wishlistContainer.insertAdjacentHTML("beforeend", jobPostingElementHTML);

    const jobPostingElement = wishlistContainer.lastElementChild;

    this.toggleForm(false);
    document.querySelectorAll(".jobInputs").forEach((el) => (el.value = ""));
    e.target.reset();
    this.doThings();
  }

  generateJobId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 100000);
    const uniqueID = `${timestamp}${random}`;
    return uniqueID;
  }

  attachDragAndDropListeners(jobPostingElement) {
    jobPostingElement.addEventListener(
      "dragstart",
      this.handleDragStart.bind(this)
    );
    jobPostingElement.addEventListener(
      "dragend",
      this.handleDragEnd.bind(this)
    );
  }

  handleDragStart(e) {
    e.target.classList.add("dragging");
  }

  handleDragEnd(e) {
    e.target.classList.remove("dragging");
  }

  doThings() {
    jobs = document.querySelectorAll(".job-posting");
    jobs.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });
  }

  attachHandlersToContainers() {
    jobPostingContainer.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const draggable = document.querySelector(".dragging");
        container.appendChild(draggable);
      });
    });
  }
}

const app = new App();
