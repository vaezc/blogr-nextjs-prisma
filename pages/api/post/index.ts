import { options as authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;
 
  const session = await getServerSession(req, res, authOptions)
  console.log('session', session);
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}