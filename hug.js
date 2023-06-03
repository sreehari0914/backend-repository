async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  query({ "inputs": "my dadpassedaway" }).then((response) => {
    console.log(JSON.stringify(response));
  }).catch((error) => {
    console.error(error);
  });
  