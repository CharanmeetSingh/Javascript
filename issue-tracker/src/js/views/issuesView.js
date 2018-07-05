import { elements, formId } from './base';

export const getInput = () => {
    const inputs = Array.from(document.querySelectorAll(`${formId} input, ${formId} #issueSeverityInput`));
    if (inputs) {
        const issueData = {
            status: 'New',
            description: inputs[0].value,
            severity: inputs[1].value,
            assignedTo: inputs[2].value
        };
        return issueData;
    }
};

export const clearInput = () => {
    const inputs = Array.from(document.querySelectorAll(`${formId} input`));
    inputs.forEach(el => el.value = "");
    document.querySelector(`${formId} select`).value = "Low";
};

export const renderIssue = data => {
    let statusLabel;
    switch(data.status) {
        case 'New' :
            statusLabel = 'info';
            break;
        case  'In-progress' :
            statusLabel = 'warning';
            break;
        case 'Pending' :
            statusLabel = 'danger';
            break;
        case 'Done' :
            statusLabel = 'success';
            break;
        default :
            statusLabel = 'info';
    }
    const markup = `
        <div class="well" data-id="${data.id}">
            <h6>${data.id}</h6>
            <p><span class="status status-badge label label-${statusLabel}" data-toggle="modal" data-target="#myModal">${data.status}</span></p>
            <h3>${data.description}</h3>
            <p><span class="glyphicon glyphicon-time"></span>${data.severity}</p>
            <p><span class="glyphicon glyphicon-user"></span>${data.assignedTo}</p>
            <a href="javascript:void(0)" class="btn btn-warning close-btn">Close</a> 
            <a href="javascript:void(0)" class="btn btn-danger delete-btn">Delete</a>
        </div>
    `;

    elements.issueList.insertAdjacentHTML('afterbegin', markup);
};

export const deleteIssue = el => {
    el.parentNode.removeChild(el);
};

export const changeStatus = (Id, status) => {
    // change status
    const issueArr = Array.from(document.querySelectorAll('#issuesList .well'));
    const el = issueArr.find(el => el.dataset.id === Id);
    el.getElementsByClassName('status-badge')[0].textContent = status;

    let statusLabel;
    switch(status) {
        case 'New' :
            statusLabel = 'info';
            break;
        case  'In-progress' :
            statusLabel = 'warning';
            break;
        case 'Pending' :
            statusLabel = 'danger';
            break;
        case 'Done' :
            statusLabel = 'success';
            break;
        default :
            statusLabel = 'info';
    }


    const clss = ['label-info', 'label-warning', 'label-danger', 'label-success'];
    el.getElementsByClassName('status-badge')[0].classList.remove(...clss);
    el.getElementsByClassName('status-badge')[0].classList.add(`label-${statusLabel}`);
    
};