# Reflectory 🧠💡

Welcome to Reflectory, an AI-powered mental health improvement application, meticulously crafted for the Hack United hackathon in August 2023.

## Project Overview 🎯

Reflectory harnesses the power of OpenAI's GPT-3 to offer insights and suggestions based on user inputs. By analyzing a user's sentiments, the app generates thought-provoking questions, provides tips for improvement, and offers inspiring quotes. Our goal is to create a non-judgmental, AI-powered space where individuals can reflect on their feelings and gain new perspectives. 

## Key Features 🔑

- AI-powered analysis and response.
- Generates personalized, relevant insights.
- Offers tips for mental wellness.
- Shares inspiring quotes to uplift mood.
- Respects user privacy by not storing any data.

## Getting Started 🚀

Follow these steps to set up Reflectory locally for development and testing purposes:

### Prerequisites

- Node.js installed on your system.
- An OpenAI API key.

### Steps

1. **Clone the Repository**

   At the terminal, execute the following command to clone the repo:

   ```bash
   git clone https://github.com/Dinervc/Reflectory.git
   
2. **Set Up Environment Variables**

   - Create a `.env`file at the root of the project.
   - Set the `OPENAI_KEY` variable to your OpenAI key (replace the comment).
     ```
     OPENAI_API_KEY=#OPENAI_KEY

3. **Start the Server**

   - Navigate to the root of the project using `cd Reflectory`
   - Install the required Node.js dependencies with `npm install`
   - Start the server with `node server.js`

4. **Open the Application**

   Visit `http://localhost:3000` in your browser to start using Reflectory!

## License 📜

This project is licensed under the MIT License.

## Acknowledgments 🙏

Reflectory was made possible thanks to the robust AI models provided by [OpenAI](https://openai.com/) and the motivation provided by Hack United.

*Note: Reflectory is a tool meant to promote self-reflection and mental well-being, and is not a replacement for professional mental health services.*
