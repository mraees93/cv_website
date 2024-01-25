const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("start");
  const myForm = event.target;
  const formData = new FormData(myForm);
  const urlFormParam = paramCreator(formData);
  console.log(formData);

  await fetch("/contact.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  })
    .then(async () => {
      console.log("inside then", urlFormParam);
      //   await fetch(`/.netlify/functions/dbConnections?${urlFormParam}`).then(
      //     (response) => {
      //       console.log(response);
      //       if (response.status == 200) window.alert("Sent");
      //       response.json();
      //     }
      //   );
      const database = (await clientPromise).db(process.env.MONGODB_DB);
      const collection = database.collection(process.env.MONGODB_COLLECTION);

      collection.insertOne(urlFormParam);
      console.log("after then");
    })
    .catch((error) => window.alert(error, error.message));
};

document.querySelector("form").addEventListener("submit", handleSubmit);

const paramCreator = (data) => {
  let paramStr = {};
  const keyPos = Object.keys(data);
  let count = 0;
  for (const [key, value] of data) {
    // if (count < 2) paramStr += `${key}=${value}&`;
    // else paramStr += `${key}=${value}`;
    // count++;
    paramStr[key] = value;
  }
  return paramStr;
};
