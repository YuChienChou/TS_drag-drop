class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement; //add this attribute to get the title input element from the form
    descriptionInputElement: HTMLInputElement; //add this attribute to get the description input element from the form
    peopleInputElement: HTMLInputElement; //add this attribute to get the people input element from the form

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement; //the form element
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement; //get the access of the title input element
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement; //get the access of the description description input element
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement; //get the access of the people input element


        this.configure();
        this.attach();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value); //'this' keyword is not accessible here if it is not binded to the class
    };

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this)); //bind the this keyword to the class
    };

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}



const prjInput = new ProjectInput();