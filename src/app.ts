interface Validatable {
    value: string | number;
    required?: boolean; //optional property with a question mark after the property name
    minLength?: number; //optional property with a question mark after the property name
    maxLength?: number; //optional property with a question mark after the property name
    min?: number; //optional property with a question mark after the property name
    max?: number; //optional property with a question mark after the property name
}

function validatable(validatableInput : Validatable) { //take an object as an argument which is a Validatable type
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

function autobind(
  // target: any,
  // methodName: string,
  _: any,
  _2: string,
  descriptor: PropertyDescriptor //Property Descriptor is a built-in type in TypeScript
) {
  // console.log("descriptor: ", descriptor); //descriptor is an object that contains the configuration of the method (value, writable, enumerable, configurable
  const originalMethod = descriptor.value;
  // console.log("originalMethod: ", originalMethod);
  const adjDescriptor: PropertyDescriptor = {
    //create a new descriptor object
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
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
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement; //the form element
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement; //get the access of the title input element
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement; //get the access of the description description input element
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement; //get the access of the people input element

    this.configure();
    this.attach();
  }

  

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
        };
    const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
        };
    const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
        };

    if (
      !validatable(titleValidatable) ||
      !validatable(descriptionValidatable) ||
      !validatable(peopleValidatable)
    ) {
      alert("Invalid input, please try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
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
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this)); //bind the this keyword to the class instead of the event target
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
