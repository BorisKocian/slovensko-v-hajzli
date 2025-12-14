import { User } from 'lucide-react';
import type { LeaderboardEntry } from '@/app/page';
import Image from "next/image";

// Format name to "FirstName L." format
function formatName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  // Data is already sorted by total_votes from the query
  const maxValue = entries[0]?.total_votes || 1; // Highest value for scaling

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-brand px-6 py-5">
        <h2 className="text-white font-normal">Najsplachovanejší</h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-3">
          {entries.map((entry, index) => {
            const percentage = (entry.total_votes / maxValue) * 100;

            return (
              <div
                key={entry.id}
                className="flex items-center gap-2"
              >
                {/* Icon with Number Badge */}
                <div className="w-20 h-20 rounded-lg bg-[#CD0000]/20 flex items-center justify-center flex-shrink-0 relative px-[10px] py-[0px]">
                  {/*<User className="w-10 h-10 text-brand" />*/}
                    <Image
                        src="/politicians/fico2.png"
                        alt="Fico"
                        width={200}
                        height={200}
                        // className="object-contain"
                    />
                  {/* Number Badge */}
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-brand flex items-center justify-center border-2 border-white">
                    <span className="text-white text-xs">{index + 1}</span>
                  </div>
                </div>

                {/* Bar with Name */}
                <div className="flex-1">
                  {/* Name Label */}
                  <div className="text-slate-700 text-xs mb-1 px-1">{formatName(entry.name)}</div>

                  {/* Horizontal Bar */}
                  <div className="bg-slate-100 rounded-lg h-12 overflow-hidden relative">
                    <div
                      className="h-full bg-brand rounded-lg transition-all duration-500 flex items-center justify-center"
                      style={{ width: `${Math.max(percentage, 10)}%` }}
                    >
                      <span className="text-white px-3">{entry.total_votes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}