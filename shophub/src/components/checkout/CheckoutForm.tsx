"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type FieldName = "fullName" | "email";

interface CheckoutFormState {
  fullName: string;
  email: string;
  paymentMethod: string;
  acceptTerms: boolean;
}

const INITIAL_FORM: CheckoutFormState = {
  fullName: "",
  email: "",
  paymentMethod: "",
  acceptTerms: false,
};

const PAYMENT_METHODS = [
  { value: "credit_card", label: "Tarjeta de crédito" },
  { value: "paypal", label: "PayPal" },
  { value: "cash_on_delivery", label: "Pago contraentrega" },
];

function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim();

  if (name === "fullName") {
    if (!trimmed) return "El nombre es obligatorio.";
    if (trimmed.length < 5) return "El nombre debe tener mínimo 5 caracteres.";
    return undefined;
  }

  // name === "email"
  if (!trimmed) return "El correo es obligatorio.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Formato de correo inválido.";
  return undefined;
}

export default function CheckoutForm() {
  const { items, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutFormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<{ fullName?: boolean; email?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const nameError = validateField("fullName", form.fullName);
  const emailError = validateField("email", form.email);
  const isValid =
    !nameError && !emailError && form.paymentMethod !== "" && form.acceptTerms && items.length > 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    // Simula la latencia por las risas
    await new Promise((resolve) => setTimeout(resolve, 1200));

    clearCart();
    setForm(INITIAL_FORM);
    setTouched({});
    setIsSubmitting(false);
    setOrderCompleted(true);
  }

  if (orderCompleted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/40">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
          ✓
        </span>
        <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
          ¡Pedido confirmado!
        </h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          Gracias por tu compra. Tu carrito fue vaciado y quedó listo para un nuevo pedido.
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Volver al catálogo
          </Link>
          <button
            type="button"
            onClick={() => setOrderCompleted(false)}
            className="rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            Hacer otro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900"
    >
      <h2 className="text-lg font-bold">Datos de facturación</h2>

      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
          Nombre completo
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          placeholder="Ej: Camilo Molina"
          className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-50 dark:border-white/20"
        />
        {touched.fullName && nameError && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Correo de facturación
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          placeholder="Ej: nombre@correo.com"
          className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-50 dark:border-white/20"
        />
        {touched.email && emailError && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="paymentMethod" className="mb-1 block text-sm font-medium">
          Método de pago
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-50 dark:border-white/20"
        >
          <option value="" disabled>
            Selecciona un método de pago
          </option>
          {PAYMENT_METHODS.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={form.acceptTerms}
          onChange={handleCheckboxChange}
          disabled={isSubmitting}
          className="mt-0.5 h-4 w-4 rounded border-black/25 disabled:opacity-50"
        />
        Acepto los términos y condiciones de la compra.
      </label>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
      >
        {isSubmitting ? "Procesando pedido…" : "Confirmar pedido"}
      </button>
    </form>
  );
}
