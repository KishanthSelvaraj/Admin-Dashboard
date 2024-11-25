import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({ options, value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}: {selectedOption?.label || 'All'}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                value === '' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  value === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
