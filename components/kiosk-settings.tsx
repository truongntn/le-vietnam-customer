"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function KioskSettings() {
  const [businessName, setBusinessName] = useState("KIOSK CENTER")
  const [phoneNumber, setPhoneNumber] = useState("(800) 555-1234")
  const [primaryColor, setPrimaryColor] = useState("#ec4899")
  const [accentColor, setAccentColor] = useState("#3b82f6")
  const [showPromo, setShowPromo] = useState(true)
  const [promoText, setPromoText] = useState("10% OFF WHEN YOU REDEEM 10 REWARD POINTS")

  const handleSave = () => {
    // In a real app, you would save these settings to your backend
    console.log("Saving settings:", {
      businessName,
      phoneNumber,
      primaryColor,
      accentColor,
      showPromo,
      promoText,
    })
    alert("Settings saved successfully!")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Kiosk Settings</h1>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the basic information for your kiosk.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="kiosk-mode" checked={true} onCheckedChange={() => {}} />
                <Label htmlFor="kiosk-mode">Enable Kiosk Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your kiosk.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="accentColor"
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preview</Label>
                <div
                  className="h-32 rounded-lg p-4 flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
                >
                  {businessName}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure the content displayed on your kiosk.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="show-promo" checked={showPromo} onCheckedChange={setShowPromo} />
                <Label htmlFor="show-promo">Show Promotional Content</Label>
              </div>

              {showPromo && (
                <div className="space-y-2">
                  <Label htmlFor="promoText">Promotional Text</Label>
                  <Input id="promoText" value={promoText} onChange={(e) => setPromoText(e.target.value)} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Input id="welcomeMessage" value="PLEASE ENTER PHONE NUMBER" onChange={() => {}} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privacyMessage">Privacy Message</Label>
                <Input
                  id="privacyMessage"
                  value="Your visit will not be shared with any third party"
                  onChange={() => {}}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
