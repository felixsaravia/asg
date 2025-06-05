
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { API_KEY_ERROR_MESSAGE, GENERIC_API_ERROR_MESSAGE } from '../constants';

// Se reemplaza la obtención de la API_KEY desde process.env con la clave proporcionada.
const API_KEY = "AIzaSyAD1PJoy6OLYee8hf8bsbqdwPXd49su8DA";

const getAiClient = () => {
  if (!API_KEY) {
    // Esta comprobación ahora es menos probable que falle, ya que la clave está codificada.
    console.error(API_KEY_ERROR_MESSAGE);
    throw new Error(API_KEY_ERROR_MESSAGE);
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const fetchMotivationalQuote = async (): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: [{
        parts: [{ text: "Genera una frase motivacional corta y poderosa sobre la autoaceptación y la superación de la ansiedad social, en español. Máximo 20 palabras." }]
      }],
      config: {
        temperature: 0.7,
        topK: 10,
        topP: 0.9,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching motivational quote:", error);
    // Fallback quote
    return "Cada paso, por pequeño que sea, es un progreso. Confía en ti.";
  }
};

export const generateCbtGuidance = async (userInput: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      El usuario está trabajando en la reestructuración cognitiva y ha proporcionado la siguiente información: "${userInput}".
      Actúa como un terapeuta de TCC amigable y comprensivo. 
      Ofrece una breve reflexión (2-3 frases) que valide sus sentimientos y luego sugiere una pregunta o perspectiva alternativa para ayudarle a desafiar un posible pensamiento negativo o distorsión cognitiva.
      Responde en español.
    `;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.6,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating CBT guidance:", error);
    return GENERIC_API_ERROR_MESSAGE;
  }
};

export const simulateRolePlayResponse = async (scenario: string, userAnswer: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Simula una conversación para practicar habilidades sociales.
      Escenario: ${scenario}
      Respuesta del usuario: "${userAnswer}"
      Actúa como la otra persona en la conversación. Tu respuesta debe ser breve, natural y fomentar la continuación de la interacción.
      Responde en español.
    `;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.8,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error simulating role play response:", error);
    return "Hmm, no estoy seguro de qué decir. ¿Podrías repetirlo?";
  }
};
