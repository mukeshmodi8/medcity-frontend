import { useState, useEffect } from 'react';
import API from '../api/client';

export default function usePageContent(slug) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // 🔥 Correct API path
        const res = await API.get(`/api/pages/${slug}`);
        if (mounted) setContent(res.data);
      } catch (err) {
        console.error('usePageContent error:', err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [slug]);

  return { content, loading, error };
}
