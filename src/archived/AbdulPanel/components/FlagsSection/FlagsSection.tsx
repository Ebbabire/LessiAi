import { useMemo } from 'react';

interface FlagsSectionProps {
  flags: string[];
}

const isValidFlag = (flag: unknown): flag is string => 
  typeof flag === 'string' && flag.trim().length > 0;

const generateFlagKey = (flag: string, index: number): string => 
  flag.toLowerCase().replace(/\s+/g, '-').substring(0, 30) + `-${index}`;

function FlagsSection({ flags }: FlagsSectionProps) {
  const validFlags = useMemo(() => {
    if (!Array.isArray(flags) || flags.length === 0) {
      return [];
    }
    return flags
      .filter(isValidFlag)
      .map(flag => String(flag).trim());
  }, [flags]);

  if (validFlags.length === 0) return null;

  return (
    <section aria-labelledby="important-notes-heading">
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div 
          className="flex-shrink-0 w-1.5 h-7 sm:h-8 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700 rounded-full shadow-sm"
          aria-hidden="true"
        />
        <div>
          <h2 
            id="important-notes-heading"
            className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1"
          >
            Important Notes
          </h2>
          <div 
            className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-primary-500 to-transparent rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <ul 
        className="space-y-3 sm:space-y-4"
        role="list"
        aria-label={`${validFlags.length} important clinical notes`}
      >
        {validFlags.map((flag, index) => (
          <li
            key={generateFlagKey(flag, index)}
            className="group relative overflow-hidden flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-gradient-to-r from-primary-50 via-blue-50/80 to-indigo-50/60 border-l-4 border-primary-500 rounded-xl shadow-md hover:shadow-xl focus-within:shadow-xl transition-all duration-300 hover:scale-[1.01] focus-within:scale-[1.01] focus-within:ring-2 focus-within:ring-primary-500/30 focus-within:outline-none"
            role="listitem"
            tabIndex={0}
            aria-label={`Important note ${index + 1}: ${flag}`}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div 
              className="relative flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-focus-within:scale-110 transition-transform duration-300 mt-0.5"
              aria-hidden="true"
            >
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="relative text-base text-gray-900 leading-relaxed font-semibold flex-1 pt-0.5 sm:pt-1">
              {flag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FlagsSection;

