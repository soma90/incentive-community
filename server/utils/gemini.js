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
        socket.emit("content", "hope this is useful :)");
        socket.disconnect();
      }

      return { result: true };
    } catch (err) {
      console.error("Error generating content:", err.message);
      return { error: err };
    }
  },
};

/* async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GENAIKEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });

  const prompt = "김건희 디올백 사건";

  const result = await model.generateContentStream(prompt);

  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
} */

/* const writer = async (prompt, callback) => {
  console.log(11);
  // 텍스트 전용 입력의 경우 gemini-pro 모델 사용
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings,
  });
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    callback(chunkText);
  }
};

module.exports = writer; */

/* async function run() {
  // 텍스트 전용 입력의 경우 gemini-pro 모델 사용
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings,
  });

  const prompt = "김건희 디올백 사건";

  const result = await model.generateContentStream(prompt);

  let text = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
}

run(); */

/* async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "탕수육이 머야?"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
} */

/* 
const server = http.createServer(app);
const io = socketIo(server, {
  cors: corsOptions, // Apply the same CORS options to Socket.IO
});
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("generate", (prompt) => {
    console.log("Generating content for prompt:", prompt);
    model
      .generateContentStream(prompt)
      .then(async (result) => {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log(chunkText);
          // Send chunkText to the client
          socket.emit("content", chunkText);
        }
        // Indicate the end of the stream
        socket.emit("content", "End of Content");
      })
      .catch((err) => {
        console.error("Error generating content:", err.message);
      });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
 */
