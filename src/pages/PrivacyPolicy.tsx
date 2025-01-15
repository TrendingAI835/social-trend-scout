import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including when you create an account, use our services, or communicate with us.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect our users.</p>
          
          <h2>3. Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this privacy policy.</p>
          
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your information.</p>
          
          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;