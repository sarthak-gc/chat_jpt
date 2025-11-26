import type { Variants } from "motion";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [buttonHover, setButtonHover] = useState(false);
  const stats = useMemo(
    () => [
      { label: "Realtime responses", value: "120ms" },
      { label: "Active teams", value: "1,700+" },
      { label: "Languages trained", value: "50+" },
      { label: "Avg. CSAT", value: "4.9 / 5" },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        title: "Structured chats",
        description:
          "Segment long-running conversations into intents with automatic summaries that keep every teammate in sync.",
        accent: "from-[#4ade80]/30 via-transparent to-transparent",
      },
      {
        title: "Developer mode",
        description:
          "Syntax-highlighted outputs, runnable snippets, and contextual copy actions inspired by `ChatMessage`.",
        accent: "from-[#22d3ee]/30 via-transparent to-transparent",
      },
      {
        title: "Realtime presence",
        description:
          "Latency-tuned websockets keep typing indicators, streaming tokens, and voice playback perfectly aligned.",
        accent: "from-[#a855f7]/30 via-transparent to-transparent",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Nova Labs",
        quote:
          "Futurist Chat mirrors the calm, focused ambience we wanted. The micro interactions feel alive without being distracting.",
      },
      {
        name: "Orbit Finance",
        quote:
          "We replaced three internal copilots with one unified workspace. The parity between landing and product UI sold our execs instantly.",
      },
      {
        name: "Deep South AI",
        quote:
          "The assistant-style message rendering makes knowledge transfer effortless. It matches what people already expect from modern AI tools.",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        title: "Prompt playground",
        detail: "Rapid experimentation with versioned prompts",
      },
      {
        title: "Voice-first capture",
        detail: "Hands-free input with contextual embeddings",
      },
      {
        title: "Human-in-the-loop",
        detail: "Escalate to agents with full conversation replay",
      },
      {
        title: "Adaptive memory",
        detail: "Ground chats inside private knowledge safely",
      },
    ],
    []
  );

  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15,
      },
    },
  };

  const heroItem: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  const sectionVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const sectionViewport = { once: false, amount: 0.35 };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-gray-100 relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_15%_20%,rgba(34,211,238,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_80%_0%,rgba(84,54,218,0.15),transparent)] animate-slow-pan" />
        <div className="absolute inset-0">
          <svg width="100%" height="100%">
            {Array.from({ length: 18 }, (_, i) =>
              Array.from({ length: 10 }, (_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={i * 90 + 45}
                  cy={j * 80 + 50 + ((i + j) % 2 === 0 ? 6 : -6)}
                  r="1.6"
                  fill="#22d3ee"
                  className="animate-grid"
                  style={{
                    animationDelay: `${(i + j) * 80}ms`,
                  }}
                />
              ))
            )}
          </svg>
        </div>
      </div>

      <main className="relative z-10 flex flex-col gap-32 pb-24">
        <motion.section
          className="pt-20 md:pt-28 px-4 md:px-10"
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="flex items-center gap-3 animate-fadeIn">
              <svg width={44} height={44} viewBox="0 0 40 40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#0ea5e9"
                  strokeWidth="2.5"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="8"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                />
                <circle cx="20" cy="20" r="2.5" fill="#6366f1" />
              </svg>
              <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                Futurist Chat
              </p>
            </div>

            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <motion.div
                className="space-y-6"
                variants={heroContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-semibold leading-tight bg-linear-to-r from-[#22d3ee] via-[#5c73f2] to-[#a855f7] text-transparent bg-clip-text animate-gradient-text"
                  variants={heroItem}
                >
                  A calm, cinematic interface for your most important AI chats.
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-300 max-w-2xl"
                  variants={heroItem}
                >
                  Built with the same dark, glassy palette that powers our login
                  and chat surfaces. Every interaction glows, slides, and pulses
                  with intent—perfect for customer copilots, knowledge agents,
                  and creative explorers.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={heroItem}
                >
                  <button
                    onClick={() => navigate("/signup")}
                    onMouseEnter={() => setButtonHover(true)}
                    onMouseLeave={() => setButtonHover(false)}
                    className={`relative px-8 py-3 rounded-xl bg-linear-to-br from-[#0ea5e9] to-[#6366f1] text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/60 ring-offset-2 ring-offset-[#111] group overflow-hidden ${
                      buttonHover ? "scale-[1.04]" : "scale-100"
                    }`}
                    style={{
                      boxShadow: buttonHover
                        ? "0 0 36px 0 #22d3ee44, 0 8px 24px 0 #0ea5e933"
                        : "0 0 12px 0 #22d3ee22",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Launch Futurist Chat
                      <svg
                        className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
                        width={18}
                        height={18}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-60%] group-hover:translate-x-[60%] transition-all duration-500" />
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 rounded-xl border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10 hover:border-[#6366f1]/50 transition-all duration-200"
                  >
                    View product tour
                  </button>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                  variants={heroItem}
                >
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/5 bg-white/5/5 backdrop-blur-sm py-4 px-3 hover:border-[#22d3ee]/40 transition-all duration-300"
                    >
                      <p className="text-2xl font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                variants={heroItem}
                initial="hidden"
                animate="visible"
              >
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-linear-to-br from-[#22d3ee]/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-br from-[#a855f7]/30 to-transparent rounded-full blur-3xl" />
                <div className="relative rounded-3xl border border-white/5 bg-[#16161a]/80 backdrop-blur-xl shadow-2xl shadow-[#0ea5e9]/20 overflow-hidden">
                  <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Active session</p>
                      <p className="text-lg font-semibold text-white">
                        Assistant · Orbit Labs
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-xs text-[#22d3ee]">
                      Live
                      <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
                    </span>
                  </div>

                  <div className="divide-y divide-white/5">
                    <div className="p-6">
                      <p className="uppercase text-xs text-gray-400 mb-2">
                        User
                      </p>
                      <p className="text-base text-gray-100 leading-relaxed">
                        "Can you summarize the login flow and explain how
                        ChatMessage renders code blocks?"
                      </p>
                    </div>
                    <div className="p-6 bg-[#1d1d22]">
                      <p className="uppercase text-xs text-gray-400 mb-2">
                        Assistant
                      </p>
                      <div className="space-y-3 text-gray-200 text-sm">
                        <p>
                          "Login inherits the same glassy palette, while
                          ChatMessage adds syntactic sugar with copyable code
                          panels. Want me to scaffold the integration?"
                        </p>
                        <div className="rounded-xl border border-[#22d3ee]/40 bg-[#111]/70 px-4 py-3 text-xs font-mono text-[#22d3ee]">
                          npm install futurist-chat-sdk
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="px-4 md:px-10"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
                  Features
                </p>
                <h2 className="text-3xl font-semibold mt-3">
                  Crafted for immersive AI sessions
                </h2>
              </div>
              <button className="text-[#22d3ee] text-sm hover:text-white transition-colors">
                See it in action →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-3xl border border-white/5 bg-[#16161a]/80 backdrop-blur-xl p-6 overflow-hidden hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br ${feature.accent}`}
                  />
                  <div className="relative z-10 space-y-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
                      Detail
                    </span>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#22d3ee] text-sm">
                      Explore
                      <svg
                        width={16}
                        height={16}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M4 11L11.5 3.5M11 3h1v1" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="px-4 md:px-10"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-12 items-center rounded-[32px] border border-white/5 bg-linear-to-br from-white/5 via-transparent to-transparent p-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
                Workflow
              </p>
              <h2 className="text-3xl font-semibold">
                A scrollable, story-driven canvas
              </h2>
              <p className="text-gray-300 text-sm">
                Landing embraces long-form storytelling with sections that feel
                like slides in a deck. Smooth parallax backgrounds and dot grids
                mirror the in-app theme so the transition to login or chat is
                seamless.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {timeline.map((item, idx) => (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-white/5 bg-[#141418]/80 p-5 overflow-hidden"
                >
                  <span className="absolute top-4 right-4 text-sm text-gray-500">{`0${
                    idx + 1
                  }`}</span>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-wider text-[#22d3ee]">
                      {item.title}
                    </p>
                    <p className="text-base text-gray-200">{item.detail}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="px-4 md:px-10"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
                  Testimonials
                </p>
                <h2 className="text-3xl font-semibold">
                  Studios already shipping with us
                </h2>
              </div>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse delay-300" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-3xl border border-white/5 bg-[#141418]/80 p-7 hover:border-[#22d3ee]/40 transition-all duration-300"
                >
                  <p className="text-gray-300 leading-relaxed text-sm">
                    “{testimonial.quote}”
                  </p>
                  <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gray-500">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="px-4 md:px-10"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <div className="max-w-5xl mx-auto rounded-[32px] border border-white/5 bg-[#131317]/90 backdrop-blur-xl p-10 text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              Ready?
            </p>
            <h2 className="text-4xl font-semibold">
              Create a login, open Chat, and keep the vibe consistent.
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Every pixel on this page already exists in the product. When you
              scroll, you preview how the assistant responds, how the inputs
              glow, and how copy buttons feel. Join the teams that ship with
              cohesion from landing to live chat.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="relative px-8 py-3 rounded-full bg-linear-to-r from-[#0ea5e9] via-[#22d3ee] to-[#6366f1] text-white font-semibold shadow-lg hover:shadow-[#22d3ee]/40 transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start building
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-full border border-white/10 text-gray-100 hover:border-[#6366f1]/60 hover:text-white transition-all duration-200"
              >
                Use existing account
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.57, 0.21, 0.69, 1.25) forwards;
        }
        .animate-grid {
          animation: gridPulse 2.4s ease-in-out infinite alternate;
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradientShift 4s linear infinite;
        }
        .animate-slow-pan {
          animation: slowPan 14s ease-in-out infinite alternate;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes gridPulse {
          0% {
            opacity: 0.15;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        @keyframes slowPan {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-4%);
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
