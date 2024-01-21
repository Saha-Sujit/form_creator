//function to remove all child nodes inside div
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// common funcion to render form
var commonRenderForm = (dat, divForm, divCheckBox, divRadioBox) => {
  if (dat.fieldType === "checkbox") {
    var inputFieldPara = document.createElement("p");
    inputFieldPara.innerText =
      dat.fieldName.charAt(0).toUpperCase() +
      dat.fieldName.slice(1).split("_").join(" ");
    divForm.append(inputFieldPara);
    dat.checkBoxValues.map((checkBoxValue) => {
      var inputField = document.createElement("input");
      var inputFieldLabel = document.createElement("label");
      inputField.setAttribute("type", dat.fieldType);
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
      inputFieldLabel.innerText =
        checkBoxValue.checkboxName.charAt(0).toUpperCase() +
        dat.fieldName.slice(1).split("_").join(" ");
      divCheckBox.append(inputField, inputFieldLabel);
      divForm.append(divCheckBox);
    });
  } else if (dat.fieldType === "radio") {
    var inputFieldPara = document.createElement("p");
    inputFieldPara.innerText =
      dat.fieldName.charAt(0).toUpperCase() +
      dat.fieldName.slice(1).split("_").join(" ");
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
      inputFieldLabel.innerText =
        radioValue.radioName.charAt(0).toUpperCase() +
        dat.fieldName.slice(1).split("_").join(" ");
      divRadioBox.append(inputField, inputFieldLabel);
      divForm.append(divRadioBox);
    });
  } else {
    var inputField = document.createElement("input");
    var inputFieldLabel = document.createElement("label");
    inputFieldLabel.setAttribute("for", dat.fieldName.split(" ").join(""));
    inputFieldLabel.innerText =
      dat.fieldName.charAt(0).toUpperCase() +
      dat.fieldName.slice(1).split("_").join(" ");
    inputField.setAttribute("type", dat.fieldType);
    inputField.setAttribute("class", dat.fieldName);
    inputField.setAttribute(
      "placeholder",
      dat.fieldName.charAt(0).toUpperCase() +
        dat.fieldName.slice(1).split("_").join(" ")
    );
    inputField.setAttribute("name", dat.fieldName);
    divForm.append(inputFieldLabel, inputField);
  }
};

// function to render the form
var renderForm = (formFieldsArray) => {
  var divForm = document.querySelector(".formDemo");
  removeAllChildNodes(divForm);
  var divCheckBox = document.createElement("div");
  var divRadioBox = document.createElement("div");
  formFieldsArray.map((dat) => {
    commonRenderForm(dat, divForm, divCheckBox, divRadioBox);
  });
};

export { renderForm };
