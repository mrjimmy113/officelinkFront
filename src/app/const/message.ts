export const MyMessage = {
  //Common Err message go here
  errorTitle: `Error Occurred`,
  error400Message: `Something went wrong, please contact us via email officelinksup@gmail.com for help`,

  //#region Dương message
  //#region Department
  createDepartment: `Department has been created.`,
  updateDepartment: `Department has been updated.`,
  dupplicatedDepName: `A department with this name is already existed in your workplace. Please enter a different name.`,
  deleteDepartment: `Department has been deleted.`,
  confirmDeleteDep: `This action will delete the chosen department. Do you want to continue?`,
  deleteDepHasTeamWarning: `This department contain team(s) in it. Please remove all team(s) in this department before delete it.`,
  //#endregion

  //#region Team
  createTeam: `Team has been created.`,
  updateTeam: `Team has been updated.`,
  dupplicatedTeamName: `A team with this name is already existed in your workplace. Please enter a different name.`,
  deleteTeam: `Team has been deleted.`,
  confirmDeleteTeam: `This action will delete the chosen team. Do you want to continue?`,
  deleteTeamHasEmplsWarning: `This team contain employee(s) in it. Please remove all employee(s) in this team before delete it.`,
  //#endregion

  //#region Workplace
  createWorkplace: `Workplace has been created.`,
  updateWorkplace: `Workplace has been updated.`,
  deactiveWorkplace: `Workplace has been deactivated.`,
  activateWokrplace: `Workplace has been activated.`,
  confirmDeactivateWorkplace: `Deactivate this workplace?`,
  confirmActivateWorkplace: `Activate this workplace?`,
  actionError: `Something went wrong.`,
  //#endregion

  //#region Send out survey
  createSurveyRoutine: `You have scheduled this survey to be sent.`,
  targetListEmpty: `You must choose at least one target to send this survey.`,
  durationInvalid: `Duration cannot be 0 or negative.`,
  updateSurveyRoutine: `This survey routine was successfully updated.`,
  duplicatedTarget: `Duplicated target(s).`,
  surveySent: `Your survey has been sent`,
  targetEmpty:`There is no employee in choosen target`,
  invalidScheduleTime: `Month cannot be left empty. You must specify at least one to create a routine.`,
  //#endregion
  //#endregion

  //#region Question
  deleteQuestionTitle:"Delete Question",
  deleteQuestionMessage:`Do you want to delete this question`,
  createQuestionTitle:"New Question",
  createQuestionSuccess:"Question is saved successfully",
  createQuestionExit:"Do want you to exit this question form ?",
  createQuestionOption:"The maximum number of option is 10",
  createQuestionRequire:"Please enter question",
  createQuestionOptionRequire:"Please fill in option number ",
  createQuestionTypeRequire:"Please choose question type",
  //#endregion

  //#region WordCloudFilter
  deleteFilterTitle:"Delete Word Cloud Filter",
  deleteFilterMessage:"Do you want to delete this word cloud filter",
  deleteFilterSuccess:"Word cloud filter is deleted successfully",
  wordCloudFilterTitle: "Word Cloud Filter",
  createFilterMessage: "Word cloud filter is created successfully",
  updateFilterMessage: "Word cloud filter is updated successfully",
  deleteWordMessage: "Do you want to remove this word",
  filterDialogExit: "Do you want to exit this word cloud filter form",
  //#endregion

  //#region Survey Save
  surveyTitle: "Survey",
  createSurveySuccess:"Survey is created successfully",
  updateSurveySuccess:"Survey is updated successfully",
  deleteSurveyMessage:"Do you want to delete this survey",
  deleteSurveySuccess:"Survey is deleted successfully",
  surveyDuplicateName:"This survey title is already existed",
  surveyQuestionLimit:"Survey must have more than one question",
  surveyTitleRequire:"Please fill in survey title",
  //#region

  //#region Account
  deleteAccountTitle :"Delete Account",
  deleteAccountMessage : "This action will delete the chosen account. Do you want to continue?",
  deleteAccountSuccess : "Account has been deleted.",
  deleteAccountError : "Delete Account Fail. Try again",
  assignAccountTitle : "Assign Account",
  assignAccountSuccess : "Assign account successfully",
  assignLocationRequire : "Please choose Location",
  assignTeamRequire : "The team list can not be empty",
  addTeamToTeamListError : "This team has already on the list",
  //#endregion

  //#region Register
  registerTitle : "Register Account",
  registerFillFormRequire : "Please complete your register form",
  registerSuccess : "Successful registration of account information, please check your mail to complete the registration",
  registerSystemError : "Sorry, email or workplace already exists, please check again",
  registerExisted : "Sorry, email or workplace already exists, please check again",
  systemError : "System Fail. Try again",
  //#region


  //#region Join
  joinFillFormRequire : "Please complete your register form",
  welcomeMessage : "Welcome to Office Link",

  //#region

  //#region Invite
  inviteFillFormRequire : "Please complete your register form",
  inviteEmailExisted : "Email already exists in the email list. Try again",
  inviteEmailExistedonSystem : "Email already exists in the system. Try again",
  addMoreEmail : "Please add more Email",
  inviteSuccess : "Send Mail Success",
  //#region

  //#region Profile
  changeProfileTitle : "Change Profile",
  profileFillFormRequire : "Please complete your form",
  profileSuccess : "Change profile successfully",
  currentPasswordError : "Current password wrong. Try again",

  //region

  //#region Forgot password
  resetPasswordTitle : "Forgot password",
  inputEmailSuccess : "Please check your email to reset password",
  inputEmailError : "Email not existed. Try again",
  resetPasswordFillFormRequire : "Plese complete your form",
  resetPasswordSuccess : "Change password successfully",

  //#region



  //#region Location
  createLocation: `Location has been created.`,
  updateLocation: `Location has been updated.`,
  dupplicatedLocation: `This name or address is already existed in your workplace. Please input again.`,
  deleteLocation: `Location has been deleted.`,
  confirmDeleteLocation: `This action will delete the chosen location. Do you want to continue?`,
  deleteLocationConflict: `This location has employer. Please remove all employers in this location before deleting`,
  //#endregion

  //#region News
  createNews: `News has been created.`,
  updateNews: `News has been updated.`,
  deleteNews: `News has been deleted.`,
  confirmDeleteNews: `This action will delete the chosen news. Do you want to continue?`,
  //#endregion

  //#region Take Survey
  takeSurveyTitle: "Do Survey",
  doneTakeSurvey : 'Thank you for taking out this survey',
  noPermissionToTake: 'You have no permission to take this survey anymore',
  takeSurveyLogin: "Please login to do the survey",
  //#endregion
};
