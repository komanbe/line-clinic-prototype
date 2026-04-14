import { useState, useEffect } from 'react'
import './index.css'

function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 py-1 bg-white text-xs text-gray-800 font-semibold">
      <span>9:41</span>
      <div className="flex gap-1 items-center">
        <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="6" width="3" height="6" rx="0.5" fill="#333"/><rect x="4" y="4" width="3" height="8" rx="0.5" fill="#333"/><rect x="8" y="2" width="3" height="10" rx="0.5" fill="#333"/><rect x="12" y="0" width="3" height="12" rx="0.5" fill="#333"/></svg>
        <svg width="22" height="12" viewBox="0 0 22 12"><rect x="0.5" y="0.5" width="19" height="11" rx="2" stroke="#333" fill="none"/><rect x="20" y="3.5" width="2" height="5" rx="1" fill="#333"/><rect x="2" y="2" width="13" height="8" rx="1" fill="#06C755"/></svg>
      </div>
    </div>
  )
}

function ChatHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-100">
      <div className="w-9 h-9 rounded-full bg-[#06C755] flex items-center justify-center text-white text-xs font-bold">XR</div>
      <div className="flex-1">
        <div className="font-bold text-sm text-gray-900">XRメンタルクリニック</div>
        <div className="text-[10px] text-gray-400">公式アカウント</div>
      </div>
      <div className="flex gap-3 text-gray-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>
    </div>
  )
}

function LiffHeader({ title, onBack, onClose }) {
  return (
    <div className="flex items-center px-3 py-2.5 bg-white border-b border-gray-100">
      {onBack && (
        <button onClick={onBack} className="p-1 mr-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#028090" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      <div className="flex-1 text-center text-sm font-bold text-gray-800 truncate">{title}</div>
      {onClose && (
        <button onClick={onClose} className="p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  )
}

function Bubble({ children, delay = 0 }) {
  const [show, setShow] = useState(delay === 0)
  useEffect(() => {
    if (delay > 0) { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t) }
  }, [delay])
  if (!show) return null
  return (
    <div className="flex justify-start mb-2 bubble-enter">
      <div className="w-8 h-8 rounded-full bg-[#06C755] flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mr-2 mt-1">XR</div>
      <div className="max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed bg-white text-gray-800 rounded-tl-sm shadow-sm">
        {children}
      </div>
    </div>
  )
}

function MenuBtn({ icon, label, sub, color, textDark, onClick }) {
  return (
    <button onClick={onClick} className={`${color} rounded-xl p-2 flex flex-col items-center justify-center aspect-square`}>
      <span className="text-2xl mb-1">{icon}</span>
      <span className={`text-[10px] font-bold leading-tight ${textDark ? 'text-gray-700' : 'text-white'}`}>{label}</span>
      {sub && <span className={`text-[8px] mt-0.5 ${textDark ? 'text-gray-400' : 'text-white/80'}`}>{sub}</span>}
    </button>
  )
}

function RichMenu({ activeTab, onTabChange, onMenuClick }) {
  return (
    <div className="bg-white border-t border-gray-100">
      <div className="flex">
        <button onClick={() => onTabChange('online')} className={`flex-1 py-2 text-xs font-bold border-b-2 ${activeTab === 'online' ? 'text-[#F96167] border-[#F96167]' : 'text-gray-400 border-transparent'}`}>オンライン診療</button>
        <button onClick={() => onTabChange('clinic')} className={`flex-1 py-2 text-xs font-bold border-b-2 ${activeTab === 'clinic' ? 'text-[#F96167] border-[#F96167]' : 'text-gray-400 border-transparent'}`}>対面診療・セルフケア</button>
      </div>
      {activeTab === 'online' ? (
        <div className="grid grid-cols-4 gap-0.5 p-2">
          <MenuBtn icon="🌙" label="診察予約" sub="夜の部(17-24時)" color="bg-gradient-to-br from-indigo-500 to-purple-600" onClick={() => onMenuClick('needs')} />
          <MenuBtn icon="☀️" label="診察予約" sub="朝・昼(8-17時)" color="bg-gradient-to-br from-orange-400 to-pink-500" onClick={() => onMenuClick('needs')} />
          <MenuBtn icon="💊" label="お薬の確認" color="bg-white border border-gray-200" textDark onClick={() => onMenuClick('meds')} />
          <MenuBtn icon="👤" label="マイページ" color="bg-white border border-gray-200" textDark onClick={() => onMenuClick('mypage')} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5 p-2">
          <MenuBtn icon="🏥" label="対面予約" sub="XRクリニック" color="bg-gradient-to-br from-teal-500 to-cyan-600" onClick={() => {}} />
          <MenuBtn icon="📚" label="記事・読み物" color="bg-white border border-gray-200" textDark onClick={() => {}} />
          <MenuBtn icon="🌿" label="リラックス" color="bg-white border border-gray-200" textDark onClick={() => {}} />
        </div>
      )}
    </div>
  )
}

// ===== SCREENS =====

function ChatScreen({ onNavigate }) {
  const [tab, setTab] = useState('online')
  return (
    <>
      <ChatHeader />
      <div className="flex-1 bg-[#8CABD9] px-3 py-3 overflow-y-auto hide-scrollbar">
        <div className="text-center text-white/60 text-[10px] mb-3">4月15日(火)</div>
        <Bubble>
          <div className="font-bold mb-1">こんにちは！👋</div>
          <div>XRメンタルクリニックの公式アカウントです。</div>
          <div className="mt-1">オンラインで精神科・心療内科の診察が受けられます。</div>
        </Bubble>
        <Bubble delay={400}>
          <div className="bg-[#FFF5F5] rounded-xl p-3 -mx-1">
            <div className="text-[#F96167] font-bold text-sm mb-1">その後、心や身体の調子はいかがですか？</div>
            <div className="text-xs text-gray-600 mb-2">心身のつらい症状、放置すると危険です。まずは相談だけでもOK！</div>
            <button onClick={() => onNavigate('needs')} className="w-full bg-[#F96167] text-white rounded-full py-2.5 text-sm font-bold">今すぐ診療予約する</button>
          </div>
        </Bubble>
      </div>
      <RichMenu activeTab={tab} onTabChange={setTab} onMenuClick={(key) => onNavigate(key)} />
    </>
  )
}

function NeedsScreen({ onNavigate, onBack }) {
  const needs = [
    { icon: "💊", title: "お薬の処方", desc: "前回と同じ薬 / 簡単な相談", time: "10分", color: "bg-emerald-500", key: "medication" },
    { icon: "💬", title: "じっくり相談", desc: "症状についてしっかり話したい", time: "20分", color: "bg-teal-500", key: "consultation" },
    { icon: "🧠", title: "カウンセリング", desc: "心理士 / PSWに相談したい", time: "30分", color: "bg-blue-500", key: "counseling" },
    { icon: "📋", title: "診断書・書類", desc: "発行の相談・傷病手当金 等", time: "15分", color: "bg-amber-500", key: "document" },
  ]
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="オンライン診療予約" onBack={onBack} />
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto hide-scrollbar">
        <h2 className="text-lg font-bold text-gray-800 mb-1">どんなご相談ですか？</h2>
        <p className="text-xs text-gray-400 mb-4">ご希望に合った診察をご案内します</p>
        <div className="space-y-3">
          {needs.map((n, i) => (
            <button key={n.key} onClick={() => onNavigate('doctor_select', { need: n.key, needTitle: n.title, time: n.time })}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow text-left fade-enter"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`w-14 h-14 rounded-2xl ${n.color} flex items-center justify-center text-2xl flex-shrink-0`}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm">{n.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{n.desc}</div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-xs font-bold text-[#028090] bg-[#028090]/10 px-2 py-0.5 rounded-full">{n.time}</span>
                <svg className="mt-1 text-gray-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function DoctorSelectScreen({ onNavigate, onBack, context }) {
  const [mode, setMode] = useState('time')
  const [selectedDate, setSelectedDate] = useState(null)

  const doctors = [
    { id: 1, name: "田中 太郎", specialty: "うつ・不安障害", tag: "ビジネス", univ: "東京大学卒", avatar: "👨‍⚕️" },
    { id: 2, name: "鈴木 花子", specialty: "ADHD・適応障害", tag: "学生の悩み", univ: "高知大学卒", avatar: "👩‍⚕️" },
    { id: 3, name: "佐藤 健一", specialty: "不眠症・パニック", tag: "睡眠", univ: "京都大学卒", avatar: "👨‍⚕️" },
  ]
  const dates = [
    { day: "火", date: 15 }, { day: "水", date: 16 }, { day: "木", date: 17 },
    { day: "金", date: 18 }, { day: "土", date: 19 }, { day: "日", date: 20 },
  ]
  const times = ["8:00", "8:30", "9:00", "9:30", "10:00", "20:00", "20:30", "21:00", "21:30", "22:00"]

  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title={context?.needTitle || "診察予約"} onBack={onBack} onClose={onBack} />
      <div className="flex-1 bg-white overflow-y-auto hide-scrollbar">
        <div className="flex m-3 bg-gray-100 rounded-xl p-0.5">
          <button onClick={() => setMode('time')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${mode === 'time' ? 'bg-white text-[#028090] shadow-sm' : 'text-gray-400'}`}>空いてる時間から探す</button>
          <button onClick={() => setMode('doctor')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${mode === 'doctor' ? 'bg-white text-[#028090] shadow-sm' : 'text-gray-400'}`}>先生から探す</button>
        </div>
        {mode === 'time' ? (
          <>
            <div className="px-3 mb-3">
              <div className="text-xs font-bold text-gray-600 mb-2">先生一覧</div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg border-2 border-[#028090]">🕐</div>
                  <span className="text-[9px] mt-1 text-[#028090] font-bold">空き枠</span>
                </div>
                {doctors.map(d => (
                  <div key={d.id} className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">{d.avatar}</div>
                    <span className="text-[9px] mt-1 text-gray-500">{d.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-3 mb-3">
              <div className="text-xs font-bold text-gray-600 mb-2">日付を選択</div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {dates.map(d => (
                  <button key={d.date} onClick={() => setSelectedDate(d.date)}
                    className={`flex flex-col items-center px-3 py-2 rounded-xl flex-shrink-0 transition ${selectedDate === d.date ? 'bg-[#028090] text-white' : 'bg-gray-50 text-gray-600'}`}>
                    <span className="text-[10px]">{d.day}</span>
                    <span className="text-sm font-bold">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>
            {selectedDate && (
              <div className="px-3 mb-3 fade-enter">
                <div className="text-xs font-bold text-gray-600 mb-2">時間を選択</div>
                <div className="grid grid-cols-4 gap-2">
                  {times.map(t => (
                    <button key={t} onClick={() => onNavigate('booking_confirm', { ...context, doctor: doctors[0], date: `4月${selectedDate}日`, time: t })}
                      className="py-2 rounded-lg text-xs font-medium bg-[#028090]/5 text-[#028090] hover:bg-[#028090] hover:text-white transition">{t}</button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="px-3 space-y-3">
            {doctors.map((d, i) => (
              <button key={d.id} onClick={() => onNavigate('booking_confirm', { ...context, doctor: d, date: "4月18日(金)", time: "20:00" })}
                className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-3 text-left fade-enter" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-3xl flex-shrink-0">{d.avatar}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-800">{d.name}先生</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{d.univ}</div>
                  <div className="flex gap-1 mt-1.5">
                    <span className="text-[9px] bg-[#028090]/10 text-[#028090] px-1.5 py-0.5 rounded-full">{d.specialty}</span>
                    <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{d.tag}</span>
                  </div>
                </div>
                <svg className="text-gray-300 mt-4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BookingConfirmScreen({ onNavigate, onBack, context }) {
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="予約内容の確認" onBack={onBack} />
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto hide-scrollbar">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="text-xs text-gray-400 mb-3">ご予約内容</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-3xl">{context?.doctor?.avatar || "👨‍⚕️"}</div>
            <div>
              <div className="font-bold text-gray-800">{context?.doctor?.name || "田中太郎"}先生</div>
              <div className="text-xs text-[#028090] mt-0.5">{context?.date || "4月18日(金)"} {context?.time || "20:00"}〜</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl p-3">
            <span className="text-base">{context?.need === 'medication' ? '💊' : context?.need === 'counseling' ? '🧠' : context?.need === 'document' ? '📋' : '💬'}</span>
            <span className="font-medium">{context?.needTitle || "じっくり相談"}</span>
            <span className="ml-auto text-[#028090] font-bold">{context?.time || "20分枠"}</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="text-xs text-gray-400 mb-2">お支払いの目安</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs bg-[#F96167] text-white px-1.5 py-0.5 rounded">初診</span>
            <span className="text-2xl font-bold text-gray-800 ml-2">5,400</span>
            <span className="text-sm text-gray-500">円前後 + 薬代(税込)</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-2 space-y-0.5">
            <div>・お支払いはクレジットカード決済です</div>
            <div>・薬代は処方日数や種類によって変動します</div>
          </div>
        </div>
        <button onClick={() => onNavigate('consent', context)} className="w-full bg-[#028090] text-white rounded-2xl py-4 text-sm font-bold shadow-lg">同意して問診に進む</button>
      </div>
    </div>
  )
}

function ConsentScreen({ onNavigate, onBack, context }) {
  const [checks, setChecks] = useState([false, false, false])
  const toggle = (i) => { const c = [...checks]; c[i] = !c[i]; setChecks(c) }
  const allChecked = checks.every(Boolean)
  const items = [
    "無断キャンセルや当日キャンセルはキャンセル料が発生します",
    "18歳以上の国内在住者であり、提携医療機関の診察に同意します",
    "上記注意事項および利用規約に同意する",
  ]
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="確認事項" onBack={onBack} />
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto hide-scrollbar">
        <div className="text-sm font-bold text-gray-800 mb-3">診察にあたって、以下をご確認ください</div>
        <div className="space-y-3 mb-4">
          <button className="w-full border-2 border-[#028090] text-[#028090] rounded-xl py-3 text-sm font-medium">利用規約</button>
          <button className="w-full border-2 border-[#028090] text-[#028090] rounded-xl py-3 text-sm font-medium">注意事項</button>
        </div>
        <div className="text-xs font-bold text-gray-600 mb-2">同意項目</div>
        <div className="space-y-2 mb-6">
          {items.map((text, i) => (
            <button key={i} onClick={() => toggle(i)} className="flex items-start gap-2.5 text-left w-full">
              <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition ${checks[i] ? 'bg-[#028090] border-[#028090]' : 'border-gray-300'}`}>
                {checks[i] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>}
              </div>
              <span className="text-xs text-gray-600">{text}</span>
            </button>
          ))}
        </div>
        <button onClick={() => allChecked && onNavigate('questionnaire', context)} disabled={!allChecked}
          className={`w-full rounded-2xl py-4 text-sm font-bold transition ${allChecked ? 'bg-[#028090] text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}>同意して問診に進む</button>
      </div>
    </div>
  )
}

function QuestionnaireScreen({ onNavigate, onBack, context }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const questions = [
    { q: "最もお困りの症状について教えてください（複数選択可）", type: "multi", options: ["倦怠感が続いている", "憂鬱で気分が落ち込んでいる", "食欲がない or ありすぎる", "よく眠れない or 寝すぎる", "意欲の低下", "途中で目が覚めてしまう", "動悸がする", "強い不安や恐怖がある"] },
    { q: "診察で相談したいこと・困りごとを教えてください", type: "text", placeholder: "例）気分が常に憂鬱である\n仕事での人間関係が悪い" },
    { q: "現在のストレス源について教えてください（複数選択可）", type: "multi", options: ["特にない", "家族との関係", "配偶者/パートナー", "仕事での人間関係", "仕事の負担やキャリア", "将来やお金について", "自分の体調・病気"] },
    { q: "精神科または心療内科に通院したことがありますか？", type: "single", options: ["はい", "いいえ"] },
  ]
  const progress = ((step + 1) / questions.length) * 100
  const current = questions[step]
  const isLast = step === questions.length - 1

  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="問診票" onBack={onBack} onClose={onBack} />
      <div className="h-1.5 bg-gray-100"><div className="h-full bg-[#028090] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      <div className="flex-1 bg-white p-5 overflow-y-auto hide-scrollbar">
        <div className="text-center mb-6 fade-enter">
          <div className="text-xs text-gray-400 mb-1">Q{step + 1}.</div>
          <div className="text-sm font-bold text-gray-800 leading-relaxed">{current.q}</div>
          {current.type !== 'text' && <div className="text-[10px] text-[#F96167] mt-1">[回答必須]</div>}
        </div>
        {current.type === 'multi' || current.type === 'single' ? (
          <div className="space-y-2">
            {current.options.map((opt, i) => (
              <button key={i} onClick={() => {
                setAnswers({ ...answers, [step]: opt })
                if (current.type === 'single') setTimeout(() => isLast ? onNavigate('personal_info', context) : setStep(step + 1), 300)
              }}
                className={`w-full text-left py-3 px-4 rounded-xl border-2 text-sm transition ${answers[step] === opt ? 'border-[#028090] text-[#028090] bg-[#028090]/5' : 'border-gray-200 text-gray-600'}`}>{opt}</button>
            ))}
          </div>
        ) : (
          <textarea className="w-full h-32 border-2 border-gray-200 rounded-xl p-3 text-sm focus:border-[#028090] focus:outline-none resize-none" placeholder={current.placeholder}
            onChange={(e) => setAnswers({ ...answers, [step]: e.target.value })} />
        )}
      </div>
      <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
        <button onClick={() => step > 0 ? setStep(step - 1) : onBack()} className="px-6 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-500 font-medium">戻る</button>
        <button onClick={() => isLast ? onNavigate('personal_info', context) : setStep(step + 1)} className="flex-1 py-3 rounded-xl bg-[#028090] text-white text-sm font-bold">次へ進む</button>
      </div>
    </div>
  )
}

function PersonalInfoScreen({ onNavigate, onBack, context }) {
  const fields = [
    { label: "氏名(フルネーム)", placeholder: "山田 太郎" },
    { label: "フリガナ", placeholder: "ヤマダ タロウ" },
    { label: "生年月日", placeholder: "1990/01/01" },
    { label: "電話番号", placeholder: "09012345678" },
    { label: "メールアドレス", placeholder: "example@email.com" },
    { label: "郵便番号", placeholder: "1000001" },
    { label: "住所", placeholder: "東京都千代田区..." },
  ]
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="個人情報の入力" onBack={onBack} />
      <div className="h-1.5 bg-gray-100"><div className="h-full bg-[#028090] w-full" /></div>
      <div className="flex-1 bg-white p-4 overflow-y-auto hide-scrollbar">
        <div className="text-[10px] text-amber-600 bg-amber-50 rounded-lg p-2 mb-4">初回のみ入力が必要です。次回以降は自動で入力されます。</div>
        <div className="space-y-3">
          {fields.map((f, i) => (
            <div key={i}>
              <label className="text-xs font-bold text-gray-600 mb-1 block">{f.label}</label>
              <input className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#028090] focus:outline-none" placeholder={f.placeholder} />
            </div>
          ))}
          <div>
            <label className="text-xs font-bold text-gray-600 mb-1 block">性別</label>
            <div className="flex gap-2">
              {["男性", "女性", "その他"].map(g => (
                <button key={g} className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-600 hover:border-[#028090] transition">{g}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <button onClick={() => onNavigate('insurance', context)} className="w-full py-3.5 rounded-xl bg-[#028090] text-white text-sm font-bold">次へ進む</button>
      </div>
    </div>
  )
}

function InsuranceScreen({ onNavigate, onBack, context }) {
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="保険証の提出" onBack={onBack} />
      <div className="flex-1 bg-white p-4 overflow-y-auto hide-scrollbar">
        <div className="text-sm font-bold text-gray-800 mb-2">保険証情報として登録できるもの</div>
        <div className="text-xs text-gray-500 mb-4">保険証 / 資格確認書 または 医療証</div>
        <div className="space-y-3 mb-4">
          <button className="w-full border-2 border-dashed border-[#028090] rounded-2xl p-6 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[#028090]/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#028090" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <span className="text-sm text-[#028090] font-medium">クリックして表面を提出する</span>
          </button>
          <button className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <span className="text-sm text-gray-400 font-medium">クリックして裏面を提出する</span>
          </button>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-[10px] text-amber-700">
          <div className="font-bold mb-1">マイナンバーカードについて</div>
          <div>※マイナ保険証の方は保険証情報の画像を提出してください。</div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <button onClick={() => onNavigate('booking_done', context)} className="w-full py-3.5 rounded-xl bg-[#028090] text-white text-sm font-bold">次へ進む</button>
      </div>
    </div>
  )
}

function BookingDoneScreen({ onNavigate, context }) {
  return (
    <div className="flex flex-col h-full slide-enter">
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-[#02C39A]/10 flex items-center justify-center mb-4 fade-enter">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">予約が確定しました</h2>
        <div className="bg-gray-50 rounded-2xl p-4 w-full mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">{context?.doctor?.avatar || "👨‍⚕️"}</div>
            <div>
              <div className="font-bold text-sm">{context?.doctor?.name || "田中 太郎"}先生</div>
              <div className="text-xs text-[#028090]">{context?.date} {context?.time}〜</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">予約ID: XR-2026-04180001</div>
        </div>
        <div className="bg-[#06C755]/10 rounded-xl p-3 w-full text-xs text-[#06C755] text-center">LINEで予約確認メッセージをお送りしました</div>
      </div>
      <div className="p-4 bg-white border-t border-gray-100 space-y-2">
        <button onClick={() => onNavigate('video_call', context)} className="w-full py-3.5 rounded-xl bg-[#028090] text-white text-sm font-bold">📹 ビデオ通話へ進む（デモ）</button>
        <button onClick={() => onNavigate('chat')} className="w-full py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-500 font-medium">トップに戻る</button>
      </div>
    </div>
  )
}

function VideoCallScreen({ onNavigate, context }) {
  const [elapsed, setElapsed] = useState(0)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [avatar, setAvatar] = useState(false)
  useEffect(() => { const t = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(t) }, [])
  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 relative flex items-center justify-center">
        <div className="text-7xl">{context?.doctor?.avatar || "👨‍⚕️"}</div>
        <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {fmt(elapsed)}
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full">残り {fmt(1200 - elapsed)}</div>
        <div className="absolute bottom-4 right-4 w-24 h-32 bg-gray-700 rounded-2xl overflow-hidden border-2 border-gray-600 flex items-center justify-center">
          {avatar ? (
            <div className="text-center"><div className="text-3xl mb-0.5">🧑‍🎨</div><div className="text-[8px] text-green-400">Avatar ON</div></div>
          ) : cameraOff ? (
            <div className="text-white text-xs">カメラOFF</div>
          ) : (
            <div className="text-3xl">😊</div>
          )}
        </div>
        <div className="absolute bottom-4 left-4 text-[9px] text-gray-500">Cloudflare Calls (WebRTC)</div>
      </div>
      <div className="bg-gray-900/90 backdrop-blur px-4 py-5">
        <div className="flex justify-center gap-4">
          <VidBtn icon={muted ? "🔇" : "🎙"} label={muted ? "ミュート中" : "マイク"} on={!muted} onClick={() => setMuted(!muted)} />
          <VidBtn icon={cameraOff ? "🚫" : "📷"} label="カメラ" on={!cameraOff} onClick={() => setCameraOff(!cameraOff)} />
          <VidBtn icon="📎" label="書類送信" on onClick={() => {}} />
          <VidBtn icon="👤" label={avatar ? "ON" : "アバター"} on={avatar} purple onClick={() => setAvatar(!avatar)} />
          <button onClick={() => onNavigate('payment', context)} className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">✕</button>
        </div>
      </div>
    </div>
  )
}

function VidBtn({ icon, label, on, purple, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${purple && on ? 'bg-purple-600' : on ? 'bg-gray-700' : 'bg-gray-600/50'}`}>{icon}</div>
      <span className="text-[9px] text-gray-400">{label}</span>
    </button>
  )
}

function PaymentScreen({ onNavigate, onBack, context }) {
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="お支払い" onBack={onBack} />
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto hide-scrollbar">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="text-xs text-gray-400 mb-2">診察完了</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{context?.doctor?.avatar || "👨‍⚕️"}</div>
            <div>
              <div className="font-bold text-sm">{context?.doctor?.name}先生</div>
              <div className="text-xs text-gray-400">{context?.date} {context?.time}</div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2">
            <div className="flex justify-between text-xs"><span className="text-gray-500">診察料</span><span>760円</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">システム利用料</span><span>4,400円</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-500">薬代</span><span>300円</span></div>
            <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-bold"><span>合計</span><span className="text-[#028090]">5,460円</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="text-xs font-bold text-gray-600 mb-3">クレジットカード</div>
          <div className="border-2 border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
            <span className="text-sm text-gray-600">**** **** **** 4242</span>
          </div>
        </div>
        <button onClick={() => onNavigate('payment_done', context)} className="w-full bg-[#635BFF] text-white rounded-2xl py-4 text-sm font-bold shadow-lg">支払う ¥5,460</button>
        <div className="text-center mt-2 text-[10px] text-gray-400 flex items-center justify-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          Powered by Stripe
        </div>
      </div>
    </div>
  )
}

function PaymentDoneScreen({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-[#02C39A]/10 flex items-center justify-center mb-4 fade-enter">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">お支払い完了</h2>
        <p className="text-sm text-gray-500 mb-6">お薬は最短翌日配送されます</p>
        <div className="w-full space-y-3">
          <div className="bg-[#06C755]/10 rounded-xl p-3 text-xs text-[#06C755] text-center">📦 薬の配送情報をLINEでお知らせします</div>
          <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-600 text-center">📄 診断書が必要な場合はLINEで電子ファイルを送付します</div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <button onClick={() => onNavigate('chat')} className="w-full py-3.5 rounded-xl bg-[#028090] text-white text-sm font-bold">トップに戻る</button>
      </div>
    </div>
  )
}

function MyPageScreen({ onBack }) {
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="マイページ" onBack={onBack} onClose={onBack} />
      <div className="flex border-b border-gray-100">
        {["予約情報", "受診歴", "お問い合わせ", "その他"].map((t, i) => (
          <button key={i} className={`flex-1 py-2.5 text-[10px] font-bold ${i === 0 ? 'text-[#028090] border-b-2 border-[#028090]' : 'text-gray-400'}`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 bg-gray-50 flex items-center justify-center text-sm text-gray-400">現在予約中のものはありません</div>
    </div>
  )
}

function MedsScreen({ onBack }) {
  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="お薬情報" onBack={onBack} onClose={onBack} />
      <div className="flex-1 bg-white p-4"><div className="text-sm text-gray-500">まだ診察記録がありません。診察を受けるとお薬が記録されていきます。</div></div>
    </div>
  )
}

// ===== UTOKYO SSO SURVEY APP =====

function UTokyoChatHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-100">
      <div className="w-9 h-9 rounded-full bg-[#00356B] flex items-center justify-center text-white text-[8px] font-bold leading-tight text-center">東大</div>
      <div className="flex-1">
        <div className="font-bold text-sm text-gray-900">東大SSO研究調査</div>
        <div className="text-[10px] text-gray-400">公式アカウント</div>
      </div>
      <div className="flex gap-3 text-gray-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>
    </div>
  )
}

function UTokyoBubble({ children, delay = 0 }) {
  const [show, setShow] = useState(delay === 0)
  useEffect(() => {
    if (delay > 0) { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t) }
  }, [delay])
  if (!show) return null
  return (
    <div className="flex justify-start mb-2 bubble-enter">
      <div className="w-8 h-8 rounded-full bg-[#00356B] flex-shrink-0 flex items-center justify-center text-white text-[8px] font-bold mr-2 mt-1">東大</div>
      <div className="max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed bg-white text-gray-800 rounded-tl-sm shadow-sm">
        {children}
      </div>
    </div>
  )
}

function UTokyoChatScreen({ onNavigate }) {
  return (
    <>
      <UTokyoChatHeader />
      <div className="flex-1 bg-[#8CABD9] px-3 py-3 overflow-y-auto hide-scrollbar">
        <div className="text-center text-white/60 text-[10px] mb-3">4月15日(火)</div>
        <UTokyoBubble>
          <div className="font-bold mb-1">こんにちは！🏫</div>
          <div>東京大学 研究調査チームです。</div>
          <div className="mt-1">メンタルヘルスに関する研究調査にご協力をお願いしています。</div>
        </UTokyoBubble>
        <UTokyoBubble delay={400}>
          <div className="bg-[#F0F5FF] rounded-xl p-3 -mx-1">
            <div className="text-[#00356B] font-bold text-sm mb-1">📋 研究調査のお願い</div>
            <div className="text-xs text-gray-600 mb-1">所要時間：約15分</div>
            <div className="text-xs text-gray-600 mb-2">回答完了でAmazonギフト券500円分をプレゼント！</div>
            <button onClick={() => onNavigate('utokyo_sso')} className="w-full bg-[#00356B] text-white rounded-full py-2.5 text-sm font-bold">アンケートに回答する</button>
          </div>
        </UTokyoBubble>
        <UTokyoBubble delay={800}>
          <div className="text-xs text-gray-500">
            ※ 回答は匿名化され研究目的のみに使用されます<br/>
            ※ 途中保存が可能です
          </div>
        </UTokyoBubble>
      </div>
      <div className="bg-white border-t border-gray-100 p-3">
        <div className="flex gap-2">
          <button onClick={() => onNavigate('utokyo_sso')} className="flex-1 bg-[#00356B] text-white rounded-xl py-3 text-xs font-bold">📋 アンケート回答</button>
          <button className="flex-1 bg-gray-100 text-gray-500 rounded-xl py-3 text-xs font-bold">❓ 研究について</button>
        </div>
      </div>
    </>
  )
}

function UTokyoSSOScreen({ onNavigate, onBack }) {
  const [step, setStep] = useState('start')

  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="本人確認" onBack={onBack} onClose={onBack} />
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-6">
        {step === 'start' && (
          <div className="w-full fade-enter">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#00356B] rounded-2xl flex items-center justify-center text-white text-2xl">🏫</div>
              <h3 className="font-bold text-gray-800 mb-2">UTokyo SSO認証</h3>
              <p className="text-xs text-gray-500 mb-4">
                東京大学の統合認証(UTokyo Account)で<br/>本人確認を行います
              </p>
              <button onClick={() => setStep('utid')} className="w-full bg-[#0078D4] text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 21 21"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
                Microsoftでサインイン
              </button>
            </div>
            <div className="text-[10px] text-gray-400 text-center">
              Microsoft Entra ID (旧Azure AD) を使用<br/>
              UTokyo Accountで安全に認証します
            </div>
          </div>
        )}
        {step === 'utid' && (
          <div className="w-full fade-enter">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <svg width="20" height="20" viewBox="0 0 21 21"><rect width="10" height="10" fill="#f25022"/><rect x="11" width="10" height="10" fill="#7fba00"/><rect y="11" width="10" height="10" fill="#00a4ef"/><rect x="11" y="11" width="10" height="10" fill="#ffb900"/></svg>
                <span className="text-sm font-semibold text-gray-700">Microsoft</span>
              </div>
              <div className="text-sm text-gray-700 mb-1">サインイン</div>
              <input className="w-full border-b-2 border-gray-300 py-2 text-sm focus:border-[#0078D4] focus:outline-none mb-4" placeholder="user@g.ecc.u-tokyo.ac.jp" />
              <div className="text-xs text-gray-400 mb-4">UTokyo Accountのメールアドレスを入力</div>
              <button onClick={() => { setStep('loading'); setTimeout(() => setStep('done'), 1500) }} className="w-full bg-[#0078D4] text-white rounded py-2.5 text-sm font-medium">次へ</button>
            </div>
          </div>
        )}
        {step === 'loading' && (
          <div className="fade-enter text-center">
            <div className="w-12 h-12 border-4 border-[#00356B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="text-sm text-gray-600">認証中...</div>
          </div>
        )}
        {step === 'done' && (
          <div className="w-full fade-enter text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">認証完了</h3>
            <p className="text-xs text-gray-500 mb-4">UTokyo Accountの確認が完了しました</p>
            <button onClick={() => onNavigate('utokyo_survey')} className="w-full bg-[#00356B] text-white rounded-xl py-3.5 text-sm font-bold">アンケートに進む</button>
          </div>
        )}
      </div>
    </div>
  )
}

function UTokyoSurveyScreen({ onNavigate, onBack }) {
  const [section, setSection] = useState(0)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [saved, setSaved] = useState(false)

  const sections = [
    {
      title: "基本情報", icon: "👤",
      questions: [
        { q: "あなたの学年を教えてください", type: "single", options: ["学部1年", "学部2年", "学部3年", "学部4年", "修士1年", "修士2年", "博士課程", "その他"] },
        { q: "所属する学部・研究科を教えてください", type: "single", options: ["教養学部", "法学部", "経済学部", "文学部", "理学部", "工学部", "農学部", "医学部", "薬学部", "その他"] },
        { q: "現在の住居形態を教えてください", type: "single", options: ["実家暮らし", "一人暮らし", "寮", "シェアハウス", "その他"] },
      ]
    },
    {
      title: "メンタルヘルス", icon: "🧠",
      questions: [
        { q: "過去2週間、気分が沈んだり憂鬱になることがありましたか？", type: "single", options: ["全くない", "数日", "半分以上", "ほぼ毎日"] },
        { q: "過去2週間、何をしても楽しめない・興味がわかないことがありましたか？", type: "single", options: ["全くない", "数日", "半分以上", "ほぼ毎日"] },
        { q: "現在の自分のメンタルヘルス状態をどう評価しますか？", type: "single", options: ["とても良い", "良い", "普通", "やや悪い", "悪い"] },
      ]
    },
    {
      title: "学業・ストレス", icon: "📚",
      questions: [
        { q: "現在、学業に関するストレスをどの程度感じていますか？", type: "single", options: ["ほとんど感じない", "少し感じる", "かなり感じる", "非常に強く感じる"] },
        { q: "学業のストレス源は何ですか？（複数選択可）", type: "multi", options: ["試験・テスト", "レポート・論文", "研究の進捗", "就職活動", "人間関係", "経済的な問題", "将来の不安", "特にない"] },
        { q: "困ったときに相談できる人はいますか？", type: "single", options: ["家族", "友人", "教員・指導教官", "カウンセラー", "SNS上の知人", "相談できる人がいない"] },
      ]
    },
    {
      title: "生活習慣", icon: "🌙",
      questions: [
        { q: "平均的な睡眠時間を教えてください", type: "single", options: ["5時間未満", "5-6時間", "6-7時間", "7-8時間", "8時間以上"] },
        { q: "週にどのくらい運動していますか？", type: "single", options: ["ほとんどしない", "週1-2回", "週3-4回", "ほぼ毎日"] },
        { q: "自由記述：メンタルヘルスに関して大学に望む支援があれば教えてください", type: "text", placeholder: "例）カウンセリングの予約をもっと取りやすくしてほしい" },
      ]
    },
  ]

  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0)
  const answeredBefore = sections.slice(0, section).reduce((sum, s) => sum + s.questions.length, 0)
  const currentQ = sections[section].questions[qIndex]
  const progress = ((answeredBefore + qIndex + 1) / totalQuestions) * 100
  const isLastQ = qIndex === sections[section].questions.length - 1
  const isLastSection = section === sections.length - 1
  const key = `${section}-${qIndex}`

  const handleNext = () => {
    if (isLastQ && isLastSection) {
      onNavigate('utokyo_complete')
    } else if (isLastQ) {
      setSaved(true)
      setTimeout(() => { setSaved(false); setSection(section + 1); setQIndex(0) }, 1000)
    } else {
      setQIndex(qIndex + 1)
    }
  }
  const handlePrev = () => {
    if (qIndex > 0) setQIndex(qIndex - 1)
    else if (section > 0) { setSection(section - 1); setQIndex(sections[section - 1].questions.length - 1) }
    else onBack()
  }

  if (saved) {
    return (
      <div className="flex flex-col h-full">
        <LiffHeader title="研究調査アンケート" onClose={onBack} />
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 fade-enter">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
          </div>
          <div className="font-bold text-gray-800 mb-1">途中保存しました</div>
          <div className="text-xs text-gray-400">次のセクションに進みます...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full slide-enter">
      <LiffHeader title="研究調査アンケート" onClose={onBack} />
      <div className="h-1.5 bg-gray-100"><div className="h-full bg-[#00356B] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      <div className="bg-white px-4 py-2 border-b border-gray-100">
        <div className="flex gap-1">
          {sections.map((s, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition ${i <= section ? 'bg-[#00356B]' : 'bg-gray-200'}`} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg">{sections[section].icon}</span>
          <span className="text-xs font-bold text-gray-700">{sections[section].title}</span>
          <span className="text-[10px] text-gray-400 ml-auto">セクション {section + 1}/{sections.length}</span>
        </div>
      </div>
      <div className="flex-1 bg-white p-5 overflow-y-auto hide-scrollbar">
        <div className="text-center mb-6 fade-enter" key={key}>
          <div className="text-xs text-gray-400 mb-1">Q{answeredBefore + qIndex + 1}.</div>
          <div className="text-sm font-bold text-gray-800 leading-relaxed">{currentQ.q}</div>
          {currentQ.type !== 'text' && <div className="text-[10px] text-[#00356B] mt-1">[回答必須]</div>}
        </div>
        {currentQ.type === 'multi' || currentQ.type === 'single' ? (
          <div className="space-y-2" key={key + '-opts'}>
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => {
                setAnswers({ ...answers, [key]: opt })
                if (currentQ.type === 'single') setTimeout(() => handleNext(), 300)
              }}
                className={`w-full text-left py-3 px-4 rounded-xl border-2 text-sm transition ${answers[key] === opt ? 'border-[#00356B] text-[#00356B] bg-[#00356B]/5' : 'border-gray-200 text-gray-600'}`}>{opt}</button>
            ))}
          </div>
        ) : (
          <textarea className="w-full h-32 border-2 border-gray-200 rounded-xl p-3 text-sm focus:border-[#00356B] focus:outline-none resize-none" placeholder={currentQ.placeholder}
            onChange={(e) => setAnswers({ ...answers, [key]: e.target.value })} />
        )}
      </div>
      <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
        <button onClick={handlePrev} className="px-6 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-500 font-medium">戻る</button>
        <button onClick={handleNext} className="flex-1 py-3 rounded-xl bg-[#00356B] text-white text-sm font-bold">
          {isLastQ && isLastSection ? '回答を送信' : isLastQ ? '保存して次へ' : '次へ'}
        </button>
      </div>
    </div>
  )
}

function UTokyoCompleteScreen({ onNavigate }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-[#FF9900]/10 flex items-center justify-center mb-4 fade-enter">
          <span className="text-4xl">🎁</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">回答完了！</h2>
        <p className="text-sm text-gray-500 mb-4">ご協力ありがとうございました</p>
        <div className="w-full bg-gradient-to-r from-[#FF9900] to-[#FFB84D] rounded-2xl p-5 mb-4 text-center">
          <div className="text-white text-xs font-bold mb-2">🎉 Amazonギフト券</div>
          <div className="text-white text-3xl font-bold mb-2">500円分</div>
          {revealed ? (
            <div className="bg-white rounded-xl p-3 fade-enter">
              <div className="text-[10px] text-gray-400 mb-1">ギフトコード</div>
              <div className="text-lg font-mono font-bold text-gray-800 tracking-wider">XRUT-K7M9-P2NQ</div>
            </div>
          ) : (
            <button onClick={() => setRevealed(true)} className="bg-white/20 text-white border-2 border-white/50 rounded-xl py-2.5 px-6 text-sm font-bold">タップしてコードを表示</button>
          )}
        </div>
        <div className="w-full space-y-2">
          <div className="bg-[#00356B]/5 rounded-xl p-3 text-xs text-[#00356B] text-center">📊 あなたの回答は匿名化されて研究に活用されます</div>
          <div className="bg-[#06C755]/10 rounded-xl p-3 text-xs text-[#06C755] text-center">✅ ギフトコードはLINEにも送信しました</div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <button onClick={() => onNavigate('utokyo_chat')} className="w-full py-3.5 rounded-xl bg-[#00356B] text-white text-sm font-bold">トップに戻る</button>
      </div>
    </div>
  )
}

function UTokyoApp() {
  const [screen, setScreen] = useState('utokyo_chat')
  const [history, setHistory] = useState(['utokyo_chat'])

  const navigate = (target) => {
    setHistory(prev => [...prev, target])
    setScreen(target)
  }
  const goBack = () => {
    if (history.length > 1) {
      const newHist = history.slice(0, -1)
      setHistory(newHist)
      setScreen(newHist[newHist.length - 1])
    }
  }

  const screens = {
    utokyo_chat: <UTokyoChatScreen onNavigate={navigate} />,
    utokyo_sso: <UTokyoSSOScreen onNavigate={navigate} onBack={goBack} />,
    utokyo_survey: <UTokyoSurveyScreen onNavigate={navigate} onBack={goBack} />,
    utokyo_complete: <UTokyoCompleteScreen onNavigate={navigate} />,
  }

  return (
    <>
      <StatusBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {screens[screen]}
      </div>
    </>
  )
}

// ===== MAIN APP =====

function App() {
  const [mode, setMode] = useState('clinic')
  const [screen, setScreen] = useState('chat')
  const [history, setHistory] = useState(['chat'])
  const [context, setContext] = useState({})

  const navigate = (target, ctx) => {
    if (ctx) setContext(prev => ({ ...prev, ...ctx }))
    setHistory(prev => [...prev, target])
    setScreen(target)
  }
  const goBack = () => {
    if (history.length > 1) {
      const newHist = history.slice(0, -1)
      setHistory(newHist)
      setScreen(newHist[newHist.length - 1])
    }
  }

  const screens = {
    chat: <ChatScreen onNavigate={navigate} />,
    needs: <NeedsScreen onNavigate={navigate} onBack={goBack} />,
    doctor_select: <DoctorSelectScreen onNavigate={navigate} onBack={goBack} context={context} />,
    booking_confirm: <BookingConfirmScreen onNavigate={navigate} onBack={goBack} context={context} />,
    consent: <ConsentScreen onNavigate={navigate} onBack={goBack} context={context} />,
    questionnaire: <QuestionnaireScreen onNavigate={navigate} onBack={goBack} context={context} />,
    personal_info: <PersonalInfoScreen onNavigate={navigate} onBack={goBack} context={context} />,
    insurance: <InsuranceScreen onNavigate={navigate} onBack={goBack} context={context} />,
    booking_done: <BookingDoneScreen onNavigate={navigate} context={context} />,
    video_call: <VideoCallScreen onNavigate={navigate} context={context} />,
    payment: <PaymentScreen onNavigate={navigate} onBack={goBack} context={context} />,
    payment_done: <PaymentDoneScreen onNavigate={navigate} />,
    mypage: <MyPageScreen onBack={goBack} />,
    meds: <MedsScreen onBack={goBack} />,
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <button onClick={() => setMode('clinic')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === 'clinic' ? 'bg-[#028090] text-white shadow-lg shadow-[#028090]/30' : 'bg-white/15 text-white/60 hover:bg-white/25'}`}>
          🏥 Clinic
        </button>
        <button onClick={() => setMode('utokyo')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${mode === 'utokyo' ? 'bg-[#00356B] text-white shadow-lg shadow-[#00356B]/30' : 'bg-white/15 text-white/60 hover:bg-white/25'}`}>
          🏫 UTokyo
        </button>
      </div>
      <div className="phone-frame">
        <div className="phone-screen">
          {mode === 'clinic' ? (
            <>
              <StatusBar />
              <div className="flex-1 flex flex-col overflow-hidden">
                {screens[screen]}
              </div>
            </>
          ) : (
            <UTokyoApp />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
