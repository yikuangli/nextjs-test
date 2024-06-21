'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [time, setTime] = useState(searchParams.get('time') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');
  const handleAreaChange = useDebouncedCallback((area) => {
    setArea(area);
    const params = new URLSearchParams(searchParams);
    if (area) {
      params.set('area', area);
    } else {
      params.delete('area');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 150);


  const handleDateChange = useDebouncedCallback((time) => {
    setTime(time);
    const params = new URLSearchParams(searchParams);
    if (time) {
      params.set('time', time);
    } else {
      params.delete('time');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 150);

//   useEffect(() => {
//     handleFilterChange();
//   }, [time, area]);

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="time" className="block text-gray-700">Time:</label>
        <input
          type="date"
          id="time"
          value={time}
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="area" className="block text-gray-700">Area:</label>
        <select
          id="area"
          value={area}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value="Downtown">Downtown</option>
          <option value="North York">North York</option>
          <option value="Markham">Markham</option>
          <option value="Oakville">Oakville</option>
          <option value="Richmond Hill">Richmond Hill</option>
          <option value="Mississauga">Mississauga</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
