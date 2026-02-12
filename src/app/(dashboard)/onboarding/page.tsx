"use client";

import { useState } from "react";

const questions = [
  "Qual o nome da empresa?",
  "Qual o CNPJ/CPF?",
  "Qual o segmento principal?",
  "Em qual cidade você opera?",
  "Qual seu faturamento mensal médio?"
];

export default function OnboardingPage() {
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [done, setDone] = useState(false);

  const updateAnswer = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const canSubmit = answers.every((value) => value.trim().length > 0);

  const onSubmit = () => {
    setDone(true);
  };

  return (
    <section className="card p-4">
      <h2 className="mb-4 text-lg font-semibold">Configuração Zero (2 minutos)</h2>

      {questions.map((question, index) => (
        <label key={question} className="mb-3 block text-sm">
          <span className="mb-1 block text-slate-600">{question}</span>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            value={answers[index]}
            onChange={(event) => updateAnswer(index, event.target.value)}
            placeholder="Digite aqui"
          />
        </label>
      ))}

      <button
        className="mt-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        Concluir wizard
      </button>

      {done ? <p className="mt-3 text-sm text-emerald-700">Empresa configurada. Você já pode emitir cobrança PIX.</p> : null}
    </section>
  );
}
