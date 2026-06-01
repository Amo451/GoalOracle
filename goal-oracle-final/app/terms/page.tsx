import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | GoalOracle AI",
  description:
    "Read our terms of service to understand the rules and regulations governing your use of GoalOracle AI.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: June 1, 2026</p>

          <div className="prose prose-lg dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using GoalOracle AI (&quot;the Service&quot;), you accept and agree to be
                bound by these Terms of Service. If you do not agree to these terms, please do not
                use our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                GoalOracle AI provides AI-powered football predictions, match analysis, team
                statistics, and related content for informational and entertainment purposes only.
                Our predictions are generated using machine learning algorithms and should not be
                considered guaranteed outcomes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Important:</strong> Our predictions and analysis are for informational
                purposes only and do not constitute financial, betting, or gambling advice.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Past performance does not guarantee future results</li>
                <li>Sports outcomes are inherently unpredictable</li>
                <li>We do not guarantee the accuracy of any prediction</li>
                <li>Users are solely responsible for their betting decisions</li>
                <li>Always gamble responsibly and within your means</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Age Requirement</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 18 years old (or the legal gambling age in your jurisdiction) to
                use our Service. By using GoalOracle AI, you confirm that you meet this age
                requirement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Affiliate Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                GoalOracle AI may contain affiliate links to third-party betting sites and streaming
                platforms. We may receive compensation when you click on these links or sign up for
                their services. This does not affect the objectivity of our predictions or analysis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Reproduce or distribute our content without permission</li>
                <li>Use automated systems to access the Service</li>
                <li>Interfere with the proper functioning of the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on GoalOracle AI, including text, graphics, logos, and software, is the
                property of GoalOracle AI or its licensors and is protected by intellectual property
                laws. You may not reproduce, modify, or distribute our content without written
                permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, GoalOracle AI shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but not
                limited to loss of profits, data, or other intangible losses resulting from your use
                of the Service or reliance on our predictions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Responsible Gambling</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We encourage responsible gambling practices:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Set a budget and stick to it</li>
                <li>Never chase losses</li>
                <li>Gambling should be entertainment, not income</li>
                <li>Seek help if gambling becomes a problem</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you or someone you know has a gambling problem, please contact your local
                responsible gambling helpline.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be
                effective immediately upon posting. Your continued use of the Service after changes
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at
                legal@goaloracleai.com or through our Telegram channel.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
