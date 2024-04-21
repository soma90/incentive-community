const { GoogleGenerativeAI } = require("@google/generative-ai");
const aiConfig = require("../config/aiConfig");

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

const model = genAI.getGenerativeModel({
  model: aiConfig.gemini.textOnlyModel,
  safetySettings: aiConfig.gemini.safetySettings,
});

module.exports = {
  writer: async (prompt, socket) => {
    let result = {};
    try {
      const result = await model.generateContentStream(prompt);
      let text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;

        if (socket) {
          try {
            socket.emit("content", chunkText);
          } catch (err) {
            console.error("Error emitting content:", err.message);
            result.error = err;
            break;
          }
        }
      }

      if (socket) {
        socket.emit(
          "end_content",
          result.error ? result.error : "end content :)"
        );
        socket.disconnect();
      }
    } catch (err) {
      console.error("Error generating content:", err.message);
      result.error = err;
    }

    return result;
  },
};
