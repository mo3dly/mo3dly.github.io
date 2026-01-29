"use client";

export default function PrivacyPage() {
  const printPage = () => window.print();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <header className="p-6 border-b bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                سياسة الخصوصية — موقع معدّلي
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                تاريخ السريان: 29 يناير 2026
              </p>
              <p className="text-sm text-gray-600">
                آخر تعديل: 29 يناير 2026
              </p>
            </div>
            <button
              onClick={printPage}
              className="px-4 py-2 rounded-lg border text-sm shadow-sm hover:bg-gray-100"
            >
              طباعة
            </button>
          </div>
        </header>

        <article dir="rtl" lang="ar" className="p-8 space-y-10 text-gray-800 leading-loose">
          <section>
            <h2 className="text-xl font-semibold mb-3">ملخّص سريع</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>لا نقوم بتخزين أي بيانات شخصية للمستخدمين على خوادمنا.</li>
              <li>
                قد يتم تخزين بعض البيانات محليًا في متصفحك فقط، مثل الإعدادات أو
                النتائج المؤقتة.
              </li>
              <li>
                نستخدم خدمات طرف ثالث مثل Google Analytics و Google AdSense.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. المعلومات التي نقوم بجمعها
            </h2>
            <p>
              لا يقوم موقع معدّلي بجمع أو تخزين أي معلومات تعريف شخصية مثل الاسم،
              البريد الإلكتروني، رقم الهاتف، أو العنوان.
            </p>
            <p>
              قد يتم تخزين بيانات غير حساسة محليًا على جهازك باستخدام تقنيات مثل
              localStorage أو الكوكيز، وذلك لتحسين تجربة الاستخدام فقط.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. خدمات الطرف الثالث
            </h2>
            <p>
              يستخدم الموقع خدمات خارجية لتحليل الاستخدام وعرض الإعلانات، ومنها:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>
                <strong>Google Analytics:</strong> لتحليل عدد الزيارات، الصفحات
                المستخدمة، ونوع المتصفح.
              </li>
              <li>
                <strong>Google AdSense:</strong> لعرض الإعلانات، وقد تستخدم Google
                الكوكيز لتخصيص الإعلانات وقياس أدائها.
              </li>
            </ul>
            <p>
              تخضع البيانات التي تجمعها هذه الخدمات لسياسات الخصوصية الخاصة بها.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. الكوكيز والتخزين المحلي
            </h2>
            <p>
              قد يستخدم الموقع الكوكيز أو التخزين المحلي لحفظ إعدادات المستخدم أو
              تحسين سرعة الأداء. يمكنك تعطيل أو حذف هذه البيانات في أي وقت من
              إعدادات المتصفح.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. كيفية استخدام البيانات
            </h2>
            <p>
              تُستخدم البيانات غير الشخصية فقط من أجل تحسين تجربة المستخدم، تحليل
              الأداء، وعرض الإعلانات، ولا يتم استخدامها للتعرف على هوية المستخدم.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. مشاركة البيانات
            </h2>
            <p>
              لا نقوم ببيع أو مشاركة بيانات المستخدمين مع أي جهة خارجية. أي بيانات
              يتم جمعها من خلال خدمات Google تكون خاضعة لسياسات Google الخاصة.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. أمان المعلومات
            </h2>
            <p>
              نحرص على اتخاذ الإجراءات التقنية المناسبة لحماية الموقع. أما
              البيانات المخزنة محليًا في جهازك فهي تحت مسؤوليتك الشخصية.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. خصوصية الأطفال
            </h2>
            <p>
              الموقع غير موجه خصيصًا للأطفال، ولا نقوم بجمع أي معلومات شخصية
              تخصهم بشكل متعمد.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. روابط خارجية
            </h2>
            <p>
              قد يحتوي الموقع على روابط لمواقع خارجية، ولسنا مسؤولين عن سياسات
              الخصوصية الخاصة بها.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. التعديلات على سياسة الخصوصية
            </h2>
            <p>
              نحتفظ بحق تحديث هذه السياسة في أي وقت. سيتم تحديث تاريخ آخر تعديل
              أعلى الصفحة عند إجراء أي تغيير.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              10. معلومات التواصل
            </h2>
            <p>
              في حال وجود أي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا عبر
              البريد الإلكتروني:
            </p>
            <p className="mt-2">
              <a
                href="mailto:i9fayez@proton.me"
                className="text-sky-600 hover:underline"
              >
                i9fayez@proton.me
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}