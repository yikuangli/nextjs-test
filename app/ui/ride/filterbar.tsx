'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

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

	return (
		<div className="w-full sm:w-auto mb-4 p-4 bg-gray-100 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
			<div className="flex items-center space-x-2 w-full sm:w-auto">
				<label htmlFor="time" className="block text-gray-700 w-20 sm:w-auto">Time:</label>
				<input
					type="date"
					id="time"
					value={time}
					onChange={(e) => handleDateChange(e.target.value)}
					className="p-2 border border-gray-300 rounded flex-1 sm:flex-none"
				/>
			</div>
			<div className="flex items-center space-x-2 w-full sm:w-auto">
				<label htmlFor="area" className="block text-gray-700 w-20 sm:w-auto">Area:</label>
				<select
					id="area"
					value={area}
					onChange={(e) => handleAreaChange(e.target.value)}
					className="p-2 border border-gray-300 rounded flex-1 sm:flex-none"
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
