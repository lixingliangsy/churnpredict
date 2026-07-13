export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "ChurnGuard",
  slug: "churnpredict",
  tagline: "Spot churn risk before it costs you",
  description: "Answer a few questions about your SaaS and get a churn-risk score with the top 3 levers to pull. Built for founders who'd rather prevent churn than explain it to investors.",
  toolTitle: "Assess your churn risk",
  resultLabel: "Your risk report",
  ctaLabel: "Assess risk",
  features: [
  "0-100 churn-risk score",
  "Top 3 retention levers",
  "Benchmark vs similar SaaS",
  "Plain-English explanation"
],
  inputs: [
  {
    "key": "mrr",
    "label": "Monthly MRR ($)",
    "type": "input",
    "placeholder": "e.g. 8000"
  },
  {
    "key": "customers",
    "label": "Active customers",
    "type": "input",
    "placeholder": "e.g. 220"
  },
  {
    "key": "churn",
    "label": "Monthly churn (%)",
    "type": "input",
    "placeholder": "e.g. 5"
  },
  {
    "key": "nps",
    "label": "NPS (-100..100)",
    "type": "input",
    "placeholder": "e.g. 32"
  },
  {
    "key": "tickets",
    "label": "Support tickets / customer / mo",
    "type": "input",
    "placeholder": "e.g. 0.4"
  }
] as InputField[],
  systemPrompt: "You are a retention expert. Given MRR, customers, churn %, NPS and support ticket volume, output a 0-100 churn-risk score, a one-line verdict, and the 3 highest-leverage actions to reduce churn. Be specific and blunt.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "3 assessments/month"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  },
  {
    "tier": "Team",
    "price": "$49/mo",
    "desc": "Shared workspace"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const mrr = parseFloat(inputs['mrr']) || 0
  const cust = parseInt(inputs['customers']) || 0
  const churn = parseFloat(inputs['churn']) || 0
  const nps = parseInt(inputs['nps']) || 0
  const tickets = parseFloat(inputs['tickets']) || 0
  let risk = 20
  if (churn > 5) risk += (churn - 5) * 6
  if (nps < 30) risk += (30 - nps) * 0.4
  if (tickets > 0.5) risk += (tickets - 0.5) * 20
  if (mrr > 0 && cust > 0 && (mrr / cust) < 20) risk += 10
  risk = Math.max(5, Math.min(95, Math.round(risk)))
  const verdict = risk > 60 ? 'High risk - churn is eating growth.' : (risk > 35 ? 'Moderate risk - fix retention soon.' : 'Low risk - healthy retention.')
  const levers = [
    churn > 5 ? 'Cut churn: onboarding + win-back flow for silent accounts.' : 'Keep onboarding tight.',
    nps < 30 ? 'Lift NPS: close top support complaints, add a feedback loop.' : 'Maintain NPS with periodic check-ins.',
    tickets > 0.5 ? 'Reduce ticket load: self-serve docs + in-app guidance.' : 'Support load is OK.'
  ]
  return `CHURN RISK REPORT
Risk score: ${risk}/100
Verdict: ${verdict}

Top levers:
1. ${levers[0]}
2. ${levers[1]}
3. ${levers[2]}

--- (Mock score from your inputs. Add OPENAI_API_KEY for a full retention plan.)`
}
}
