// GLOBAL APP CONTROLLER
import { elements, formId } from './views/base';
import Validation from './models/Validation';
import Issues from './models/Issues';
import * as validationView from './views/validationView';
import * as issuesView from './views/issuesView';

/** Gloabal state of the app
 * Error Object
 * Issue Array
 * changeStatus property
 */

 const state = {};
 /**
  * VALIDATION CONTROLLER
  */
const validation = () => {
    state.form = new Validation(formId);
    // 1) Check for error
    state.form.isFormEmpty();
    if (state.form.hasError) {
        // 2) Display error
        const errorMarkup = validationView.formError(state.form.hasError);
        elements.error.insertAdjacentHTML('afterbegin', errorMarkup);
        return false;
    }
    return true;
};

/**
  * ISSUE CONTROLLER
  */
const controlIssue = () => {
    if (!state.issuesList) state.issuesList = new Issues();

    // Get the inputfields data from the add issue form
    const inputData = issuesView.getInput();

    // Add new issue
    const issueEl = state.issuesList.addIssue(
        inputData.status,
        inputData.description,
        inputData.severity,
        inputData.assignedTo
    );

    // Render issue to the UI
    issuesView.renderIssue(issueEl);

    // Clear the input fields
    issuesView.clearInput();
};

window.addEventListener('load', e => {
    state.issuesList = new Issues();
    // Read issues from localstorage
    state.issuesList.readStorage();
    //Render issues if available in localstorage
    state.issuesList.issues.forEach(el => {
        issuesView.renderIssue(el);
    });
});

// Handle add button click
elements.submitButton.addEventListener('click', e => {
    // 1) Clear any error that has previously added 
    validationView.clearError();
    // 2) Prevent default behaviour of add button
    e.preventDefault();
    // 3) Validate form
    if (validation()) {
        controlIssue();
    }
});

// Handling close and delete buttons in the Issue list
elements.issueList.addEventListener('click', e => {
    if (e.target.matches('.close-btn, .close-btn *')) {
        // Close current issue in UI
        issuesView.deleteIssue(e.target.parentNode);     

    }else if (e.target.matches('.delete-btn, .delete-btn *')) {
        if (confirm("Are you sure, you want to delete?") === true) {
            const Id = e.target.parentNode.dataset.id;
        
            // Delete issue from state
            const delIndx = state.issuesList.issues.findIndex(el => el.id === Id);
            state.issuesList.issues.splice(delIndx, 1);

            // Repersist localstorage
            state.issuesList.persistIssues();

            // Delete issue from UI
            issuesView.deleteIssue(e.target.parentNode);
        }
    }else if (e.target.matches('.status-badge, .status-badge *')) {
        // Handling status change of any issue in the UI
        state.statusChangeId = e.target.parentNode.parentNode.dataset.id;
    }
});

// Handling the status change event from modal
elements.container.addEventListener('click', e => {
    if (e.target.matches('.status-change, .status-change *')) {
        if (state.statusChangeId) {
            const id = state.statusChangeId;
            // Change the status in localstorage
            const changeIndx = state.issuesList.issues.findIndex(el => el.id === id);
            const newStatus = e.target.textContent;
            
            state.issuesList.issues[changeIndx].status = newStatus
            state.issuesList.persistIssues();
            
            // Change the status in UI
            issuesView.changeStatus(id, newStatus);
        }else {
            alert('Oops something went wrong!');
        }
    }
});