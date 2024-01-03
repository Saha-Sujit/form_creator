//all forms details are stored in this array
var formSchema = [];
// form fields values stored in this array
var formFieldsArray = [];
// stores radio button array if it is selected
var radioArray = [];
// stores checkbox array if it is selected
var checkboxArray = [];

//select dropdown list items showing using below array
var inputTypeArray = [
  "select",
  "text",
  "email",
  "password",
  "number",
  "checkbox",
  "radio",
  "month",
  "time",
  "week",
  "date",
  "datetime-local",
  "tel",
];

//getting onload and running funcion
// window.onload = () => handleWindowLoad();

//onload todo function
// var handleWindowLoad = () => {
var selectedType = document.querySelector(".selectedType");
inputTypeArray.map((typeArray) => {
  var optionElement = document.createElement("option");
  optionElement.innerText = typeArray;
  optionElement.value = typeArray;
  selectedType.append(optionElement);
});
// };

// form name and button name rendered after onchange value changed or added
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

//function to generate unique ID
var generateUniqueId = () => {
  var id = crypto.randomUUID();
  return id;
};

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
    // checkBoxValues: checkboxArray,
    // radioValues: radioArray,
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

  renderForm();
};

// function to handle and submit the from creator form
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

//function to remove all child nodes inside div
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// function to render the form
var renderForm = () => {
  var divForm = document.querySelector(".formDemo");
  removeAllChildNodes(divForm);
  var divCheckBox = document.createElement("div");
  var divRadioBox = document.createElement("div");
  formFieldsArray.map((dat) => {
    if (dat.fieldType === "checkbox") {
      var inputFieldPara = document.createElement("p");
      inputFieldPara.innerText = dat.fieldName;
      divForm.append(inputFieldPara);
      dat.checkBoxValues.map((checkBoxValue) => {
        var inputField = document.createElement("input");
        var inputFieldLabel = document.createElement("label");
        inputField.setAttribute("type", dat.fieldType);
        inputField.setAttribute(
          "id",
          checkBoxValue.checkboxName.split(" ").join("")
        );
        inputField.setAttribute(
          "id",
          `${checkBoxValue.checkboxName.split(" ").join("")}-${dat.fieldType}`
        );
        inputField.setAttribute("class", checkBoxValue.checkboxName);
        inputField.setAttribute("name", checkBoxValue.checkboxName);
        inputField.setAttribute("value", checkBoxValue.checkboxName);
        inputFieldLabel.setAttribute(
          "for",
          `${checkBoxValue.checkboxName.split(" ").join("")}-${dat.fieldType}`
        );
        inputFieldLabel.innerText = checkBoxValue.checkboxName;
        divCheckBox.append(inputField, inputFieldLabel);
        divForm.append(divCheckBox);
      });
    } else if (dat.fieldType === "radio") {
      var inputFieldPara = document.createElement("p");
      inputFieldPara.innerText = dat.fieldName;
      divForm.append(inputFieldPara);
      dat.radioValues.map((radioValue) => {
        var inputField = document.createElement("input");
        var inputFieldLabel = document.createElement("label");
        inputField.setAttribute("type", dat.fieldType);
        inputField.setAttribute(
          "id",
          `${radioValue.radioName.split(" ").join("")}-${dat.fieldType}`
        );
        inputField.setAttribute("class", radioValue.radioName);
        inputField.setAttribute("name", dat.fieldName);
        inputField.setAttribute("value", radioValue.radioName);
        inputFieldLabel.setAttribute(
          "for",
          `${radioValue.radioName.split(" ").join("")}-${dat.fieldType}`
        );
        inputFieldLabel.innerText = radioValue.radioName;
        divRadioBox.append(inputField, inputFieldLabel);
        divForm.append(divRadioBox);
      });
    } else {
      var inputField = document.createElement("input");
      var inputFieldLabel = document.createElement("label");
      inputFieldLabel.setAttribute("for", dat.fieldName.split(" ").join(""));
      inputFieldLabel.innerText = dat.fieldName;
      inputField.setAttribute("type", dat.fieldType);
      inputField.setAttribute("class", dat.fieldName);
      inputField.setAttribute(
        "placeholder",
        dat.fieldName.split("_").join(" ")
      );
      inputField.setAttribute("name", dat.fieldName);
      divForm.append(inputFieldLabel, inputField);
    }
  });
};
