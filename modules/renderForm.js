// import triangleImage from "../assets/images/triangle_up.svg";

// handle up adown arrow clicks to update the form field array
const handleArrowUpDown = (arrowUpDown) => {
  alert(`${arrowUpDown} clicked`);
};

//function to remove all child nodes inside div
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const renderCheckboxRadio = (dat, divForm, divCheckBox, checkBoxValues) => {
  var inputFieldPara = document.createElement("p");
  inputFieldPara.innerText =
    dat.fieldName.charAt(0).toUpperCase() +
    dat.fieldName.slice(1).split("_").join(" ");
  divForm.append(inputFieldPara);
  checkBoxValues.map((checkBoxValue) => {
    console.log("radioName", typeof checkBoxValue.checkboxName === "undefined");
    var inputField = document.createElement("input");
    var inputFieldLabel = document.createElement("label");
    inputField.setAttribute("type", dat.fieldType);
    inputField.setAttribute(
      "id",
      `${
        typeof checkBoxValue.checkboxName === "undefined"
          ? checkBoxValue.radioName.split(" ").join("")
          : checkBoxValue.checkboxName.split(" ").join("")
      }-${dat.fieldType}`
    );
    inputField.setAttribute(
      "class",
      typeof checkBoxValue.checkboxName === "undefined"
        ? checkBoxValue.radioName
        : checkBoxValue.checkboxName
    );
    inputField.setAttribute(
      "name",
      typeof checkBoxValue.checkboxName === "undefined"
        ? dat.fieldName
        : checkBoxValue.checkboxName
    );
    inputField.setAttribute(
      "value",
      typeof checkBoxValue.checkboxName === "undefined"
        ? checkBoxValue.radioName
        : checkBoxValue.checkboxName
    );
    inputFieldLabel.setAttribute(
      "for",
      `${
        typeof checkBoxValue.checkboxName === "undefined"
          ? checkBoxValue.radioName.split(" ").join("")
          : checkBoxValue.checkboxName.split(" ").join("")
      }-${dat.fieldType}`
    );
    inputFieldLabel.innerText =
      typeof checkBoxValue.checkboxName === "undefined"
        ? checkBoxValue.radioName.charAt(0).toUpperCase() +
          checkBoxValue.radioName.slice(1).split("_").join(" ")
        : checkBoxValue.checkboxName.charAt(0).toUpperCase() +
          checkBoxValue.checkboxName.slice(1).split("_").join(" ");
    divCheckBox.append(inputField, inputFieldLabel);
    divForm.append(divCheckBox);
  });
};

// common funcion to render form
var commonRenderForm = (dat, divForm, divCheckBox, divRadioBox) => {
  if (dat.fieldType === "checkbox") {
    renderCheckboxRadio(dat, divForm, divCheckBox, dat.checkBoxValues);
  } else if (dat.fieldType === "radio") {
    renderCheckboxRadio(dat, divForm, divRadioBox, dat.radioValues);
  } else {
    var inputDivButton = document.createElement("div");
    var editDeleteButtons = document.createElement("div");
    var editButton = document.createElement("img");
    var deleteButton = document.createElement("img");
    var arrowButtons = document.createElement("div");
    var arrowUp = document.createElement("img");
    var arrowDown = document.createElement("img");
    var inputDiv = document.createElement("div");
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
    inputDivButton.setAttribute("class", "inputDivButton");
    editButton.setAttribute("src", "../assets/images/edit.svg");
    deleteButton.setAttribute("src", "../assets/images/close.svg");
    arrowUp.setAttribute("src", "../assets/images/triangle_up.svg");
    arrowUp.addEventListener("click", () => handleArrowUpDown("arrowUp"));
    arrowDown.setAttribute("src", "../assets/images/triangle_up.svg");
    arrowDown.addEventListener("click", () => handleArrowUpDown("arrowDown"));
    editDeleteButtons.append(editButton, deleteButton);
    arrowButtons.append(arrowUp, arrowDown);
    inputDiv.append(inputFieldLabel, inputField);
    inputDivButton.append(editDeleteButtons, inputDiv, arrowButtons);
    divForm.append(inputDivButton);
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
