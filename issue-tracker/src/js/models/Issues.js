const uuid = require('uuid/v1');
import { elements, formId } from '../views/base';

export default class Issues {
    constructor() {
        this.issues = [];
    }

    addIssue(status, description, severity, assignedTo) {
        const issue = {
            id: uuid(),
            status,
            description,
            severity,
            assignedTo
        };
        this.issues.push(issue);

        //Persist data in localStorage
        this.persistIssues();

        return issue;
    }

    persistIssues() {
        localStorage.setItem('issues', JSON.stringify(this.issues));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('issues'));

        // Restoring issues from localstorage
        if (storage) this.issues = storage;
    }
}