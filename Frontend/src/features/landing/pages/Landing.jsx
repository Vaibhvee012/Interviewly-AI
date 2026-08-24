import React from 'react'
import { Link } from 'react-router'
import {
    Sparkles,
    Upload,
    FileText,
    Target,
    MessageSquare,
    BarChart3,
    Calendar,
    ShieldCheck,
    Check
} from 'lucide-react'
import '../landing.scss'

const NAV_LINKS = [
    { label: 'Home', href: '#top' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' }
]

const STEPS = [
    {
        icon: Upload,
        title: 'Upload your resume',
        desc: 'Drop in your resume as a PDF, or just describe your experience in a few sentences.'
    },
    {
        icon: FileText,
        title: 'Paste the job description',
        desc: 'Add the role you\'re targeting so the AI can tailor everything to that specific job.'
    },
    {
        icon: Sparkles,
        title: 'Get your interview plan',
        desc: 'Receive tailored questions, a match score, skill gaps, and a day-by-day prep roadmap.'
    }
]

const FEATURES = [
    {
        icon: Target,
        title: 'Match Score',
        desc: 'See exactly how well your profile fits the role before you even apply.'
    },
    {
        icon: MessageSquare,
        title: 'Tailored Questions',
        desc: 'Technical and behavioral questions built around your resume and the job description.'
    },
    {
        icon: BarChart3,
        title: 'Skill Gap Analysis',
        desc: 'Know precisely what to brush up on, ranked by how much it matters for this role.'
    },
    {
        icon: Calendar,
        title: 'Prep Roadmap',
        desc: 'A day-by-day plan so you walk in fully prepared, not overwhelmed.'
    },
    {
        icon: FileText,
        title: 'Resume Export',
        desc: 'Generate a tailored, ATS-friendly resume as a polished PDF, ready to send.'
    },
    {
        icon: ShieldCheck,
        title: 'Private & Secure',
        desc: 'Your resume and personal details stay yours — never shared or sold.'
    }
]

const PLANS = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        features: ['3 interview plans / month', 'Match score & skill gaps', 'Basic prep roadmap'],
        cta: 'Get Started',
        featured: false
    },
    {
        name: 'Pro',
        price: '$9',
        period: '/ month',
        features: ['Unlimited interview plans', 'Tailored resume PDF export', 'Priority AI processing', 'Full prep roadmap'],
        cta: 'Go Pro',
        featured: true
    }
]

const Landing = () => {
    return (
        <div className='landing'>
            <header className='landing-nav' id='top'>
                <div className='landing-nav__brand'>
                    <img
                        src='/logo-navbar.png'
                        alt='Interviewly AI logo'
                        className='landing-nav__logo'
                    />
                    Interviewly AI
                </div>

                <nav className='landing-nav__links'>
                    {NAV_LINKS.map((link, i) => (
                        <a key={link.label} href={link.href} className={i === 0 ? 'active' : ''}>{link.label}</a>
                    ))}
                </nav>

                <div className='landing-nav__actions'>
                    <Link to='/login' className='landing-nav__login'>Login</Link>
                    <Link to='/register' className='landing-nav__cta'>Get Started</Link>
                </div>
            </header>

            <main className='landing-hero'>
                <span className='landing-hero__badge'><Sparkles size={14} /> AI-Powered Interview Prep</span>

                <h1>
                    Land Your Dream Job with an<br />
                    <span>AI-Powered</span> Interview Plan
                </h1>

                <p>
                    Upload your resume and a job description — get tailored technical and
                    behavioral questions, skill gap analysis, and a day-by-day prep plan in minutes.
                </p>

                <div className='landing-hero__actions'>
                    <Link to='/register' className='btn-primary'>Create My Plan</Link>
                    <a href='#how-it-works' className='btn-secondary'>See How It Works</a>
                </div>

                <div className='landing-panel'>
                    <div className='word-art'>
                        <span>I</span>
                        <span>N</span>
                        <span>T</span>
                        <span>E</span>
                        <span>R</span>
                        <span>V</span>
                        <span>I</span>
                        <span>E</span>
                        <span>W</span>
                    </div>
                    <div className='floating-card card-1'>
                        <div className='card-line short'></div>
                        <div className='card-line'></div>
                        <div className='card-line long'></div>
                    </div>
                    <div className='floating-card card-2'>
                        <div className='card-dot'></div>
                        <div className='card-line'></div>
                    </div>
                    <div className='floating-badge'>92% Match</div>
                </div>
            </main>

            <section className='landing-section' id='how-it-works'>
                <span className='landing-section__eyebrow'>How it works</span>
                <h2>Three steps to your next offer</h2>

                <div className='steps-grid'>
                    {STEPS.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={step.title} className='step-card'>
                                <span className='step-card__icon'><Icon size={18} /></span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className='landing-section' id='features'>
                <span className='landing-section__eyebrow'>Features</span>
                <h2>Everything you need to prepare</h2>

                <div className='features-grid'>
                    {FEATURES.map(f => {
                        const Icon = f.icon
                        return (
                            <div key={f.title} className='feature-card'>
                                <span className='feature-card__icon'><Icon size={20} /></span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className='landing-section' id='pricing'>
                <span className='landing-section__eyebrow'>Pricing</span>
                <h2>Simple, honest pricing</h2>

                <div className='pricing-grid'>
                    {PLANS.map(plan => (
                        <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                            {plan.featured && <span className='pricing-card__badge'>Most Popular</span>}
                            <h3>{plan.name}</h3>
                            <div className='pricing-card__price'>
                                {plan.price} <span>{plan.period}</span>
                            </div>
                            <ul>
                                {plan.features.map(f => (
                                    <li key={f}><Check size={14} /> {f}</li>
                                ))}
                            </ul>
                            <Link to='/register' className={plan.featured ? 'btn-primary' : 'btn-secondary'}>{plan.cta}</Link>
                        </div>
                    ))}
                </div>
            </section>

            <footer className='landing-footer'>
                <p>© 2026 Interviewly AI. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Landing