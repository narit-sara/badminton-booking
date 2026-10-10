'use client';

import React from 'react';

interface BookingDetails {
  selectedCourts?: string[];
  date?: string;
  startTime?: string;
  duration?: string;
  userName?: string;
  userPhone?: string;
}

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails?: BookingDetails;
}

export default function BookingSuccessModal({
  isOpen,
  onClose,
  bookingDetails,
}: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0b1329] border border-sky-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(56,189,248,0.3)] text-slate-100 space-y-6 animate-in fade-in zoom-in duration-200">
        
        {/* หัวข้อและไอคอนสำเร็จ */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_#10b981]">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-black text-sky-400">จองสนามสำเร็จ!</h2>
          <p className="text-xs text-slate-400">ขอบคุณสำหรับการจอง กรุณาตรวจสอบรายละเอียดด้านล่าง</p>
        </div>

        {/* รายละเอียดการจอง (ใช้ Optional Chaining ?. ป้องกัน Error) */}
        <div className="bg-[#030712] border border-slate-800 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">ชื่อผู้จอง:</span>
            <span className="font-semibold text-slate-100">{bookingDetails?.userName || '-'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">เบอร์โทรศัพท์:</span>
            <span className="font-semibold text-slate-100">{bookingDetails?.userPhone || '-'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">สนามที่จอง:</span>
            <span className="font-semibold text-sky-400">
              {bookingDetails?.selectedCourts?.join(', ') || '-'}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">วันที่:</span>
            <span className="font-semibold text-slate-100">{bookingDetails?.date || '-'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">เวลาเริ่มเล่น:</span>
            <span className="font-semibold text-slate-100">{bookingDetails?.startTime || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">ระยะเวลา:</span>
            <span className="font-semibold text-slate-100">{bookingDetails?.duration || '-'}</span>
          </div>
        </div>

        {/* ปุ่มตกลง */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.4)] transition"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}