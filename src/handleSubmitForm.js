const getParameters = (formData) => {
  const newParameters = [];
  for (const [key, value] of formData) {
    newParameters.push(`${key}=${value}`);
  }
  return newParameters.join("&");
};

const handleSubmitForm = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const urlFormParameters = getParameters(formData);

  await fetch("/contact.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  })
    .then(async () => {
      await fetch(`/.netlify/functions/dbConnections?${urlFormParameters}`)
        .then((response) => {
          if (response.status === 200) {
            window.alert("Your form information was successfully submitted");
            document.getElementsByTagName("form").reset()
          }
          return;
        })
        .catch((error) => {
          throw error.message;
        });
    })
    .catch((error) => window.alert(error.message)
    );
};

document.querySelector("form").addEventListener("submit", handleSubmitForm);
