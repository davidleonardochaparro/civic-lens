const WINDOW_MS = 10_000;
const MAX_REQUESTS = 30;
let requests = {};

const rateLimiter = (req, res, next) => {
    let ip = req.ip;
    let now = Date.now();
    
    // Hash map creation for every IP
    if (!requests[ip]) { 
        requests[ip] = {
            count: 1,
            startTime: now
        };

        return next();
    }

    if (now - requests[ip].startTime >= WINDOW_MS) {
        requests[ip]={
            count: 1,
            startTime: now
        };
    } else {
        requests[ip].count++;
    }

    if (requests[ip].count > MAX_REQUESTS) {
        return res.status(429).json({
            message: "Too many requests"
        });
    }
    
    next();
}
module.exports = rateLimiter;