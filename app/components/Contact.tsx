"use client";

import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current || status === "sending") return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Email service is not configured. Please try again later.",
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
      setErrorMessage("Your message could not be sent. Please try again.");
    }
  }

  const inputStyle =
    "w-full rounded-xl border-2 border-gray-400 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10";

  return (
    <section id="contact" className="relative overflow-hidden px-gutter">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Contact information */}
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400 bg-blue-200 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="h-2 w-2 animate-blink rounded-full bg-green-500" />
            Open to opportunities
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Let&apos;s work
            <span className="block text-blue-600">together.</span>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            Have a job opportunity, an interesting project, or just want to
            connect? Send me a message. I&apos;d love to hear from you.
          </p>

          <div className="mt-2 flex flex-col gap-0">
            <div className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-200 text-xl text-blue-600">
                📬
              </div>

              <div className="min-w-0">
                <p className="text-sm text-gray-500">My Email</p>
                <p className="break-all font-semibold text-gray-900">
                  henglegendary1234@gmail.com
                </p>
              </div>
            </div>
            <a
              href="https://github.com/Schopenhauer969"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-200 text-xl text-blue-600">
                🐈‍⬛
              </div>

              <div className="min-w-0">
                <p className="text-sm text-gray-500">directly to Github</p>
                <p className="break-all font-semibold text-gray-900">
                  Schopenhauer969
                </p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/ly-kimheng-667779306/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-200 text-xl text-blue-600">
                💼
              </div>

              <div className="min-w-0">
                <p className="text-sm text-gray-500">directly to Linkedin</p>
                <p className="break-all font-semibold text-gray-900">
                  Ly Kimheng
                </p>
              </div>
            </a>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-300 text-xl">
                ↗
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Let&apos;s build something great
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  I&apos;ll get back to you as soon as I can.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="rounded-3xl border border-gray-500 mb-5 bg-white shadow-xl shadow-gray-200/50 sm:p-9">
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900">
              Send me a message with EmailJS api
            </h3>
            <p className="text-sm leading-6 text-gray-500">
              Fill out the form below and your email will go straight to my
              inbox.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                autoComplete="name"
                placeholder="John Smith"
                minLength={2}
                maxLength={100}
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700"
              >
                Work email <span className="text-red-500">*</span>
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                autoComplete="email"
                placeholder="john@company.com"
                maxLength={254}
                required
                className={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                defaultValue=""
                className={inputStyle}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Job opportunity">Job opportunity</option>
                <option value="Interview invitation">
                  Interview invitation
                </option>
                <option value="Freelance project">Freelance project</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                minLength={10}
                maxLength={5000}
                required
                placeholder="Hi Heng, we'd love to discuss a job opportunity with you..."
                className={`${inputStyle} resize-y`}
              />
              <p className="text-xs text-gray-400">
                Please include enough details about your inquiry.
              </p>
            </div>

            {/* Accessible success and error feedback */}
            <div aria-live="polite" role="status">
              {status === "success" && (
                <div className="rounded-xl border border-green-300 bg-green-200 p-4 text-sm text-green-800">
                  <p className="font-semibold">✓ Message sent successfully!</p>
                  <p className="mt-1">
                    Thank you for reaching out. I&apos;ll get back to you as
                    soon as possible.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-300 bg-red-200 p-4 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "sending" ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending message...
                </>
              ) : (
                <>
                  Send Message
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>
          <p className="text-center text-xs pt-2 text-gray-400">
            Your information will be used to respond to your inquiry.
          </p>
        </div>
      </div>
    </section>
  );
}
