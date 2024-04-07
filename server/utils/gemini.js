const { GoogleGenerativeAI } = require("@google/generative-ai");
const aiConfig = require("../config/aiConfig");

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

const model = genAI.getGenerativeModel({
  model: aiConfig.gemini.textOnlyModel,
  safetySettings: aiConfig.gemini.safetySettings,
});

module.exports = {
  writer: async (prompt, socket) => {
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
            console.error("Error emitting content:", error.message);
            return { error: err };
          }
        }
      }

      if (socket) {
        socket.emit("content", "end content :)");
        socket.disconnect();
      }

      return { result: true };
    } catch (err) {
      console.error("Error generating content:", err.message);
      return { error: err };
    }
  },
};
