import { getAllFeedback } from '@/lib/db-admin';

export default async function handler(req, res) {
  try {
    const siteId = req.query.siteId;
    const { feedback } = await getAllFeedback(siteId);

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json(error);
  }
}
