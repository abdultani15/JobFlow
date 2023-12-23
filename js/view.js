class View {
  _data;
  _submit = document.querySelector("#custom-form");
  _createBtn = document.querySelector(".create-job-button");
  _deleteBtn = document.querySelector(".delete-button");
  _popup = document.querySelector(".popup");
  _overlay = document.querySelector(".overlay");
  _selectElement = document.querySelector(".jobCat");
  _jobPostingContainer = document.querySelectorAll(".status-main");
  _wishlistContainer = document.querySelectorAll(".status-main")[0];
  _appliedContainer = document.querySelectorAll(".status-main")[1];
  _interviewContainer = document.querySelectorAll(".status-main")[2];
  _offeredContainer = document.querySelectorAll(".status-main")[3];
  _rejectedContainer = document.querySelectorAll(".status-main")[4];
  _jobs = document.querySelectorAll(".job-posting");
  loginForm = document.getElementById("login");
  registerForm = document.getElementById("register");
  buttonForm = document.getElementById("btn");
  registerFormButton = document.querySelector(".register-form-btn");
  loginButtonForm = document.querySelector(".login-form-btn");
  authForm = document.querySelector("#auth-form");
  sidebar = document.querySelector("#sidebar");
  main = document.querySelector(".main");
  loginPage = document.querySelector(".login-page");

  jobCategories = [
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

  constructor() {
    this._addHandlerShowOverlay();
    this._addHandlerHideOverlay();
    this._populateSelect();
    this._addHandlerFormSwap();
    this.handlerActiveTab();
    this.handlerDarkMode();
  }

  toggleWindow() {
    this._popup.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  resetForm() {
    document.querySelectorAll(".jobInputs").forEach((el) => (el.value = ""));
  }

  userLoggedInView() {
    this.authForm.classList.add("hide");
    this.loginPage.classList.add("hide");
    this.sidebar.classList.remove("hide");
    this.handlerActiveTab();
  }

  userLoggedOutView() {
    this.authForm.classList.remove("hide");
    this.loginPage.classList.remove("hide");
    this.sidebar.classList.add("hide");
    this.main.classList.add("hide");
  }

  _addHandlerFormSwap() {
    this.registerFormButton.addEventListener("click", () => {
      this.loginForm.style.left = "-400px";
      this.registerForm.style.left = "50px";
      this.buttonForm.style.left = "110px";
    });
    this.loginButtonForm.addEventListener("click", () => {
      this.loginForm.style.left = "50px";
      this.registerForm.style.left = "450px";
      this.buttonForm.style.left = "0px";
    });
  }

  _addHandlerShowOverlay() {
    this._createBtn.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideOverlay() {
    this._deleteBtn.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _generateJobId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 100000);
    const uniqueID = `${timestamp}${random}`;
    return uniqueID;
  }

  _getCurrentDate() {
    const currentDate = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  addHandlerSubmit(handler) {
    this._submit.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);

      const currentDate = this._getCurrentDate();
      const uniqueID = this._generateJobId();

      data.append("date", currentDate.toString());
      data.append("jobId", uniqueID);
      data.append("status", "wishlist");
      const handlerData = Object.fromEntries(data);
      handler(handlerData);
      this.toggleWindow();
      this.resetForm();
    });
  }

  render(data, render = true) {
    if (!data) return;

    this._data = data;
    const status = this._data.status;
    const markup = this.createJobElement(this._data);

    switch (status) {
      case "wishlist":
        this._wishlistContainer.insertAdjacentHTML("afterbegin", markup);
        this._attachDragHandler(
          this._wishlistContainer.querySelector(".job-posting")
        );
        break;
      case "applied":
        this._appliedContainer.insertAdjacentHTML("afterbegin", markup);
        this._attachDragHandler(
          this._appliedContainer.querySelector(".job-posting")
        );
        break;
      case "interview":
        this._interviewContainer.insertAdjacentHTML("afterbegin", markup);
        this._attachDragHandler(
          this._interviewContainer.querySelector(".job-posting")
        );
        break;
      case "offered":
        this._offeredContainer.insertAdjacentHTML("afterbegin", markup);
        this._attachDragHandler(
          this._offeredContainer.querySelector(".job-posting")
        );
        break;
      case "rejected":
        this._rejectedContainer.insertAdjacentHTML("afterbegin", markup);
        this._attachDragHandler(
          this._rejectedContainer.querySelector(".job-posting")
        );
        break;
    }

    if (!render) return markup;
  }

  _attachDragHandler(newJobPosting) {
    newJobPosting.addEventListener("dragstart", () => {
      newJobPosting.classList.add("dragging");
    });
    newJobPosting.addEventListener("dragend", () => {
      newJobPosting.classList.remove("dragging");
    });
    newJobPosting.addEventListener("click", (event) => {
      if (!event.target.closest(".trashcan")) {
        console.log("test");
      }
    });
  }

  addDeleteHandler(handler) {
    const parentContainer = document.querySelectorAll(".status-main");
    parentContainer.forEach((container) => {
      container.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".trashcan");
        if (deleteButton) {
          event.stopPropagation();
          const jobElement = deleteButton.closest(".job-posting");
          const jobId = jobElement.dataset.jobId;
          handler(jobId);
          jobElement.remove();
        }
      });
    });
  }

  getCompanyLogo(company) {
    const fixedName = company.toLowerCase().replace(/[\s-]+/g, "");
    const logoUrl = `https://logo.clearbit.com/${fixedName}.com`;
    const logoImage = document.createElement("img");
    logoImage.src = logoUrl;
    logoImage.alt = "Company Logo";
    return logoImage;
  }

  createJobElement(data) {
    const logo = this.getCompanyLogo(data.jobCompany);
    const logoContainer = document.createElement("div");
    logoContainer.classList.add("jobo-logo");
    logoContainer.appendChild(logo);
    return `
      <div class="job-posting" draggable="true" data-job-id="${data.jobId}">
    
      <div class="job-logo">${logoContainer.innerHTML}</div>
      <div class="job-desc">
        <h2 class="company-name">${data.jobCompany}</h2>
        <h3 class="company-position">${data.jobTitle}</h3>
        <h4 class="company-date">Date: <span>${data.date}</span></h4>
      </div>
      <div class="trashcan"><i class='bx bx-trash-alt' ></i></div>
    </div>`;
  }

  getCategoryIcon(data) {
    const categoryObj = this.jobCategories.find(
      (categoryObj) => categoryObj.category === data.jobCat
    );
    return categoryObj ? categoryObj.iconClass : "";
  }

  _populateSelect() {
    this.jobCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.category;
      option.text = category.category;
      this._selectElement.appendChild(option);
    });
  }

  attachHandlersToContainers(handler) {
    this._jobPostingContainer.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const draggable = document.querySelector(".dragging");
        if (draggable && draggable.classList.contains("job-posting")) {
          const jobId = draggable.dataset.jobId;
          const newStatus = container.dataset.status;
          handler(newStatus, jobId);
          container.appendChild(draggable);
        } else {
          console.log("not posting");
        }
      });
    });
  }

  handlerProfileData(handler) {
    const profile = document.getElementById("profile-form");
    profile.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const bio = document.getElementById("bio").value;
      handler(firstName, lastName, phoneNumber, bio);
    });
  }

  loadProfile(userData) {
    document.getElementById("firstName").value = userData.firstName || "";
    document.getElementById("lastName").value = userData.lastName || "";
    document.getElementById("phoneNumber").value = userData.phoneNumber || "";
    document.getElementById("bio").value = userData.bio || "";
  }

  userEmail = document.querySelector("#userEmail");
  userPassword = document.querySelector("#userPassword");
  loginButton = document.querySelector("#login-btn");

  addHandlerUserLogin(handler) {
    this.loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      const loginEmail = userEmail.value;
      const loginPassword = userPassword.value;
      handler(loginEmail, loginPassword);
    });
  }

  registerEmail = document.querySelector("#registerEmail");
  registerPassword = document.querySelector("#registerPassword");
  registerUsername = document.querySelector("#registerUsername");
  registerButton = document.querySelector("#register-btn");

  addHandlerUserRegister(handler) {
    this.registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      const registerEmailValue = registerEmail.value;
      const registerPasswordValue = registerPassword.value;
      const registerUsernameValue = registerUsername.value;
      handler(registerEmailValue, registerPasswordValue, registerUsernameValue);
    });
  }

  logoutButton = document.querySelector("#logout-btn");

  addHandlerUserLogout(handler) {
    this.logoutButton.addEventListener("click", function (e) {
      // e.preventDefault();
      handler();
    });
  }

  profileLink = document.getElementById("profile-link");
  addHandlerProfileLink() {
    this.profileLink.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("test");
    });
  }

  setActiveTab = (activeTab) => {
    switch (activeTab) {
      case "profile":
        dashboard.classList.add("hide");
        profile.classList.remove("hide");
        settings.classList.add("hide");
        break;
      case "settings":
        dashboard.classList.add("hide");
        profile.classList.add("hide");
        settings.classList.remove("hide");
        break;
      default:
        dashboard.classList.remove("hide");
        profile.classList.add("hide");
        settings.classList.add("hide");
    }
    localStorage.setItem("activeTab", activeTab);
  };

  handlerActiveTab() {
    document.addEventListener("DOMContentLoaded", () => {
      const dashboard = document.getElementById("dashboard");
      const profile = document.getElementById("profile");
      const settings = document.getElementById("settings");

      const dashboardLink = document.getElementById("dashboard-link");
      const profileLink = document.getElementById("profile-link");
      const settingLink = document.getElementById("settings-link");

      // const setActiveTab = (activeTab) => {
      //   switch (activeTab) {
      //     case "profile":
      //       dashboard.classList.add("hide");
      //       profile.classList.remove("hide");
      //       settings.classList.add("hide");
      //       break;
      //     case "settings":
      //       dashboard.classList.add("hide");
      //       profile.classList.add("hide");
      //       settings.classList.remove("hide");
      //       break;
      //     default:
      //       dashboard.classList.remove("hide");
      //       profile.classList.add("hide");
      //       settings.classList.add("hide");
      //   }
      //   localStorage.setItem("activeTab", activeTab);
      // };

      dashboardLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveTab("dashboard");
      });
      profileLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveTab("profile");
      });
      settingLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveTab("settings");
      });

      const savedTab = localStorage.getItem("activeTab");
      if (savedTab) {
        this.setActiveTab(savedTab);
      } else {
        this.setActiveTab("dashboard");
      }
    });
  }

  handlerDarkMode() {
    const isDarkModeEnabled = localStorage.getItem("darkModeEnabled");
    const body = document.body;
    if (isDarkModeEnabled === "true") {
      body.classList.add("darkmode");
    }
    const darkModeToggle = document.getElementById("darkmode-moon");
    darkModeToggle.addEventListener("click", function () {
      body.classList.toggle("darkmode");
      const checkDarkMode = body.classList.contains("darkmode");
      localStorage.setItem("darkModeEnabled", checkDarkMode);
    });
  }
}

export default new View();
