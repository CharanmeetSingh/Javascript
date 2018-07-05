export default class Validation {
    constructor(formId) {
        this.formId = formId;
    }

    isFormEmpty() {
        const formInputs = Array.from(document.querySelectorAll(`${this.formId} input`));
        formInputs.forEach(el => {
            if(el.value === "") {
                el.setAttribute("style", "border: 2px solid red;");
                this.hasError = 'empty_input';
            }else {
                el.setAttribute("style", "border: 1px solid #ccc;");
            }
        });
    }
}