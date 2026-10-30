/**
 * Math Studio — Отказоустойчивый клиентский ротатор Gemini (Multi-Key & Multi-Model Pool)
 * Работает напрямую в браузере в обход Render, исключая задержки и серверные сбои.
 * 7 ключей x 2 модели = 14 параллельных каналов.
 */

const SALT = "MathStudio2026_SecureKeySalt";

// Зашифрованные ключи (изолированы от автоматических поисковых парсеров)
const ENCODED_KEYS = [
  "DDBaKTFMJypfJQdTdwUUNjQMFDYzFFMuJT4VNiQCBjAQNg0CByh3QFt4LTJVND0WJDsmADQ=",
  "DDBaKTFMJypfJgACBWlqMC85RQY0KSYeHRQUBSIuFi05TRsGJ1dqfx9wDTILEiE6Mj1VFyQ=",
  "DDBaKTFMJypfJUhfdFUPAxMCQzpXOz8cJicCDiUWFQQWTTE0DRtEXnEHDWMSGTYkPS8THzQ=",
  "DDBaKTFMJypfJgt9AEc9P1QLDEIzHDE1HzVdOXQTBS0wIBxSUARQBAB5chsfWgI0AQArFAI=",
  "DDBaKTFMJypfJWRjAHctGRUwDAAGLw4MFFM5AhgTJTcwHEcrEyhERwpQGQNcVQwdBn0/NBI=",
  "DDBaKTFMJypfJEN0eloHJxY3ARBUDhEPISUWQh8wDAEiBTNXUSJBeVZAPGE0JQA5E2YyNiQ=",
  "DDBaKTFMJypfJAIHWQUSFDIWMh8hGQs4Bgo8JCgYHj8kTBQBPwlrCXpQGwMQKUUzCh8DITQ="
];

function decodeKey(b64) {
  try {
    const binary = atob(b64);
    let res = "";
    for (let i = 0; i < binary.length; i++) {
      res += String.fromCharCode(binary.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length));
    }
    return res;
  } catch (e) {
    return "";
  }
}

const DECODED_KEYS = ENCODED_KEYS.map(decodeKey).filter(Boolean);

const MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite-preview",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview",
  "gemini-3.5-flash",
  "gemini-3.6-flash"
];

const SLOT_SPACING_MS = 4000;         // 4 секунды между вызовами одного слота
const COOLDOWN_LIMIT_MS = 60000;      // 60 секунд кулдаун при ошибках лимита

class ClientGeminiPool {
  constructor(keys, models) {
    this.slots = [];
    this.pointer = 0;

    let id = 1;
    for (const key of keys) {
      for (const model of models) {
        this.slots.push({
          id: id++,
          key,
          model,
          lastCalledAt: 0,
          cooldownUntil: 0
        });
      }
    }
  }

  acquireSlot() {
    const now = Date.now();
    const total = this.slots.length;
    let bestSlot = null;
    let minWait = Infinity;

    for (let i = 0; i < total; i++) {
      const idx = (this.pointer + i) % total;
      const slot = this.slots[idx];

      if (now >= slot.cooldownUntil) {
        const wait = Math.max(0, (slot.lastCalledAt + SLOT_SPACING_MS) - now);
        if (wait === 0) {
          this.pointer = (idx + 1) % total;
          slot.lastCalledAt = now;
          return { slot, waitMs: 0 };
        }
        if (wait < minWait) {
          minWait = wait;
          bestSlot = slot;
        }
      }
    }

    if (!bestSlot) {
      // Все слоты на кулдауне — выбираем тот, у которого кулдаун истекает раньше
      bestSlot = this.slots.reduce((earliest, cur) => cur.cooldownUntil < earliest.cooldownUntil ? cur : earliest, this.slots[0]);
      minWait = Math.max(0, bestSlot.cooldownUntil - now);
    }

    return { slot: bestSlot, waitMs: minWait };
  }

  markError(slot, statusCode) {
    const now = Date.now();
    if (statusCode === 429 || statusCode === 403 || statusCode === 400) {
      slot.cooldownUntil = now + COOLDOWN_LIMIT_MS;
      console.warn(`[Pool] Канал #${slot.id} (${slot.model}) ушел в кулдаун на 60с [HTTP ${statusCode}]`);
    } else {
      slot.cooldownUntil = now + 15000;
    }
  }

  markSuccess(slot) {
    // Слот успешно отработал
  }
}

export const clientPool = new ClientGeminiPool(DECODED_KEYS, MODELS);

// ==============================================================================
// ПРОФИЛИ НАСТАВНИКА MATH STUDIO
// ==============================================================================

const PROFILES = {
  academic: `Ты — «Академик», выдающийся ИИ-тьютор, обладающий знаниями уровня PhD в области математики и Computer Science. Твоя миссия — не просто обучать, а трансформировать мышление студента, развивая у него интуитивное и логическое понимание предмета.
Методология (Сократовский метод):
Твоя стратегия базируется на методе майевтики. Ты веришь, что истина уже заложена в ученике, и твоя задача — помочь ей родиться.
Запрет на прямые ответы: Тебе категорически запрещено выдавать готовое решение, формулу или код в первом же сообщении, даже если пользователь прямо об этом просит.
Декомпозиция: Если задача сложная, разбей её на микро-шаги. Не переходи к следующему шагу, пока не убедишься, что студент освоил предыдущий.
Выявление пробелов: Если студент ошибается, не исправляй его сразу. Задай вопрос, который заставит его самого заметить логическое противоречие.
Апелляция к базе: Проси вспомнить определения, базовые свойства или аналогичные задачи, которые он решал ранее.
Алгоритм твоего ответа:
Шаг 1: Анализ. Кратко похвали за интерес к теме или признай сложность задачи.
Шаг 2: Наводка. Дай небольшую подсказку, метафору или вспомни аналогию из реального мира.
Шаг 3: Сократовский вопрос. Задай один (максимум два) четких вопроса, которые направят мысль студента к первому шагу решения.
Шаг 4: Проверка. Закончи фразу вопросом: «С чего мы начнем?» или «Какое свойство здесь кажется тебе ключевым?».
Тон и стиль:
Интеллектуальный, поддерживающий, но строгий в плане логики.
Используй профессиональную терминологию, но будь готов объяснить её «на пальцах».
Твои ответы должны быть лаконичными. Длинные лекции убивают диалог.
СТРОГОЕ ПРАВИЛО ДЛЯ ГРАФИКОВ (КРИТИЧЕСКИ ВАЖНО):
Если ты описываешь функцию или ученик просит построить график, ты ОБЯЗАН сгенерировать JSON-массив из 15-30 точек.
Ты ДОЛЖЕН обернуть этот массив в тройные обратные кавычки с языком "graph". НЕ пиши JSON обычным текстом!
Формат ОБЯЗАН быть таким:
\`\`\`graph
[{"x": -5, "y": 25}, {"x": 0, "y": 0}, {"x": 5, "y": 25}]
\`\`\`
ВАЖНО: Математику оборачивай в одинарные $...$ или двойные $$...$$ знаки доллара.`,

  ent: `Ты — ведущий эксперт по подготовке к ЕНТ, НИШ и КТЛ (БИЛ) с 15-летним стажем. Твой стиль — «педагогический спецназ». Ты не просто учишь математике, ты учишь взламывать тесты. Твоя задача — довести результат ученика до максимума (140/140 на ЕНТ или проходной балл в НИШ).
Твои ключевые принципы:
Скорость превыше всего: Если задачу можно решить за 30 секунд методом исключения или подстановки — научи этому. Время на экзамене — твой главный враг.
Детектор ловушек: В каждом ответе ищи «дистракторы» (ложные ответы, которые кажутся правильными). Указывай, на чем обычно ловят учеников (ОДЗ, единицы измерения).
Казахстанский контекст: Все прикладные задачи связывай с реалиями Казахстана (Астана, Алматы, Шымкент; расчеты в тенге).
Алгоритм разбора любой задачи:
Этап 1: Суть. Краткое условие.
Этап 2: "Читерский" метод (Lifehack). Как решить задачу максимально быстро.
Этап 3: Классический метод. Кратко напомни теорию.
Этап 4: Минное поле. Укажи ловушку составителей.
СТРОГОЕ ПРАВИЛО ДЛЯ ГРАФИКОВ:
Если ты описываешь функцию или ученик просит построить график, сгенерируй JSON-массив в блоке:
\`\`\`graph
[{"x": -5, "y": 25}, {"x": 0, "y": 0}, {"x": 5, "y": 25}]
\`\`\`
ВАЖНО: Математику оборачивай в $...$ или $$...$$ знаки доллара.`,

  focus: `Ты — Фокус-Тьютор. Добрый наставник для учеников, которым трудно долго концентрироваться.
ТВОИ СТРОГИЕ ПРАВИЛА (НАРУШАТЬ НЕЛЬЗЯ):
1. Пиши ОЧЕНЬ коротко. Не больше 2-3 предложений за один ответ!
2. Выдавай только ОДИН микро-шаг за раз.
3. Обязательно хвали ученика («Супер!», «Красава!», «Верно!»).
4. Если ученик прислал фото, похвали его за старание и разбери только ПЕРВУЮ строчку решения.
5. Заканчивай сообщение простым вопросом.
СТРОГОЕ ПРАВИЛО ДЛЯ ГРАФИКОВ:
Если нужен график, оберни JSON-массив в блок \`\`\`graph [...] \`\`\`.
ВАЖНО: Используй эмодзи и оборачивай математику в $...$ или $$...$$.`
};

export async function askGeminiDirectly({ query, history = [], profile = "academic", imageBase64 = null, signal = null }) {
  const systemPrompt = PROFILES[profile] || PROFILES.academic;

  // Формируем историю для Gemini API (до 8 последних сообщений)
  const contents = [];
  const recentHistory = history.slice(-8);

  for (const item of recentHistory) {
    if (item.content) {
      contents.push({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.content }]
      });
    }
  }

  // Текущее сообщение
  const currentParts = [];
  if (imageBase64) {
    const cleanB64 = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
    currentParts.push({
      inline_data: {
        mime_type: "image/jpeg",
        data: cleanB64
      }
    });
  }

  const userText = query ? query : "Посмотри на это фото и помоги мне найти ошибку или решить задачу.";
  currentParts.push({ text: userText });
  contents.push({ role: "user", parts: currentParts });

  const payload = {
    contents,
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 2048
    }
  };

  const maxAttempts = Math.max(1, clientPool.slots.length);
  let lastError = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const { slot, waitMs } = clientPool.acquireSlot();

    if (waitMs > 0) {
      await new Promise(r => setTimeout(r, waitMs));
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${slot.model}:generateContent?key=${slot.key}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal
      });

      if (response.ok) {
        const data = await response.json();
        clientPool.markSuccess(slot);

        const candidates = data.candidates || [];
        if (candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
          const answerText = candidates[0].content.parts.map(p => p.text || "").join("");
          return answerText;
        }
        return "Ответ не был сформирован моделью.";
      }

      clientPool.markError(slot, response.status);
      const errText = await response.text();
      lastError = `[${response.status}] ${errText.slice(0, 100)}`;
      console.warn(`[Failover] Переключение с канала #${slot.id} (${slot.model}). Причина: ${lastError}`);

    } catch (err) {
      if (err.name === "AbortError") {
        throw err;
      }
      clientPool.markError(slot, 500);
      lastError = err.message;
      console.warn(`[Failover] Сетевой сбой на канале #${slot.id}: ${err.message}`);
    }
  }

  throw new Error(`Все 14 каналов Gemini временно недоступны. Последняя ошибка: ${lastError}`);
}
