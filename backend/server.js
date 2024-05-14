const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo', // Use a valid model ID
      messages: [{ role: 'user', content: userMessage }],
    }, {
      headers: {
        'Authorization': `Bearer sk-proj-C4h5WktCpnIoF9rUSR2eT3BlbkFJNnllG6O89sqoY3D3tHeY`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Error processing your request');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
