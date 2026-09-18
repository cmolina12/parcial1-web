import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";

// page.tsx en sí no necesita "use client": no tiene estado ni eventos propios,
// solo compone dos Client Components (OrderSummary y CheckoutForm), que son
// los que realmente necesitan useState/useContext.
export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <OrderSummary />
        <CheckoutForm />
      </div>
    </div>
  );
}
