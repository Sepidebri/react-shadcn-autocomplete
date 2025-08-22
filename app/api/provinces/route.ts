import { NextRequest, NextResponse } from 'next/server';

export interface Province {
  id: number;
  name: string;
}

const provinces: Province[] = [
  { id: 1, name: 'Tehran' },
  { id: 2, name: 'Isfahan' },
  { id: 3, name: 'Shiraz' },
  { id: 4, name: 'Mashhad' },
  { id: 5, name: 'Tabriz' },
];

export async function GET(req: NextRequest) {
  const { search, limit } = Object.fromEntries(req.nextUrl.searchParams.entries()) as {
    search?: string;
    limit?: string;
  };

  let filtered = provinces;
  if (search) {
    filtered = provinces.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (limit) {
    filtered = filtered.slice(0, Number(limit));
  }

  return NextResponse.json({ data: filtered });
}