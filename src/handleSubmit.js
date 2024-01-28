const getParameters = (data) => {
  //let paramStr = "";
  let i = 0;
  const newParams = [];
  for (const [key, value] of data) {
    // if (i < 2) paramStr += `${key}=${value}&`;
    // else paramStr += `${key}=${value}`;
    // i++;
    newParams.push(`${key}=${value}`);
  }
  return newParams.join("&");
};

const handleSubmitForm = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const urlFormParameters = getParameters(formData);
  console.log(urlFormParameters);

  await fetch("/contact.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  })
    .then(async () => {
      await fetch(
        `/.netlify/functions/dbConnections?${urlFormParameters}`
      ).then((response) => {
        if (response.status == 200) window.alert("Sent");
        response.json();
      });
    })
    .catch((error) => window.alert(error, error.message));
};

document.querySelector("form").addEventListener("submit", handleSubmitForm);
