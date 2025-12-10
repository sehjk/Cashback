import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { BenefitPoint } from './components/BenefitPoint';
import { User, CheckCircle, Wallet, Crown, Sparkles, X, FileText } from 'lucide-react';

// Use global window variable for confetti from CDN
declare global {
  interface Window {
    confetti: any;
  }
}

// Translations Object
const translations = {
  en: {
    offerUnlocked: "Offer Unlocked",
    headlinePrefix: "Get ",
    headlineHighlight: "15% Back",
    headlineSuffix: " in Clinikk Cash.",
    subhead: "Join the Clinikk Cash program. We'll add 15% of your current bill to your wallet instantly.",
    feature1Title: "Get 15% Clinikk Cash on spends",
    feature1Desc: "Receive value on every rupee spent at Clinikk.",
    feature2Title: "Use Clinikk Cash for future visits",
    feature2Desc: "Pay up to 15% of any bill using Clinikk Cash.",
    feature3Title: "Pay for family members",
    feature3Desc: "Use balance for family linked to your registered number.",
    exclusiveOffer: "Exclusive Offer",
    accountTitle: "Clinikk Cash Account",
    userName: "Rahul Sharma",
    idLabel: "ID",
    dobLabel: "DOB",
    male: "Male",
    balanceLabel: "Clinikk Cash Balance",
    added: "Added!",
    termsPrefix: "By activating Clinikk Cash, you agree to our ",
    termsLink: "Terms of Service",
    termsSuffix: ". Clinikk Cash expires after 12 months of inactivity.",
    youGet: "You Get",
    onBillOf: "on bill of",
    activateBtn: "Activate & Get",
    activatedBtn: "Activated",
    termsHeader: "Terms of Service",
    term1Title: "Clinikk Cash Benefits",
    term1Desc: "Members are eligible for 15% cashback on all valid transactions made at Clinikk centers.",
    term2Title: "Redemption Limit",
    term2Desc: "Clinikk Cash can be applied to cover up to 15% of your total bill amount per transaction.",
    term3Title: "Validity",
    term3Desc: "Accrued Clinikk Cash is valid for 12 months from the date of the last transaction.",
    term4Title: "Non-Transferable",
    term4Desc: "Clinikk Cash is non-transferable and cannot be exchanged for physical cash.",
    understandBtn: "I Understand"
  },
  kn: {
    offerUnlocked: "ಆಫರ್ ಅನ್‌ಲಾಕ್ ಆಗಿದೆ",
    headlinePrefix: "Clinikk Cash ನಲ್ಲಿ ",
    headlineHighlight: "15% ಹಿಂಪಡೆಯಿರಿ",
    headlineSuffix: ".",
    subhead: "Clinikk Cash ಪ್ರೋಗ್ರಾಂಗೆ ಸೇರಿ. ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬಿಲ್‌ನ 15% ಅನ್ನು ನಾವು ತಕ್ಷಣ ನಿಮ್ಮ ವಾಲೆಟ್‌ಗೆ ಸೇರಿಸುತ್ತೇವೆ.",
    feature1Title: "ಖರ್ಚಿನ ಮೇಲೆ 15% Clinikk Cash ಪಡೆಯಿರಿ",
    feature1Desc: "Clinikk ನಲ್ಲಿ ಖರ್ಚು ಮಾಡುವ ಪ್ರತಿ ರೂಪಾಯಿಗೆ ಮೌಲ್ಯವನ್ನು ಪಡೆಯಿರಿ.",
    feature2Title: "ಮುಂದಿನ ಭೇಟಿಗಳಿಗೆ Clinikk Cash ಬಳಸಿ",
    feature2Desc: "Clinikk Cash ಬಳಸಿ ಯಾವುದೇ ಬಿಲ್‌ನ 15% ರಷ್ಟು ಪಾವತಿಸಿ.",
    feature3Title: "ಕುಟುಂಬ ಸದಸ್ಯರಿಗಾಗಿ ಪಾವತಿಸಿ",
    feature3Desc: "ನಿಮ್ಮ ನೋಂದಾಯಿತ ಸಂಖ್ಯೆಗೆ ಲಿಂಕ್ ಆಗಿರುವ ಕುಟುಂಬದ ಸದಸ್ಯರಿಗೆ ಬಳಸಿ.",
    exclusiveOffer: "ವಿಶೇಷ ಆಫರ್",
    accountTitle: "Clinikk Cash ಖಾತೆ",
    userName: "ರಾಹುಲ್ ಶರ್ಮಾ",
    idLabel: "ಐಡಿ",
    dobLabel: "ಜನ್ಮ ದಿನಾಂಕ",
    male: "ಪುರುಷ",
    balanceLabel: "Clinikk Cash ಬ್ಯಾಲೆನ್ಸ್",
    added: "ಸೇರಿಸಲಾಗಿದೆ!",
    termsPrefix: "Clinikk Cash ಸಕ್ರಿಯಗೊಳಿಸುವ ಮೂಲಕ, ನೀವು ನಮ್ಮ ",
    termsLink: "ಸೇವಾ ನಿಯಮಗಳಿಗೆ",
    termsSuffix: " ಒಪ್ಪುತ್ತೀರಿ. 12 ತಿಂಗಳ ನಿಷ್ಕ್ರಿಯತೆಯ ನಂತರ Clinikk Cash ಮುಕ್ತಾಯಗೊಳ್ಳುತ್ತದೆ.",
    youGet: "ನಿಮಗೆ ಸಿಗುವುದು",
    onBillOf: "ಬಿಲ್ ಮೊತ್ತ",
    activateBtn: "ಸಕ್ರಿಯಗೊಳಿಸಿ & ಪಡೆಯಿರಿ",
    activatedBtn: "ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    termsHeader: "ಸೇವಾ ನಿಯಮಗಳು",
    term1Title: "Clinikk Cash ಪ್ರಯೋಜನಗಳು",
    term1Desc: "ಸದಸ್ಯರು Clinikk ಕೇಂದ್ರಗಳಲ್ಲಿ ಮಾಡುವ ಎಲ್ಲಾ ಮಾನ್ಯ ವಹಿವಾಟುಗಳ ಮೇಲೆ 15% ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್‌ಗೆ ಅರ್ಹರಾಗಿರುತ್ತಾರೆ.",
    term2Title: "ರಿಡೆಂಪ್ಶನ್ ಮಿತಿ",
    term2Desc: "ಪ್ರತಿ ವಹಿವಾಟಿಗೆ ನಿಮ್ಮ ಒಟ್ಟು ಬಿಲ್ ಮೊತ್ತದ 15% ರಷ್ಟನ್ನು ಭರಿಸಲು Clinikk Cash ಬಳಸಬಹುದು.",
    term3Title: "ಮಾನ್ಯತೆ",
    term3Desc: "ಗಳಿಸಿದ Clinikk Cash ಕೊನೆಯ ವಹಿವಾಟಿನ ದಿನಾಂಕದಿಂದ 12 ತಿಂಗಳವರೆಗೆ ಮಾನ್ಯವಾಗಿರುತ್ತದೆ.",
    term4Title: "ವರ್ಗಾವಣೆ ಸಾಧ್ಯವಿಲ್ಲ",
    term4Desc: "Clinikk Cash ವರ್ಗಾಯಿಸಲಾಗುವುದಿಲ್ಲ ಮತ್ತು ಭೌತಿಕ ನಗದುಗಾಗಿ ವಿನಿಮಯ ಮಾಡಿಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ.",
    understandBtn: "ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ"
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'kn'>('en');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [displayedBalance, setDisplayedBalance] = useState(150); // Initial existing balance
  const [countdown, setCountdown] = useState("07:33:23");
  const [showTerms, setShowTerms] = useState(false);
  
  const t = translations[lang];
  
  // Mock Data
  const billAmount = 1800;
  const cashbackPercentage = 15;
  const cashbackAmount = (billAmount * cashbackPercentage) / 100;
  const initialBalance = 150;

  useEffect(() => {
    // Simple mock countdown timer
    const interval = setInterval(() => {
      const timeParts = countdown.split(':').map(Number);
      let [h, m, s] = timeParts;
      if (s > 0) s--;
      else {
        s = 59;
        if (m > 0) m--;
        else {
          m = 59;
          if (h > 0) h--;
        }
      }
      setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const handleAccept = () => {
    setIsSignedUp(true);
    
    // Trigger Confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#7c3aed', '#ffffff'] // Gold, Violet, White
      });
    }

    // Animate Balance
    let start = initialBalance;
    const end = initialBalance + cashbackAmount;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
      const current = start + (end - start) * easeOutQuart(progress);
      setDisplayedBalance(Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative pb-32">
      
      {/* Top Background Section - Full Width */}
      <div className="bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 rounded-b-[3.5rem] pb-32 shadow-xl overflow-hidden relative">
        
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* HEADER CONTAINER - WIDE (Expands on Desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header lang={lang} setLang={setLang} />
        </div>

        {/* CONTENT CONTAINER - CENTERED NARROW */}
        <div className="max-w-md mx-auto px-4">
          
          {/* Timer Banner */}
          <div className="mt-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{t.offerUnlocked}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-white font-mono text-sm font-medium">{countdown}</span>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="mt-8 text-center px-2">
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              {t.headlinePrefix}<span className="text-amber-400">{t.headlineHighlight}</span>{t.headlineSuffix}
            </h1>
            <p className="text-purple-200 mt-4 text-sm font-medium leading-relaxed max-w-xs mx-auto">
              {t.subhead}
            </p>
          </div>

          {/* Features Box */}
          <div className="mt-8 mx-2 bg-black/20 backdrop-blur-sm rounded-xl p-5 border border-white/5 space-y-4">
            <BenefitPoint 
              text={t.feature1Title} 
              subtext={t.feature1Desc} 
            />
            <BenefitPoint 
              text={t.feature2Title} 
              subtext={t.feature2Desc} 
            />
            <BenefitPoint 
              text={t.feature3Title} 
              subtext={t.feature3Desc} 
            />
          </div>
        </div>
      </div>

      {/* Floating Card Section - Constrained Width */}
      <div className="max-w-md mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] relative overflow-hidden ring-1 ring-black/5">
          {/* Card Top Banner */}
          <div className="absolute top-0 left-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-3 h-3" />
            {t.exclusiveOffer}
          </div>

          <div className="flex justify-between items-start mt-4">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{t.accountTitle}</p>
              <h2 className="text-xl font-bold text-gray-900 mt-1">{t.userName}</h2>
            </div>
            <div className="bg-purple-50 p-2 rounded-full">
               <User className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          {/* User Details Row */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-md">
              <span className="uppercase tracking-wider text-[10px] text-gray-400">{t.idLabel}</span>
              <span className="text-gray-700 font-semibold">9982-CLNK</span>
            </div>
            <div className="flex gap-4 text-gray-500 font-medium">
              <span>{t.dobLabel}: 12/08/1984</span>
              <span>{t.male}</span>
            </div>
          </div>

          {/* Wallet Balance Display inside Card */}
          <div className={`mt-4 rounded-xl p-4 transition-all duration-500 ${isSignedUp ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100' : 'bg-gray-50 border border-gray-100'}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${isSignedUp ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-500'}`}>
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{t.balanceLabel}</p>
                  <p className={`text-xl font-bold ${isSignedUp ? 'text-amber-600' : 'text-gray-700'}`}>
                    ₹{displayedBalance}
                  </p>
                </div>
              </div>
              {isSignedUp && (
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-white px-2 py-1 rounded-full shadow-sm animate-bounce">
                  + ₹{cashbackAmount} {t.added}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info / Terms Link */}
        <div className="py-6 text-center">
          <button 
            onClick={() => setShowTerms(true)}
            className="text-gray-400 text-xs leading-relaxed hover:text-gray-600 transition-colors"
          >
            {t.termsPrefix}<span className="underline decoration-dotted">{t.termsLink}</span>{t.termsSuffix}
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action Bar - Fixed full width, constrained content */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 p-4 pb-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          
          {/* Benefit Focus */}
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">{t.youGet}</span>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-emerald-600 leading-none">₹{cashbackAmount}</span>
              <span className="text-gray-400 text-[10px] font-medium mt-1">
                 {t.onBillOf} ₹{billAmount}
              </span>
            </div>
          </div>

          <button 
            onClick={handleAccept}
            disabled={isSignedUp}
            className={`flex-1 relative overflow-hidden transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg shadow-purple-200 ${
              isSignedUp 
                ? 'bg-emerald-500 text-white cursor-default' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isSignedUp ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{t.activatedBtn}</span>
              </>
            ) : (
              <>
                <span>{t.activateBtn} ₹{cashbackAmount}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terms and Conditions Bottom Sheet */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowTerms(false)}
          />
          
          {/* Sheet */}
          <div className="relative bg-white w-full max-w-md sm:rounded-2xl rounded-t-3xl p-6 shadow-2xl transform transition-transform animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 shrink-0 sm:hidden"></div>
            
            <div className="flex justify-between items-center mb-6 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">{t.termsHeader}</h3>
              </div>
              <button 
                onClick={() => setShowTerms(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto hide-scrollbar pb-4 flex-1">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{t.term1Title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t.term1Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{t.term2Title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t.term2Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{t.term3Title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t.term3Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600">4</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{t.term4Title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t.term4Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-2">
                <button 
                onClick={() => setShowTerms(false)}
                className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform"
                >
                {t.understandBtn}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;