'use client';

import React from 'react';

interface BookingHistoryItem {
  id?: string | number;
  userName?: string;
  selectedCourts?: string[];
  date?: string;
  startTime?: string;
  duration?: string;
  totalPrice?: number;
  addons?: {
    shoesCount?: number;
    shoesPrice?: number;
    extraItems?: string[];
  };
}

interface CategoryCardsProps {
  bookingHistory?: BookingHistoryItem[];
  onNavigateToBooking?: () => void;
}

export default function CategoryCards({
  bookingHistory = [],
  onNavigateToBooking,
}: CategoryCardsProps) {
  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h2 className="text-xl font-bold text-sky-300 mb-4 text-center">
        ประวัติการจองสนาม
      </h2>

      {(!bookingHistory || bookingHistory.length === 0) ? (
        <div className="w-full bg-slate-900/80 border border-slate-800 p-12 rounded-2xl text-center backdrop-blur-md">
          <p className="text-slate-400 text-lg mb-4">ยังไม่มีประวัติการจองสนาม</p>
          {onNavigateToBooking && (
            <button
              onClick={onNavigateToBooking}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition"
            >
              จองสนามตอนนี้
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {bookingHistory.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-md space-y-3"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-sky-400 font-bold text-lg">
                    {item.selectedCourts?.join(', ') || 'ไม่ระบุคอร์ท'}
                  </div>
                  <div className="text-sm text-slate-300 mt-1">
                    ผู้จอง: <span className="text-white font-medium">{item.userName || '-'}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    วันที่: {item.date} | เวลา: {item.startTime} ({item.duration})
                  </div>
                </div>

                {item.totalPrice !== undefined && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">ยอดชำระ</span>
                    <span className="text-xl font-bold text-emerald-400">
                      {item.totalPrice.toLocaleString()} ฿
                    </span>
                  </div>
                )}
              </div>

              {/* 🛠️ ส่วนแสดงรายการเสริม (บังคับแสดงถ้ามีการเช่ารองเท้าหรืออุปกรณ์) */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 bg-slate-950/40 p-3 rounded-xl">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <span>✨</span> รายการที่เลือกเพิ่มเติม:
                </span>
                
                {/* เช่ารองเท้า */}
                {item.addons?.shoesCount && item.addons.shoesCount > 0 ? (
                  <div className="flex justify-between text-xs text-slate-300 pl-3">
                    <span>👟 เช่ารองเท้าแบดมินตัน ({item.addons.shoesCount} คู่)</span>
                    <span className="font-semibold text-sky-300">
                      +{item.addons.shoesPrice || (item.addons.shoesCount * 50)} ฿
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 pl-3">- ไม่ได้เช่ารองเท้า</div>
                )}

                {/* รายการเสริมอื่นๆ (เช่น ไม้แบด) */}
                {item.addons?.extraItems && item.addons.extraItems.length > 0 ? (
                  item.addons.extraItems.map((extra, idx) => (
                    extra ? (
                      <div key={idx} className="flex justify-between text-xs text-slate-300 pl-3">
                        <span>🏸 {extra}</span>
                        <span className="font-semibold text-sky-300">+50 ฿</span>
                      </div>
                    ) : null
                  ))
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}