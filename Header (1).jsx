import Link from 'next/link';
export default function Header(){ return (
  <header style={{ display: 'flex', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #eee' }}>
    <div><Link href='/'><a>Automatisch-Shop</a></Link></div>
    <nav><Link href='/'>Produkte</Link></nav>
  </header>
);}