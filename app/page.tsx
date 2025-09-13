"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { saveFreeTrialSubmission } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Phone,
  Mail,
  MapPin,
  Users,
  Database,
  Target,
  CheckCircle,
  Send,
  BarChart3,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  List,
  Filter,
  Sparkles,
  Globe,
  Award,
  MessageSquare,
} from "lucide-react"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", mobile: "" })
  const [animatedStats, setAnimatedStats] = useState({ users: 0, jobs: 0, coverage: 0 })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ users: 5000000, jobs: 300, coverage: 100 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      created_at: new Date().toISOString(),
    }

    try {
      await saveFreeTrialSubmission(payload)
      setShowSuccess(true)
      setFormData({ name: "", mobile: "" })

      setTimeout(() => {
        setIsModalOpen(false)
        setShowSuccess(false)
      }, 3000)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to save submission to Supabase', err)
      // Fallback: save locally if Supabase fails
      const data = {
        ...payload,
        fallback: true,
        id: Date.now(),
      }
      const existingData = JSON.parse(localStorage.getItem("nili-sms-leads") || "[]")
      existingData.push(data)
      localStorage.setItem("nili-sms-leads", JSON.stringify(existingData))
      setShowSuccess(true)
      setFormData({ name: "", mobile: "" })

      setTimeout(() => {
        setIsModalOpen(false)
        setShowSuccess(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">نیلی اس ام اس</h1>
                <p className="text-sm text-muted-foreground font-medium">پلتفرم پیشرفته پیامک تبلیغاتی</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-8 text-sm font-medium">
                <a
                  href="#services"
                  className="hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  خدمات
                </a>
                <a
                  href="#features"
                  className="hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  ویژگی‌ها
                </a>
                <a
                  href="#testimonials"
                  className="hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  نظرات
                </a>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  تماس
                </a>
              </nav>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl border">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-mono font-medium">09197648808</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl border">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-mono font-medium">02188717451</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute top-32 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-8 px-6 py-3 text-base font-semibold shadow-lg border-primary/20">
              <Award className="w-5 h-5 ml-2" />
              بیش از ۵۰ میلیون شماره موبایل فعال و معتبر
            </Badge>
          </div>

          <div className="animate-fade-in-up delay-200">
            <h1 className="text-6xl md:text-8xl font-bold mb-10 text-balance leading-tight">
              پیامک انبوه تبلیغاتی
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                هوشمند و مؤثر
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up delay-400">
            <p className="text-2xl md:text-3xl text-muted-foreground mb-16 max-w-5xl mx-auto text-pretty leading-relaxed">
              با پیشرفته‌ترین سیستم پیامک تبلیغاتی ایران، مخاطبان هدف خود را با دقت بالا شناسایی کرده و پیام‌های خود را به
              آن‌ها برسانید. فیلترینگ جغرافیایی، شغلی و ارسال به بلک لیست.
            </p>
          </div>

          <div className="animate-fade-in-up delay-600 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="text-xl px-12 py-8 shadow-2xl hover:shadow-primary/30 transition-all duration-300 group rounded-2xl"
                >
                  شروع رایگان
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl">شروع همکاری</DialogTitle>
                  <DialogDescription className="text-base">
                    اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند
                  </DialogDescription>
                </DialogHeader>

                {showSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                        اطلاعات با موفقیت ثبت شد
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        اطلاعات ورود به سرویس پیامکی برای شما ارسال خواهد شد
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        نام و نام خانوادگی
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="نام کامل خود را وارد کنید"
                        className="mt-3 h-12 text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile" className="text-base font-medium">
                        شماره موبایل
                      </Label>
                      <Input
                        id="mobile"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="09xxxxxxxxx"
                        className="mt-3 h-12 text-base"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full py-4 text-lg">
                      ثبت اطلاعات و دریافت مشاوره رایگان
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="lg"
              className="text-xl px-10 py-8 group bg-transparent rounded-2xl border-2"
            >
              مشاهده نمونه کارها
              <ArrowRight className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-base">
              <Globe className="w-5 h-5 ml-2" />
              خدمات تخصصی
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance">خدمات پیشرفته ما</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              مجموعه کاملی از ابزارهای پیشرفته پیامک تبلیغاتی برای رشد سریع و پایدار کسب‌وکار شما
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <List className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    جدید
                  </Badge>
                </div>
                <CardTitle className="text-2xl mb-3">ارسال به بلک لیست</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  ارسال پیامک به لیست‌های عظیم مشتریان با سرعت بالا و قابلیت‌های پیشرفته فیلترینگ و شخصی‌سازی
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>ارسال همزمان به میلیون‌ها مخاطب</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>فیلترینگ هوشمند بر اساس موقعیت جغرافیایی</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>شخصی‌سازی پیام برای هر مخاطب</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>گزارش‌گیری دقیق و تحلیل نتایج</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 group">
                  شروع ارسال انبوه
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <Filter className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">فیلترینگ پیشرفته</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  انتخاب دقیق مخاطبان بر اساس معیارهای مختلف برای بهترین نرخ تبدیل و کاهش هزینه‌ها
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>فیلتر بر اساس سن، جنسیت و علایق</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>انتخاب بر اساس تاریخچه خرید</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>تقسیم‌بندی جغرافیایی دقیق</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>حذف خودکار شماره‌های غیرفعال</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 group bg-transparent">
                  تست فیلترها
                  <Target className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10 p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">بانک اطلاعاتی هدفمند</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  دسترسی به جامع‌ترین بانک اطلاعاتی ایران با قابلیت فیلترینگ پیشرفته
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 p-8 pt-0">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">۵ میلیون شماره موبایل فعال</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">به‌روزرسانی روزانه</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">تضمین ۹۵٪ دقت اطلاعات</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 group rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10 p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">شهرهای ایران</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  تفکیک کامل شهرهای ایران به تفکیک کد پستی برای هدف‌گیری دقیق
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 p-8 pt-0">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-lg">تمام شهرهای ایران</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-lg">تفکیک بر اساس کد پستی</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-lg">پوشش ۱۰۰٪ کشور</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10 p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">بانک مشاغل تخصصی</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  دسته‌بندی مشاغل در ۳۰۰ عنوان شغلی مختلف برای هدف‌گیری بهتر
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 p-8 pt-0">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">۳۰۰ عنوان شغلی متنوع</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">دسته‌بندی تخصصی دقیق</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg">به‌روزرسانی مداوم</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">ویژگی‌های پیشرفته</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              تکنولوژی‌های روز دنیا برای بهترین تجربه پیامک تبلیغاتی
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ارسال فوری</h3>
              <p className="text-sm text-muted-foreground">ارسال پیامک در کمتر از ۳ ثانیه</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">آنالیز هوشمند</h3>
              <p className="text-sm text-muted-foreground">گزارش‌های تفصیلی و تحلیل نتایج</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">امنیت بالا</h3>
              <p className="text-sm text-muted-foreground">حفاظت کامل از اطلاعات شما</p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">پشتیبانی ۲۴/۷</h3>
              <p className="text-sm text-muted-foreground">پشتیبانی در تمام ساعات شبانه‌روز</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-base">
              <Star className="w-5 h-5 ml-2" />
              نظرات مشتریان
            </Badge>
            <h2 className="text-5xl font-bold mb-8">تجربه موفق کسب‌وکارها</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              داستان‌های موفقیت واقعی از مشتریان نیلی اس ام اس
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  "با استفاده از خدمات نیلی اس ام اس، فروش ما ۳۰۰٪ افزایش یافت. سیستم فیلترینگ فوق‌العاده‌ای دارند و
                  پشتیبانی بی‌نظیر."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">احمد محمدی</div>
                    <div className="text-muted-foreground">مدیر فروش شرکت تکنولوژی پارس</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  "پلتفرم نیلی اس ام اس به ما کمک کرد تا بازاریابی‌های خود را به سطح کشوری برسانیم. امکانات فیلترینگ و
                  ارسال انبوه بسیار مفید است."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">فاطمه احمدی</div>
                    <div className="text-muted-foreground">مدیر بازاریابی فروشگاه آنلاین</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  "دقت بانک اطلاعاتی‌شان واقعاً شگفت‌انگیز است. نرخ تبدیل ما به طور چشمگیری بهبود یافته و کمپین‌های ما با
                  موفقیت پیش‌برداشت شده‌اند."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">رضا کریمی</div>
                    <div className="text-muted-foreground">مدیرعامل استارتاپ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            پیشنهاد ویژه
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">آماده شروع هستید؟</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto text-pretty leading-relaxed">
            همین امروز کمپین پیامکی خود را با بهترین نرخ تبدیل شروع کنید و شاهد رشد فوق‌العاده کسب‌وکارتان باشید
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-xl px-10 py-8 shadow-2xl hover:shadow-white/25 transition-all duration-300 group rounded-2xl"
                >
                  مشاوره رایگان
                  <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl">مشاوره رایگان</DialogTitle>
                  <DialogDescription className="text-base">
                    کارشناسان ما آماده ارائه مشاوره رایگان هستند
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">تماس مستقیم</div>
                      <div className="text-sm text-muted-foreground font-mono">09197648808</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">تلفن ثابت</div>
                      <div className="text-sm text-muted-foreground font-mono">02188717451</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="lg"
              className="text-xl px-10 py-8 bg-white/10 border-white/30 text-white hover:bg-white/20 group rounded-2xl"
            >
              مشاهده قیمت‌ها
              <TrendingUp className="w-5 h-5 mr-3 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-16 px-4 bg-gradient-to-b from-muted/50 to-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    نیلی اس ام اس
                  </span>
                  <p className="text-sm text-muted-foreground">خدمات پیامک تبلیغاتی حرفه‌ای</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
                ارائه‌دهنده خدمات پیامک تبلیغاتی حرفه‌ای و هدفمند با بیش از ۵ میلیون شماره موبایل فعال و پوشش کامل ایران
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-mono">09197648808</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-mono">02188717451</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">خدمات</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    ارسال پیامک انبوه
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    بانک اطلاعاتی
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    فیلترینگ هوشمند
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    گزارش‌گیری
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">پشتیبانی</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    راهنمای استفاده
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    سوالات متداول
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    تماس با ما
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    قوانین و مقررات
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">© ۱۴۰۳ نیلی اس ام اس. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
