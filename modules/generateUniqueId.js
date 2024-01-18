//function to generate unique ID
var generateUniqueId = () => {
  var id = crypto.randomUUID();
  return id;
};

export { generateUniqueId };
