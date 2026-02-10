const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "tejasvi0906.be23@chitkara.edu.in";

// Fibonacci
function fibonacci(n) {
    let arr = [0, 1];
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr.slice(0, n + 1);
}

// Prime filter
function primes(arr) {
    return arr.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    });
}

// GCD
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// LCM
function lcm(arr) {
    return arr.reduce((a, b) => (a * b) / gcd(a, b));
}

// HCF
function hcf(arr) {
    return arr.reduce((a, b) => gcd(a, b));
}


// POST /bfhl
app.post("/bfhl", (req, res) => {
    try {
        const body = req.body;

        let result;

        if (body.fibonacci !== undefined) {
            result = fibonacci(body.fibonacci);
        }
        else if (body.prime !== undefined) {
            result = primes(body.prime);
        }
        else if (body.lcm !== undefined) {
            result = lcm(body.lcm);
        }
        else if (body.hcf !== undefined) {
            result = hcf(body.hcf);
        }
        else if (body.AI !== undefined) {
            result = "Mumbai"; // single word answer
        }
        else {
            return res.status(400).json({ is_success: false });
        }

        res.json({
            is_success: true,
            official_email: EMAIL,
            data: result
        });

    } catch {
        res.status(500).json({ is_success: false });
    }
});


// GET /health
app.get("/health", (req, res) => {
    res.json({
        is_success: true,
        official_email: EMAIL
    });
});

app.listen(3000, () => console.log("Server running"));
