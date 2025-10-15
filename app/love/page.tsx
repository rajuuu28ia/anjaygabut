'use client';

import LoveMobileNav from "@/app/components/LoveMobileNav/LoveMobileNav";

export default function LovePage() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/background/file_00000000679c61fa9e5f04ed2dd6208d.png)',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <LoveMobileNav />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              SUPPORT SISTEM
            </h1>

            <div className="space-y-4 text-lg md:text-xl text-gray-300">
              <p className="leading-relaxed">
                Masih sendiri bang, belum ada pengganti. 
              </p>
              <p className="leading-relaxed">
                Soalnya mantan terakhir gw cantik, baik, perhatian segala segalanya dah.
              </p>
              <p className="text-gray-400 text-base mt-6 italic">
                Kalo udah ada pengganti juga di tambahin foto cewek gw
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="inline-flex items-center gap-2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">Status: Single & Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
