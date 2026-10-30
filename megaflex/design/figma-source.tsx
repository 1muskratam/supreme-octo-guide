const assetPathPrefix = "https://www.figma.com/api/mcp/asset/26101ea3-9146-4206-b97f-b6a8e2bf2b6e";
const imgIconArrow = `${assetPathPrefix}/2aef2.svg`;
const imgIconArrow1 = `${assetPathPrefix}/f09d7.svg`;
const imgIconCheck = `${assetPathPrefix}/beedd.svg`;
const imgIconBolt = `${assetPathPrefix}/7ee39.svg`;
const imgIconLink = `${assetPathPrefix}/cbd71.svg`;
const imgIconUsers = `${assetPathPrefix}/9d038.svg`;
const imgIconShield = `${assetPathPrefix}/39ab3.svg`;
const imgIconGear = `${assetPathPrefix}/2c6e0.svg`;
const imgIconDiamond = `${assetPathPrefix}/0f2c3.svg`;
const imgImage = `${assetPathPrefix}/faa56.png`;
const imgIconArrow2 = `${assetPathPrefix}/fc866.svg`;
const imgLogoArtwork = `${assetPathPrefix}/e5ebb.png`;
const imgMegaflexLabelRoll = `${assetPathPrefix}/50f02.png`;
const imgImage1 = `${assetPathPrefix}/74640.png`;
const imgImage2 = `${assetPathPrefix}/f07f8.png`;
const imgImage3 = `${assetPathPrefix}/1209a.png`;
const imgImage4 = `${assetPathPrefix}/27b25.png`;
const imgImage5 = `${assetPathPrefix}/ad95c.png`;
const imgImage6 = `${assetPathPrefix}/32a33.png`;
const imgImage7 = `${assetPathPrefix}/36363.png`;
const imgMegaflexProductionComplexReference = `${assetPathPrefix}/71684.png`;
const imgImage8 = `${assetPathPrefix}/a5a6a.png`;
const imgImage9 = `${assetPathPrefix}/a5509.png`;
const imgImage10 = `${assetPathPrefix}/627d3.png`;
const imgImage11 = `${assetPathPrefix}/d9535.png`;
const imgLogoArtwork1 = `${assetPathPrefix}/d10d5.png`;
const imgIconPhone = `${assetPathPrefix}/715f5.svg`;
const imgIconDiamond1 = `${assetPathPrefix}/308e6.svg`;
const imgIconGear1 = `${assetPathPrefix}/3b271.svg`;
const imgIconShield1 = `${assetPathPrefix}/c91de.svg`;
const imgIconUsers1 = `${assetPathPrefix}/8b918.svg`;
const imgIconArrow3 = `${assetPathPrefix}/ca1e8.svg`;
const imgIconCalendar = `${assetPathPrefix}/d80a9.svg`;
const imgIconUsers2 = `${assetPathPrefix}/7379c.svg`;
const imgIconChart = `${assetPathPrefix}/c0f64.svg`;
const imgIconTarget = `${assetPathPrefix}/51346.svg`;
const imgIconPhone1 = `${assetPathPrefix}/fbeb4.svg`;
const imgIconMail = `${assetPathPrefix}/0fe95.svg`;
const imgIconPin = `${assetPathPrefix}/1bba5.svg`;
const imgIconArrow4 = `${assetPathPrefix}/9c548.svg`;
const imgIconInstagram = `${assetPathPrefix}/96be3.svg`;
const imgIconTelegram = `${assetPathPrefix}/b497c.svg`;

type ButtonProps = {
  className?: string;
  label?: string;
  state?: "Default";
  type?: "Primary" | "Secondary";
};

function Button({ className, label = "Оставить заявку", state = "Default", type = "Primary" }: ButtonProps) {
  const isPrimaryAndDefault = type === "Primary" && state === "Default";
  const isSecondaryAndDefault = type === "Secondary" && state === "Default";
  return (
    <div className={className || `content-stretch flex gap-[var(--space-12,12px)] items-center justify-center px-[24px] py-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] ${isSecondaryAndDefault ? "bg-[var(--color-white,white)] border border-[var(--color-primary,#0b2475)] border-solid" : "bg-[var(--color-primary,#0b2475)]"}`} id={isSecondaryAndDefault ? "node-3_14" : "node-3_6"}>
      {isPrimaryAndDefault && (
        <>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-white,white)] whitespace-nowrap" data-node-id="3:7">
            {label}
          </p>
          <div className="relative shrink-0 size-[20px]" data-node-id="3:8" data-name="Icon / arrow">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow} />
          </div>
        </>
      )}
      {isSecondaryAndDefault && (
        <>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-primary,#0b2475)] whitespace-nowrap" data-node-id="3:15">
            {label}
          </p>
          <div className="relative shrink-0 size-[20px]" data-node-id="3:16" data-name="Icon / arrow">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow1} />
          </div>
        </>
      )}
    </div>
  );
}

type CheckboxProps = {
  className?: string;
  label?: string;
};

function Checkbox({ className, label = "Я согласен с политикой обработки персональных данных" }: CheckboxProps) {
  return (
    <div className={className || "content-stretch flex gap-[var(--space-12,12px)] items-start relative"} data-node-id="3:67" data-name="Checkbox">
      <div className="bg-[var(--color-digital,#1d27ff)] content-stretch flex items-start overflow-clip relative rounded-[4px] shrink-0 size-[18px]" data-node-id="3:68" data-name="Checked">
        <div className="relative shrink-0 size-[18px]" data-node-id="3:69" data-name="Icon / check">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--color-body,#596579)] w-[530px]" data-node-id="3:71">
        {label}
      </p>
    </div>
  );
}

type FormFieldProps = {
  className?: string;
  label?: string;
  placeholder?: string;
  type?: "Text" | "Textarea";
};

function FormField({ className, label = "Ваше имя", placeholder = "Как к вам обращаться?", type = "Text" }: FormFieldProps) {
  const isTextarea = type === "Textarea";
  return (
    <div className={className || "content-stretch flex flex-col gap-[var(--space-8,8px)] items-start relative w-[564px]"} id={isTextarea ? "node-3_58" : "node-3_54"}>
      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--color-primary,#0b2475)] w-full" data-node-id="3:55">
        {label}
      </p>
      <div className={`bg-[var(--color-subtle,#f5f7fb)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-8,8px)] items-start overflow-clip p-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] shrink-0 w-full ${isTextarea ? "h-[120px]" : ""}`} id={isTextarea ? "node-3_60" : "node-3_56"} data-name="Input">
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-secondary,#868686)] w-full" data-node-id="3:57">
          {placeholder}
        </p>
      </div>
    </div>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[40px]"} data-node-id="4:21" data-name="Icon / bolt">
      <div className="relative shrink-0 size-[40px]" data-node-id="4:22" data-name="Icon / bolt">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBolt} />
      </div>
    </div>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[40px]"} data-node-id="4:18" data-name="Icon / link">
      <div className="relative shrink-0 size-[40px]" data-node-id="4:19" data-name="Icon / link">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconLink} />
      </div>
    </div>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[40px]"} data-node-id="4:14" data-name="Icon / users">
      <div className="relative shrink-0 size-[40px]" data-node-id="4:15" data-name="Icon / users">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconUsers} />
      </div>
    </div>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[40px]"} data-node-id="4:10" data-name="Icon / shield">
      <div className="relative shrink-0 size-[40px]" data-node-id="4:11" data-name="Icon / shield">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
      </div>
    </div>
  );
}

function IconGear({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[40px]"} data-node-id="4:6" data-name="Icon / gear">
      <div className="relative shrink-0 size-[40px]" data-node-id="4:7" data-name="Icon / gear">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGear} />
      </div>
    </div>
  );
}

function IconDiamond({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative w-[40px]"} data-node-id="4:3" data-name="Icon / diamond">
      <div className="relative shrink-0 size-[40px]" data-node-id="4:4" data-name="Icon / diamond">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDiamond} />
      </div>
    </div>
  );
}

type ProductCardProps = {
  className?: string;
  title?: string;
};

function ProductCard({ className, title = "Самоклеящиеся этикетки на плёнке" }: ProductCardProps) {
  return (
    <div className={className || "bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] w-[302px]"} data-node-id="3:32" data-name="ProductCard">
      <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="3:33" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="3:34" data-name="Content">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="3:35">
          {title}
        </p>
        <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="3:36" data-name="Arrow">
          <div className="relative shrink-0 size-[18px]" data-node-id="3:37" data-name="Icon / arrow">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MegaflexHomepageDesktop1440() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-node-id="2:53" data-name="MEGAFLEX / Homepage / Desktop 1440">
      <div className="bg-[var(--color-white,white)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip px-[var(--space-80,80px)] py-[var(--space-24,24px)] relative shrink-0 w-[1440px]" data-node-id="2:54" data-name="Header">
        <div className="content-stretch flex gap-[var(--space-32,32px)] items-center justify-between overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:27" data-name="Navigation">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[264px]" data-node-id="4:28" data-name="Brand">
            <div className="h-[51px] mix-blend-multiply relative shrink-0 w-[264px]" data-node-id="I4:28;3:64" data-name="Logo artwork">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoArtwork} />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[var(--space-32,32px)] items-center leading-[20px] not-italic overflow-clip relative shrink-0 text-[14px] text-[color:var(--color-primary,#0b2475)] whitespace-nowrap" data-node-id="4:30" data-name="Menu">
            <p className="relative shrink-0" data-node-id="4:31">
              О компании
            </p>
            <p className="relative shrink-0" data-node-id="4:32">
              Продукция
            </p>
            <p className="relative shrink-0" data-node-id="4:33">
              Технологии
            </p>
            <p className="relative shrink-0" data-node-id="4:34">
              Контакты
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--space-16,16px)] items-center overflow-clip relative shrink-0" data-node-id="4:35" data-name="Actions">
            <div className="border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[48px]" data-node-id="4:36" data-name="Phone">
              <div className="relative shrink-0 size-[22px]" data-node-id="4:37" data-name="Icon / phone">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPhone} />
              </div>
            </div>
            <Button className="bg-[var(--color-primary,#0b2475)] content-stretch flex gap-[var(--space-12,12px)] items-center justify-center px-[24px] py-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] shrink-0" />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r content-stretch flex flex-col from-[#f5f7fc] gap-[var(--space-32,32px)] items-start overflow-clip px-[var(--space-80,80px)] py-[var(--space-64,64px)] relative shrink-0 to-white w-[1440px]" data-node-id="2:55" data-name="Hero">
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-center overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:43" data-name="Hero content">
          <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[628px]" data-node-id="4:44" data-name="Copy">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[12px] text-[color:var(--color-digital,#1d27ff)] tracking-[0.96px] w-[628px]" data-node-id="4:45">
              СОВРЕМЕННЫЕ ТЕХНОЛОГИИ ПЕЧАТИ
            </p>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[56px] text-[color:var(--color-primary,#0b2475)] tracking-[-1.68px] w-[628px]" data-node-id="4:46">
              <span className="leading-[60px]">{`Рулонная флексопечать и `}</span>
              <span className="leading-[60px] text-[#1d27ff]">самоклеящиеся этикетки</span>
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[28px] not-italic relative shrink-0 text-[18px] text-[color:var(--color-body,#596579)] w-[580px]" data-node-id="4:47">
              Качественная печать, современные технологии и надёжный сервис для вашего бизнеса. Производим этикеточную продукцию, которая работает на ваш бренд.
            </p>
            <div className="content-stretch flex gap-[var(--space-16,16px)] items-start overflow-clip relative shrink-0 w-[628px]" data-node-id="4:48" data-name="Actions">
              <Button className="bg-[var(--color-primary,#0b2475)] content-stretch flex gap-[var(--space-12,12px)] items-center justify-center px-[24px] py-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] shrink-0" label="Смотреть продукцию" />
              <Button className="bg-[var(--color-white,white)] border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex gap-[var(--space-12,12px)] items-center justify-center px-[24px] py-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] shrink-0" label="Связаться" type="Secondary" />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-24,24px)] shrink-0 w-[628px]" data-node-id="4:57" data-name="Production visual">
            <div className="h-[540px] relative shrink-0 w-[628px]" data-node-id="4:58" data-name="MEGAFLEX label roll">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMegaflexLabelRoll} />
            </div>
            <div className="absolute bg-[var(--color-primary,#0b2475)] content-stretch flex flex-col gap-[var(--space-16,16px)] items-start left-[306px] overflow-clip p-[var(--space-28,28px)] rounded-tl-[24px] top-[348px] w-[322px]" data-node-id="4:59" data-name="Brand statement">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-white,white)] w-[266px]" data-node-id="4:60">
                Этикетки, которые подчеркивают ваш бренд
              </p>
              <div className="bg-[var(--color-white,white)] h-[2px] relative shrink-0 w-[44px]" data-node-id="4:61" data-name="Rectangle" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:62" data-name="Key benefits">
          <div className="content-stretch flex gap-[var(--space-16,16px)] items-center overflow-clip relative shrink-0 w-[302px]" data-node-id="4:63" data-name="Высокое качество">
            <div className="relative shrink-0 size-[32px]" data-node-id="4:64" data-name="Icon / diamond">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDiamond1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-primary,#0b2475)] w-[230px]" data-node-id="4:66">
              Высокое качество
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--space-16,16px)] items-center overflow-clip relative shrink-0 w-[302px]" data-node-id="4:67" data-name="Современное производство">
            <div className="relative shrink-0 size-[32px]" data-node-id="4:68" data-name="Icon / gear">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGear1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-primary,#0b2475)] w-[230px]" data-node-id="4:71">
              Современное производство
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--space-16,16px)] items-center overflow-clip relative shrink-0 w-[302px]" data-node-id="4:72" data-name="Надёжность поставок">
            <div className="relative shrink-0 size-[32px]" data-node-id="4:73" data-name="Icon / shield">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-primary,#0b2475)] w-[230px]" data-node-id="4:76">
              Надёжность поставок
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--space-16,16px)] items-center overflow-clip relative shrink-0 w-[302px]" data-node-id="4:77" data-name="Индивидуальные решения">
            <div className="relative shrink-0 size-[32px]" data-node-id="4:78" data-name="Icon / users">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconUsers1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-primary,#0b2475)] w-[230px]" data-node-id="4:81">
              Индивидуальные решения
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-white,white)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip p-[var(--space-80,80px)] relative shrink-0 w-[1440px]" data-node-id="2:56" data-name="Products">
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-center overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:82" data-name="Section heading">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--space-12,12px)] items-start not-italic overflow-clip relative shrink-0 w-[628px]" data-node-id="4:83" data-name="Title group">
            <p className="font-['Inter:Medium'] font-medium leading-[18px] relative shrink-0 text-[12px] text-[color:var(--color-digital,#1d27ff)] tracking-[0.96px] whitespace-nowrap" data-node-id="4:84">
              ПРОДУКЦИЯ
            </p>
            <p className="font-['Inter:Bold'] font-bold leading-[46px] relative shrink-0 text-[40px] text-[color:var(--color-primary,#0b2475)] tracking-[-0.8px] w-[628px]" data-node-id="4:85">
              Широкий ассортимент этикеточной продукции
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[410px]" data-node-id="4:86">
            Производим самоклеящиеся этикетки для разных отраслей. Подбираем материалы и технологии под задачи вашего бренда.
          </p>
          <div className="content-stretch flex gap-[var(--space-12,12px)] items-center overflow-clip relative shrink-0" data-node-id="4:87" data-name="Link">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-digital,#1d27ff)] whitespace-nowrap" data-node-id="4:88">
              Весь каталог
            </p>
            <div className="relative shrink-0 size-[20px]" data-node-id="4:89" data-name="Icon / arrow">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow3} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:91" data-name="Product grid">
          <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:92" data-name="Row 1">
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:93" data-name="Product / 1">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:93;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:93;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:93;3:35">
                  Двухслойные самоклеящиеся этикетки
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:93;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:93;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:100" data-name="Product / 2">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:100;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:100;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:100;3:35">
                  Самоклеящиеся этикетки на бумаге
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:100;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:100;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
            <ProductCard className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" />
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:114" data-name="Product / 4">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:114;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:114;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:114;3:35">
                  Самоклеящиеся этикетки на металлизированной основе
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:114;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:114;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:121" data-name="Row 2">
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:122" data-name="Product / 5">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:122;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:122;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:122;3:35">
                  Этикетки-пломбы
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:122;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:122;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:129" data-name="Product / 6">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:129;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:129;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:129;3:35">
                  Этикетки на термобумаге
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:129;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:129;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:136" data-name="Product / 7">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:136;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:136;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:136;3:35">
                  Этикетки на прозрачной плёнке
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:136;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:136;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[302px]" data-node-id="4:143" data-name="Product / 8">
              <div className="h-[160px] relative shrink-0 w-[302px]" data-node-id="I4:143;3:33" data-name="Image">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
              </div>
              <div className="content-stretch flex gap-[var(--space-12,12px)] h-[128px] items-center overflow-clip p-[var(--space-20,20px)] relative shrink-0 w-[302px]" data-node-id="I4:143;3:34" data-name="Content">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[22px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[218px]" data-node-id="I4:143;3:35">
                  Этикетки с тиснением фольгой
                </p>
                <div className="border border-[var(--color-primary,#0b2475)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[32px]" data-node-id="I4:143;3:36" data-name="Arrow">
                  <div className="relative shrink-0 size-[18px]" data-node-id="I4:143;3:37" data-name="Icon / arrow">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-subtle,#f5f7fb)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip p-[var(--space-80,80px)] relative shrink-0 w-[1440px]" data-node-id="2:57" data-name="About">
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-center overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:150" data-name="Company overview">
          <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[410.667px]" data-node-id="4:151" data-name="Company copy">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[12px] text-[color:var(--color-digital,#1d27ff)] tracking-[0.96px] whitespace-pre" data-node-id="4:152">{`01  О КОМПАНИИ`}</p>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[46px] not-italic relative shrink-0 text-[40px] text-[color:var(--color-primary,#0b2475)] tracking-[-0.8px] w-[410.667px]" data-node-id="4:153">
              Надёжный партнёр в мире этикетки
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[410.667px]" data-node-id="4:154">
              MEGAFLEX — современная производственная компания, основанная в 2023 году. Мы объединяем опыт команды, технологии печати и внимательный сервис, чтобы создавать качественную этикеточную продукцию для бизнеса в Казахстане.
            </p>
            <Button className="bg-[var(--color-primary,#0b2475)] content-stretch flex gap-[var(--space-12,12px)] items-center justify-center px-[24px] py-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] shrink-0" label="Подробнее о компании" />
          </div>
          <div className="h-[488px] relative rounded-[var(--radius-24,24px)] shrink-0 w-[519.333px]" data-node-id="4:159" data-name="MEGAFLEX production complex / reference">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius-24,24px)] size-full" src={imgMegaflexProductionComplexReference} />
          </div>
          <div className="content-stretch flex flex-col gap-[var(--space-28,28px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:160" data-name="Company facts">
            <div className="content-stretch flex gap-[var(--space-16,16px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:161" data-name="Fact / 2023">
              <div className="relative shrink-0 size-[32px]" data-node-id="4:162" data-name="Icon / calendar">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCalendar} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[254px]" data-node-id="4:165" data-name="Content">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[26px] relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[254px]" data-node-id="4:166">
                  2023
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-body,#596579)] w-[254px]" data-node-id="4:167">
                  год основания
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-16,16px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:168" data-name="Fact / Опытная команда">
              <div className="relative shrink-0 size-[32px]" data-node-id="4:169" data-name="Icon / users">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconUsers2} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[254px]" data-node-id="4:172" data-name="Content">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[26px] relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[254px]" data-node-id="4:173">
                  Опытная команда
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-body,#596579)] w-[254px]" data-node-id="4:174">
                  специалистов своего дела
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-16,16px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:175" data-name="Fact / Современное">
              <div className="relative shrink-0 size-[32px]" data-node-id="4:176" data-name="Icon / chart">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconChart} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[254px]" data-node-id="4:178" data-name="Content">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[26px] relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[254px]" data-node-id="4:179">
                  Современное
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-body,#596579)] w-[254px]" data-node-id="4:180">
                  производство
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-16,16px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:181" data-name="Fact / Наша миссия">
              <div className="relative shrink-0 size-[32px]" data-node-id="4:182" data-name="Icon / target">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconTarget} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[254px]" data-node-id="4:186" data-name="Content">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[26px] relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[254px]" data-node-id="4:187">
                  Наша миссия
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-body,#596579)] w-[254px]" data-node-id="4:188">
                  Производить один из лучших этикеточных продуктов в Казахстане
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-white,white)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip p-[var(--space-80,80px)] relative shrink-0 w-[1440px]" data-node-id="2:58" data-name="Benefits">
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[12px] text-[color:var(--color-digital,#1d27ff)] tracking-[0.96px] whitespace-pre" data-node-id="4:189">{`02  НАШИ ПРЕИМУЩЕСТВА`}</p>
        <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[46px] not-italic relative shrink-0 text-[40px] text-[color:var(--color-primary,#0b2475)] tracking-[-0.8px] whitespace-nowrap" data-node-id="4:190">
          Качество в каждой детали
        </p>
        <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:191" data-name="Benefit grid">
          <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:192" data-name="Row 1">
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-16,16px)] h-[230px] items-start p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:193" data-name="Benefit / Высокое качество">
              <IconDiamond className="content-stretch flex flex-col items-start relative shrink-0 w-[40px]" />
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="I4:193;3:42">
                Высокое качество
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="I4:193;3:43">
                Внимание к деталям на каждом этапе производства.
              </p>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-16,16px)] h-[230px] items-start p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:201" data-name="Benefit / Современные технологии">
              <IconGear className="content-stretch flex flex-col items-start relative shrink-0 w-[40px]" />
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="I4:201;3:42">
                Современные технологии
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="I4:201;3:43">
                Флексопечать и гибкие возможности отделки.
              </p>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-16,16px)] h-[230px] items-start p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:210" data-name="Benefit / Надёжность">
              <IconShield className="content-stretch flex flex-col items-start relative shrink-0 w-[40px]" />
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="I4:210;3:42">
                Надёжность
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="I4:210;3:43">
                Ответственный подход к срокам и договорённостям.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:219" data-name="Row 2">
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-16,16px)] h-[230px] items-start p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:220" data-name="Benefit / Сервис">
              <IconUsers className="content-stretch flex flex-col items-start relative shrink-0 w-[40px]" />
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="I4:220;3:42">
                Сервис
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="I4:220;3:43">
                Индивидуальный подход к каждому проекту.
              </p>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-16,16px)] h-[230px] items-start p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:229" data-name="Benefit / Долгосрочное партнёрство">
              <IconLink className="content-stretch flex flex-col items-start relative shrink-0 w-[40px]" />
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="I4:229;3:42">
                Долгосрочное партнёрство
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="I4:229;3:43">
                Развиваем решения вместе с вашим бизнесом.
              </p>
            </div>
            <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-16,16px)] h-[230px] items-start p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:237" data-name="Benefit / Быстрая коммуникация">
              <IconBolt className="content-stretch flex flex-col items-start relative shrink-0 w-[40px]" />
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="I4:237;3:42">
                Быстрая коммуникация
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="I4:237;3:43">
                Помогаем с выбором и оперативно отвечаем на вопросы.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-subtle,#f5f7fb)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip p-[var(--space-80,80px)] relative shrink-0 w-[1440px]" data-node-id="2:59" data-name="Production">
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:245" data-name="Production overview">
          <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[410.667px]" data-node-id="4:246" data-name="Introduction">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[12px] text-[color:var(--color-digital,#1d27ff)] tracking-[0.96px] w-[410.667px] whitespace-pre-wrap" data-node-id="4:247">{`03  ТЕХНОЛОГИИ И ПРОИЗВОДСТВО`}</p>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[46px] not-italic relative shrink-0 text-[40px] text-[color:var(--color-primary,#0b2475)] tracking-[-0.8px] w-[410.667px]" data-node-id="4:248">
              Современное производство полного цикла
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[28px] not-italic relative shrink-0 text-[18px] text-[color:var(--color-body,#596579)] w-[380px]" data-node-id="4:249">
              От подготовки макета до готового рулона — контролируем качество на каждом этапе. Флексографическая печать и послепечатная обработка помогают воплотить задачи вашего бренда.
            </p>
            <div className="bg-[var(--color-white,white)] content-stretch flex flex-col gap-[var(--space-16,16px)] items-start overflow-clip p-[var(--space-28,28px)] relative rounded-[var(--radius-20,20px)] shrink-0 w-[410.667px]" data-node-id="4:250" data-name="Quality note">
              <div className="relative shrink-0 size-[40px]" data-node-id="4:251" data-name="Icon / shield">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconShield} />
              </div>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[354.667px]" data-node-id="4:254">
                Единый стандарт качества
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[354.667px]" data-node-id="4:255">
                Проверяем материалы, точность печати и готовую продукцию перед отгрузкой.
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[845.333px]" data-node-id="4:256" data-name="Production stages">
            <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[845.333px]" data-node-id="4:257" data-name="Stage row 1">
              <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col h-[372px] items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[410.667px]" data-node-id="4:258" data-name="Stage / 01">
                <div className="h-[176px] relative shrink-0 w-[410.667px]" data-node-id="I4:258;3:45" data-name="Image">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
                </div>
                <div className="content-stretch flex flex-col gap-[var(--space-12,12px)] items-start overflow-clip p-[var(--space-24,24px)] relative shrink-0 w-[410.667px]" data-node-id="I4:258;3:46" data-name="Content">
                  <div className="content-stretch flex gap-[var(--space-16,16px)] items-start justify-between overflow-clip relative shrink-0 w-[362.667px]" data-node-id="I4:258;3:47" data-name="Step">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-digital,#1d27ff)] whitespace-nowrap" data-node-id="I4:258;3:48">
                      01
                    </p>
                    <div className="relative shrink-0 size-[20px]" data-node-id="I4:258;3:49" data-name="Icon / arrow">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow1} />
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[362.667px]" data-node-id="I4:258;3:51">
                    Подготовка и допечатная обработка
                  </p>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[362.667px]" data-node-id="I4:258;3:52">
                    Проверяем макет и готовим материалы к точной печати.
                  </p>
                </div>
              </div>
              <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col h-[372px] items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[410.667px]" data-node-id="4:267" data-name="Stage / 02">
                <div className="h-[176px] relative shrink-0 w-[410.667px]" data-node-id="I4:267;3:45" data-name="Image">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
                </div>
                <div className="content-stretch flex flex-col gap-[var(--space-12,12px)] items-start overflow-clip p-[var(--space-24,24px)] relative shrink-0 w-[410.667px]" data-node-id="I4:267;3:46" data-name="Content">
                  <div className="content-stretch flex gap-[var(--space-16,16px)] items-start justify-between overflow-clip relative shrink-0 w-[362.667px]" data-node-id="I4:267;3:47" data-name="Step">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-digital,#1d27ff)] whitespace-nowrap" data-node-id="I4:267;3:48">
                      02
                    </p>
                    <div className="relative shrink-0 size-[20px]" data-node-id="I4:267;3:49" data-name="Icon / arrow">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow1} />
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[362.667px]" data-node-id="I4:267;3:51">
                    Флексографическая печать
                  </p>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[362.667px]" data-node-id="I4:267;3:52">
                    Наносим изображение с точной передачей цветов и деталей.
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[845.333px]" data-node-id="4:276" data-name="Stage row 2">
              <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col h-[372px] items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[410.667px]" data-node-id="4:277" data-name="Stage / 03">
                <div className="h-[176px] relative shrink-0 w-[410.667px]" data-node-id="I4:277;3:45" data-name="Image">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
                </div>
                <div className="content-stretch flex flex-col gap-[var(--space-12,12px)] items-start overflow-clip p-[var(--space-24,24px)] relative shrink-0 w-[410.667px]" data-node-id="I4:277;3:46" data-name="Content">
                  <div className="content-stretch flex gap-[var(--space-16,16px)] items-start justify-between overflow-clip relative shrink-0 w-[362.667px]" data-node-id="I4:277;3:47" data-name="Step">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-digital,#1d27ff)] whitespace-nowrap" data-node-id="I4:277;3:48">
                      03
                    </p>
                    <div className="relative shrink-0 size-[20px]" data-node-id="I4:277;3:49" data-name="Icon / arrow">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow1} />
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[362.667px]" data-node-id="I4:277;3:51">
                    Послепечатная обработка
                  </p>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[362.667px]" data-node-id="I4:277;3:52">
                    Ламинация, высечка, тиснение фольгой и другие виды отделки.
                  </p>
                </div>
              </div>
              <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col h-[372px] items-start overflow-clip relative rounded-[var(--radius-20,20px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[410.667px]" data-node-id="4:286" data-name="Stage / 04">
                <div className="h-[176px] relative shrink-0 w-[410.667px]" data-node-id="I4:286;3:45" data-name="Image">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
                </div>
                <div className="content-stretch flex flex-col gap-[var(--space-12,12px)] items-start overflow-clip p-[var(--space-24,24px)] relative shrink-0 w-[410.667px]" data-node-id="I4:286;3:46" data-name="Content">
                  <div className="content-stretch flex gap-[var(--space-16,16px)] items-start justify-between overflow-clip relative shrink-0 w-[362.667px]" data-node-id="I4:286;3:47" data-name="Step">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--color-digital,#1d27ff)] whitespace-nowrap" data-node-id="I4:286;3:48">
                      04
                    </p>
                    <div className="relative shrink-0 size-[20px]" data-node-id="I4:286;3:49" data-name="Icon / arrow">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow1} />
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[362.667px]" data-node-id="I4:286;3:51">
                    Контроль качества и упаковка
                  </p>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[362.667px]" data-node-id="I4:286;3:52">
                    Проверяем готовую продукцию и подготавливаем её к отгрузке.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-white,white)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip p-[var(--space-80,80px)] relative shrink-0 w-[1440px]" data-node-id="2:60" data-name="Contacts">
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:295" data-name="Contact layout">
          <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:296" data-name="Contact details">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[12px] text-[color:var(--color-digital,#1d27ff)] tracking-[0.96px] whitespace-pre" data-node-id="4:297">{`04  КОНТАКТЫ`}</p>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[46px] not-italic relative shrink-0 text-[40px] text-[color:var(--color-primary,#0b2475)] tracking-[-0.8px] w-[302px]" data-node-id="4:298">
              Свяжитесь с нами
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-body,#596579)] w-[302px]" data-node-id="4:299">
              Готовы обсудить ваш проект? Оставьте заявку — поможем подобрать решение для вашего бренда.
            </p>
            <div className="content-stretch flex gap-[var(--space-12,12px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:300" data-name="Телефон">
              <div className="relative shrink-0 size-[24px]" data-node-id="4:301" data-name="Icon / phone">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPhone1} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[266px]" data-node-id="4:303" data-name="Content">
                <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-secondary,#868686)] w-[266px]" data-node-id="4:304">
                  Телефон
                </p>
                <div className="leading-[0] relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[266px]" data-node-id="4:305">
                  <p className="leading-[24px] mb-0">+7 777 677 29 29</p>
                  <p className="leading-[24px] mb-0">+7 701 749 07 83</p>
                  <p className="leading-[24px]">+7 707 322 3311</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-12,12px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:306" data-name="E-mail">
              <div className="relative shrink-0 size-[24px]" data-node-id="4:307" data-name="Icon / mail">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconMail} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[266px]" data-node-id="4:310" data-name="Content">
                <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-secondary,#868686)] w-[266px]" data-node-id="4:311">
                  E-mail
                </p>
                <div className="leading-[0] relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[266px]" data-node-id="4:312">
                  <p className="leading-[24px] mb-0">megaflex.kz@gmail.com</p>
                  <p className="leading-[24px]">megaflex_23@outlook.com</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--space-12,12px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:313" data-name="Адрес">
              <div className="relative shrink-0 size-[24px]" data-node-id="4:314" data-name="Icon / pin">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPin} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[266px]" data-node-id="4:317" data-name="Content">
                <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--color-secondary,#868686)] w-[266px]" data-node-id="4:318">
                  Адрес
                </p>
                <p className="leading-[24px] relative shrink-0 text-[16px] text-[color:var(--color-primary,#0b2475)] w-[266px]" data-node-id="4:319">
                  Казахстан
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color-white,white)] border border-[var(--color-border,#e7ebf3)] border-solid content-stretch flex flex-col gap-[var(--space-20,20px)] items-start overflow-clip p-[var(--space-32,32px)] relative rounded-[var(--radius-24,24px)] shadow-[0px_8px_28px_0px_rgba(29,39,96,0.06)] shrink-0 w-[628px]" data-node-id="4:320" data-name="Request form">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[26px] not-italic relative shrink-0 text-[20px] text-[color:var(--color-primary,#0b2475)] w-[564px]" data-node-id="4:321">
              Расскажите о вашем проекте
            </p>
            <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[564px]" data-node-id="4:322" data-name="Name and phone">
              <FormField className="content-stretch flex flex-col gap-[var(--space-8,8px)] items-start relative shrink-0 w-[270px]" />
              <FormField className="content-stretch flex flex-col gap-[var(--space-8,8px)] items-start relative shrink-0 w-[270px]" label="Телефон" placeholder="+7 (___) ___ __ __" />
            </div>
            <FormField className="content-stretch flex flex-col gap-[var(--space-8,8px)] items-start relative shrink-0 w-[564px]" label="E-mail" placeholder="example@mail.ru" />
            <FormField className="content-stretch flex flex-col gap-[var(--space-8,8px)] items-start relative shrink-0 w-[564px]" label="Сообщение" placeholder="Тип этикетки, тираж и пожелания…" type="Textarea" />
            <Checkbox className="content-stretch flex gap-[var(--space-12,12px)] items-start relative shrink-0" />
            <Button className="bg-[var(--color-primary,#0b2475)] content-stretch flex gap-[var(--space-12,12px)] items-center justify-center px-[24px] py-[var(--space-16,16px)] relative rounded-[var(--radius-12,12px)] shrink-0" label="Отправить заявку" />
          </div>
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-24,24px)] shrink-0 w-[302px]" data-node-id="4:348" data-name="Print your success">
            <div className="h-[300px] relative shrink-0 w-[302px]" data-node-id="4:349" data-name="Label roll">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMegaflexLabelRoll} />
            </div>
            <div className="bg-[var(--color-navy,#1d2760)] content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip p-[var(--space-28,28px)] relative shrink-0 w-[302px]" data-node-id="4:350" data-name="Slogan panel">
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[38px] not-italic relative shrink-0 text-[32px] text-[color:var(--color-white,white)] tracking-[-0.64px] w-[246px]" data-node-id="4:351">
                Давайте напечатаем ваш успех вместе!
              </p>
              <div className="relative shrink-0 size-[32px]" data-node-id="4:352" data-name="Icon / arrow">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrow4} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-navy,#1d2760)] content-stretch flex flex-col gap-[var(--space-32,32px)] items-start overflow-clip px-[var(--space-80,80px)] py-[var(--space-48,48px)] relative shrink-0 w-[1440px]" data-node-id="2:61" data-name="Footer">
        <div className="content-stretch flex gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[1280px]" data-node-id="4:354" data-name="Footer navigation">
          <div className="content-stretch flex flex-col gap-[var(--space-24,24px)] items-start overflow-clip relative shrink-0 w-[302px]" data-node-id="4:355" data-name="Brand">
            <div className="bg-[var(--color-navy,#1d2760)] content-stretch flex flex-col items-start relative shrink-0 w-[244px]" data-node-id="4:356" data-name="Brand logo">
              <div className="h-[54px] mix-blend-lighten relative shrink-0 w-[244px]" data-node-id="I4:356;3:66" data-name="Logo artwork">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoArtwork1} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--color-white,white)] w-[260px]" data-node-id="4:358">
              Этикетки, которые работают на ваш бизнес.
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Semi_Bold'] font-semibold gap-[var(--space-16,16px)] items-start leading-[20px] not-italic overflow-clip relative shrink-0 text-[14px] text-[color:var(--color-white,white)] w-[302px] whitespace-nowrap" data-node-id="4:359" data-name="Menu">
            <p className="relative shrink-0" data-node-id="4:360">
              О компании
            </p>
            <p className="relative shrink-0" data-node-id="4:361">
              Продукция
            </p>
            <p className="relative shrink-0" data-node-id="4:362">
              Технологии
            </p>
            <p className="relative shrink-0" data-node-id="4:363">
              Контакты
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[var(--space-16,16px)] items-start not-italic overflow-clip relative shrink-0 text-[color:var(--color-white,white)] w-[410.667px] whitespace-nowrap" data-node-id="4:364" data-name="Contacts">
            <div className="leading-[0] relative shrink-0 text-[16px]" data-node-id="4:365">
              <p className="leading-[24px] mb-0">+7 777 677 29 29</p>
              <p className="leading-[24px]">+7 701 749 07 83</p>
            </div>
            <div className="leading-[0] relative shrink-0 text-[16px]" data-node-id="4:366">
              <p className="leading-[24px] mb-0">megaflex.kz@mail.ru</p>
              <p className="leading-[24px]">megaflex_23@outlook.com</p>
            </div>
            <p className="leading-[20px] relative shrink-0 text-[13px]" data-node-id="4:367">
              Казахстан
            </p>
          </div>
          <div className="content-stretch flex gap-[var(--space-12,12px)] items-start overflow-clip relative shrink-0 w-[193.333px]" data-node-id="4:368" data-name="Social links">
            <div className="border border-[rgba(255,255,255,0.4)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[44px]" data-node-id="4:369" data-name="Social / instagram">
              <div className="relative shrink-0 size-[20px]" data-node-id="4:370" data-name="Icon / instagram">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconInstagram} />
              </div>
            </div>
            <div className="border border-[rgba(255,255,255,0.4)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-999,999px)] shrink-0 size-[44px]" data-node-id="4:374" data-name="Social / telegram">
              <div className="relative shrink-0 size-[20px]" data-node-id="4:375" data-name="Icon / telegram">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconTelegram} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.16)] h-px relative shrink-0 w-[1280px]" data-node-id="4:377" data-name="Rectangle" />
        <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[var(--space-24,24px)] items-start justify-between leading-[20px] not-italic overflow-clip relative shrink-0 text-[13px] text-[color:var(--color-white,white)] w-[1280px] whitespace-nowrap" data-node-id="4:378" data-name="Legal">
          <p className="relative shrink-0" data-node-id="4:379">
            © 2024 MEGAFLEX. Все права защищены.
          </p>
          <p className="relative shrink-0" data-node-id="4:380">
            Политика конфиденциальности
          </p>
        </div>
      </div>
    </div>
  );
}
