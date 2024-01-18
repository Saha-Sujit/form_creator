//function to generate unique ID
export var generateUniqueId = () => {
  var id = crypto.randomUUID();
  return id;
};
