import { useRouter } from 'next/router';
import products from '../../store/products.json';
import axios from 'axios';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => String(p.id) === String(id));
  if (!product) return <div>Produkt nicht gefunden.</div>;

  async function buyNow() {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE + '/api/stripe/create-checkout-session', {
        items: [{ id: product.id, name: product.name, price: product.price, quantity: 1 }]
      });
      // redirect to stripe hosted checkout
      if (res.data.url) window.location = res.data.url;
    } catch (err) {
      alert('Fehler beim Starten der Checkout-Session');
      console.error(err);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>{product.price} €</strong></p>
      <button onClick={buyNow} style={{ padding: '10px 16px', borderRadius: 6 }}>Jetzt kaufen</button>
    </main>
  )
}