import { User } from 'lucide-react';
import type { LeaderboardEntry } from '@/app/page';

// Format name to "FirstName L." format
function formatName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
}

interface PodiumProps {
  entries: LeaderboardEntry[];
}

export function Podium({ entries }: PodiumProps) {
  // Get top 3 (already sorted by total_votes from query)
  const [first, second, third] = entries.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-4">
      {/* Header */}
      <div className="bg-brand px-4 py-3 -m-4 mb-4 rounded-t-2xl">
        <h2 className="text-white text-center">Najsplachovanejší dnes</h2>
      </div>
      
      <div className="flex items-end justify-center gap-2 max-w-xl mx-auto">
        {/* 2nd Place */}
        {second && (
          <div className="flex-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-2 relative">
              <User className="w-5 h-5 text-brand" />
              {/* Number Badge */}
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white">
                <span className="text-slate-700 text-xs">2</span>
              </div>
            </div>
            <div className="text-slate-900 text-center mb-1 text-sm">{formatName(second.name)}</div>
            <div className="bg-brand-ternary w-full rounded-t-xl h-14 flex items-center justify-center">
              <span className="text-brand-ternary-1000 text-sm">{second.total_votes.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {first && (
          <div className="flex-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-2 relative">
              <User className="w-5 h-5 text-brand" />
              {/* Number Badge */}
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-white">
                <span className="text-yellow-900 text-xs">1</span>
              </div>
            </div>
            <div className="text-slate-900 text-center mb-1 text-sm">{formatName(first.name)}</div>
            <div className="bg-brand w-full rounded-t-xl h-20 flex items-center justify-center">
              <span className="text-white text-sm">{first.total_votes.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {third && (
          <div className="flex-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 flex items-center justify-center mb-2 relative">
              <User className="w-5 h-5 text-brand-secondary" />
              {/* Number Badge */}
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-brand-secondary flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">3</span>
              </div>
            </div>
            <div className="text-slate-900 text-center mb-1 text-sm">{formatName(third.name)}</div>
            <div className="bg-brand-secondary w-full rounded-t-xl h-10 flex items-center justify-center">
              <span className="text-white text-sm">{third.total_votes.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}