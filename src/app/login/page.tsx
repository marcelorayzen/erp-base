"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("owner@demo.local");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (!result?.ok) {
      setError("Credenciais inválidas");
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <main className="mx-auto mt-16 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-xl font-semibold">Entrar no ERPsb</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block">E-mail</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block">Senha</span>
          <input
            type="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button className="w-full rounded-md bg-teal-700 px-4 py-2 text-white" type="submit">
          Entrar
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </main>
  );
}
