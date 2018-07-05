import { elements, formId } from './base';
export const formError = type => {
    if (type === 'empty_input') {
        const markup =  `
            <div class="alert alert-warning alert-dismissible">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong> Warning! </strong> Input fields cannot be empty.
            </div>
        `;

        return markup;
    }
};

export const clearError = () => {
    elements.error.innerHTML = "";
};