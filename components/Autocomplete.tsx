'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Loader2 } from 'lucide-react';

type AutocompleteProps<T extends { id: number | string; name: string }> = {
  fetchData?: (search: string) => Promise<T[]>;
  staticData?: T[];
  onChange?: (selection: { name?: string; value: string | number }) => void;
  value?: string;
  name?: string;
  placeholder?: string;
  setSelectedItem?: (item: T | null) => void;
};

function debounce<Args extends unknown[]>(func: (...args: Args) => void, delay = 300) {
  let timer: NodeJS.Timeout;
  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function Autocomplete<T extends { id: number | string; name: string }>({
  fetchData,
  staticData = [],
  onChange,
  value,
  name,
  placeholder = 'Search...',
  setSelectedItem,
}: AutocompleteProps<T>) {
  const [data, setData] = useState<T[]>(staticData);
  const [input, setInput] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedSetInput = useMemo(
    () => debounce((val: string) => setDebouncedInput(val), 400),
    []
  );

  useEffect(() => {
    if (value) {
      setInput(value);
      setDebouncedInput(value);
    }
  }, [value]);

  useEffect(() => {
    if (!fetchData) {
      setData(staticData);
      return;
    }

    // if (!debouncedInput) return; 

    setIsLoading(true);
    fetchData(debouncedInput)
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [debouncedInput, fetchData]);

  useEffect(() => {
    if (fetchData && !value && staticData.length === 0) {
      setIsLoading(true);
      fetchData('')
        .then((res) => setData(res))
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleSelect = (item: T | string) => {
    const selected: { name?: string; value: string | number } =
      typeof item === 'string' ? { value: item } : { name: item.name, value: item.id ?? item.name ?? '' };

    onChange?.({ name, value: selected.value });
    setInput(selected.name ?? (typeof item === 'string' ? item : ''));
    setDebouncedInput(selected.name ?? (typeof item === 'string' ? item : ''));
    setSelectedItem?.(typeof item === 'string' ? null : item);
    setOpen(false);
  };

  return (
    <>
      <div
        className="border rounded-[12px] px-3 py-2 mt-2 w-full h-[42px] cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        {input || <span className="text-muted-foreground">click...</span>}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={placeholder}
          onValueChange={(val: string) => {
            setInput(val);
            debouncedSetInput(val);
            setSelectedItem?.(null);
          }}
        />
        <CommandList>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <CommandEmpty>No data found.</CommandEmpty>
              {data.map((item, index) => (
                <CommandItem key={item.id ?? index} onSelect={() => handleSelect(item)}>
                  {typeof item === 'string' ? item : item.name}
                </CommandItem>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}