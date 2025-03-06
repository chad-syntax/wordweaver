export async function transcribeAudio(audioData: string): Promise<string> {
  try {
    // Convert base64 to buffer and create form data
    const audioBuffer = Buffer.from(audioData, 'base64');
    const formData = new FormData();
    formData.append('audio_file', new Blob([audioBuffer]));

    // Call the Whisper API service
    const whisperResponse = await fetch('http://localhost:9000/asr', {
      method: 'POST',
      body: formData,
    });

    if (!whisperResponse.ok) {
      try {
        const response = await whisperResponse.text();
        console.error('Whisper Error response text:', response);
      } catch {
        console.log('Whisper Error', whisperResponse);
      }

      throw new Error(`HTTP error! status: ${whisperResponse.status}`);
    }

    const transcription = await whisperResponse.text();

    return transcription;
  } catch (error) {
    console.error('Transcription failed:', error);
    throw error;
  }
}
