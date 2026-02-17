export type CheckoutLine = {
  id: string;
  title: string;
  price: number;
  qty: number;
  image?: string;
};

export async function createCheckout(lines: CheckoutLine[]) {
  const res = await fetch("https://YOURDOMAIN.com/checkout.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: lines }),
  });

  const json = await res.json();
  return json?.url as string | null;
}