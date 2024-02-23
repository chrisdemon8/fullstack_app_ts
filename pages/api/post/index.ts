import { getSession, useSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, session } = req.body;
  if (session) {
      const result = await prisma.post.create({
          data: {
              title: title,
              content: content,
              author: { connect: { email: session.data.user.email } },
          },
      });
      res.json(result);
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
}