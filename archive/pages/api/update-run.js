// pages/api/update-run.js
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return res.status(405).end();

  const { slug, date, rating } = req.body;

  const { error } = await supabase
    .from('runs')
    .update({ date, rating })
    .eq('slug', slug);

  if (error) return res.status(500).json({ error });

  return res.status(200).json({ success: true });
}
