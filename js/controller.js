import * as model from "./model.js";
import view from "./view.js";

const controlSubmitJob = function (newJob) {
  view.render(newJob);
  model.addJobToPostingList(newJob);
};

const controlDragContainers = async function (newStatus, jobId) {
  const jobPosting = await model.findJobId(jobId);
  if (jobPosting) {
    model.updateJobStatus(jobId, newStatus);
  }
};

const controlDeleteJob = async function (jobId) {
  await model.deleteJob(jobId);
};

const controlUserLogin = async (loginEmail, loginPassword) => {
  try {
    await model.userLogin(loginEmail, loginPassword);
    view.setActiveTab("dashboard");
    console.log("You have signed in!");
  } catch (error) {
    throw error;
  }
};

const controlUserLogout = async () => {
  try {
    await model.logoutUser();
  } catch (error) {
    throw error;
  }
};

const controlUserRegister = async function (
  registerEmail,
  registerPassword,
  registerUsername
) {
  try {
    await model.userRegister(registerEmail, registerPassword, registerUsername);
    view.setActiveTab("dashboard");
    console.log("your account was created!");
  } catch (error) {
    throw error;
  }
};

const controlProfileUpdate = async function (
  firstName,
  lastName,
  phoneNumber,
  bio
) {
  try {
    await model.updateProfile(firstName, lastName, phoneNumber, bio);
  } catch (error) {
    throw error;
  }
};

const controlLoadProfile = async function () {
  try {
    const userData = await model.getProfile();
    if (userData) {
      view.loadProfile(userData);
    }
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  view.addHandlerSubmit(controlSubmitJob);
  view.attachHandlersToContainers(controlDragContainers);
  view.addHandlerUserLogin(controlUserLogin);
  view.addHandlerUserRegister(controlUserRegister);
  view.addHandlerUserLogout(controlUserLogout);
  view.addDeleteHandler(controlDeleteJob);
  view.handlerProfileData(controlProfileUpdate);
  model.checkAuthState(async (user) => {
    if (user) {
      view.userLoggedInView();
      const allJobs = await model.loadAllJobs();
      allJobs.forEach((pl) => {
        view.render(pl);
      });
      view.handlerActiveTab();
      controlLoadProfile();
    } else {
      view.userLoggedOutView();
    }
  });
};
init();
