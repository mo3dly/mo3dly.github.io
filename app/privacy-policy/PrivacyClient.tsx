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
                تاريخ السريان: 25 يونيو 2026
              </p>
              <p className="text-sm text-gray-600">
                آخر تعديل: 25 يونيو 2026
              </p>
            </div>
            <button
              onClick={printPage}
              className="px-4 py-2 rounded-lg border text-sm shadow-sm hover:bg-gray-100 transition-colors"
            >
              طباعة
            </button>
          </div>
        </header>

        <article dir="rtl" lang="ar" className="p-8 space-y-10 text-gray-800 leading-loose">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">ملخّص سريع</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>نمتثل لنظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية.</li>
              <li>لا نقوم بتخزين أي بيانات شخصية للمستخدمين على خوادمنا.</li>
              <li>
                قد يتم تخزين بعض البيانات محليًا في متصفحك فقط، مثل الإعدادات أو
                النتائج المؤقتة.
              </li>
              <li>
                نستخدم خدمات طرف ثالث مثل Google Analytics و Google AdSense التي قد تجمع بيانات غير شخصية.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              1. المعلومات التي نقوم بجمعها
            </h2>
            <p>
              بصفتنا جهة التحكم، نؤكد أن موقع معدّلي لا يقوم بجمع أو تخزين أو معالجة أي معلومات تعريف شخصية مباشرة (مثل الاسم، البريد الإلكتروني، رقم الهاتف، أو الهوية).
            </p>
            <p className="mt-2">
              قد يتم تخزين بيانات وظيفية غير حساسة محليًا على جهازك باستخدام تقنيات مثل
              (localStorage)، وذلك لتحسين تجربة الاستخدام فقط ولضمان عمل حاسبة المعدل بشكل صحيح.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              2. خدمات الطرف الثالث ونقل البيانات
            </h2>
            <p>
              يستخدم الموقع خدمات خارجية لتحليل الاستخدام وعرض الإعلانات. بناءً على طبيعة هذه الخدمات، قد يتم نقل ومعالجة بعض البيانات التقنية (مثل عنوان IP أو المعرفات الإعلانية) خارج المملكة العربية السعودية:
            </p>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li>
                <strong>Google Analytics:</strong> لتحليل عدد الزيارات، الصفحات المستخدمة، ونوع المتصفح لتحسين جودة الموقع.
              </li>
              <li>
                <strong>Google AdSense:</strong> لعرض الإعلانات. قد تستخدم Google ملفات تعريف الارتباط (Cookies) لتخصيص الإعلانات بناءً على زياراتك السابقة.
              </li>
            </ul>
            <p className="mt-2">
              تخضع هذه البيانات لسياسات الخصوصية الخاصة بشركة Google.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              3. الكوكيز والتخزين المحلي
            </h2>
            <p>
              نستخدم التخزين المحلي (Local Storage) لحفظ إعداداتك مؤقتاً. كما تُستخدم ملفات تعريف الارتباط (Cookies) من قِبل الأطراف الثالثة المذكورة أعلاه. الأساس النظامي لاستخدامنا لهذه التقنيات هو <strong>الموافقة</strong>؛ استمرارك في تصفح الموقع يُعد موافقة ضمنية على ذلك. يمكنك في أي وقت سحب هذه الموافقة عن طريق تعطيل أو حذف الكوكيز والتخزين المحلي من إعدادات متصفحك.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              4. مشاركة البيانات
            </h2>
            <p>
              لا نقوم ببيع أو مشاركة بيانات المستخدمين مع أي جهة خارجية. أي بيانات
              يتم جمعها من خلال خدمات Google تكون مقتصرة على الأغراض المذكورة أعلاه.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              5. حقوقك بموجب نظام حماية البيانات الشخصية (PDPL)
            </h2>
            <p>
              بموجب القانون السعودي، يحق لك كمستخدم التمتع بالحقوق التالية:
            </p>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li><strong>الحق في العلم:</strong> معرفة كيف ولماذا نستخدم بياناتك (كما هو موضح في هذه الوثيقة).</li>
              <li><strong>الحق في الإتلاف:</strong> نظراً لأننا لا نخزن بياناتك على خوادمنا، يمكنك ممارسة هذا الحق ببساطة عبر مسح بيانات التصفح (Clear Browsing Data) من جهازك.</li>
              <li><strong>الحق في سحب الموافقة:</strong> يمكنك إيقاف الإعلانات المخصصة عبر إعدادات إعلانات Google في متصفحك.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              6. أمان المعلومات
            </h2>
            <p>
              نحرص على اتخاذ الإجراءات التقنية المناسبة لحماية اتصالك بالموقع (عبر بروتوكول HTTPS). أما
              البيانات المخزنة محليًا في جهازك فهي تحت مسؤوليتك الشخصية ومرتبطة بأمان جهازك.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              7. خصوصية الأطفال
            </h2>
            <p>
              الموقع موجه لطلاب المدارس والجامعات. نحن لا نقوم بجمع أي معلومات شخصية
              بشكل متعمد من أي فئة عمرية، بما في ذلك الأطفال.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              8. التعديلات على سياسة الخصوصية
            </h2>
            <p>
              نحتفظ بحق تحديث هذه السياسة لتتوافق مع أي تغييرات في المتطلبات النظامية أو التقنية. سيتم تحديث تاريخ "آخر تعديل" أعلى الصفحة عند إجراء أي تغيير.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              9. معلومات التواصل
            </h2>
            <p>
              في حال وجود أي استفسار بخصوص سياسة الخصوصية أو ممارسة حقوقك، يمكنك التواصل معنا عبر
              البريد الإلكتروني:
            </p>
            <p className="mt-2">
              <a
                href="mailto:i9fayez@proton.me"
                className="text-sky-600 hover:text-sky-700 hover:underline font-medium"
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
