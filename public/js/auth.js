// Initialize Supabase client
const supabaseClient = supabase.createClient(
  window.supabaseUrl,
  window.supabaseAnonKey
);

// Check auth state and update UI
supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log(session);
  if (!session) {
    const header = document.getElementById('header');
    if (header) {
      header.classList.add('hidden');
    }
  } else {
    const header = document.getElementById('header');
    if (header) {
      header.classList.remove('hidden');
      document.getElementById('userEmail').textContent = session.user.email;
    }
  }
});

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = '/signin';
}

async function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error');

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    errorDiv.textContent = error.message;
  } else {
    window.location.href = '/';
  }
}

async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error');
  const successDiv = document.getElementById('success');

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    errorDiv.textContent = error.message;
    successDiv.textContent = '';
  } else {
    errorDiv.textContent = '';
    successDiv.textContent = 'Check your email for the confirmation link!';
  }
}
