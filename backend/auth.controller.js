const register = (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if(existingUser) {
        return res.status(409).json({message: 'User already exists'});
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = {username, email, password: passwordHash , isEmailVerified: false};

    users.push(newUser);
    res.status(201).json({message: 'User registered successfully', user: newUser});

}