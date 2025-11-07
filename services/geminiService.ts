
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const fetchQuizData = async (): Promise<QuizQuestion[]> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not configured in environment variables.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `일상생활에서 자주 쓰이는 한국어 단어 10개와 그에 대한 간단한 설명을 JSON 형식으로 제공해줘. 각 객체는 'word'와 'definition' 키를 가져야 해.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: {
                type: Type.STRING,
                description: 'The Korean word.',
              },
              definition: {
                type: Type.STRING,
                description: 'The definition of the word in Korean.',
              },
            },
            required: ["word", "definition"]
          },
        },
      },
    });

    const jsonString = response.text;
    const parsedData = JSON.parse(jsonString);

    if (Array.isArray(parsedData) && parsedData.every(item => 'word' in item && 'definition' in item)) {
      return parsedData as QuizQuestion[];
    } else {
      console.error("Invalid data structure received from API:", parsedData);
      throw new Error("API로부터 유효하지 않은 형식의 데이터를 받았습니다.");
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw new Error("퀴즈 데이터를 가져오는 데 실패했습니다. API 키를 확인하거나 나중에 다시 시도해주세요.");
  }
};

export default fetchQuizData;
