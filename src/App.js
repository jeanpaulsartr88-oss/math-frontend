import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import katex from 'katex';
import 'katex/dist/katex.min.css'; 
import React, { useState, useEffect, useRef } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { askGeminiDirectly } from './geminiService';

const tg = window.Telegram ? window.Telegram.WebApp : null;

const renderTheoryHtml = (htmlContent) => {
  if (!htmlContent) return '';
  return htmlContent
    .replace(/<InlineMath\s+math="([\s\S]*?)"\s*\/>/g, (_, math) => {
      try {
        return katex.renderToString(math, { displayMode: false, throwOnError: false });
      } catch (e) {
        return `<span>${math}</span>`;
      }
    })
    .replace(/<BlockMath\s+math="([\s\S]*?)"\s*\/>/g, (_, math) => {
      try {
        return `<div class="katex-block-wrapper" style="text-align: center; margin: 12px 0; overflow-x: auto;">${katex.renderToString(math, { displayMode: true, throwOnError: false })}</div>`;
      } catch (e) {
        return `<div>${math}</div>`;
      }
    });
};

// ============================================================================
// ЧАСТЬ 1: ФУНДАМЕНТАЛЬНАЯ АКАДЕМИЧЕСКАЯ БАЗА "MATH STUDIO" (5-11 КЛАССЫ)
// ============================================================================
const COURSE_CONTENT = {
  "5": {
    name: "5 КЛАСС: ОСНОВЫ МАТЕМАТИЧЕСКОГО МЫШЛЕНИЯ",
    topics: {
      "Натуральные числа и шкалы: Полный курс": `
        <p><b>Натуральные числа</b> (<InlineMath math="\\mathbb{N}" />) — это числа, которые возникли естественным образом при счете реальных предметов (одно яблоко, два стола). Наименьшее натуральное число — 1. Самого большого числа не существует.</p>
        <div class="math-highlight">
          <BlockMath math="\\mathbb{N} = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, \\dots\\}" />
        </div>
        <p><b>Важнейший факт:</b> Нуль (0) не является натуральным числом! Мы не говорим "ноль яблок", когда начинаем считать.</p>
        <h4>Десятичная система счисления</h4>
        <p>Мы используем позиционную систему: значение цифры зависит от её места (позиции) в числе. Каждые три разряда объединяются в классы: единицы, тысячи, миллионы, миллиарды.</p>
        <BlockMath math="5 234 891 = 5 \\cdot 10^6 + 2 \\cdot 10^5 + 3 \\cdot 10^4 + 4 \\cdot 10^3 + 8 \\cdot 10^2 + 9 \\cdot 10^1 + 1" />
        <h4>Законы сложения и умножения:</h4>
        <table class="theory-table">
          <tr><td><b>Переместительный</b></td><td><InlineMath math="a + b = b + a" /></td><td>От перестановки мест слагаемых сумма не меняется.</td></tr>
          <tr><td><b>Сочетательный</b></td><td><InlineMath math="(a + b) + c = a + (b + c)" /></td><td>Соседние слагаемые можно заменять их суммой.</td></tr>
          <tr><td><b>Распределительный</b></td><td><InlineMath math="a \\cdot (b + c) = a \\cdot b + a \\cdot c" /></td><td>Ключ к раскрытию скобок и быстрому счету.</td></tr>
        </table>
        <h4>Координатный луч:</h4>
        <p>Луч, на котором отмечено начало отсчета (точка 0), указано направление и выбран единичный отрезок. Чем правее точка на луче, тем больше её координата.</p>
      `,
      "Обыкновенные дроби: Визуализация и смысл": `
        <p><b>Обыкновенная дробь</b> — это математическая модель, описывающая часть целого. Она записывается с помощью черты дроби.</p>
        <div class="math-highlight">
          <BlockMath math="\\text{Дробь} = \\frac{m}{n} \\quad \\frac{\\text{Числитель (сколько долей взяли)}}{\\text{Знаменатель (на сколько равных долей разделили целое)}}" />
        </div>
        <h4>Классификация дробей:</h4>
        <ul>
          <li><b>Правильная дробь:</b> Числитель меньше знаменателя (<InlineMath math="m < n" />). Пример: <InlineMath math="\\frac{3}{5}" />. Она всегда меньше 1.</li>
          <li><b>Неправильная дробь:</b> Числитель больше или равен знаменателю (<InlineMath math="m \\ge n" />). Пример: <InlineMath math="\\frac{7}{4}" /> или <InlineMath math="\\frac{5}{5}" />. Она всегда больше или равна 1.</li>
          <li><b>Смешанное число:</b> Состоит из целой части и правильной дроби. <InlineMath math="2 \\frac{1}{3} = 2 + \\frac{1}{3} = \\frac{7}{3}" />.</li>
        </ul>
        <h4>Основное свойство дроби:</h4>
        <p>Если числитель и знаменатель умножить или разделить на одно и то же натуральное число (не равное нулю), то получится равная ей дробь. Это база для <b>сокращения дробей</b>.</p>
        <BlockMath math="\\frac{a}{b} = \\frac{a \\cdot k}{b \\cdot k} \\implies \\frac{12}{16} = \\frac{12 : 4}{16 : 4} = \\frac{3}{4}" />
        <h4>Алгоритмы действий:</h4>
        <p><b>Сложение/Вычитание:</b> Возможны только при одинаковых знаменателях! Если они разные, нужно найти Наименьшее Общее Кратное (НОК).</p>
        <BlockMath math="\\frac{a}{c} \\pm \\frac{b}{c} = \\frac{a \\pm b}{c}" />
      `,
      "Десятичные дроби: Алгоритмы вычислений": `
        <p>Десятичная дробь — это другой, более удобный для повседневной жизни способ записи обыкновенной дроби, у которой знаменатель равен 10, 100, 1000 и т.д.</p>
        <BlockMath math="5 \\frac{43}{1000} = 5,043 \\quad \\text{(Читается: Пять целых сорок три тысячных)}" />
        <h4>Сложение и вычитание (Правило Запятой):</h4>
        <p>Главное и единственное правило: при записи в столбик <b>запятая должна стоять строго под запятой</b>. Пустые места (недостающие разряды) заполняются нулями.</p>
        <h4>Умножение:</h4>
        <ol>
          <li>Выполняем умножение, не обращая внимания на запятые (как с натуральными числами).</li>
          <li>В полученном произведении отделяем запятой справа столько цифр, сколько их стоит после запятых в <b>обоих множителях вместе</b>.</li>
        </ol>
        <h4>Деление на десятичную дробь:</h4>
        <p>Делить на дробь напрямую нельзя! Нужно перенести запятую в делимом и делителе вправо на столько знаков, сколько их после запятой в делителе, чтобы делитель стал целым числом.</p>
        <BlockMath math="12,5 : 0,25 = 1250 : 25 = 50" />
      `,
      "Площади, объемы и единицы измерения": `
        <p><b>Периметр (P)</b> — сумма длин всех сторон многоугольника. Измеряется в линейных единицах (мм, см, м).</p>
        <p><b>Площадь (S)</b> — размер поверхности, ограниченной замкнутым контуром. Измеряется в квадратных единицах (<InlineMath math="\\text{см}^2, \\text{м}^2" />).</p>
        <div class="math-highlight">
          <p>Площадь прямоугольника со сторонами a и b:</p>
          <BlockMath math="S = a \\cdot b" />
          <p>Площадь квадрата со стороной a:</p>
          <BlockMath math="S = a^2" />
        </div>
        <h4>Прямоугольный параллелепипед (Коробка):</h4>
        <p>Имеет 3 измерения: длину (a), ширину (b) и высоту (c).</p>
        <ul>
          <li><b>Объем (V):</b> Вместимость фигуры. <InlineMath math="V = a \\cdot b \\cdot c" /> (кубические единицы).</li>
          <li><b>Площадь поверхности:</b> Сумма площадей всех шести граней. <InlineMath math="S = 2(ab + bc + ac)" />.</li>
        </ul>
        <p><b>Связь литров и дециметров:</b> <InlineMath math="1 \\text{ литр} = 1 \\text{ дм}^3 = 1000 \\text{ см}^3" />.</p>
      `
    }
  },
  "6": {
    name: "6 КЛАСС: РАЦИОНАЛЬНЫЕ ЧИСЛА И ПРОПОРЦИИ",
    topics: {
      "Теория делимости: НОД и НОК": `
        <p><b>Делитель числа a</b> — это натуральное число, на которое <i>a</i> делится без остатка. <b>Кратное числа a</b> — это натуральное число, которое само делится на <i>a</i>.</p>
        <h4>Признаки делимости (Быстрые тесты):</h4>
        <ul>
          <li><b>На 2:</b> Последняя цифра числа четная (0, 2, 4, 6, 8).</li>
          <li><b>На 3 и 9:</b> Сумма всех цифр числа делится на 3 (или на 9).</li>
          <li><b>На 5:</b> Последняя цифра числа 0 или 5.</li>
          <li><b>На 4:</b> Две последние цифры образуют число, делящееся на 4 (или два нуля).</li>
        </ul>
        <h4>Простые и составные числа:</h4>
        <p><b>Простое число</b> имеет ровно два делителя: 1 и само себя (2, 3, 5, 7, 11...). <b>Составное</b> — больше двух делителей.</p>
        <h4>НОД и НОК:</h4>
        <div class="math-highlight">
          <p><b>НОД (Наибольший общий делитель):</b> Самое большое число, на которое делятся данные числа. (Нужен для сокращения дробей).</p>
          <p><b>НОК (Наименьшее общее кратное):</b> Самое маленькое число, которое делится на данные числа. (Нужен для общего знаменателя).</p>
        </div>
      `,
      "Отношения, Пропорции и Проценты": `
        <p><b>Отношение</b> двух чисел — это их частное. Оно показывает, во сколько раз одно число больше другого или какую часть одно число составляет от другого.</p>
        <h4>Пропорция:</h4>
        <p>Равенство двух отношений называется пропорцией. Читается: "a относится к b так же, как c относится к d".</p>
        <BlockMath math="\\frac{a}{b} = \\frac{c}{d} \\quad \\text{или} \\quad a : b = c : d" />
        <p><b>Основное свойство пропорции (Метод Креста):</b> Произведение крайних членов пропорции равно произведению её средних членов.</p>
        <BlockMath math="a \\cdot d = b \\cdot c" />
        <h4>Прямая и обратная зависимость:</h4>
        <ul>
          <li><b>Прямая:</b> Если купить в 3 раза больше конфет, заплатишь в 3 раза больше. (Отношение величин постоянно).</li>
          <li><b>Обратная:</b> Если увеличить скорость в 2 раза, время в пути уменьшится в 2 раза. (Произведение величин постоянно).</li>
        </ul>
      `,
      "Отрицательные числа и Модуль": `
        <p>Отрицательные числа появились для обозначения долга или температуры ниже нуля. Вместе с положительными числами и нулем они образуют множество <b>Целых чисел (<InlineMath math="\\mathbb{Z}" />)</b>.</p>
        <h4>Модуль числа (Абсолютная величина):</h4>
        <p>Геометрически модуль — это расстояние на координатной прямой от начала отсчета до точки, изображающей данное число. Расстояние не может быть отрицательным!</p>
        <BlockMath math="|x| = \\begin{cases} x, & \\text{если } x \\ge 0 \\\\ -x, & \\text{если } x < 0 \\end{cases}" />
        <p>Пример: <InlineMath math="|-7| = 7" />; <InlineMath math="|7| = 7" />; <InlineMath math="|0| = 0" />.</p>
        <h4>Арифметика с разными знаками:</h4>
        <table class="theory-table">
          <tr><td><b>Сложение (разные знаки)</b></td><td><InlineMath math="-10 + 4 = -6" /></td><td>Из большего модуля вычитаем меньший, ставим знак большего модуля.</td></tr>
          <tr><td><b>Сложение (оба минусы)</b></td><td><InlineMath math="-5 + (-3) = -8" /></td><td>Складываем модули, ставим знак минус.</td></tr>
          <tr><td><b>Умножение/Деление</b></td><td><InlineMath math="(-) \\cdot (-) = (+)" /></td><td>Минус на минус дает плюс. Плюс на минус дает минус.</td></tr>
        </table>
      `
    }
  },
  "7": {
    name: "7 КЛАСС: АЛГЕБРА И БАЗОВАЯ ГЕОМЕТРИЯ",
    topics: {
      "Свойства степеней: Полный обзор": `
        <p>Степень с натуральным показателем — это удобная запись многократного умножения числа на само себя.</p>
        <div class="math-highlight">
          <BlockMath math="a^n = \\underbrace{a \\cdot a \\cdot ... \\cdot a}_{n \\text{ множителей}}" />
        </div>
        <p>Где <i>a</i> — основание степени, <i>n</i> — показатель степени.</p>
        <h4>Законы степеней (работают только при одинаковых основаниях!):</h4>
        <ol>
          <li><b>Умножение:</b> Показатели складываются. <BlockMath math="a^m \\cdot a^n = a^{m+n}" /></li>
          <li><b>Деление:</b> Показатели вычитаются. <BlockMath math="\\frac{a^m}{a^n} = a^{m-n}" /></li>
          <li><b>Степень в степень:</b> Показатели перемножаются. <BlockMath math="(a^m)^n = a^{m \\cdot n}" /></li>
          <li><b>Степень произведения:</b> Степень распределяется на каждый множитель. <BlockMath math="(a \\cdot b)^n = a^n \\cdot b^n" /></li>
        </ol>
        <p><b>Особый случай:</b> Любое число (кроме нуля) в нулевой степени равно единице! <InlineMath math="a^0 = 1" />.</p>
      `,
      "Многочлены и Формулы сокращенного умножения (ФСУ)": `
        <p><b>Одночлен</b> — это выражение, состоящее из числового множителя, переменных и их степеней (например, <InlineMath math="5x^2y" />). <b>Многочлен</b> — это алгебраическая сумма одночленов.</p>
        <p>Для быстрого возведения в степень и разложения на множители мы используем ФСУ. Их нужно знать как таблицу умножения.</p>
        <h4>Квадраты (Формулы второй степени):</h4>
        <div class="math-highlight">
          <BlockMath math="(a + b)^2 = a^2 + 2ab + b^2 \\quad \\text{(Квадрат суммы)}" />
          <BlockMath math="(a - b)^2 = a^2 - 2ab + b^2 \\quad \\text{(Квадрат разности)}" />
          <BlockMath math="a^2 - b^2 = (a - b)(a + b) \\quad \\text{(Разность квадратов)}" />
        </div>
        <h4>Кубы (Формулы третьей степени):</h4>
        <div class="math-highlight">
          <BlockMath math="(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 \\quad \\text{(Куб суммы)}" />
          <BlockMath math="a^3 + b^3 = (a + b)(a^2 - ab + b^2) \\quad \\text{(Сумма кубов)}" />
          <BlockMath math="a^3 - b^3 = (a - b)(a^2 + ab + b^2) \\quad \\text{(Разность кубов)}" />
        </div>
      `,
      "Линейная функция и её график": `
        <p>Линейной называется функция вида <InlineMath math="y = kx + b" />, где <i>k</i> и <i>b</i> — заданные числа.</p>
        <ul>
          <li><b>График:</b> Прямая линия. Для её построения достаточно найти координаты всего двух точек.</li>
          <li><b>Коэффициент k (угловой коэффициент):</b> Отвечает за наклон. Если <InlineMath math="k > 0" /> — прямая "идет в гору" (возрастает). Если <InlineMath math="k < 0" /> — "идет под гору" (убывает). Если <InlineMath math="k = 0" /> — прямая параллельна оси OX.</li>
          <li><b>Коэффициент b:</b> Показывает точку пересечения графика с осью OY (ординат). Координата этой точки <InlineMath math="(0; b)" />.</li>
        </ul>
        <h4>Взаимное расположение двух прямых (<InlineMath math="y = k_1x + b_1" /> и <InlineMath math="y = k_2x + b_2" />):</h4>
        <p>Если <InlineMath math="k_1 = k_2" /> и <InlineMath math="b_1 \\neq b_2" /> — прямые <b>параллельны</b> и не пересекаются.</p>
        <p>Если <InlineMath math="k_1 \\neq k_2" /> — прямые <b>пересекаются</b> в одной точке.</p>
      `,
      "Геометрия: Признаки равенства треугольников": `
        <p>Треугольники называются равными, если их можно совместить наложением. В равных треугольниках против равных сторон лежат равные углы.</p>
        <p>Чтобы доказать равенство, не нужно проверять все 6 элементов (3 стороны и 3 угла). Достаточно трех признаков:</p>
        <ol>
          <li><b>Первый признак (по двум сторонам и углу):</b> Если две стороны и угол между ними одного треугольника соответственно равны двум сторонам и углу между ними другого треугольника.</li>
          <li><b>Второй признак (по стороне и двум углам):</b> Если сторона и два прилежащих к ней угла одного треугольника соответственно равны стороне и двум прилежащим углам другого.</li>
          <li><b>Третий признак (по трем сторонам):</b> Если три стороны одного треугольника соответственно равны трем сторонам другого.</li>
        </ol>
      `
    }
  },
  "8": {
    name: "8 КЛАСС: КВАДРАТНЫЕ УРАВНЕНИЯ И КОРНИ",
    topics: {
      "Арифметический квадратный корень": `
        <p>Арифметическим квадратным корнем из числа <InlineMath math="a" /> называется неотрицательное число, квадрат которого равен <InlineMath math="a" />.</p>
        <div class="math-highlight">
          <BlockMath math="\\sqrt{a} = b \\iff b^2 = a, \\quad b \\ge 0, a \\ge 0" />
        </div>
        <p><b>Важнейшее тождество:</b> Корень из квадрата числа равен модулю этого числа!</p>
        <BlockMath math="\\sqrt{x^2} = |x|" />
        <h4>Свойства корней:</h4>
        <table class="theory-table">
          <tr><td><b>Корень из произведения</b></td><td><InlineMath math="\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}" /></td><td>(при <InlineMath math="a \\ge 0, b \\ge 0" />)</td></tr>
          <tr><td><b>Корень из дроби</b></td><td><InlineMath math="\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}" /></td><td>(при <InlineMath math="a \\ge 0, b > 0" />)</td></tr>
          <tr><td><b>Внесение множителя</b></td><td><InlineMath math="c \\sqrt{a} = \\sqrt{c^2 \\cdot a}" /></td><td>(при <InlineMath math="c \\ge 0" />)</td></tr>
        </table>
      `,
      "Квадратные уравнения и Дискриминант": `
        <p>Полное квадратное уравнение имеет вид <InlineMath math="ax^2 + bx + c = 0" />, где <InlineMath math="a, b, c" /> — заданные числа, причем <InlineMath math="a \\neq 0" />.</p>
        <h4>Универсальный алгоритм решения через Дискриминант (D):</h4>
        <p><b>Шаг 1:</b> Вычисляем дискриминант по формуле:</p>
        <BlockMath math="D = b^2 - 4ac" />
        <p><b>Шаг 2:</b> Анализируем количество корней:</p>
        <ul>
          <li>Если <InlineMath math="D > 0" />: Уравнение имеет <b>два</b> различных действительных корня.</li>
          <li>Если <InlineMath math="D = 0" />: Уравнение имеет <b>один</b> корень (или два совпадающих).</li>
          <li>Если <InlineMath math="D < 0" />: Действительных корней <b>нет</b> (парабола не пересекает ось X).</li>
        </ul>
        <p><b>Шаг 3:</b> Находим корни по формуле:</p>
        <div class="math-highlight">
          <BlockMath math="x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}" />
        </div>
      `,
      "Теорема Виета": `
        <p>Теорема Франсуа Виета — это мощный инструмент для устного решения <b>приведенных</b> квадратных уравнений вида <InlineMath math="x^2 + px + q = 0" /> (где старший коэффициент <InlineMath math="a = 1" />).</p>
        <div class="math-highlight">
          <p>Сумма корней равна второму коэффициенту с противоположным знаком, а произведение корней равно свободному члену:</p>
          <BlockMath math="\\begin{cases} x_1 + x_2 = -p \\\\ x_1 \\cdot x_2 = q \\end{cases}" />
        </div>
        <p>Теорема часто применяется для проверки найденных через дискриминант корней, а также для разложения квадратного трехчлена на множители:</p>
        <BlockMath math="ax^2 + bx + c = a(x - x_1)(x - x_2)" />
      `,
      "Теорема Пифагора и Площади фигур": `
        <p><b>Теорема Пифагора</b> — основа метрической геометрии: В прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов.</p>
        <BlockMath math="c^2 = a^2 + b^2" />
        <h4>Формулы площадей основных фигур:</h4>
        <ul>
          <li><b>Параллелограмм:</b> Произведение основания на проведенную к нему высоту: <InlineMath math="S = a \\cdot h_a" />.</li>
          <li><b>Треугольник:</b> Половина произведения основания на высоту: <InlineMath math="S = \\frac{1}{2} a \\cdot h_a" />.</li>
          <li><b>Ромб:</b> Половина произведения диагоналей: <InlineMath math="S = \\frac{1}{2} d_1 \\cdot d_2" />.</li>
          <li><b>Трапеция:</b> Произведение полусуммы оснований на высоту: <InlineMath math="S = \\frac{a+b}{2} \\cdot h" />.</li>
        </ul>
      `
    }
  },
  "9": {
    name: "9 КЛАСС: ПРОГРЕССИИ, ФУНКЦИИ И ТРИГОНОМЕТРИЯ",
    topics: {
      "Квадратичная функция (Парабола)": `
        <p>Функция вида <InlineMath math="y = ax^2 + bx + c" /> описывает траекторию брошенного тела и многие другие физические процессы. График — парабола.</p>
        <h4>Ключевые элементы параболы:</h4>
        <ol>
          <li><b>Направление ветвей:</b> Зависит от коэффициента <InlineMath math="a" />. Если <InlineMath math="a > 0" /> — ветви направлены вверх (функция имеет минимум). Если <InlineMath math="a < 0" /> — ветви вниз (функция имеет максимум).</li>
          <li><b>Вершина параболы:</b> Точка, где график меняет направление с убывания на возрастание (или наоборот). Координаты <InlineMath math="(x_v, y_v)" />:
            <BlockMath math="x_v = -\\frac{b}{2a}; \\quad y_v = y(x_v) = \\frac{4ac - b^2}{4a}" />
          </li>
          <li><b>Ось симметрии:</b> Прямая <InlineMath math="x = x_v" />, делящая параболу на две зеркальные части.</li>
          <li><b>Пересечение с осями:</b> С осью OY — это точка <InlineMath math="(0; c)" />. С осью OX — это корни уравнения <InlineMath math="ax^2 + bx + c = 0" />.</li>
        </ol>
      `,
      "Арифметическая и Геометрическая прогрессии": `
        <p><b>Прогрессия</b> — это числовая последовательность, образованная по определенному правилу.</p>
        <h4>1. Арифметическая прогрессия:</h4>
        <p>Каждый следующий член получается из предыдущего прибавлением одного и того же числа <InlineMath math="d" /> (разности).</p>
        <div class="math-highlight">
          <BlockMath math="a_n = a_1 + d(n-1) \\quad \\text{(Формула n-го члена)}" />
          <BlockMath math="S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + d(n-1)}{2} \\cdot n \\quad \\text{(Сумма n членов)}" />
        </div>
        <h4>2. Геометрическая прогрессия:</h4>
        <p>Каждый следующий член получается из предыдущего умножением на одно и то же число <InlineMath math="q \\neq 0" /> (знаменатель).</p>
        <div class="math-highlight">
          <BlockMath math="b_n = b_1 \\cdot q^{n-1} \\quad \\text{(Формула n-го члена)}" />
          <BlockMath math="S_n = \\frac{b_1(q^n - 1)}{q - 1} \\quad \\text{(Сумма n членов)}" />
        </div>
      `,
      "Тригонометрия в прямоугольном треугольнике": `
        <p>Тригонометрические функции связывают углы прямоугольного треугольника с длинами его сторон.</p>
        <ul>
          <li><b>Синус (<InlineMath math="\\sin \\alpha" />):</b> отношение противолежащего катета к гипотенузе.</li>
          <li><b>Косинус (<InlineMath math="\\cos \\alpha" />):</b> отношение прилежащего катета к гипотенузе.</li>
          <li><b>Тангенс (<InlineMath math="\\tan \\alpha" />):</b> отношение противолежащего катета к прилежащему (или синуса к косинусу).</li>
        </ul>
        <p>Из теоремы Пифагора выводится <b>Основное тригонометрическое тождество</b>:</p>
        <div class="math-highlight">
          <BlockMath math="\\sin^2 \\alpha + \\cos^2 \\alpha = 1" />
        </div>
        <p>Важные табличные значения для первой четверти:</p>
        <BlockMath math="\\sin 30^{\\circ} = \\frac{1}{2}; \\quad \\cos 30^{\\circ} = \\frac{\\sqrt{3}}{2}; \\quad \\tan 45^{\\circ} = 1" />
      `
    }
  },
  "10": {
    name: "10 КЛАСС: МАТАНАЛИЗ И СТЕРЕОМЕТРИЯ",
    topics: {
      "Тригонометрические уравнения и круг": `
        <p>В 10 классе тригонометрия выходит за пределы треугольника на <b>тригонометрическую окружность</b> радиуса R=1.</p>
        <p>Косинус — это ось абсцисс (OX), Синус — ось ординат (OY). Углы измеряются в радианах (<InlineMath math="\\pi = 180^{\\circ}" />).</p>
        <h4>Решение простейших уравнений:</h4>
        <table class="theory-table">
          <tr><td>Уравнение</td><td>Общее решение</td><td>Исключения (частные случаи)</td></tr>
          <tr>
            <td><InlineMath math="\\sin x = a" /></td>
            <td><InlineMath math="x = (-1)^k \\arcsin a + \\pi k" /></td>
            <td>Если a=0: <InlineMath math="x = \\pi k" /><br/>Если a=1: <InlineMath math="x = \\frac{\\pi}{2} + 2\\pi k" /></td>
          </tr>
          <tr>
            <td><InlineMath math="\\cos x = a" /></td>
            <td><InlineMath math="x = \\pm \\arccos a + 2\\pi k" /></td>
            <td>Если a=0: <InlineMath math="x = \\frac{\\pi}{2} + \\pi k" /><br/>Если a=1: <InlineMath math="x = 2\\pi k" /></td>
          </tr>
          <tr>
            <td><InlineMath math="\\tan x = a" /></td>
            <td><InlineMath math="x = \\arctan a + \\pi k" /></td>
            <td>Ограничений для 'a' нет.</td>
          </tr>
        </table>
        <p>Где <InlineMath math="k \\in \\mathbb{Z}" /> (целые числа).</p>
      `,
      "Производная: Физический и геометрический смысл": `
        <p><b>Производная функции</b> <InlineMath math="f'(x)" /> — это скорость её изменения в данной точке. Это важнейший инструмент высшей математики.</p>
        <div class="math-highlight">
          <BlockMath math="f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}" />
        </div>
        <h4>Геометрический смысл:</h4>
        <p>Производная функции в точке <InlineMath math="x_0" /> равна угловому коэффициенту <InlineMath math="k" /> (тангенсу угла наклона) касательной к графику функции в этой точке.</p>
        <BlockMath math="f'(x_0) = \\tan \\alpha = k" />
        <h4>Физический смысл:</h4>
        <p>Если <InlineMath math="x(t)" /> — закон движения материальной точки, то её скорость — это производная координаты по времени <InlineMath math="v(t) = x'(t)" />, а ускорение — производная скорости <InlineMath math="a(t) = v'(t)" />.</p>
        <h4>Правила дифференцирования:</h4>
        <BlockMath math="(u \\pm v)' = u' \\pm v'; \\quad (u \\cdot v)' = u'v + uv'; \\quad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}" />
      `,
      "Аксиомы стереометрии": `
        <p>Стереометрия изучает фигуры в трехмерном пространстве. Базируется на трех основных аксиомах:</p>
        <ol>
          <li><b>Аксиома плоскости:</b> Через любые три точки, не лежащие на одной прямой, проходит плоскость, и притом только одна.</li>
          <li><b>Аксиома принадлежности прямой плоскости:</b> Если две точки прямой лежат в плоскости, то и все точки этой прямой лежат в этой плоскости (прямая "вклеена" в плоскость).</li>
          <li><b>Аксиома пересечения:</b> Если две различные плоскости имеют общую точку, то они пересекаются по прямой, проходящей через эту точку.</li>
        </ol>
      `
    }
  },
  "11": {
    name: "11 КЛАСС: ИНТЕГРАЛЫ И КОМПЛЕКСНЫЕ ЧИСЛА",
    topics: {
      "Логарифмы и их свойства": `
        <p>Логарифм отвечает на вопрос: "в какую степень <InlineMath math="x" /> нужно возвести основание <InlineMath math="a" />, чтобы получить аргумент <InlineMath math="b" />?".</p>
        <div class="math-highlight">
          <BlockMath math="\\log_a b = x \\iff a^x = b" />
        </div>
        <p><b>ОДЗ логарифма:</b> Аргумент строго положителен (<InlineMath math="b > 0" />). Основание строго положительно и не равно единице (<InlineMath math="a > 0, a \\neq 1" />).</p>
        <h4>Ключевые свойства:</h4>
        <ul>
          <li>Сумма логарифмов = логарифм произведения: <InlineMath math="\\log_a x + \\log_a y = \\log_a (x \\cdot y)" /></li>
          <li>Разность логарифмов = логарифм частного: <InlineMath math="\\log_a x - \\log_a y = \\log_a \\left(\\frac{x}{y}\\right)" /></li>
          <li>Вынесение степени из аргумента: <InlineMath math="\\log_a (x^p) = p \\cdot \\log_a x" /></li>
          <li>Вынесение степени из основания: <InlineMath math="\\log_{a^q} x = \\frac{1}{q} \\log_a x" /></li>
        </ul>
        <p><b>Натуральный логарифм (<InlineMath math="\\ln x" />)</b> — это логарифм по основанию экспоненты <InlineMath math="e \\approx 2.718" />.</p>
      `,
      "Интеграл и Формула Ньютона-Лейбница": `
        <p>Интегрирование — операция, обратная дифференцированию. Нахождение функции по её производной. Первообразная обозначается <InlineMath math="F(x)" />.</p>
        <p><b>Неопределенный интеграл</b> — это семейство всех первообразных:</p>
        <BlockMath math="\\int f(x)dx = F(x) + C \\quad \\text{где } F'(x) = f(x)" />
        <p><b>Определенный интеграл (Геометрический смысл):</b></p>
        <p>Это площадь криволинейной трапеции — фигуры, ограниченной графиком функции <InlineMath math="y = f(x)" />, осью абсцисс и вертикальными прямыми <InlineMath math="x = a" /> и <InlineMath math="x = b" />.</p>
        <div class="math-highlight">
          <p>Вычисляется по Формуле Ньютона-Лейбница:</p>
          <BlockMath math="S = \\int_{a}^{b} f(x)dx = F(b) - F(a)" />
        </div>
      `,
      "Комплексные числа: Алгебра и Геометрия": `
        <p>Расширение понятия числа для решения уравнений, не имеющих действительных корней (например, <InlineMath math="x^2 = -1" />). Вводится мнимая единица <InlineMath math="i" />.</p>
        <div class="math-highlight">
          <BlockMath math="i^2 = -1 \\implies i = \\sqrt{-1}" />
        </div>
        <h4>Формы записи комплексного числа <InlineMath math="z" />:</h4>
        <ol>
          <li><b>Алгебраическая:</b> <InlineMath math="z = a + bi" />, где <i>a</i> — действительная часть (Re), <i>b</i> — мнимая часть (Im).</li>
          <li><b>Тригонометрическая:</b> <InlineMath math="z = r(\\cos \\phi + i \\sin \\phi)" />, где <i>r</i> — модуль числа (<InlineMath math="r = \\sqrt{a^2 + b^2}" />), а <InlineMath math="\\phi" /> — аргумент (угол).</li>
          <li><b>Показательная (Формула Эйлера):</b> <InlineMath math="z = r \\cdot e^{i\\phi}" />. Эта форма делает умножение и возведение в степень крайне простым.</li>
        </ol>
        <p>Умножение в тригонометрической форме: модули перемножаются, а аргументы (углы) складываются.</p>
      `
    }
  }
};

// ============================================================================
// ЧАСТЬ 2: ПРОФЕССИОНАЛЬНЫЙ ИНТЕРФЕЙС УРОВНЯ ВЫСШЕЙ МАТЕМАТИКИ
// ============================================================================

function App() {
  const [input, setInput] = useState('');
  const [cursorPos, setCursorPos] = useState(0); 
  const [screen, setScreen] = useState('grades'); 
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const [activeTab, setActiveTab] = useState('basic');
  
  const [chatHistory, setChatHistory] = useState(() => {
    const savedChat = localStorage.getItem('mathStudioChat');
    if (savedChat) {
      try {
        return JSON.parse(savedChat);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isThinking, setIsThinking] = useState(false);
  const [chatText, setChatText] = useState('');
  const [tutorProfile, setTutorProfile] = useState('academic');
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const fileInputRef = useRef(null);
  const abortControllerRef = useRef(null); 
  const timerRef = useRef(null); 
  
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- СОСТОЯНИЯ ДЛЯ КОМПИЛЯТОРА ---
  const [showCompiler, setShowCompiler] = useState(false);
  const [pythonCode, setPythonCode] = useState('# Напиши свой код здесь!\nprint("Hello, Math Studio!")');
  const [compilerOutput, setCompilerOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const pyodideRef = useRef(null); // Ссылка на встроенный движок Python

  // НОВОЕ: Загружаем Python прямо в браузер при открытии приложения
  useEffect(() => {
    if (!document.getElementById('pyodide-script')) {
      const script = document.createElement('script');
      script.id = 'pyodide-script';
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mathStudioChat', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isThinking, showCalculator, selectedImagePreview, showCompiler]);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#ffffff');
      tg.setBackgroundColor('#ffffff');
    }
  }, []);

  const stopGeneration = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsThinking(false);
    setChatHistory(prev => [...prev, { role: 'model', content: "🛑 *Генерация остановлена пользователем.*" }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIDE = 1000; 
          if (width > height) {
            if (width > MAX_SIDE) { height *= MAX_SIDE / width; width = MAX_SIDE; }
          } else {
            if (height > MAX_SIDE) { width *= MAX_SIDE / height; height = MAX_SIDE; }
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.4);
          setSelectedImagePreview(compressedBase64);
          setImageBase64(compressedBase64.split(',')[1]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };
  
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Ваш браузер не поддерживает голосовой ввод 😔"); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU'; 
    recognition.interimResults = false; 
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatText(prev => prev ? prev + " " + transcript : transcript);
    };
    recognition.onerror = (event) => { console.error("Ошибка микрофона:", event.error); setIsListening(false); };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const insertAtCursor = (key) => {
    if (key === 'C' || key === 'AC') { setInput(''); setCursorPos(0); return; } 
    if (key === '⌫') {
      if (cursorPos > 0) { setInput(prev => prev.slice(0, cursorPos - 1) + prev.slice(cursorPos)); setCursorPos(prev => prev - 1); }
      return;
    } 
    if (key === '←') { if (cursorPos > 0) setCursorPos(prev => prev - 1); return; } 
    if (key === '→') { if (cursorPos < input.length) setCursorPos(prev => prev + 1); return; }

    let insertString = key;
    let cursorShift = key.length;

    if (key === '\\frac{}{}') { insertString = '\\frac{}{}'; cursorShift = 6; } 
    else if (key === '\\sqrt{') { insertString = '\\sqrt{}'; cursorShift = 6; } 
    else if (key === '\\^{') { insertString = '^{}'; cursorShift = 2; } 
    else if (key === '\\lim_{x \\to }') { insertString = '\\lim_{x \\to }{}'; cursorShift = 12; } 
    else if (key === '\\int') { insertString = '\\int_{}^{} '; cursorShift = 6; } 
    else if (key === '(') { insertString = '()'; cursorShift = 1; } 
    else if (key === '\\sin(' || key === '\\cos(' || key === '\\tan(' || key === '\\ln(' || key === '\\log(') {
      insertString = key + ')'; cursorShift = key.length; 
    }

    setInput(prev => prev.slice(0, cursorPos) + insertString + prev.slice(cursorPos));
    setCursorPos(prev => prev + cursorShift);
  };

  const sendToServer = async (rawText, isMath = true) => {
    if (!rawText.trim() && !imageBase64) return; 
    const currentQuery = isMath && rawText ? `$$${rawText}$$` : rawText;
    const newHistory = [...chatHistory, { role: 'user', content: currentQuery, imageUrl: selectedImagePreview }];
    
    setChatHistory(newHistory);
    setIsThinking(true);
    setScreen('chat'); 

    const currentImageToSend = imageBase64; 

    if (isMath) { setInput(''); setCursorPos(0); setShowCalculator(false); } 
    else { setChatText(''); }
    
    setSelectedImagePreview(null);
    setImageBase64(null);

    abortControllerRef.current = new AbortController(); 

    try {
      const answer = await askGeminiDirectly({
        query: currentQuery,
        history: chatHistory,
        profile: tutorProfile,
        imageBase64: currentImageToSend,
        signal: abortControllerRef.current.signal
      });

      setChatHistory(prev => [...prev, { role: 'model', content: answer }]);
    } catch (e) {
      if (e.name !== 'AbortError') {
        setChatHistory(prev => [...prev, { role: 'model', content: "Ошибка: " + e.message }]);
      }
    } finally {
      setIsThinking(false);
      abortControllerRef.current = null; 
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // --- ЛОГИКА PYTHON КОМПИЛЯТОРА (ТЕПЕРЬ РАБОТАЕТ ЛОКАЛЬНО В БРАУЗЕРЕ) ---
  const runPythonCode = async () => {
    if (!pythonCode.trim()) return;
    setIsCompiling(true);
    setCompilerOutput('⏳ Запускаем движок Python (первый запуск может занять пару секунд)...');

    try {
      // 1. Проверяем, скачался ли движок Python
      if (!pyodideRef.current) {
        if (!window.loadPyodide) {
          setCompilerOutput('❌ Библиотека Python еще загружается из сети. Подождите пару секунд и нажмите "Запустить код" снова.');
          setIsCompiling(false);
          return;
        }
        // 2. Инициализируем Python
        pyodideRef.current = await window.loadPyodide();
      }

      // 3. Перенаправляем потоки вывода (чтобы функция print() выводила текст в нашу консоль)
      await pyodideRef.current.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      // 4. Запускаем код ученика
      await pyodideRef.current.runPythonAsync(pythonCode);

      // 5. Забираем результаты
      const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
      const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");

      if (stderr) {
        setCompilerOutput(stderr);
      } else {
        setCompilerOutput(stdout || '>_ Выполнено (без текстового вывода)');
      }
    } catch (err) {
      // Ловим синтаксические и логические ошибки Python (Traceback)
      setCompilerOutput(err.toString());
    } finally {
      setIsCompiling(false);
    }
  };

  const askTutorAboutError = () => {
    const query = `Я написал код на Python:\n\`\`\`python\n${pythonCode}\n\`\`\`\nПри запуске я получил ошибку/вывод:\n\`\`\`text\n${compilerOutput}\n\`\`\`\nОбъясни, где я ошибся, но не пиши готовый код сразу.`;
    setShowCompiler(false);
    sendToServer(query, false);
  };

  // --- РЕНДЕР ИНТЕРФЕЙСА ---
 // --- РЕНДЕР ИНТЕРФЕЙСА ---
  const renderGrades = () => (
    <div className="fade-in" style={{padding: '20px'}}>
      <h2 style={{color: isDarkMode ? '#fff' : '#333'}}>База знаний Math Studio</h2>
      <p style={{color: isDarkMode ? '#bbb' : '#666', marginBottom: '20px'}}>Выберите класс для изучения теории</p>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
        {Object.keys(COURSE_CONTENT).map(g => (
          <button key={g} 
                  style={{padding: '20px', borderRadius: '12px', border: '1px solid', borderColor: isDarkMode ? '#444' : '#e0e0e0', background: isDarkMode ? '#2c2c2e' : '#fff', fontSize: '1.2rem', fontWeight: 'bold', color: isDarkMode ? '#64d2ff' : '#007aff', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}} 
                  onClick={() => { setSelectedGrade(g); setScreen('topics'); }}>
            {g} класс
          </button>
        ))}
      </div>
    </div>
  );

  const renderTopics = () => (
    <div className="fade-in" style={{padding: '20px'}}>
      <button onClick={() => setScreen('grades')} style={{marginBottom: '20px', padding: '10px 15px', background: isDarkMode ? '#2c2c2e' : '#e0e3e5', color: isDarkMode ? '#fff' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>← К классам</button>
      <h3 style={{color: isDarkMode ? '#fff' : '#333', marginBottom: '15px'}}>{COURSE_CONTENT[selectedGrade].name}</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {Object.keys(COURSE_CONTENT[selectedGrade].topics).map(t => (
          <button key={t} 
                  style={{padding: '15px', borderRadius: '10px', border: '1px solid', borderColor: isDarkMode ? '#444' : '#e0e0e0', background: isDarkMode ? '#2c2c2e' : '#fff', textAlign: 'left', fontSize: '1.1rem', color: isDarkMode ? '#e0e0e0' : '#333', cursor: 'pointer'}} 
                  onClick={() => { setSelectedTopic(t); setScreen('theory'); }}>
            📚 {t}
          </button>
        ))}
      </div>
    </div>
  );

  const renderTheory = () => (
    <div className="fade-in" style={{padding: '20px', height: '100%', overflowY: 'auto'}}>
      <button onClick={() => setScreen('topics')} style={{marginBottom: '20px', padding: '10px 15px', background: isDarkMode ? '#2c2c2e' : '#e0e3e5', color: isDarkMode ? '#fff' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>← К темам</button>
      <div style={{background: isDarkMode ? '#1e1e1e' : '#fff', padding: '20px', borderRadius: '12px', border: '1px solid', borderColor: isDarkMode ? '#333' : '#e0e0e0', marginBottom: '20px', color: isDarkMode ? '#e0e0e0' : '#333', lineHeight: '1.6', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
        <h3 style={{color: isDarkMode ? '#64d2ff' : '#007aff', borderBottom: '2px solid', borderBottomColor: isDarkMode ? '#333' : '#f0f0f0', paddingBottom: '10px', marginBottom: '15px'}}>{selectedTopic}</h3>
        <div className="theory-text" dangerouslySetInnerHTML={{ __html: renderTheoryHtml(COURSE_CONTENT[selectedGrade].topics[selectedTopic]) }} />
      </div>
      <button className="pro-submit-btn" style={{width: '100%', marginLeft: '0', marginBottom: '40px'}} onClick={() => { setScreen('chat'); setShowCalculator(true); }}>
        Решить задачу с Тьютором →
      </button>
    </div>
  );

  const renderChat = () => {
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* ШАПКА ЧАТА */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '10px', background: isDarkMode ? '#1e1e1e' : '#f8f9fa', borderBottom: '1px solid', borderBottomColor: isDarkMode ? '#333' : '#e0e0e0', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setTutorProfile('academic')} style={{ padding: '8px 12px', borderRadius: '15px', border: 'none', background: tutorProfile === 'academic' ? '#007aff' : (isDarkMode ? '#2c2c2e' : '#e0e3e5'), color: tutorProfile === 'academic' ? '#fff' : (isDarkMode ? '#bbb' : '#555'), cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', transition: '0.2s' }}>
            🎓 Академик
          </button>
          <button onClick={() => setTutorProfile('ent')} style={{ padding: '8px 12px', borderRadius: '15px', border: 'none', background: tutorProfile === 'ent' ? '#ff3b30' : (isDarkMode ? '#2c2c2e' : '#e0e3e5'), color: tutorProfile === 'ent' ? '#fff' : (isDarkMode ? '#bbb' : '#555'), cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', transition: '0.2s' }}>
            🎯 ЕНТ-Тренер
          </button>
          <button onClick={() => setTutorProfile('focus')} style={{ padding: '8px 12px', borderRadius: '15px', border: 'none', background: tutorProfile === 'focus' ? '#34c759' : (isDarkMode ? '#2c2c2e' : '#e0e3e5'), color: tutorProfile === 'focus' ? '#fff' : (isDarkMode ? '#bbb' : '#555'), cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', transition: '0.2s' }}>
            ⚡ Фокус-Тьютор
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ padding: '8px 12px', borderRadius: '15px', border: 'none', background: isDarkMode ? '#333' : '#e0e3e5', color: isDarkMode ? '#fff' : '#555', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', transition: '0.2s' }} title="Сменить тему">
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button onClick={() => { if (window.confirm('Удалить всю историю переписки с Тьютором?')) { setChatHistory([]); } }} style={{ padding: '8px 12px', borderRadius: '15px', border: 'none', background: isDarkMode ? '#4a1c1c' : '#ffebee', color: '#d32f2f', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', transition: '0.2s' }} title="Очистить историю чата">
              🗑️
            </button>
          </div>
        </div>

        <div ref={chatContainerRef} style={{ flexGrow: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px', background: isDarkMode ? '#121212' : '#fff' }}>
          {chatHistory.length === 0 && (
            <div style={{ textAlign: 'center', color: isDarkMode ? '#777' : '#999', marginTop: '40px' }}>
              <h3>Наставник готов!</h3>
              <p>Напишите сообщение или нажмите на 🧮 для ввода формул.</p>
            </div>
          )}
          {chatHistory.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? '#007aff' : (isDarkMode ? '#2c2c2e' : '#f0f4f8'),
              color: msg.role === 'user' ? '#fff' : (isDarkMode ? '#e0e0e0' : '#333'),
              padding: '12px 18px', borderRadius: '18px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px',
              borderBottomLeftRadius: msg.role === 'model' ? '4px' : '18px',
              maxWidth: '85%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              fontSize: '1.1rem', lineHeight: '1.5', wordBreak: 'break-word', overflowWrap: 'break-word'
            }}>
              {msg.imageUrl && <img src={msg.imageUrl} alt="Upload" style={{ width: '100%', borderRadius: '10px', marginBottom: msg.content ? '10px' : '0' }} />}
              {msg.content && (
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      const rawCode = String(children).replace(/\n$/, '');
                      
                      if (!inline && match && (match[1] === 'graph' || match[1] === 'json')) {
                        try {
                          const chartData = JSON.parse(rawCode);
                          if (Array.isArray(chartData) && chartData.length > 0 && 'x' in chartData[0]) {
                            return (
                              <div style={{ width: '100%', height: '250px', background: isDarkMode ? '#1e1e1e' : '#fff', borderRadius: '8px', padding: '10px', marginTop: '10px', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)', border: '1px solid', borderColor: isDarkMode ? '#444' : '#e0e0e0' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#444' : '#e0e0e0'} />
                                    <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} tick={{fontSize: 12, fill: isDarkMode ? '#aaa' : '#999'}} stroke={isDarkMode ? '#666' : '#999'} />
                                    <YAxis dataKey="y" type="number" domain={['auto', 'auto']} tick={{fontSize: 12, fill: isDarkMode ? '#aaa' : '#999'}} stroke={isDarkMode ? '#666' : '#999'} />
                                    <Tooltip 
                                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000'}} 
                                      labelStyle={{fontWeight: 'bold', color: isDarkMode ? '#64d2ff' : '#333'}}
                                    />
                                    <Line type="monotone" dataKey="y" stroke={isDarkMode ? '#64d2ff' : '#007aff'} strokeWidth={3} dot={{r: 3, fill: isDarkMode ? '#64d2ff' : '#007aff', strokeWidth: 2, stroke: isDarkMode ? '#1e1e1e' : '#fff'}} activeDot={{r: 6}} animationDuration={1000} />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            );
                          }
                        } catch (e) {
                          console.log("Не удалось распарсить график:", e);
                        }
                      }
                      
                      return <code className={className} style={{background: isDarkMode ? '#1c1c1e' : '#2d2d2d', color: isDarkMode ? '#64d2ff' : '#e6e6e6', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', border: isDarkMode ? '1px solid #333' : 'none'}} {...props}>{children}</code>;
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="fade-in" style={{ alignSelf: 'flex-start', background: isDarkMode ? '#2c2c2e' : '#f0f4f8', padding: '12px 18px', borderRadius: '18px', color: isDarkMode ? '#bbb' : '#666', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span>⏳ Наставник печатает...</span>
              <button onClick={stopGeneration} style={{ background: '#ff3b30', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 2px 5px rgba(255,59,48,0.3)' }} title="Остановить генерацию">⏹️</button>
            </div>
          )}
        </div>

        {selectedImagePreview && (
          <div className="fade-in" style={{ padding: '5px 15px', display: 'flex', alignItems: 'center', gap: '10px', background: isDarkMode ? '#1e1e1e' : '#f8f9fa', borderTop: '1px solid', borderTopColor: isDarkMode ? '#333' : '#e0e0e0' }}>
            <div style={{ position: 'relative' }}>
              <img src={selectedImagePreview} alt="preview" style={{ height: '50px', borderRadius: '6px', border: '2px solid #007aff' }} />
              <button onClick={() => {setSelectedImagePreview(null); setImageBase64(null);}} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff3b30', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <span style={{fontSize: '0.85rem', color: isDarkMode ? '#bbb' : '#666', flexGrow: 1}}>Фото готово к отправке. Напиши текст и жми ➤</span>
          </div>
        )}

        {/* НИЖНЯЯ ПАНЕЛЬ ВВОДА */}
        <div style={{ display: 'flex', padding: '10px', background: isDarkMode ? '#1e1e1e' : '#fff', borderTop: '1px solid', borderTopColor: isDarkMode ? '#333' : '#e0e0e0', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => {setShowCalculator(!showCalculator); setShowCompiler(false);}} style={{ background: showCalculator ? '#007aff' : (isDarkMode ? '#2c2c2e' : '#f0f4f8'), color: showCalculator ? '#fff' : (isDarkMode ? '#64d2ff' : '#007aff'), border: 'none', borderRadius: '50%', minWidth: '38px', height: '38px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }}>🧮</button>
          
          <button onClick={() => {setShowCompiler(!showCompiler); setShowCalculator(false);}} style={{ background: showCompiler ? '#34c759' : (isDarkMode ? '#2c2c2e' : '#f0f4f8'), color: showCompiler ? '#fff' : (isDarkMode ? '#34c759' : '#34c759'), border: 'none', borderRadius: '50%', minWidth: '38px', height: '38px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }}>🐍</button>

          <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageChange} />
          <button onClick={() => fileInputRef.current.click()} style={{ background: isDarkMode ? '#2c2c2e' : '#f0f4f8', color: isDarkMode ? '#64d2ff' : '#007aff', border: 'none', borderRadius: '50%', minWidth: '38px', height: '38px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📷</button>
          
          <input type="text" value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder={(showCalculator || showCompiler) ? "Ввод формулы/кода..." : isListening ? "Говорите..." : "Сообщение..."} disabled={showCalculator || showCompiler} style={{ flexGrow: 1, padding: '10px 12px', borderRadius: '20px', border: '1px solid', borderColor: isDarkMode ? '#444' : '#ccc', fontSize: '0.95rem', outline: 'none', background: (showCalculator || showCompiler) ? (isDarkMode ? '#1c1c1e' : '#f0f4f8') : (isDarkMode ? '#2c2c2e' : '#fff'), color: isDarkMode ? '#fff' : '#000', minWidth: '0' }} onKeyDown={(e) => { if (e.key === 'Enter') sendToServer(chatText, false); }} />

          <button onClick={startListening} disabled={showCalculator || showCompiler} style={{ background: isListening ? '#ff3b30' : (isDarkMode ? '#2c2c2e' : '#f0f4f8'), color: isListening ? '#fff' : (isDarkMode ? '#64d2ff' : '#007aff'), border: 'none', borderRadius: '50%', minWidth: '38px', height: '38px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (showCalculator || showCompiler) ? 'default' : 'pointer', transition: '0.2s', opacity: (showCalculator || showCompiler) ? 0.5 : 1 }}>{isListening ? '🛑' : '🎤'}</button>
          <button onClick={() => sendToServer(chatText, false)} disabled={(showCalculator || showCompiler) || (!chatText.trim() && !imageBase64)} style={{ background: ((showCalculator || showCompiler) || (!chatText.trim() && !imageBase64)) ? (isDarkMode ? '#444' : '#ccc') : '#007aff', color: '#fff', border: 'none', borderRadius: '50%', minWidth: '38px', height: '38px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: ((showCalculator || showCompiler) || (!chatText.trim() && !imageBase64)) ? 'default' : 'pointer', transition: '0.2s' }}>➤</button>
        </div>

        {/* КЛАВИАТУРА */}
        {showCalculator && (
          <div className="pro-keyboard-area fade-in" style={{ background: isDarkMode ? '#1c1c1e' : '#f0f4f8', paddingTop: '15px', borderTop: '1px solid', borderTopColor: isDarkMode ? '#333' : '#e0e0e0' }}>
            <div className="pro-display" style={{ margin: '0 10px 10px 10px', background: isDarkMode ? '#2c2c2e' : '#fff', borderColor: isDarkMode ? '#444' : '#e5e5ea' }}>
              <div className="pro-display-main" style={{ width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
                {input === '' ? <div className="pro-placeholder"><BlockMath math="\color{#007aff}{|}" /></div> : <div className="pro-latex-view" style={{color: isDarkMode ? '#fff' : '#000'}}><BlockMath math={input.slice(0, cursorPos) + '\\color{#007aff}{|}' + input.slice(cursorPos)} renderError={() => <BlockMath math={input} renderError={() => <span style={{color: '#b0b0b0'}}>...</span>} />} /></div>}
              </div>
            </div>
            <div style={{ padding: '0 10px' }}><button className="pro-submit-btn" style={{ margin: '0 0 10px 0', width: '100%' }} onClick={() => sendToServer(input, true)} disabled={isThinking || input === ''}>{isThinking ? '⏳ Отправляем...' : 'Отправить формулу'}</button></div>
            <div className="pro-toolbar" style={{ margin: '0 10px 10px 10px' }}>
              <button className="pro-btn pro-btn-secondary" style={{background: isDarkMode ? '#3a3a3c' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#555' : '#d1d1d6'}} onClick={() => setInput('')}>AC</button>
              <button className="pro-btn pro-btn-secondary" style={{background: isDarkMode ? '#3a3a3c' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#555' : '#d1d1d6'}} onClick={() => { if (cursorPos > 0) { setInput(input.slice(0, cursorPos - 1) + input.slice(cursorPos)); setCursorPos(cursorPos - 1); }}}>⌫</button>
              <button className="pro-btn pro-btn-secondary" style={{background: isDarkMode ? '#3a3a3c' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#555' : '#d1d1d6'}} onClick={() => setCursorPos(Math.max(0, cursorPos - 1))}>←</button>
              <button className="pro-btn pro-btn-secondary" style={{background: isDarkMode ? '#3a3a3c' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#555' : '#d1d1d6'}} onClick={() => setCursorPos(Math.min(input.length, cursorPos + 1))}>→</button>
            </div>
            <div className="pro-tabs" style={{ margin: '0 10px', background: isDarkMode ? '#2c2c2e' : '#eeeeef' }}>
              <button className={activeTab === 'basic' ? 'active' : ''} style={{color: isDarkMode ? (activeTab==='basic'?'#fff':'#aaa') : (activeTab==='basic'?'#000':'#8e8e93'), background: activeTab==='basic'?(isDarkMode?'#444':'#fff'):'transparent'}} onClick={() => setActiveTab('basic')}>123</button>
              <button className={activeTab === 'functions' ? 'active' : ''} style={{color: isDarkMode ? (activeTab==='functions'?'#fff':'#aaa') : (activeTab==='functions'?'#000':'#8e8e93'), background: activeTab==='functions'?(isDarkMode?'#444':'#fff'):'transparent'}} onClick={() => setActiveTab('functions')}>f(x)</button>
              <button className={activeTab === 'letters' ? 'active' : ''} style={{color: isDarkMode ? (activeTab==='letters'?'#fff':'#aaa') : (activeTab==='letters'?'#000':'#8e8e93'), background: activeTab==='letters'?(isDarkMode?'#444':'#fff'):'transparent'}} onClick={() => setActiveTab('letters')}>abc</button>
            </div>
            <div className="pro-keys-container" style={{ margin: '0 10px 10px 10px', background: isDarkMode ? '#1c1c1e' : '#f2f2f7' }}>
              {activeTab === 'basic' && <div className="pro-grid-basic">{['7','8','9','\\div','4','5','6','\\times','1','2','3','-','0','.','=','+'].map((key) => <button key={key} className="pro-key" style={{background: isDarkMode ? '#2c2c2e' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#444' : '#d1d1d6'}} onClick={() => insertAtCursor(key)}><InlineMath math={key} /></button>)}</div>}
              {activeTab === 'functions' && <div className="pro-grid-6x4">{['\\sin(','\\cos(','\\tan(','\\log(','\\ln(','\\sqrt{','\\pi','e','\\^2','\\^{','|','}','(','\\frac{}{}','\\int','\\lim_{x \\to }','\\sum','\\infty','!'].map((key) => <button key={key} className="pro-key" style={{background: isDarkMode ? '#2c2c2e' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#444' : '#d1d1d6'}} onClick={() => insertAtCursor(key)}><InlineMath math={key === '\\frac{}{}' ? '\\frac{a}{b}' : key === '\\^{' ? 'x^y' : key} /></button>)}</div>}
              {activeTab === 'letters' && <div className="pro-grid-6x4">{['x','y','z','a','b','c','d','k','n','m','p','q','r','s','t','u','v','w','\\alpha','\\beta','\\theta'].map((key) => <button key={key} className="pro-key" style={{background: isDarkMode ? '#2c2c2e' : '#fff', color: isDarkMode ? '#fff' : '#000', borderColor: isDarkMode ? '#444' : '#d1d1d6'}} onClick={() => insertAtCursor(key)}><InlineMath math={key} /></button>)}</div>}
            </div>
          </div>
        )}

        {showCompiler && (
          <div className="fade-in" style={{ background: '#1e1e1e', padding: '15px', borderTop: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#34c759' }}>🐍 Python Редактор</span>
              <button onClick={() => setShowCompiler(false)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>
            <textarea value={pythonCode} onChange={(e) => setPythonCode(e.target.value)} style={{ width: '100%', height: '120px', background: '#2d2d2d', color: '#e6e6e6', border: '1px solid #444', borderRadius: '8px', padding: '10px', fontFamily: 'monospace', fontSize: '0.95rem', outline: 'none', resize: 'none' }} spellCheck="false" />
            <button onClick={runPythonCode} disabled={isCompiling} style={{ background: '#34c759', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', cursor: isCompiling ? 'default' : 'pointer', opacity: isCompiling ? 0.7 : 1 }}>
              {isCompiling ? '⏳ Запуск...' : '▶ Запустить код'}
            </button>
            <div style={{ background: '#000', borderRadius: '8px', padding: '10px', minHeight: '60px', maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', color: (compilerOutput.includes('Error') || compilerOutput.includes('Traceback') || compilerOutput.includes('Exception')) ? '#ff3b30' : '#fff', whiteSpace: 'pre-wrap' }}>
              {compilerOutput || '>_ Консоль готова'}
            </div>
            {(compilerOutput.includes('Error') || compilerOutput.includes('Traceback') || compilerOutput.includes('Exception')) && (
              <button onClick={askTutorAboutError} style={{ background: '#ff3b30', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', marginTop: '5px' }}>
                <span>🆘 Спросить Тьютора об ошибке</span>
              </button>
            )}
          </div>
        )}

      </div>
    );
  };

  return (
    <div className={`app-shell ${isDarkMode ? 'dark-theme' : ''}`} style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: isDarkMode ? '#121212' : '#fff' }}>
      <div style={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}>
        {(screen === 'grades' || screen === 'topics' || screen === 'theory') && (
          <>
            {screen === 'grades' && renderGrades()}
            {screen === 'topics' && renderTopics()}
            {screen === 'theory' && renderTheory()}
          </>
        )}
        {screen === 'chat' && renderChat()}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: isDarkMode ? '#1e1e1e' : '#fff', borderTop: '1px solid', borderTopColor: isDarkMode ? '#333' : '#e0e0e0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', zIndex: 1000 }}>
        <button onClick={() => setScreen('grades')} style={{ background: 'none', border: 'none', color: (screen === 'grades' || screen === 'topics' || screen === 'theory') ? (isDarkMode ? '#64d2ff' : '#007aff') : (isDarkMode ? '#888' : '#999'), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '50%' }}>
          <span style={{fontSize: '1.5rem'}}>📚</span><span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>Теория</span>
        </button>
        <button onClick={() => setScreen('chat')} style={{ background: 'none', border: 'none', color: screen === 'chat' ? (isDarkMode ? '#64d2ff' : '#007aff') : (isDarkMode ? '#888' : '#999'), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '50%' }}>
          <span style={{fontSize: '1.5rem'}}>💬</span><span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>Тьютор</span>
        </button>
      </div>
    </div>
  );
} 

export default App;