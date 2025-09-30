import Link from 'next/link';
import products from '../store/products.json';

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Automatisch-Shop — Demo-Produkte</h1>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {products.map(p => (
          <article key={p.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>{p.price} €</strong></p>
            <Link href={`/product/${p.id}`}><a>Zum Produkt →</a></Link>
          </article>
        ))}
      </div>
    </main>
  )
}