"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Camera,
  Zap,
  BarChart3,
  Menu,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Play,
  Eye,
  Brain,
  Cpu,
  ArrowUp,
} from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import BlogSection from "./components/blog-section"
import Marquee from "react-fast-marquee"
import Image from "next/image"

export default function CameraAIWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }



  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl">
          <div className="flex items-center space-x-2 animate-fade-in">
            <Camera className="h-8 w-8 text-red-600 animate-pulse" />
            <span className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              CameraAI
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "#features", label: "Chức năng" },
              { href: "#demo", label: "Demo" },
              { href: "#sponsors", label: "Đối tác" },
              { href: "#services", label: "Gói dịch vụ" },
              { href: "#blog", label: "Bài viết" },
              { href: "#contact", label: "Liên hệ" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="#demo"
              className="hidden md:inline-flex text-sm font-medium text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105"
            >
              Thử Ngay
            </Link>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              MCK Group
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:scale-110 transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40 md:hidden animate-fade-in-down">
              <nav className="flex flex-col items-start space-y-4 px-6 py-4">
                {[
                  { href: "#features", label: "Chức năng" },
                  { href: "#demo", label: "Demo" },
                  { href: "#sponsors", label: "Đối tác" },
                  { href: "#services", label: "Gói dịch vụ" },
                  { href: "#blog", label: "Bài viết" },
                  { href: "#contact", label: "Liên hệ" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition"
                    onClick={() => setIsMenuOpen(false)} 
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
          </div>
        </div>
      </header>

      <section
  className="py-20 md:py-32 bg-gradient-to-b from-red-400 to-yellow-150 bg-no-repeat bg-cover bg-center"
>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8  p-6 rounded-xl ">
              <div className="space-y-4">
               <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800 hover:bg-red-200 animate-bounce-subtle border border-red-200 shadow-sm"
                >
                  🚀 Mới nhất: Phát hiện đối tượng AI thời gian thực
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Camera-AI
                  <br />
                  <span className="text-red-600">4G/5G</span>
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl">
                  Camera AI 4G/5G là một loại camera an ninh sử dụng kết nối mạng di động 4G hoặc 5G để truyền tải dữ liệu, đồng thời tích hợp trí tuệ nhân tạo (AI) để phân tích và xử lý hình ảnh/video trực tiếp trên thiết bị (Edge AI) hoặc thông qua nền tảng đám mây.
                  Đây là sự kết hợp mạnh mẽ, mang lại khả năng giám sát thông minh và linh hoạt.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                  Xem ngay
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Dùng thử
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Kết nối 4G/5G</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Tính năng AI 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Lưu trữ cloud</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/map.png"
                alt="CameraAI Dashboard"
                width={1920} // hoặc đúng tỉ lệ mong muốn
                height={550}
                className="w-full h-[450px] md:h-[550px] object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Tính năng nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Áp dụng AI và công nghệ tiên tiến cho các giải pháp giám sát toàn diện.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Nhận diện bằng cameraAI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yếu tố &quot;thông minh&quot; giúp camera không chỉ đơn thuần ghi hình mà còn &quot;hiểu&quot; được những gì đang diễn ra.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Nhận diện thông minh</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                 Xác định và theo dõi cá nhân bằng công nghệ nhận dạng khuôn mặt và phân tích hành vi có độ chính xác cao.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Báo động kịp thời</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                 Hệ thống thông báo thông minh giúp giảm báo động giả và ưu tiên các sự kiện quan trọng.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Kết nối 4G/5G nhanh chóng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sử dụng sim data 4G/5G giúp tăng khả năng xử lý và ổn định đường truyền mạng.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trải nghiệm thực tế cameraAI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Xem và trải nghiệm cameraAI để hiểu rõ hơn về cách công nghệ hoạt động.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-red-600" />
                  <span>Demo trực tiếp</span>
                </CardTitle>
                <CardDescription>Xem camera của chúng tôi theo thời gian thực</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Play className="h-4 w-4 mr-2" />
                   Bắt đầu 
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Kiểm tra khả năng phát hiện đối tượng, nhận dạng khuôn mặt và theo dõi chuyển động bằng webcam hoặc video đã tải lên.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-red-600" />
                  <span>Trải nghiệm trực tiếp tại:</span>
                </CardTitle>
                <CardDescription>
                  Hoặc khám phá ngay trực tiếp tại trụ sở chính của chúng tôi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.568254597379!2d105.80841617568817!3d21.009936980634677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9e0c8c5e93%3A0x5de313b1b5dc0a84!2zODUgxJAuIE5ndXnhu4VuIE5n4buNYyBWxaksIFRydW5nIEhvw6AsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1753936983698!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors/Partners Section */}
      <section id="sponsors" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Các đối tác và nhà phát hành:
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Sản phẩm được phát triển bởi <strong className="text-red-500">MCK Group</strong> hợp tác cùng các đối tác uy tín...
            </p>
          </div>

          {/* Logo Marquee */}
          <Marquee pauseOnHover speed={100} gradient={false}>
            {[
              { name: "3T Corp", logo: "/images/sponsors/3T.png" },
              { name: "GTEL", logo: "/images/sponsors/gtel.png" },
              { name: "TechOne", logo: "/images/sponsors/MCK.png" },
              { name: "CameraAI", logo: "/images/sponsors/gtel.png" },
              { name: "MCK Group", logo: "/images/sponsors/MCK.png" },
              { name: "AIVision", logo: "/images/sponsors/3T.png" },
            ].map((partner, index) => (
              <div
                key={index}
                className="mx-6 bg-gray-100 rounded-lg p-4 flex items-center justify-center shadow-md hover:shadow-lg transition duration-300"
                style={{ minWidth: "180px", height: "80px" }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Service Packages Section */}
      <section id="services" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Giá gói dịch vụ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Các gói dịch vụ theo tháng, năm với giá tiền cụ thể được chúng tôi cung cấp:
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                title: "Gói 6 tháng",
                description: "Phù hợp với doanh nghiệp nhỏ và vừa",
                price: "25 triệu đồng",
                period: "/6 tháng",
                features: ["Cung cấp 5 camera", "Gói xác thực cơ bản", "Dung lượng Cloud (100GB)", "Cảnh báo Email"],
                popular: false,
                delay: "0ms",
              },
              {
                title: "Gói 1 năm",
                description: "Phù hợp với hầu hết các doanh nghiệp",
                price: "40 triệu đồng",
                period: "/năm",
                features: [
                  "Lên đến 25 camera",
                  "AI nâng cao",
                  "Xác minh khuôn mặt",
                  "Dung lượng Cloud (1TB)",
                  "Cảnh báo thời gian thực",
                ],
                popular: true,
                delay: "100ms",
              },
              {
                title: "Gói nâng cao",
                description: "Cung cấp các giải pháp toàn diện",
                price: "50 triệu đồng",
                period: "/năm",
                features: [
                  "Bao gồm 30 camera",
                  "Chức năng AI theo yêu cầu",
                  "Nhận diện nâng cao",
                  "Không giới hạn dụng lượng lưu trữ",
                  "Hỗ trợ 24/7",
                ],
                popular: false,
                delay: "200ms",
              },
            ].map((plan) => (
              <Card
                key={plan.title}
                className={`border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up ${
                  plan.popular
                    ? "border-red-500 shadow-2xl bg-gradient-to-br from-red-50 to-orange-50"
                    : "border-gray-200 shadow-lg hover:shadow-2xl bg-white"
                }`}
                style={{ animationDelay: plan.delay }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-bounce-subtle">
                      Đề xuất
                    </Badge>
                  </div>
                )}
                <CardHeader className="relative">
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-full space-y-4">
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 animate-fade-in-up"
                      style={{ animationDelay: `${Number.parseInt(plan.delay) + featureIndex * 50}ms` }}
                    >
                      <Check className="h-4 w-4 text-green-500 animate-pulse" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    className={`w-full transform hover:scale-105 transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    Chọn gói này
                  </Button>
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Liên hệ ngay</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             Bạn đã sẵn sàng chuyển đổi hệ thống bảo mật của mình bằng AI chưa? Hãy liên hệ với chuyên gia của chúng tôi để được tư vấn riêng.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Điện thoại</h3>
                    <p className="text-gray-600">0919 415 135</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">cameraAI@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Địa chỉ</h3>
                    <p className="text-gray-600">85 Nguyễn Ngọc Vũ, Trung Hòa, Cầu Giấy, Hà Nội</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Theo dõi chúng tôi</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61577169744069"
                    className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61577169744069"
                    className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61577169744069"
                    className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61577169744069"
                    className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center space-x-2">
                <Camera className="h-6 w-6 text-red-400 animate-pulse" />
                <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  CameraAI
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Các giải pháp camera chạy bằng AI thế hệ tiếp theo cho nhu cầu giám sát và bảo mật hiện đại.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <Link
                    key={index}
                    href="https://www.facebook.com/profile.php?id=61577169744069"
                    className="text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Sản phẩm",
                links: [
                  "Phát hiện AI",
                  "Nhận diện khuôn mặt",
                  "Phân tích thông minh",
                  "Điện toán biên (Edge Computing)",
                ],
                delay: "100ms",
              },
              {
                title: "Công ty",
                links: ["Giới thiệu", "Tin tức", "Tuyển dụng", "Liên hệ"],
                delay: "200ms",
              },
              {
                title: "Hỗ trợ",
                links: ["Tài liệu hướng dẫn", "Tài liệu API", "Trạng thái hệ thống", "Bảo mật"],
                delay: "300ms",
              },
            ].map((section) => (
              <div
                key={section.title}
                className="space-y-4 animate-fade-in-up"
                style={{ animationDelay: section.delay }}
              >
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} CameraAI. Đã đăng ký bản quyền.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Chính sách quyền riêng tư", "Điều khoản dịch vụ", "Chính sách Cookie"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 hover:underline"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce-subtle"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}
