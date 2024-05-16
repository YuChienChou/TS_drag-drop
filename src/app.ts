function autobind (
    // target: any,
    // methodName: string,
    _ : any,
    _2: string,
    descriptor: PropertyDescriptor //Property Descriptor is a built-in type in TypeScript
) {

    // console.log("descriptor: ", descriptor); //descriptor is an object that contains the configuration of the method (value, writable, enumerable, configurable
    const originalMethod = descriptor.value;
    // console.log("originalMethod: ", originalMethod);
    const adjDescriptor: PropertyDescriptor = { //create a new descriptor object
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


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

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // console.log(this.titleInputElement.value); //'this' keyword is not accessible here if it is not bind to the class
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }

        this.clearInputs();
    };

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this)); //bind the this keyword to the class instead of the event target
    };

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}



const prjInput = new ProjectInput();