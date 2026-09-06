import { Eye, EyeOff, Lock, LogIn, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dashboardFor,
  getCurrentAdmin,
  loginAdmin,
} from "../data/adminAuth.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const usernameRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    getCurrentAdmin()
      .then((user) => navigate(dashboardFor(user), { replace: true }))
      .catch(() => {
        setCheckingAuth(false);
        window.setTimeout(() => usernameRef.current?.focus(), 100);
      });
  }, [navigate]);

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const result = await loginAdmin(form.username.trim(), form.password);

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate(dashboardFor(result.data), { replace: true });
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
          <p className="text-sm font-medium text-slate-500">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-heading">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            School Admin Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Sign in to portal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Use your admin or developer account.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm"
          >
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="font-medium text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={submitForm} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-username"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              id="admin-username"
              name="username"
              type="text"
              value={form.username}
              onChange={updateField}
              autoComplete="username"
              placeholder="admin or developer"
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={updateField}
                autoComplete="current-password"
                placeholder="Enter password"
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f4d43] disabled:pointer-events-none disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign in
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
