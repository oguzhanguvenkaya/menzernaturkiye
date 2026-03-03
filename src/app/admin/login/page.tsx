"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Geçersiz şifre");
      }
    } catch (err) {
      setError("Bir hata oluştu: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#1d1d1d] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-[#1d1d1d] uppercase tracking-wider">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Menzerna Türkiye Yönetim
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#af1d1f] transition-colors"
                placeholder="Admin şifresini girin"
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-[#af1d1f] font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#af1d1f] hover:bg-red-700 disabled:opacity-50 text-white py-2.5 font-bold uppercase tracking-widest text-sm transition-colors"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
