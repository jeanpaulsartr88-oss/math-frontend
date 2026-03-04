import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import './App.css';

const tg = window.Telegram ? window.Telegram.WebApp : null;

// ============================================================================
// ЧАСТЬ 1: ФУНДАМЕНТАЛЬНАЯ АКАДЕМИЧЕСКАЯ БАЗА "MATH STUDIO" (5-11 КЛАССЫ)
// Разработано для интерактивного обучения и подготовки к экзаменам.
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
        <BlockMath math="\\sin 30^\\circ = \\frac{1}{2}; \\quad \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}; \\quad \\tan 45^\\circ = 1" />
      `
    }
  },
  "10": {
    name: "10 КЛАСС: МАТАНАЛИЗ И СТЕРЕОМЕТРИЯ",
    topics: {
      "Тригонометрические уравнения и круг": `
        <p>В 10 классе тригонометрия выходит за пределы треугольника на <b>тригонометрическую окружность</b> радиуса R=1.</p>
        <p>Косинус — это ось абсцисс (OX), Синус — ось ординат (OY). Углы измеряются в радианах (<InlineMath math="\\pi = 180^\\circ" />).</p>
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

// КОНЕЦ ЧАСТИ 1. Дальше пойдет логика React.
// ============================================================================
// ============================================================================
// ============================================================================
// ============================================================================
// ЧАСТЬ 2: ПРОФЕССИОНАЛЬНЫЙ ИНТЕРФЕЙС УРОВНЯ ВЫСШЕЙ МАТЕМАТИКИ
// ============================================================================

function App() {
  const [input, setInput] = useState('');
  const [cursorPos, setCursorPos] = useState(0); // <--- Добавляем память для курсора
  const [screen, setScreen] = useState('grades'); 
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Состояние для 4-х вкладок клавиатуры: 'basic', 'func', 'trig', 'calc'
  const [activeTab, setActiveTab] = useState('basic');
  const [aiResponse, setAiResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#ffffff'); // Белая шапка как на фото
      tg.setBackgroundColor('#ffffff');
    }
  }, []);

 const insertAtCursor = (key) => {
    if (key === 'C') {
      setInput('');
      setCursorPos(0);
    } else if (key === '⌫') {
      // Удаляем символ перед курсором
      if (cursorPos > 0) {
        setInput(prev => prev.slice(0, cursorPos - 1) + prev.slice(cursorPos));
        setCursorPos(prev => prev - 1);
      }
    } else if (key === '←') {
      // Двигаем курсор влево
      if (cursorPos > 0) setCursorPos(prev => prev - 1);
    } else if (key === '→') {
      // Двигаем курсор вправо
      if (cursorPos < input.length) setCursorPos(prev => prev + 1);
    } else {
      // Вставляем новый символ ровно в позицию курсора
      setInput(prev => prev.slice(0, cursorPos) + key + prev.slice(cursorPos));
      setCursorPos(prev => prev + key.length);
    }
  };

 const sendToServer = async () => {
    if (!input) {
      alert("Сначала введите задачу!");
      return;
    }
    
    setIsThinking(true);
    setAiResponse(null); // Очищаем прошлый ответ

    try {
      // Идеально чистый запрос! React сам перекинет его на порт 5000 (Flask)
      const response = await fetch('https://math-api-studio.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setAiResponse(data.answer);
      } else {
        setAiResponse("Ошибка: " + data.answer);
      }
    } catch (e) {
      setAiResponse("Ошибка связи с сервером Math Studio.");
    } finally {
      setIsThinking(false);
    }
  };// --- РЕНДЕР 1: ВЫБОР КЛАССА ---
  const renderGrades = () => (
    <div className="fade-in" style={{padding: '20px'}}>
      <h2 style={{color: '#333'}}>База знаний Math Studio</h2>
      <p style={{color: '#666', marginBottom: '20px'}}>Выберите класс для изучения теории</p>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
        {Object.keys(COURSE_CONTENT).map(g => (
          <button key={g} 
                  style={{padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0', background: '#fff', fontSize: '1.2rem', fontWeight: 'bold', color: '#007aff', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'}} 
                  onClick={() => { setSelectedGrade(g); setScreen('topics'); }}>
            {g} класс
          </button>
        ))}
      </div>
      
      <button className="pro-submit-btn" style={{width: '100%', marginTop: '30px', marginLeft: '0'}} onClick={() => setScreen('calculator')}>
        🧮 Открыть смарт-калькулятор
      </button>
    </div>
  );

  // --- РЕНДЕР 2: ВЫБОР ТЕМЫ ---
  const renderTopics = () => (
    <div className="fade-in" style={{padding: '20px'}}>
      <button onClick={() => setScreen('grades')} style={{marginBottom: '20px', padding: '10px 15px', background: '#e0e3e5', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>← К классам</button>
      <h3 style={{color: '#333', marginBottom: '15px'}}>{COURSE_CONTENT[selectedGrade].name}</h3>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {Object.keys(COURSE_CONTENT[selectedGrade].topics).map(t => (
          <button key={t} 
                  style={{padding: '15px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#fff', textAlign: 'left', fontSize: '1.1rem', color: '#333', cursor: 'pointer'}} 
                  onClick={() => { setSelectedTopic(t); setScreen('theory'); }}>
            📚 {t}
          </button>
        ))}
      </div>
    </div>
  );

  // --- РЕНДЕР 3: ЧТЕНИЕ ТЕОРИИ ---
  const renderTheory = () => (
    <div className="fade-in" style={{padding: '20px', height: '100vh', overflowY: 'auto'}}>
      <button onClick={() => setScreen('topics')} style={{marginBottom: '20px', padding: '10px 15px', background: '#e0e3e5', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>← К темам</button>
      
      <div style={{background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0', marginBottom: '20px', color: '#333', lineHeight: '1.6', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
        <h3 style={{color: '#007aff', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginBottom: '15px'}}>{selectedTopic}</h3>
        <div className="theory-text" dangerouslySetInnerHTML={{ __html: COURSE_CONTENT[selectedGrade].topics[selectedTopic] }} />
      </div>
      
      <button className="pro-submit-btn" style={{width: '100%', marginLeft: '0', marginBottom: '40px'}} onClick={() => setScreen('calculator')}>
        Перейти к решению задачи →
      </button>
    </div>
  );

  // ... (Ваши renderGrades, renderTopics, renderTheory остаются здесь) ...

 const renderCalculator = () => {
    return (
      <div className="pro-calc-container">
        {/* Индикатор загрузки или ответ */}
        {aiResponse ? (
          <div className="pro-ai-answer-card fade-in">
            <div className="pro-ai-header">
              <span>💡 Решение Math Studio</span>
              <button className="pro-ai-close" onClick={() => setAiResponse(null)}>✕</button>
            </div>
            <div className="pro-ai-content" dangerouslySetInnerHTML={{ __html: aiResponse }} />
          </div>
        ) : (
          <div className="pro-keyboard-area fade-in">
            {/* Поле ввода */}
            <div className="pro-display">
              <div className="pro-display-main" style={{ width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
                {input === '' ? (
                  <div className="pro-placeholder">
                    <BlockMath math="\color{#007aff}{|}" />
                  </div>
                ) : (
                  <div className="pro-latex-view">
                    <BlockMath 
                      math={input.slice(0, cursorPos) + '\\color{#007aff}{|}' + input.slice(cursorPos)} 
                      renderError={() => (
                        <BlockMath 
                          math={input} 
                          renderError={() => <span style={{color: '#b0b0b0'}}>...</span>} 
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Кнопка отправки */}
            <button className="pro-submit-btn" onClick={sendToServer} disabled={isThinking}>
              {isThinking ? '⏳ Анализируем...' : 'Отправить задачу ИИ-тьютору'}
            </button>

            <div className="pro-toolbar">
              <button className="pro-btn pro-btn-secondary" onClick={() => setInput('')}>AC</button>
              <button className="pro-btn pro-btn-secondary" onClick={() => {
                if (cursorPos > 0) {
                  setInput(input.slice(0, cursorPos - 1) + input.slice(cursorPos));
                  setCursorPos(cursorPos - 1);
                }
              }}>⌫</button>
              <button className="pro-btn pro-btn-secondary" onClick={() => setCursorPos(Math.max(0, cursorPos - 1))}>←</button>
              <button className="pro-btn pro-btn-secondary" onClick={() => setCursorPos(Math.min(input.length, cursorPos + 1))}>→</button>
            </div>

            <div className="pro-tabs">
              <button className={activeTab === 'basic' ? 'active' : ''} onClick={() => setActiveTab('basic')}>123</button>
              <button className={activeTab === 'functions' ? 'active' : ''} onClick={() => setActiveTab('functions')}>f(x)</button>
              <button className={activeTab === 'letters' ? 'active' : ''} onClick={() => setActiveTab('letters')}>abc</button>
            </div>

            <div className="pro-keys-container">
              {activeTab === 'basic' && (
                <div className="pro-grid-basic">
                  {['7','8','9','\\div','4','5','6','\\times','1','2','3','-','0','.','=','+'].map((key) => (
                    <button key={key} className="pro-key" onClick={() => insertAtCursor(key)}>
                      <InlineMath math={key} />
                    </button>
                  ))}
                </div>
              )}
              {activeTab === 'functions' && (
                <div className="pro-grid-6x4">
                  {['\\sin(','\\cos(','\\tan(','\\log(','\\ln(','\\sqrt{','\\pi','e','\\^2','\\^{','|','}','(',')','\\frac{}{}','\\int','\\lim_{x \\to }','\\sum','\\infty','!'].map((key) => (
                    <button key={key} className="pro-key" onClick={() => insertAtCursor(key)}>
                      <InlineMath math={key === '\\frac{}{}' ? '\\frac{a}{b}' : key} />
                    </button>
                  ))}
                </div>
              )}
              {activeTab === 'letters' && (
                <div className="pro-grid-6x4">
                  {['x','y','z','a','b','c','d','k','n','m','p','q','r','s','t','u','v','w','\\alpha','\\beta','\\theta'].map((key) => (
                    <button key={key} className="pro-key" onClick={() => insertAtCursor(key)}>
                      <InlineMath math={key} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}; // <--- УБЕДИТЕСЬ, что здесь только ОДНА такая закрывающая пара скобок.

// После этой скобки НЕ ДОЛЖНО быть других '}', пока не пройдет финальный return!

return (
  <div className="app-shell">
    {/* Если экран 'grades' — рисуем меню классов. И так далее: */}
    {screen === 'grades' && renderGrades()}
    {screen === 'topics' && renderTopics()}
    {screen === 'theory' && renderTheory()}
    {screen === 'calculator' && renderCalculator()}
  </div>
);
} // <--- А эта скобка — самая последняя в файле, она закрывает функцию App

export default App;