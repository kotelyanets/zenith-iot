import { Contact2 } from "@/components/ui/contact-2"

export default function SupportPage() {
    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8">
            <Contact2
                title="Support"
                description="Need help with the Zenith IoT Platform? Our team is ready to assist with technical questions, device configuration, or platform issues."
                phone="+351 912 345 678"
                email="support@zenith-iot.com"
                web={{ label: "zenith-iot.com", url: "https://zenith-iot.com" }}
            />
        </div>
    )
}
