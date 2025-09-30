import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CheckoutSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!session_id) return;
    async function fetchSession() {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_BASE + '/api/stripe/session?session_id=' + session_id);
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSession();
  }, [session_id]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Danke für deinen Einkauf!</h1>
      <p>Deine Zahlung wurde empfangen. (Session: {session_id})</p>
      {info && <pre style={{ background: '#f6f8fa', padding: 12 }}>{JSON.stringify(info, null, 2)}</pre>}
    </main>
  )
}