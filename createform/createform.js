import { renderForm } from "../modules/renderForm.js";
import { generateUniqueId } from "../modules/generateUniqueId.js";
import { inputTypeArray } from "../constants/inputTypeArray.js";

//all forms details are stored in this array
var formSchema = [];
// form fields values stored in this array
var formFieldsArray = [];
// stores radio button array if it is selected
var radioArray = [];
// stores checkbox array if it is selected
var checkboxArray = [];

// runs initially
var selectedType = document.querySelector(".selectedType");
inputTypeArray.map((typeArray) => {
  var optionElement = document.createElement("option");
  optionElement.innerText = typeArray;
  optionElement.value = typeArray;
  selectedType.append(optionElement);
});

// form name and button name rendered after onchange value changed or added
var formName = document.querySelector(".formName");
var buttonName = document.querySelector(".buttonName");
formName.addEventListener("change", () => handleFormNameChange());
buttonName.addEventListener("change", () => handleFormNameChange());

var handleFormNameChange = () => {
  var formName = document.querySelector(".formName").value;
  var buttonName = document.querySelector(".buttonName").value;
  var renderFormName = document.querySelector(".renderFormName");
  var renderButtonName = document.querySelector(".renderFormButton");
  if (buttonName != "") {
    renderButtonName.style.display = "block";
  } else {
    renderButtonName.style.display = "none";
  }
  renderFormName.innerText = formName;
  renderButtonName.innerText = buttonName;
};

//select change handle form state (checkbox and radio form)
var onSelect = document.querySelector(".selectedType");
onSelect.addEventListener("change", () => handleSelectedChange());

var handleSelectedChange = () => {
  var onSelect = document.querySelector(".selectedType").value;
  var renderCheckRadio = document.querySelector(".anotherForm");
  if (onSelect === "checkbox" || onSelect === "radio") {
    renderCheckRadio.style.display = "flex";
    renderCheckRadio.firstElementChild.setAttribute(
      "placeholder",
      `${onSelect}`
    );
    renderCheckRadio.lastElementChild.innerText = `Add ${onSelect}`;
  } else {
    //renderCheckRadio.innerText = "";
    renderCheckRadio.style.display = "none";
  }
};

var handleCheckRadio = document.querySelector(".handleAddCheckRadio");
handleCheckRadio.addEventListener("click", () => handleAddCheckRadio());

var handleAddCheckRadio = () => {
  var onSelect = document.querySelector(".selectedType").value;
  var checkRadioInput = document.querySelector(".checkRadio").value;

  if (checkRadioInput === "") {
    var fillformerror = document.querySelector(".fillformerror");
    fillformerror.style.color = "red";

    var formError =
      onSelect === "checkbox"
        ? "checkbox"
        : onSelect === "radio"
        ? "radio"
        : "";

    return (document.querySelector(
      ".fillformerror"
    ).innerText = `Please enter ${formError} value`);
  }

  if (onSelect === "checkbox") {
    checkboxArray.push({
      checkboxId: generateUniqueId(),
      checkboxName: checkRadioInput.split(" ").join("_"),
    });
  }
  if (onSelect === "radio") {
    radioArray.push({
      radioId: generateUniqueId(),
      radioName: checkRadioInput.split(" ").join("_"),
    });
  }

  console.log("checkboxArray", checkboxArray);
  console.log("radioArray", radioArray);
  document.querySelector(".checkRadio").value = "";
};

//function to add field inside an form
var handleFields = document.querySelector(".handleAddFields");
handleFields.addEventListener("click", () => handleAddFields());

var handleAddFields = () => {
  var formName = document.querySelector(".formName").value;
  var buttonName = document.querySelector(".buttonName").value;
  var fieldName = document.querySelector(".fieldName").value;
  var selectedType = document.querySelector(".selectedType").value;

  if (fieldName !== "" || selectedType !== "select") {
    handleAddCheckRadio();
  }

  if (
    fieldName === "" ||
    selectedType === "select" ||
    (checkboxArray.length <= 1 && selectedType === "checkbox") ||
    (radioArray.length <= 1 && selectedType === "radio")
  ) {
    var fillformerror = document.querySelector(".fillformerror");
    fillformerror.style.color = "red";

    var formError =
      fieldName === ""
        ? `Input Name`
        : selectedType === "select"
        ? `Input Type`
        : checkboxArray.length <= 1
        ? `atleast 2 checkbox items`
        : radioArray.length <= 1
        ? `atleast 2 radio items`
        : ``;

    return (document.querySelector(
      ".fillformerror"
    ).innerText = `Please Enter ${formError}`);
  }

  var newFormFieldValue = {
    fieldId: generateUniqueId(),
    fieldName: fieldName.toLowerCase().split(" ").join("_"),
    fieldType: selectedType,
  };

  if (selectedType === "checkbox") {
    newFormFieldValue.checkBoxValues = checkboxArray;
  } else if (selectedType === "radio") {
    newFormFieldValue.radioValues = radioArray;
  }

  formFieldsArray.push(newFormFieldValue);

  var renderCheckRadio = document.querySelector(".anotherForm");
  renderCheckRadio.style.display = "none";

  document.querySelector(".fillformerror").innerText = ``;

  console.log("Form Name is", formFieldsArray);

  document.querySelector(".fieldName").value = "";
  document.querySelector(".selectedType").value = "select";
  document.querySelector(".checkRadio").value = "";
  checkboxArray = [];
  radioArray = [];

  renderForm(formFieldsArray);
};

// function to handle and submit the from creator form
var handleSubmitButton = document.querySelector(".handleSubmit");
handleSubmitButton.addEventListener("click", () => handleSubmit());

var handleSubmit = () => {
  var formName = document.querySelector(".formName").value;
  var buttonName = document.querySelector(".buttonName").value;
  var fieldName = document.querySelector(".fieldName").value;
  var selectedType = document.querySelector(".selectedType").value;

  if (formName !== "" || buttonName !== "") {
    handleAddFields();
  }

  if (
    formName === "" ||
    buttonName === "" ||
    formFieldsArray.length === 0 ||
    (checkboxArray.length <= 1 && selectedType === "checkbox") ||
    (radioArray.length <= 1 && selectedType === "radio")
  ) {
    var fillformerror = document.querySelector(".fillformerror");
    fillformerror.style.color = "red";

    var formError =
      formName === ""
        ? `Form Name`
        : buttonName === ""
        ? `Button Name`
        : fieldName === ""
        ? `Input Name`
        : selectedType === "select"
        ? `Input Type`
        : checkboxArray.length <= 1
        ? `atleast 2 checkbox items`
        : radioArray.length <= 1
        ? `atleast 2 radio items`
        : ``;

    return (document.querySelector(
      ".fillformerror"
    ).innerText = `Please Enter ${formError}`);
  }

  formSchema.push({
    formId: generateUniqueId(),
    formName: formName,
    buttonName: buttonName,
    formFields: formFieldsArray,
  });

  var renderCheckRadio = document.querySelector(".anotherForm");
  renderCheckRadio.style.display = "none";

  document.querySelector(".fillformerror").innerText = ``;

  console.log("FormSchema", formSchema);

  document.querySelector(".formName").value = "";
  document.querySelector(".buttonName").value = "";
  document.querySelector(".fieldName").value = "";
  document.querySelector(".selectedType").value = "select";
  formFieldsArray = [];
  checkboxArray = [];
  radioArray = [];
};
