// Audio recording logic
let mediaRecorder;
let audioChunks = [];

async function startRecording() {
  try {
    // Check authentication first
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    if (!session) {
      window.location.href = '/signin';
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
    mediaRecorder.start();

    const status = document.getElementById('status');
    status.textContent = 'Recording...';
    status.className = 'status recording';
  } catch (err) {
    console.error('Error starting recording:', err);
    const status = document.getElementById('status');
    status.textContent = 'Error starting recording';
    status.className = 'status error';
  }
}

async function stopRecording() {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
  mediaRecorder.onstop = async () => {
    try {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      const status = document.getElementById('status');
      status.textContent = 'Processing...';
      status.className = 'status processing';

      const response = await fetch('/process-audio', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      const result = await response.json();
      status.textContent = `Processing started! Job ID: ${result.jobId}`;
      status.className = 'status processing';
    } catch (err) {
      console.error('Error uploading audio:', err);
      const status = document.getElementById('status');
      status.textContent = 'Error uploading audio';
      status.className = 'status error';
    }
  };
}
