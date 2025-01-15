import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8 hover:bg-accent/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground/90">1. Information We Collect</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We collect information that you provide directly to us, including when you create an account, 
              use our services, or communicate with us.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground/90">2. How We Use Your Information</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, 
              to develop new features, and to protect our users.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground/90">3. Information Sharing</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We do not share your personal information with third parties except as described 
              in this privacy policy.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground/90">4. Data Security</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground/90">5. Your Rights</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information. 
              You can also object to or restrict certain processing of your information.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground/90">6. Contact Us</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@trendingai.pro" className="text-primary hover:text-primary/80 underline">
                privacy@trendingai.pro
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;