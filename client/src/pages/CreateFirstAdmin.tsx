import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function CreateFirstAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const createAdmin = trpc.adminAuth.createFirstAdmin.useMutation({
    onSuccess: () => {
      setMessage("✅ Admin account created successfully! You can now login at /admin/login");
    },
    onError: (error) => {
      setMessage(`❌ Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAdmin.mutate({ username, password, email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#523DCB] via-[#523DCB] to-[#523DCB] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6">Create First Admin</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={createAdmin.isPending}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {createAdmin.isPending ? "Creating..." : "Create Admin Account"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-4 rounded-lg bg-white/20 text-white">
            {message}
          </div>
        )}

        <div className="mt-6 text-sm text-white/70">
          <p>⚠️ This page should be removed after creating the first admin account.</p>
        </div>
      </div>
    </div>
  );
}
