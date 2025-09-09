"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, CheckCircle, Phone, Mail, Calendar, User, Download, Trash2 } from "lucide-react"
import Link from "next/link"

interface Lead {
  id: number
  name: string
  mobile: string
  timestamp: string
}

export default function ResultsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [latestLead, setLatestLead] = useState<Lead | null>(null)

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("nili-sms-leads") || "[]")
      setLeads(data)

      // Get the latest lead
      if (data.length > 0) {
        setLatestLead(data[data.length - 1])
      }
    } catch (error) {
      console.error("Error loading leads:", error)
      setLeads([])
    }
  }, [])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const exportToCSV = () => {
    const headers = ["شناسه,نام,شماره موبایل,تاریخ ثبت"]
    const csvData = leads.map((lead) => `${lead.id},"${lead.name}","${lead.mobile}","${formatDate(lead.timestamp)}"`)
    const csvContent = [headers, ...csvData].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `nili-sms-leads-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAllData = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید تمام اطلاعات را پاک کنید؟")) {
      localStorage.removeItem("nili-sms-leads")
      setLeads([])
      setLatestLead(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">نیلی اس ام اس</h1>
                <p className="text-xs text-muted-foreground">خدمات پیامک تبلیغاتی</p>
              </div>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowRight className="w-4 h-4 ml-2" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Success Message */}
        {latestLead && (
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">درخواست شما با موفقیت ثبت شد!</h1>
            <p className="text-muted-foreground text-lg mb-6">
              سلام {latestLead.name} عزیز، اطلاعات شما دریافت شد و کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
            </p>
            <Badge variant="secondary" className="text-sm">
              شماره پیگیری: {latestLead.id}
            </Badge>
          </div>
        )}

        {/* Storage Information */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              اطلاعات ذخیره‌سازی
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">مدت زمان ذخیره‌سازی:</span>
                <span className="font-medium">تا زمان پاک کردن مرورگر</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تعداد کل درخواست‌ها:</span>
                <span className="font-medium">{leads.length} درخواست</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخرین به‌روزرسانی:</span>
                <span className="font-medium">
                  {latestLead ? formatDate(latestLead.timestamp) : "هیچ داده‌ای موجود نیست"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Lead Details */}
        {latestLead && (
          <Card className="max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                اطلاعات ثبت شده
              </CardTitle>
              <CardDescription>جزئیات درخواست شما</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">نام و نام خانوادگی</div>
                  <div className="text-muted-foreground">{latestLead.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">شماره موبایل</div>
                  <div className="text-muted-foreground">{latestLead.mobile}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">زمان ثبت</div>
                  <div className="text-muted-foreground">{formatDate(latestLead.timestamp)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              اطلاعات تماس
            </CardTitle>
            <CardDescription>برای تماس فوری می‌توانید از شماره‌های زیر استفاده کنید</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">موبایل (پشتیبانی ۲۴ ساعته)</div>
                <div className="text-primary font-mono">09197648808</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">تلفن ثابت (ساعات اداری)</div>
                <div className="text-primary font-mono">02188717451</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Leads Table (Admin View) */}
        {leads.length > 0 && (
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>جدول درخواست‌ها</CardTitle>
                  <CardDescription>لیست کامل درخواست‌های ثبت شده ({leads.length} درخواست)</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={exportToCSV}>
                    <Download className="w-4 h-4 ml-2" />
                    دانلود CSV
                  </Button>
                  <Button variant="destructive" size="sm" onClick={clearAllData}>
                    <Trash2 className="w-4 h-4 ml-2" />
                    پاک کردن همه
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">شناسه</TableHead>
                      <TableHead className="text-right">نام و نام خانوادگی</TableHead>
                      <TableHead className="text-right">شماره موبایل</TableHead>
                      <TableHead className="text-right">تاریخ ثبت</TableHead>
                      <TableHead className="text-right">وضعیت</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          <Badge variant="outline">#{lead.id}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="font-mono">{lead.mobile}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(lead.timestamp)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            در انتظار تماس
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4">مراحل بعدی</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">۱</span>
              </div>
              <h4 className="font-medium mb-2">تماس کارشناس</h4>
              <p className="text-sm text-muted-foreground">کارشناس ما ظرف ۲۴ ساعت با شما تماس می‌گیرد</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">۲</span>
              </div>
              <h4 className="font-medium mb-2">مشاوره رایگان</h4>
              <p className="text-sm text-muted-foreground">دریافت مشاوره تخصصی برای کمپین شما</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">۳</span>
              </div>
              <h4 className="font-medium mb-2">شروع کمپین</h4>
              <p className="text-sm text-muted-foreground">راه‌اندازی کمپین پیامکی هدفمند شما</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
