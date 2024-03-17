"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  getAndShowStoriesOnStart();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $loginForm.hide();
  $navLogOut.show();
  $signupForm.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Show story form on click on "submit" */

function showStoryForm() {
  console.debug("showStoryForm");
  hidePageComponents();
  $signupForm.show();
  $storyForm.show();
}

$storySubmit.on("click", showStoryForm);

/** submits new story form */

$storyForm.on("submit", function (e) {
  e.preventDefault();

  const storyTitle = $('#story-title').val();
  const storyAuthor = $('#story-author').val();
  const storyUrl = $('#story-url').val();

  submitNewStory(storyTitle, storyAuthor, storyUrl);
  e.target.reset();
});