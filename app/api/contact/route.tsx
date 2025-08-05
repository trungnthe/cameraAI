import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `Khách hàng mới - ${service || "No service selected"}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="color: #c62828;">📩 Thông tin liên hệ mới từ website CameraAI</h2>
        <p>Xin chào <strong>Đội ngũ MCK Group</strong>,</p>
        <p>Khách hàng đã gửi yêu cầu tư vấn thông qua biểu mẫu liên hệ:</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Họ tên</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Số điện thoại</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Dịch vụ quan tâm</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${getServiceLabel(service)}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;"><strong>Nội dung tin nhắn:</strong></p>
        <div style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #c62828;">
          ${message}
        </div>

        <hr style="margin-top: 30px;" />
        <p style="font-size: 14px; color: #666;">
          Đây là email tự động từ hệ thống <strong>CameraAI - MCK Group</strong>. Vui lòng phản hồi qua địa chỉ email người gửi nếu cần liên hệ lại.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ success: false, error: "Gửi email thất bại" }, { status: 500 })
  }
}

function getServiceLabel(value: string) {
  switch (value) {
    case "basic":
      return "Gói AI Cơ Bản"
    case "professional":
      return "Gói AI Chuyên Nghiệp"
    case "enterprise":
      return "Gói AI Doanh Nghiệp"
    case "custom":
      return "Giải Pháp Tùy Chỉnh"
    case "demo":
      return "Yêu Cầu Dùng Thử"
    default:
      return "Không xác định"
  }
}
