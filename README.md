# Badminton Court Booking System 🏸 (TEEBADMAIJA)

เว็บไซต์สำหรับจองสนามแบดมินตันออนไลน์ พัฒนาขึ้นเพื่ออำนวยความสะดวกในการค้นหา ตรวจสอบสถานะสนามแบบเรียลไทม์ เลือกวันเวลา จองคอร์ท พร้อมบริการเช่าอุปกรณ์เสริม (ไม้แบดและรองเท้ากีฬา) พัฒนาด้วย Next.js, React, Tailwind CSS และระบบเข้าสู่ระบบความปลอดภัยสูงด้วย Google OAuth

- **Live Demo (Vercel):** https://badminton-booking-lemon.vercel.app
- **GitHub Repository:** https://github.com/narit-sara/badminton-booking

---

## 👥 รายชื่อสมาชิกกลุ่ม (Group Members)

1. นางสาวนริศรา นาแพร่ (รหัสนักศึกษา 6804101353)
2. นางสาวนันทิชา แปงทา (รหัสนักศึกษา 6804101356)
3. นางสาวพรรณทิพย์ ภูพาดแร่ (รหัสนักศึกษา 6804101360)
4. นางสาวสิริมาศ แซ่โค้ว (รหัสนักศึกษา 6804101390)
5. นางสาวสุชาดา บุบผา (รหัสนักศึกษา 6804101391)

---

## 🚀 ฟีเจอร์หลักของระบบ (Key Features)

1. **ระบบยืนยันตัวตนด้วย Google OAuth (NextAuth.js):** เข้าสู่ระบบด้วยบัญชี Google อย่างปลอดภัย พร้อมดึงรูปโปรไฟล์และชื่อผู้ใช้งานมาแสดงโดยอัตโนมัติ
2. **ระบบค้นหาและกรองข้อมูล (Search & Filter):** ค้นหาสนามตามประเภท วันที่ และช่วงเวลาที่ต้องการใช้งาน
3. **ตารางแสดงสถานะสนามแบบเรียลไทม์ (Interactive Court Grid):** แสดงสถานะของแต่ละคอร์ท พร้อมรองรับการคลิกเลือกคอร์ทได้มากกว่า 1 คอร์ท
4. **ระบบคำนวณราคาอัตโนมัติ:** คำนวณค่าบริการตามชั่วโมงและจำนวนคอร์ทที่เลือก พร้อมบวกเพิ่มค่าเช่าอุปกรณ์เสริมแบบเรียลไทม์
5. **บริการเช่าอุปกรณ์เสริม (Add-on Equipment):** เลือกเช่าไม้แบดมินตันและรองเท้ากีฬา พร้อมปุ่มปรับเพิ่ม-ลดจำนวนชิ้น
6. **ระบบยืนยันการจองและบันทึกประวัติ:** บันทึกข้อมูลการจองและเรียกดูประวัติย้อนหลังผ่าน `localStorage`

---

## ⚙️ การตั้งค่า Environment Variables (.env.local)

โปรดสร้างไฟล์ `.env.local` ไว้ที่ Root directory ของโปรเจกต์ และกำหนดค่าสำหรับการเชื่อมต่อ Google OAuth ดังนี้:

```env
GOOGLE_CLIENT_ID=กรอกรหัส Client ID ของคุณที่นี่
GOOGLE_CLIENT_SECRET=กรอกรหัส Client Secret ของคุณที่นี่
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=รหัสลับสำหรับเข้ารหัส

💻 วิธีการติดตั้งและรันโปรเจกต์ในเครื่อง (Installation & Usage)
Clone Repository ลงมาในเครื่องของคุณ:

Bash
git clone [https://github.com/narit-sara/badminton-booking.git](https://github.com/narit-sara/badminton-booking.git)
cd badminton-booking
ติดตั้ง dependencies ทั้งหมด:

Bash
npm install
รัน Development Server:

Bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
เปิดเบราว์เซอร์ไปที่ http://localhost:3000 เพื่อใช้งานเว็บไซต์

🛠️ Tech Stack & Tools
Framework: Next.js (App Router)

UI & Styling: React, Tailwind CSS

Authentication: NextAuth.js (Google Provider)

Font: next/font (Geist Font Family)

Deployment: Vercel
