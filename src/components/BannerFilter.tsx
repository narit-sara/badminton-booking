'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FilterState {
  type: string;
  court: string;
  date: string;
  startTime: string;
  duration: string;
}

interface BannerFilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onSubmit: () => void;
}

const TYPE_OPTIONS = ['ก๊วน', 'กลุ่ม 4-6', 'เหมา'];
const COURT_OPTIONS = ['สนาม 1', 'สนาม 2', 'สนาม 3', 'สนาม 4', 'สนาม 5', 'สนาม 6'];
const TIME_OPTIONS = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
const DURATION_OPTIONS = ['1 ชั่วโมง', '2 ชั่วโมง', '3 ชั่วโมง', '4 ชั่วโมง'];

const BANNERS = [
  {
    id: 1,
    imageSrc: '/teebadmaija.jpg',
    alt: 'TEEBADMAIJA',
    timeBadge: '⏰ เปิดให้บริการ: 16:00 - 02:00 น.',
  },
  {
    id: 2,
    title: 'เหมาคอร์ทรับส่วนลด',
    highlight: 'พิเศษ!!!',
    timeBadge: '⏰ เปิดให้บริการ: 16:00 - 02:00 น.',
    bgGradient: 'from-slate-200 via-slate-400 to-slate-300',
    titleColor: 'text-black',
  },
];

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border rounded-xl text-sm font-semibold flex items-center justify-between transition-all bg-[#030712] text-white cursor-pointer ${
          isOpen ? 'border-sky-400 ring-1 ring-sky-400' : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        <span>{value}</span>
        <span className="text-sky-400 text-xs transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 border rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 space-y-1 backdrop-blur-md bg-[#0b132b] border-sky-500/30">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-sky-600/30 text-sky-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <span className="text-sky-400 text-sm">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function BannerFilter({ filter, setFilter, onSubmit }: BannerFilterProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (field: keyof FilterState, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ===== แบนเนอร์ Carousel เลื่อนสไลด์ ===== */}
      <div className="relative group overflow-hidden rounded-3xl border border-slate-700 bg-black shadow-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div
              key={banner.id}
              className={`w-full flex-shrink-0 flex items-center justify-center relative min-h-[180px] md:min-h-[220px] ${
                banner.imageSrc ? '' : `bg-gradient-to-r ${banner.bgGradient} p-8 md:p-10 flex-col`
              }`}
            >
              {banner.imageSrc ? (
                <>
                  <img
                    src={banner.imageSrc}
                    alt={banner.alt}
                    className="w-full h-full object-cover max-h-[350px]"
                  />
                  {banner.timeBadge && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-sky-500/40 text-sky-300 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold shadow-lg">
                      {banner.timeBadge}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className={`text-2xl md:text-5xl font-black tracking-wider uppercase mb-2 ${banner.titleColor}`}>
                    {banner.title}
                  </h1>
                  <p className="text-2xl md:text-4xl font-black text-rose-500 drop-shadow-[0_2px_10px_rgba(225,29,72,0.8)] animate-pulse">
                    {banner.highlight}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
        >
          ❮
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
        >
          ❯
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2">
          {BANNERS.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === index
                  ? 'bg-sky-400 w-8 h-2.5 shadow-[0_0_10px_rgba(56,189,248,0.8)]'
                  : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== ฟอร์มตัวกรองการจอง ===== */}
      <div className="bg-[#0b1329]/90 border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-6 backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">ประเภท</label>
            <CustomSelect
              value={filter.type}
              options={TYPE_OPTIONS}
              onChange={(val) => handleChange('type', val)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">สนาม</label>
            <CustomSelect
              value={filter.court}
              options={COURT_OPTIONS}
              onChange={(val) => handleChange('court', val)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">ว/ด/ป</label>
            <input
              type="date"
              value={filter.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full p-3 bg-[#030712] border border-slate-800 rounded-xl text-sm font-semibold text-white outline-none focus:border-sky-400 cursor-pointer [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">เวลาเริ่มเล่น</label>
            <CustomSelect
              value={filter.startTime}
              options={TIME_OPTIONS}
              onChange={(val) => handleChange('startTime', val)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">ระยะเวลา</label>
            <CustomSelect
              value={filter.duration}
              options={DURATION_OPTIONS}
              onChange={(val) => handleChange('duration', val)}
            />
          </div>
        </div>

        {/* ปุ่ม SUBMIT */}
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:brightness-110 text-white font-black rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transition tracking-wider uppercase text-sm cursor-pointer active:scale-[0.99]"
        >
          SUBMIT
        </button>
      </div>

      {/* คำแนะนำสถานะสนาม */}
      <div className="bg-[#0b1329]/80 border border-slate-800 p-5 rounded-2xl space-y-3">
        <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
          📌 คำแนะนำสถานะสนาม
        </h3>
        <div className="bg-[#030712] border border-slate-800 p-3 rounded-xl text-xs font-semibold grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            เขียว = ว่างพร้อมจอง
          </div>
          <div className="flex items-center justify-center gap-2 text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
            เหลือง = กำลังรอชำระเงิน
          </div>
          <div className="flex items-center justify-center gap-2 text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
            แดง = จองแล้ว (ไม่ว่าง)
          </div>
        </div>
      </div>

      {/* เงื่อนไขและข้อตกลงการจองสนาม */}
      <div className="bg-[#0b1329]/80 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
          📜 เงื่อนไขและข้อตกลงการจองสนาม
        </h3>
        <ul className="space-y-2.5 text-xs font-medium text-slate-300 leading-relaxed pl-2">
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>การจองสนามต้องล็อกอินผ่านอีเมลเพื่อดูประวัติการจองย้อนหลังและนำไปยื่นกับพนักงานเค้าท์เตอร์</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>กรุณาเดินทางมาถึงสนามก่อนเวลาจองอย่างน้อย 10-15 นาที และหากจองเเล้ว ไม่มาชำระเงินหน้าเค้าท์เตอร์ ภายใน10-15นาที ถือว่า การจองเป็นโมฆะ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>ถ้าเลือกตีก๊วนให้เลือก สนาม6 สนามเดียว เพราะเป็นสนามสำหรับตีก๊วนโดยเฉพาะ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>หากต้องการยกเลิกหรือเปลี่ยนแปลงเวลา ต้องแจ้งล่วงหน้าอย่างน้อย 2 ชั่วโมง</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>โปรดแต่งกายด้วยชุดกีฬาและสวมรองเท้าสำหรับเล่นแบดมินตันเท่านั้น</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sky-400 font-bold">•</span>
            <span>ห้ามนำอาหารและเครื่องดื่ม (ยกเว้นน้ำดื่ม) เข้ามาในบริเวณสนาม</span>
          </li>
          <li className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400">💚</span>
            <span>
              หากต้องการเพิ่มเวลาจอง หรือต้องการจองเวลานอกเหนือจากที่ระบบเปิดไว้ กรุณาติดต่อแอดไลน์:{' '}
            </span>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
              @teebadmaija
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}