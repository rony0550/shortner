
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface ShortCodePageProps {
  params: Promise<{
    shortCode: string;
  }>;
}

export default async function ShortCodePage({
  params,
}: ShortCodePageProps) {
  const { shortCode } = await params;

  const link = await prisma.shortUrl.findUnique({
    where: {
      shortCode,
    },
  });

  if (!link) {
    notFound();
  }

  await prisma.shortUrl.update({
    where: {
      id: link.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  redirect(link.originalUrl);
}

