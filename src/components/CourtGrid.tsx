'use client';

import React from 'react';

export interface Court {
  id: number;
  name: string;
  status: 'green' | 'yellow' | 'red';
}

interface CourtGridProps {
  filter: {
    type: string;
    court: string;
    date: string;
    startTime: string;
    duration: string;
  };
  courts: Court[];
  selectedCourts: string[];
  setSelectedCourts: React.Dispatch<React.SetStateAction<string[]>>;
  userName: string;
  setUserName: (val: string) => void;
  userPhone: string;
  setUserPhone: (val: string) => void;
  note: string;
  setNote: (val: string) => void;
  rentRacket: boolean;
  setRentRacket: (val: boolean) => void;
  racketCount: number;
  setRacketCount: (val: number | ((prev: number) => number)) => void;
  rentShoes: boolean;
  setRentShoes: (val: boolean) => void;
  shoesCount: number;
  setShoesCount: (val: number | ((prev: number) => number)) => void;
  onBack: () => void;
  onConfirm: () => void;
  courtPricePerHour?: number;
  racketPrice?: number;
  shoesPrice?: number;
}

export default function CourtGrid({
  filter,
  courts,
  selectedCourts,
  setSelectedCourts,
  userName,
  setUserName,
  userPhone,
  setUserPhone,
  note,
  setNote,
  rentRacket,
  setRentRacket,
  racketCount,
  setRacketCount,
  rentShoes,
  setRentShoes,
  shoesCount,
  setShoesCount,
  onBack,
  onConfirm,
  courtPricePerHour = 150,
  racketPrice = 50,
  shoesPrice = 50,
}: CourtGridProps) {
  const toggleCourtSelection = (courtName: string, status: string) => {
    if (status === 'red') return;

    const formattedName = courtName.replace('สนาม', 'คอร์ท');

    if (selectedCourts.includes(formattedName)) {
      setSelectedCourts(selectedCourts.filter((item) => item !== formattedName));
    } else {
      setSelectedCourts([...selectedCourts, formattedName]);
    }
  };

  const hours = parseInt(filter.duration) || 1;
  const courtTotal = selectedCourts.length * courtPricePerHour * hours;
  const racketTotal = rentRacket ? racketCount * racketPrice : 0;
  const shoesTotal = rentShoes ? shoesCount * shoesPrice : 0;
  const grandTotal = courtTotal + racketTotal + shoesTotal;

  return (
    <div className="w-full space-y-6">
      {/* สรุปข้อมูลการค้นหาด้านบน */}
      <div className="bg-[#0b1329]/90 border border-slate-800 p-4 rounded-2xl text-center text-sm font-semibold text-slate-300 shadow-xl">
        ประเภท: <span className="text-sky-400 font-bold">{filter.type}</span> | คอร์ท:{' '}
        <span className="text-sky-400 font-bold">{filter.court.replace('สนาม', 'คอร์ท')}</span> | วันที่:{' '}
        <span className="text-sky-400 font-bold">{filter.date}</span> | เวลา:{' '}
        <span className="text-sky-400 font-bold">
          {filter.startTime} ({filter.duration})
        </span>
      </div>

      {/* หัวข้อ */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-100 tracking-wide">ตารางจองคอร์ท</h2>
        <p className="text-xs text-slate-400">
          (อัตราค่าบริการ {courtPricePerHour} บาท / ชม. / คอร์ท — สามารถเลือกได้มากกว่า 1 คอร์ท)
        </p>
      </div>

      {/* การ์ดรายการคอร์ท */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courts.map((court) => {
          const courtNameFormatted = court.name.replace('สนาม', 'คอร์ท');
          const isSelected = selectedCourts.includes(courtNameFormatted);

          let bgStyle = '';
          let statusText = '';

          if (court.status === 'green') {
            bgStyle = isSelected
              ? 'bg-emerald-600/90 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]'
              : 'bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-500/50';
          } else if (court.status === 'yellow') {
            bgStyle = isSelected
              ? 'bg-amber-500 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]'
              : 'bg-amber-500/90 hover:bg-amber-500 border border-amber-400/50';
          } else {
            bgStyle = 'bg-rose-950/60 border border-rose-900/50 opacity-60 cursor-not-allowed';
            statusText = 'จองแล้ว';
          }

          return (
            <div
              key={court.id}
              onClick={() => toggleCourtSelection(court.name, court.status)}
              className={`p-6 rounded-2xl flex flex-col items-center justify-center text-white transition-all cursor-pointer min-h-[130px] ${bgStyle}`}
            >
              <h3 className="text-2xl font-black mb-1">{courtNameFormatted}</h3>
              <p className="text-xs font-semibold opacity-90">{courtPricePerHour}฿ / ชม.</p>

              {court.status === 'red' ? (
                <span className="text-xs mt-2 text-rose-300 font-bold">{statusText}</span>
              ) : isSelected ? (
                <span className="mt-2 text-xs bg-slate-950/60 text-sky-300 font-bold px-3 py-1 rounded-full border border-sky-400 flex items-center gap-1">
                  ✓ เลือกแล้ว
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* ฟอร์มกรอกข้อมูลผู้จอง */}
      <div className="bg-[#0b1329]/80 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-5 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-2 text-slate-300">
              ชื่อผู้จอง : <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="กรอกชื่อ-นามสกุล..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 bg-[#030712] border border-slate-700 rounded-xl text-sm text-white focus:border-sky-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2 text-slate-300">
              เบอร์โทรศัพท์ : <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="08X-XXX-XXXX"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full p-3 bg-[#030712] border border-slate-700 rounded-xl text-sm text-white focus:border-sky-400 outline-none"
            />
          </div>
        </div>

        {/* บริการเช่าอุปกรณ์เพิ่มเติม */}
        <div className="bg-[#030712] border border-slate-800 p-4 rounded-xl space-y-3">
          <p className="text-xs font-bold text-sky-400 flex items-center gap-2">
            🏸 บริการเช่าอุปกรณ์เพิ่มเติม
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* ไม้แบดมินตัน */}
            <div className="p-3 bg-[#0b1329] border border-slate-800 rounded-xl flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rentRacket}
                  onChange={(e) => setRentRacket(e.target.checked)}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-200">
                  เช่าไม้แบดมินตัน ({racketPrice}฿/อัน)
                </span>
              </label>

              {rentRacket && (
                <div className="flex items-center gap-2 bg-[#030712] border border-slate-700 rounded-lg px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setRacketCount((prev) => Math.max(1, prev - 1))}
                    className="text-slate-400 hover:text-white font-bold text-sm px-1 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-sky-400 min-w-[16px] text-center">
                    {racketCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRacketCount((prev) => prev + 1)}
                    className="text-slate-400 hover:text-white font-bold text-sm px-1 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* รองเท้ากีฬา */}
            <div className="p-3 bg-[#0b1329] border border-slate-800 rounded-xl flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rentShoes}
                  onChange={(e) => setRentShoes(e.target.checked)}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-200">
                  เช่ารองเท้ากีฬา ({shoesPrice}฿/คู่)
                </span>
              </label>

              {rentShoes && (
                <div className="flex items-center gap-2 bg-[#030712] border border-slate-700 rounded-lg px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setShoesCount((prev) => Math.max(1, prev - 1))}
                    className="text-slate-400 hover:text-white font-bold text-sm px-1 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-sky-400 min-w-[16px] text-center">
                    {shoesCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShoesCount((prev) => prev + 1)}
                    className="text-slate-400 hover:text-white font-bold text-sm px-1 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* หมายเหตุ */}
        <div>
          <label className="block text-xs font-semibold mb-2 text-slate-300">หมายเหตุ :</label>
          <input
            type="text"
            placeholder="เช่น ต้องการลูกแบดเพิ่ม..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 bg-[#030712] border border-slate-700 rounded-xl text-sm text-white focus:border-sky-400 outline-none"
          />
        </div>

        {/* สรุปราคาและปุ่มยืนยัน */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">
              คอร์ทที่เลือก: <span className="text-sky-400 font-bold">{selectedCourts.length} คอร์ท</span>
            </p>
            <p className="text-lg font-black text-white">
              ยอดชำระรวม: <span className="text-sky-400">{grandTotal} บาท</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition w-1/2 sm:w-auto cursor-pointer"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={onConfirm}
              disabled={selectedCourts.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] transition w-1/2 sm:w-auto cursor-pointer"
            >
              ยืนยันการจอง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}