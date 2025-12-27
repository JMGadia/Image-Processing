const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const supabase = require('../supabaseClient');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Validation Checks
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    return res.status(400).json({ error: 'Only @gmail.com addresses are allowed.' });
  }
  if (username.length < 6) {
    return res.status(400).json({ error: 'Username must be at least 6 characters long.' });
  }

  try {
    // 2. Check if Email OR Username already exists in your table
    const { data: existingUser } = await supabase
      .from('accounts')
      .select('email, username')
      .or(`email.eq.${email},username.eq.${username}`)
      .maybeSingle();

    if (existingUser) {
      const conflict = existingUser.email === email ? 'Email' : 'Username';
      return res.status(400).json({ error: `${conflict} already exists.` });
    }

    // 3. STEP A: Register in Supabase Auth (Sends Verification Email)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return res.status(400).json({ error: authError.message });

    // 4. STEP B: Hash Password and Create Account in your table
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error: insertError } = await supabase
      .from('accounts')
      .insert([{
        username,
        email,
        password: hashedPassword,
        role: 'user'
      }]);

    if (insertError) throw insertError;

    res.status(201).json({ message: 'Account created! Please verify your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;