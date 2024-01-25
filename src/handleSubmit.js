const handleSubmit = async (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);
  const urlFormParam = paramCreator(formData);
  console.log(process.env.MONGODB_URI);
  await fetch("/contact.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  })
    .then(async () => {
      const res = await fetch(
        `/.netlify/functions/dbConnections?${urlFormParam}`
      ).then((response) => {
        if (response.status == 200) window.alert("Sent");
        response.json();
      });
    })
    .catch((error) => alert(error));
};

document.querySelector("form").addEventListener("submit", handleSubmit);

const paramCreator = (data) => {
  let paramStr = "";
  const keyPos = Object.keys(data);
  let count = 0;
  for (const [key, value] of data) {
    if (count < 2) paramStr += `${key}=${value}&`;
    else paramStr += `${key}=${value}`;
    count++;
  }
  return paramStr;
};
