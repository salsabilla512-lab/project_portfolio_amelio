import React, { useState } from 'react';
import { Cpu, Play, Square, Code, Copy, Check, RefreshCw, Zap, Sliders, Eye } from 'lucide-react';

export const InteractiveSandbox: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [blinkInterval, setBlinkInterval] = useState<number>(500);
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);
  const [activeCodeLang, setActiveCodeLang] = useState<'cpp' | 'python'>('cpp');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate Arduino C++ code
  const cppCode = `// Simulasi Arduino Uno - Logika Input / Output (Wokwi Platform)
const int ledPin = 13;      // LED Built-in Pin Digital 13
const int buttonPin = 2;    // Pushbutton input di Pin Digital 2

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("Sistem IoT Salsabilla Aktif...");
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState == LOW) { // Tombol ditekan
    digitalWrite(ledPin, HIGH);
    Serial.println("Sensor Aktif: LED HIGH");
    delay(${blinkInterval});
    digitalWrite(ledPin, LOW);
    delay(${blinkInterval});
  } else {
    digitalWrite(ledPin, LOW);
  }
}`;

  // Generate Python code
  const pythonCode = `# Logika Pemrosesan Data & Mikrokontroler (Python)
import time

led_pin = 13
button_state = ${buttonPressed ? 'True' : 'False'}
blink_delay = ${blinkInterval / 1000} # detik

def check_system():
    if button_state:
        print(f"Trigger diterima: Menyalakan LED selama {blink_delay}s")
        return {"status": "ACTIVE", "pin": led_pin, "delay_ms": ${blinkInterval}}
    else:
        print("Sistem Standby: Menunggu sinyal input...")
        return {"status": "STANDBY", "pin": led_pin}

result = check_system()
print(result)
`;

  const handleCopy = () => {
    const textToCopy = activeCodeLang === 'cpp' ? cppCode : pythonCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sandbox" className="py-20 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-amber-400 font-mono-code uppercase tracking-wider mb-2">
              04. Interactive Lab · Simulasi Sirkuit IoT & Skrip Kode
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-zinc-100">
              Laboratorium Logika Sirkuit Wokwi
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl font-body">
              Simulasi interaktif logika mikrokontroler Arduino Uno. Uji coba sinyal input sensor, pengaturan timing delay, dan inspeksi kode C/C++ serta Python secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono-code">
            <button
              onClick={() => setActiveCodeLang('cpp')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCodeLang === 'cpp' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              C/C++ (Arduino IDE)
            </button>
            <button
              onClick={() => setActiveCodeLang('python')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCodeLang === 'python' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Python Script
            </button>
          </div>
        </div>

        {/* Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Push Button Input Trigger */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 font-mono-code uppercase tracking-wider block mb-2">
                  Input Sensor / Push Button Digital (Pin D2)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setButtonPressed(!buttonPressed)}
                    className={`px-4 py-2.5 rounded-xl font-mono-code text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      buttonPressed
                        ? 'bg-amber-400 text-zinc-950 shadow-lg scale-102'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{buttonPressed ? 'Button Status: PRESSED (LOW)' : 'Tekan Tombol Trigger'}</span>
                  </button>
                  <span className="text-xs font-mono-code text-zinc-400">
                    {buttonPressed ? 'Sinyal Aktif' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Delay Timing Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-300 mb-2">
                  <span className="uppercase tracking-wider">Delay Timing Interval</span>
                  <span className="tabular-nums font-semibold text-amber-400">{blinkInterval} ms</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={blinkInterval}
                  onChange={(e) => setBlinkInterval(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono-code mt-1">
                  <span>100ms (Cepat)</span>
                  <span>800ms</span>
                  <span>1500ms (Lambat)</span>
                </div>
              </div>

              {/* Simulation Status */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 font-mono-code uppercase tracking-wider block mb-2">
                  Status Eksekusi Mikrokontroler
                </label>
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-zinc-200">Wokwi Simulator Engine</span>
                  </div>
                  <span className="text-amber-400">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Spec Footer */}
            <div className="pt-4 border-t border-zinc-800 text-xs font-mono-code text-zinc-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Board Target:</span>
                <span className="text-zinc-200">Arduino Uno R3 (ATmega328P)</span>
              </div>
              <div className="flex justify-between">
                <span>Baud Rate Serial:</span>
                <span className="text-zinc-200">9600 bps</span>
              </div>
              <div className="flex justify-between">
                <span>Kesesuaian Praktikum:</span>
                <span className="text-emerald-400">100% Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual & Code Output Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between space-y-6">
            {/* Visual Board Mockup */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-700 flex items-center justify-center text-amber-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-zinc-100">
                    Arduino Uno Circuit Node
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono-code">
                    Virtual Pins: D13 (LED), D2 (Button), GND, 5V
                  </p>
                </div>
              </div>

              {/* Simulated LED Indicator */}
              <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800">
                <span className="text-xs font-mono-code text-zinc-400">LED D13:</span>
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-150 ${
                    buttonPressed
                      ? 'bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.9)] scale-125'
                      : 'bg-zinc-700 opacity-60'
                  }`}
                />
                <span className="text-xs font-mono-code font-bold text-amber-300">
                  {buttonPressed ? 'MENYALA' : 'MATI'}
                </span>
              </div>
            </div>

            {/* Live Code Box */}
            <div className="relative flex-1 bg-zinc-900/90 rounded-xl border border-zinc-800 p-4 font-mono-code text-xs text-zinc-300 overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                <span>{activeCodeLang === 'cpp' ? 'sketch.ino (Arduino C++)' : 'controller.py (Python)'}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Kode'}</span>
                </button>
              </div>
              <pre className="text-zinc-300 leading-relaxed max-h-52 overflow-y-auto">
                {activeCodeLang === 'cpp' ? cppCode : pythonCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
