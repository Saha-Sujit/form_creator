// import triangleImage from "../assets/images/triangle_up.svg";

// handle up down arrow clicks to update the form field array
const handleArrowUpDown = (arrowUpDown, index) => {
  alert(`${arrowUpDown} clicked and your index is ${index}`);
};

//function to remove all child nodes inside div
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// optimized render function specially for checkbox and radio in one function
const renderCheckboxRadio = (
  dat,
  divForm,
  divCheckBox,
  checkBoxRadioValues,
  index
) => {
  var inputFieldPara = document.createElement("p");
  var inputDivButton = document.createElement("div");
  var editDeleteButtons = document.createElement("div");
  var editButton = document.createElement("img");
  var deleteButton = document.createElement("img");
  var arrowButtons = document.createElement("div");
  var arrowUp = document.createElement("img");
  var arrowDown = document.createElement("img");
  var inputDiv = document.createElement("div");
  inputFieldPara.innerText =
    dat.fieldName.charAt(0).toUpperCase() +
    dat.fieldName.slice(1).split("_").join(" ");
  checkBoxRadioValues.map((checkRadioBoxValue) => {
    var inputRadioChecboxDivs = document.createElement("div");
    var inputField = document.createElement("input");
    var inputFieldLabel = document.createElement("label");
    inputField.setAttribute("type", dat.fieldType);
    inputField.setAttribute(
      "id",
      `${
        typeof checkRadioBoxValue.checkboxName === "undefined"
          ? checkRadioBoxValue.radioName.split(" ").join("")
          : checkRadioBoxValue.checkboxName.split(" ").join("")
      }-${dat.fieldType}`
    );
    inputField.setAttribute(
      "class",
      typeof checkRadioBoxValue.checkboxName === "undefined"
        ? checkRadioBoxValue.radioName
        : checkRadioBoxValue.checkboxName
    );
    inputField.setAttribute(
      "name",
      typeof checkRadioBoxValue.checkboxName === "undefined"
        ? dat.fieldName
        : checkRadioBoxValue.checkboxName
    );
    inputField.setAttribute(
      "value",
      typeof checkRadioBoxValue.checkboxName === "undefined"
        ? checkRadioBoxValue.radioName
        : checkRadioBoxValue.checkboxName
    );

    inputField.setAttribute("disabled", true);
    inputFieldLabel.setAttribute(
      "for",
      `${
        typeof checkRadioBoxValue.checkboxName === "undefined"
          ? checkRadioBoxValue.radioName.split(" ").join("")
          : checkRadioBoxValue.checkboxName.split(" ").join("")
      }-${dat.fieldType}`
    );
    inputFieldLabel.innerText =
      typeof checkRadioBoxValue.checkboxName === "undefined"
        ? checkRadioBoxValue.radioName.charAt(0).toUpperCase() +
          checkRadioBoxValue.radioName.slice(1).split("_").join(" ")
        : checkRadioBoxValue.checkboxName.charAt(0).toUpperCase() +
          checkRadioBoxValue.checkboxName.slice(1).split("_").join(" ");
    inputRadioChecboxDivs.append(inputField, inputFieldLabel);
    divCheckBox.append(inputRadioChecboxDivs);
  });
  inputDiv.append(inputFieldPara, divCheckBox);
  inputDivButton.setAttribute("class", "inputDivCheckRadioButton");
  editButton.setAttribute("src", "../assets/images/edit.svg");
  deleteButton.setAttribute("src", "../assets/images/close.svg");
  arrowUp.setAttribute("src", "../assets/images/triangle_up.svg");
  arrowUp.addEventListener("click", () => handleArrowUpDown("arrowUp", index));
  arrowDown.setAttribute("src", "../assets/images/triangle_up.svg");
  arrowDown.addEventListener("click", () =>
    handleArrowUpDown("arrowDown", index)
  );
  editDeleteButtons.append(editButton, deleteButton);
  arrowButtons.append(arrowUp, arrowDown);
  inputDivButton.append(editDeleteButtons, inputDiv, arrowButtons);
  divForm.append(inputDivButton);
};

// common funcion to render form
var commonRenderForm = (dat, divForm, divCheckBox, divRadioBox, index) => {
  if (dat.fieldType === "checkbox") {
    renderCheckboxRadio(dat, divForm, divCheckBox, dat.checkBoxValues, index);
  } else if (dat.fieldType === "radio") {
    renderCheckboxRadio(dat, divForm, divRadioBox, dat.radioValues, index);
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
    inputField.setAttribute("disabled", true);
    inputDivButton.setAttribute("class", "inputDivButton");
    editButton.setAttribute("src", "../assets/images/edit.svg");
    deleteButton.setAttribute("src", "../assets/images/close.svg");
    arrowUp.setAttribute("src", "../assets/images/triangle_up.svg");
    arrowUp.addEventListener("click", () =>
      handleArrowUpDown("arrowUp", index)
    );
    arrowDown.setAttribute("src", "../assets/images/triangle_up.svg");
    arrowDown.addEventListener("click", () =>
      handleArrowUpDown("arrowDown", index)
    );
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
  formFieldsArray.map((dat, index) => {
    commonRenderForm(dat, divForm, divCheckBox, divRadioBox, index);
  });
};

export { renderForm };
