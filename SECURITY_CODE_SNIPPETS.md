# 🔐 Security Code Snippets - Copy/Paste Reference

This file contains all the key security functions implemented in the audit.

---

## Rate Limiter Class (Add to any file)

```typescript
// Use this in any auth file that needs rate limiting
class RateLimiter {
  private attempts: Record<string, number[]> = {};
  private MAX_ATTEMPTS = 5;
  private WINDOW_MS = 60 * 1000; // 1 minute

  isAllowed(key: string): boolean {
    const now = Date.now();
    if (!this.attempts[key]) {
      this.attempts[key] = [];
    }

    // Remove old attempts outside window
    this.attempts[key] = this.attempts[key].filter(
      (time) => now - time < this.WINDOW_MS,
    );

    // Check if exceeded max attempts
    if (this.attempts[key].length >= this.MAX_ATTEMPTS) {
      return false;
    }

    // Record this attempt
    this.attempts[key].push(now);
    return true;
  }
}

const rateLimiter = new RateLimiter();

// Usage in login:
if (!rateLimiter.isAllowed(`login_${email}`)) {
  setError("Too many login attempts. Please try again later.");
  return;
}
```

---

## Email Validation

```typescript
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
};

// Usage:
if (!validateEmail(email)) {
  setError("Invalid email address");
  return;
}
```

---

## Password Strength Validation

```typescript
const validatePassword = (password: string): string | null => {
  if (password.length < 12) return "Password must be at least 12 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  if (!/[!@#$%^&*]/.test(password))
    return "Password must contain special character (!@#$%^&*)";
  return null;
};

// Usage:
const passwordError = validatePassword(password);
if (passwordError) {
  setError(passwordError);
  return;
}
```

---

## Name Validation (XSS Prevention)

```typescript
const validateName = (name: string): boolean => {
  // Only alphanumeric, spaces, hyphens, apostrophes
  return /^[a-zA-Z\s\-']{2,100}$/.test(name.trim());
};

// Usage:
if (!validateName(name)) {
  setError("Name can only contain letters, spaces, hyphens, and apostrophes");
  return;
}
```

---

## Phone Validation

```typescript
const validatePhone = (phone: string): boolean => {
  // Digits, spaces, +, -, parentheses only
  return /^[\d\s+\-()]{10,20}$/.test(phone.trim());
};

// Usage:
if (!validatePhone(phone)) {
  setError("Invalid phone number");
  return;
}
```

---

## Input Sanitization

```typescript
const sanitizeInput = (input: string): string => {
  // Trim whitespace and limit length
  return input.trim().substring(0, 100);
};

// Usage when submitting:
const { error } = await supabase.auth.signUp({
  email: email.toLowerCase(),
  password,
  options: {
    data: {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
    },
  },
});
```

---

## Redirect Validation

```typescript
// Define allowed paths
const ALLOWED_REDIRECT_PATHS = [
  "/",
  "/courses",
  "/notes",
  "/roadmap",
  "/about",
];

// Validate before redirect
let safeRedirect = "/";
if (redirect && ALLOWED_REDIRECT_PATHS.includes(redirect)) {
  safeRedirect = redirect;
}

router.push(safeRedirect);
```

---

## Role-Based Access Control

```typescript
useEffect(() => {
  const checkAdmin = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      router.push("/login?redirect=/admin");
      return;
    }

    const userRole = data.user.user_metadata?.role;
    if (userRole !== "admin") {
      console.warn(
        `[SECURITY] Unauthorized admin access by ${data.user.email}`,
      );
      router.push("/");
      return;
    }

    setIsAuthorized(true);
    setLoading(false);
  };

  checkAdmin();
}, [router]);
```

---

## Generic Error Messages

```typescript
// DON'T: Reveal specific errors
if (error) {
  alert(error.message); // ❌ "User already registered"
}

// DO: Use generic messages
if (error) {
  if (error.message.includes("already registered")) {
    setMsg("This email is already registered. Please login instead.");
  } else {
    setMsg("Registration failed. Please try again.");
  }
}

// LOGIN - Always use generic for wrong credentials
if (authError) {
  setError("Invalid credentials"); // ✅ Generic
  // NOT: "Wrong password" or "User not found"
}
```

---

## Secure OAuth (No User Redirects)

```typescript
// ❌ WRONG - User-controlled redirect
const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}${redirect || "/"}`, // UNSAFE
  },
});

// ✅ CORRECT - Fixed redirect
const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/`, // SAFE
  },
});
```

---

## Error Display Component

```typescript
{error && (
  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
    {error}
  </div>
)}
```

---

## Input Field with Validation

```typescript
{/* Email with validation */}
<div className="mb-4">
  <input
    type="email"
    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 focus:border-blue-600"
    placeholder="your@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    disabled={loading}
    maxLength={255}
  />
  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
</div>

{/* Password with requirements */}
<div className="relative mb-4">
  <input
    type={show ? "text" : "password"}
    className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 focus:border-blue-600 pr-10"
    placeholder="Password (min 12 chars, uppercase, number, special char)"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={loading}
    maxLength={128}
  />
  <button
    type="button"
    onClick={() => setShow(!show)}
    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
    disabled={loading}
  >
    {show ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
</div>
```

---

## Form Validation Before Submit

```typescript
const handleRegister = async () => {
  const newErrors: Record<string, string> = {};

  // Validate all fields
  if (!name.trim()) {
    newErrors.name = "Name is required";
  } else if (!validateName(name)) {
    newErrors.name =
      "Name can only contain letters, spaces, hyphens, and apostrophes";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(email)) {
    newErrors.email = "Invalid email address";
  }

  if (!phone.trim()) {
    newErrors.phone = "Phone is required";
  } else if (!validatePhone(phone)) {
    newErrors.phone = "Invalid phone number";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else {
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
  }

  // If any errors, show and return
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // All valid, proceed with submission
  setLoading(true);
  // ... rest of signup logic
};
```

---

## Button with Validation State

```typescript
<button
  onClick={handleRegister}
  disabled={loading || !name || !email || !phone || !password}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 font-semibold disabled:opacity-50"
>
  {loading ? "Creating..." : "Sign up"}
</button>
```

---

## Input Length Limits (HTML)

```typescript
{/* All inputs should have maxLength */}
<input
  type="email"
  maxLength={255}      // Email max 255 chars
  value={email}
/>

<input
  type="text"
  maxLength={100}      // Name max 100 chars
  value={name}
/>

<input
  type="tel"
  maxLength={20}       // Phone max 20 chars
  value={phone}
/>

<input
  type="password"
  maxLength={128}      // Password max 128 chars
  value={password}
/>
```

---

## Supabase RLS Policy (SQL)

```sql
-- Add this to Supabase SQL Editor

-- Only admins can insert courses
CREATE POLICY "Only admins can insert courses" ON courses
  FOR INSERT
  TO authenticated
  USING (
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

-- Only admins can delete courses
CREATE POLICY "Only admins can delete courses" ON courses
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

-- Only admins can update courses
CREATE POLICY "Only admins can update courses" ON courses
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

-- Anyone can read courses
CREATE POLICY "Anyone can read courses" ON courses
  FOR SELECT
  TO authenticated, anon
  USING (true);
```

---

## Security Headers (next.config.ts)

```typescript
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## Environment Variables (.env.local)

```bash
# Ensure these are set
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# These should NOT be in .env.local (keep on server only)
# SUPABASE_SERVICE_KEY=your-service-key (server-side only)
```

---

## .gitignore (Ensure these are ignored)

```bash
# Environment
.env.local
.env.*.local
.env

# Node
node_modules/
.npm
.node_repl_history

# Build
.next/
dist/
build/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

---

## TypeScript Types

```typescript
interface ValidationErrors {
  [key: string]: string;
}

interface LoginFormState {
  email: string;
  password: string;
  loading: boolean;
  error: string;
}

interface RegisterFormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  loading: boolean;
  errors: ValidationErrors;
  msg: string;
}

interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    role?: string;
    name?: string;
    phone?: string;
  };
  email_confirmed_at?: string;
}
```

---

## Testing Helpers

```typescript
// Test open redirect vulnerability
export const testOpenRedirect = (url: string) => {
  const isAllowed = ALLOWED_REDIRECT_PATHS.includes(url);
  console.log(`Redirect to ${url}: ${isAllowed ? "✅ ALLOWED" : "❌ BLOCKED"}`);
};

// Test rate limiting
export const testRateLimiting = async (attempts: number) => {
  const limiter = new RateLimiter();
  for (let i = 0; i < attempts; i++) {
    const allowed = limiter.isAllowed("test_key");
    console.log(`Attempt ${i + 1}: ${allowed ? "✅ ALLOWED" : "❌ BLOCKED"}`);
  }
};

// Test validation functions
export const testValidation = () => {
  console.assert(validateEmail("test@example.com"), "Valid email");
  console.assert(!validateEmail("invalid"), "Invalid email");

  console.assert(validateName("John Doe"), "Valid name");
  console.assert(!validateName("<script>"), "Invalid name");

  console.assert(!validatePassword("weak"), "Weak password blocked");
  console.assert(
    validatePassword("SecurePass123!") === null,
    "Strong password allowed",
  );
};
```

---

## Quick Reference Table

| Vulnerability  | Function                        | Where                 |
| -------------- | ------------------------------- | --------------------- |
| Brute Force    | `RateLimiter`                   | app/login/page.tsx    |
| Open Redirect  | `ALLOWED_REDIRECT_PATHS`        | app/login/page.tsx    |
| Injection      | `validateName`, `validateEmail` | app/register/page.tsx |
| Weak Passwords | `validatePassword`              | app/register/page.tsx |
| Phishing       | `validateEmail`                 | app/login/page.tsx    |
| Access Control | `checkAdmin` useEffect          | app/admin/page.tsx    |
| Enumeration    | Generic error messages          | login & register      |
| Data Exposure  | Removed console.log             | app/admin/page.tsx    |

---

Generated: January 20, 2026
