'use client';

import Link from 'next/link';
import Autocomplete from '@/components/Autocomplete';
import useProvinces from '../hooks/api/useProvinces';
import { useState, useMemo } from 'react';
import { Province } from './api/provinces/route';
import { staticProvinces } from '@/data/staticProvinces';

export default function Home() {
  const { all } = useProvinces();
  const [selectedProvinceApi, setSelectedProvinceApi] = useState<Province | null>(null);
  const [selectedProvinceStatic, setSelectedProvinceStatic] = useState<Province | null>(null);

  const memoStaticProvinces = useMemo(() => staticProvinces, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="p-6 border-l-4 border-indigo-500 bg-indigo-50 rounded-md space-y-1">
        <h1 className="text-xl font-bold text-indigo-800">SEPIDEH BORAZJANI</h1>
        <p className="text-indigo-700 font-medium">Frontend Developer</p>
        <p className="text-indigo-600">
          sepide.bri@gmail.com | sepide-borazjani |{' '}
          <Link
            href="https://www.linkedin.com/in/sepide-borazjani"
            target="_blank"
            className="text-blue-600 underline hover:text-blue-800"
          >
            LinkedIn
          </Link>
        </p>
        <p className="text-indigo-700 mt-2 italic">“Creating intuitive and beautiful user experiences.”</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Autocomplete Examples</h2>
        <p className="text-gray-600">
          This Autocomplete component supports both **API requests** and **static data**. Try both examples below.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">1. Using API Data</h3>
        <Autocomplete<Province>
          fetchData={async (search) => await all({ search, limit: 10 })}
          value={selectedProvinceApi?.name}
          onChange={({ value }) =>
            setSelectedProvinceApi({ id: Number(value), name: selectedProvinceApi?.name ?? '' })
          }
          placeholder="Search province from API..."
          setSelectedItem={setSelectedProvinceApi}
        />
        {selectedProvinceApi && (
          <p className="mt-1 text-gray-700">
            Selected: <span className="font-medium">{selectedProvinceApi.name}</span> (ID: {selectedProvinceApi.id})
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">2. Using Static Data</h3>
        <Autocomplete<Province>
          staticData={memoStaticProvinces}
          value={selectedProvinceStatic?.name}
          onChange={({ value }) =>
            setSelectedProvinceStatic({ id: Number(value), name: selectedProvinceStatic?.name ?? '' })
          }
          placeholder="Select province from static data..."
          setSelectedItem={setSelectedProvinceStatic}
        />
        {selectedProvinceStatic && (
          <p className="mt-1 text-gray-700">
            Selected: <span className="font-medium">{selectedProvinceStatic.name}</span> (ID: {selectedProvinceStatic.id})
          </p>
        )}
      </div>

     
    </div>
  );
}