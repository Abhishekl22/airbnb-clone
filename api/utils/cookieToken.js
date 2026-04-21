const cookieToken = (user, res, statusCode = 200) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_TIME || 7) * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,  // Changed to allow client-side access
        secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
        sameSite: 'lax',  // Changed from 'none' to 'lax' for better compatibility
        path: '/',
        domain: 'localhost'
    };

    // Remove sensitive data from user object
    user = user.toObject();
    user.password = undefined;
    
    // Send response with token in both cookie and response body
    res.status(statusCode)
       .cookie("token", token, options)
       .json({
           success: true,
           token,        // Sending token in response body
           user          // Sending user data in response body
       });
};

module.exports = cookieToken;