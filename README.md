<img width="1448" height="1086" alt="image" src="https://github.com/user-attachments/assets/28e85d4f-282e-45d0-92e4-3ef9cd724b18" />



Junior iken React öğrendiğim zamanlar mimari hakkında bilgim olmadan ezbere giderdim. Bu hatayı çoğumuz yaşar çünkü doğru kaynak bulmak zordur.
Klasörleri nasıl organize edeceğimi bilmeden, gördüğüm örnek projeleri taklit ederek ilerliyordum. components, utils, services gibi klasörler oluşturuyordum ama neden bu şekilde ayırdığımı, hangi dosyanın nereye gitmesi gerektiğini gerçekten anlamıyordum. Proje büyüdükçe bu eksik anlayışın bedelini ödüyordum: dağınık kod, nereye ne koyduğumu unutmak, aynı işi yapan fonksiyonları farklı yerlerde tekrar tekrar yazmak.
Zamanla fark ettim ki mimari bilgisi, sadece "düzenli kod yazmak" değil, aynı zamanda neden o şekilde organize ettiğini savunabilmek. Mülakatlarda da en çok bu noktada zorlanıyoruz: kod yazabiliyoruz ama tercihlerimizin arkasındaki mantığı anlatamıyoruz. Bu yüzden benzer yoldan geçen junior, mid ve senior seviyedeki arkadaşlara bir referans noktası olması için ilgili dokümanı hazırladım. Aşağıda folder-by-type mimarisiyle ilgili, seviyeye göre ayrılmış öğretici soru ve cevapları bulabilirsiniz.

# Junior
### Folder By Type Mimarisi Nedir ?
Folder By Type, tür ve role göre react kodlarımızı veya dosyalarımızı ayırdığımız bir mimaridir.

### Folder By Type (Tipe Göre Klasörleme) Yapısı
* **`components/`**: Uygulama genelinde kullanılan, tekrar kullanılabilir (reusable) kullanıcı arayüzü (UI) bileşenlerini barındırır.
* **`assets/`**: Resimler, fontlar, SVG'ler ve logolar gibi statik dosyaları içerir.
* **`pages/`**: Yönlendirme (routing) mekanizmasına bağlı olan ana sayfa bileşenlerini tutar.
* **`hooks/`**: İş mantığını arayüzden ayırmak için oluşturulan özel React Hook'larını (`custom hooks`) barındırır.
* **`services/`**: Backend servisleri ile haberleşmeyi sağlayan API istemcilerini (Axios konfigürasyonu, istek fonksiyonları vb.) içerir.
* **`store/`**: Uygulama genelindeki global state yönetim araçlarının (Redux Toolkit, Zustand vb.) yapılandırma ve slice dosyalarını barındırır.
* **`context/`**: Bileşenler arası veri paylaşımı sağlayan React Context API tanımlamalarını tutar.
* **`styles/`**: Global CSS, SASS veya Tailwind CSS konfigürasyonları gibi stil dosyalarını barındırır.
* **`utils/`**: Herhangi bir bağımlılığı olmayan yardımcı fonksiyonlarımız bulunur.
* **`tests/`**: Herhangi bir unit dahil diğer test'lerimiz yer alır.

### Modül Bazlı Stil Dosyalarını `Components` için Nasıl Tanımlarsın ?
1. İlgili modül klasöründe moduladi.module.scss adıyla yeni bir dosya oluştururum.
2. Oluşturduğum dosyayı, stilini değiştirmek istediğim bileşene import ederek stilleri uygularım.
### SCSS Kullanarak Modüler Bir Button Bileşeni Nasıl Geliştirilir?
```scss
$border-radius: 0.5rem;
$font-size-base: 16px;
$padding-y: 0.2rem;
$padding-x: 0.5rem;
$min-width: 36px;
$min-height: 10px;
$border-width: 1px;

:root {
    --primary: #0064e0;
    --primary-foreground: white;
    --primary-hover: #005fd5;

    --secondary: #6c757d;
    --secondary-foreground: white;
    --secondary-hover: #5a6268;

    --danger: #dc3545;
    --danger-foreground: white;
    --danger-hover: #bb2d3b;

    --warning: #ffc107;
    --warning-foreground: #212529;
    --warning-hover: #e0a800;
}


.btn {
    min-width: $min-width;
    width: fit-content;
    min-height: $min-height;
    padding: $padding-y $padding-x;
    border: $border-width solid transparent;
    border-radius: $border-radius;
    font-weight: bold;
    font-size: $font-size-base;
    cursor: pointer;
    text-align: center;
    background-color: transparent;
    transition: background-color 0.15s ease, color 0.15s ease;
}

$variants: primary, secondary, danger, warning;

// Dolu (solid) varyantlar: btn-primary, btn-secondary, btn-danger
@each $variant in $variants {
    .btn-#{$variant} {
        color: var(--#{$variant}-foreground);
        background-color: var(--#{$variant});
        border-color: var(--#{$variant});

        &:hover {
            background-color: var(--#{$variant}-hover);
            border-color: var(--#{$variant}-hover);
        }
    }
}

// Outline varyantlar: btn-outline-primary, btn-outline-secondary, btn-outline-danger
@each $variant in $variants {
    .btn-outline-#{$variant} {
        color: var(--#{$variant});
        background-color: transparent;
        border-color: var(--#{$variant});

        &:hover {
            color: var(--#{$variant}-foreground);
            background-color: var(--#{$variant});
        }
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --primary: #0064e0;
        --secondary: #6c757d;
        --danger: #dc3545;
        --warning: #CC8B00;
    }
}
```

```jsx
import PropTypes from 'prop-types'
import { Component } from 'react'
import clsx from 'clsx'
import styles from './button.module.scss'

export default class Button extends Component {
  componentDidMount() {
    PropTypes.checkPropTypes(Button.propTypes, this.props, 'prop', 'Button')
  }

  render() {
    const { label, type, outline, className } = this.props

    const buttonClass = clsx(
      styles.btn,
      outline ? styles[`btn-outline-${type}`] : styles[`btn-${type}`],
      className
    )

    return <div className={buttonClass}>{label}</div>
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger','warning']).isRequired,
  outline: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  label: 'test',
  type: 'primary',
  outline: false,
}
```
### Folder By Type Küçük Projelerde veya Ekiplerde Neden Mantıklı?

Küçük projelerde dosya sayısı az olduğu için "nerede ne var" karmaşası oluşmaz. Yapı basit, öğrenmesi kolay ve yeni başlayanlar için sezgiseldir. Ekstra bir "feature" kavramı yönetmeye gerek kalmaz.

# Mid
### Folder By Type vs Folder By Feature Farkı Nedir ?
Folder By Type, tür ve role göre react kodlarımızı veya dosyalarımızı ayırdığımız bir mimari iken Folder by feature özelliklere/domainlere odaklanmaktadır.

### Bileşen (Components) Ölçeklendirmesini Nasıl Yaparsın?
Bileşenleri karmaşıklıklarına ve sorumluluklarına göre kategorize ederek `components` klasörü altında alt katmanlara ayırırım. Basit ve ölçeklenebilir bir yapıda genellikle şu kırılımları tercih ederim:
* **`ui/`:** Yalnızca veri alıp görselleştiren, state yönetmeyen atomik ve tekrar kullanılabilir bileşenler (Button, Input, Modal vb.).
* **`layouts/`:** Sayfa şablonlarını ve genel sayfa düzenini oluşturan iskelet bileşenler (Header, Sidebar, Footer vb.).
* **`common/` (veya `shared/`):** Proje genelinde birden fazla modül tarafından ortak kullanılan işlevsel bileşenler.

### Custom Hook'ları Ölçeklendirecek Olsan Nasıl Bir Yapı Kurardın?
Hook'ları da yine sorumluluk alanlarına göre (Separation of Concerns - Sorumlulukların Ayrılması ilkesine bağlı kalarak) `hooks` klasörü altında alt katmanlara bölerdim:
* **`api/` (veya `data/`):** Veri çekme, mutasyon ve önbelleğe alma (server-state) işlemlerini yöneten hook'lar (örn: `useFetchUser`, `usePostData`).
* **`ui/`:** Doğrudan arayüz etkileşimlerini ve yerel state durumlarını kontrol eden hook'lar (örn: `useModal`, `useTheme`, `useWindowSize`).
* **`form/`:** Form doğrulama, girdi takibi ve state yönetimini soyutlayan hook'lar (örn: `useFormValidation`).

Bu sayede her hook'un tek bir sorumluluğu (Single Responsibility) olur ve kod tabanı büyüdükçe spagetti koda dönüşmesinin önüne geçilir.

### Barrel File Nedir ?
Barrel File, basit şekilde index.js içerisinde tüm exportların merkezi yerde toplanmasıdır ancak bundle olurken circular dependency sorununa sebebiyet verebilir.

### State Management için Kullandığımız Redux'ı Oluştururken Nasıl Bir Mimari Yol İzlersin?

Yol izlemeye başlamadan önce ilk olarak projenin Redux ve React sürümlerine bakılması gerekmektedir; çünkü çoğu kurumsal projede Redux Toolkit yerine saf Redux kullanılmış olabiliyor, dolayısıyla mimari kararlar bu doğrultuda değişkenlik göstermektedir. Bu sürüm ve mimari kontrollerini yaptıktan sonra izleyeceğim spesifik yollar şu şekildedir:

**Eğer Redux Toolkit olmadan, Traditional Layered Architecture yani saf Redux kullanılmış eski bir kurumsal proje ise** mimarimiz şu şekilde olacaktır:

```
store/
  actions/
    userActions.js
  types/
    userTypes.js       # action type sabitleri (USER_FETCH_REQUEST vb.)
  reducers/
    userReducer.js
    index.js            # combineReducers ile oluşturulan rootReducer
  sagas/                # side-effect yönetimi redux-saga ile yapılıyorsa
    userSaga.js
    rootSaga.js
  thunks/               # side-effect yönetimi redux-thunk ile yapılıyorsa (saga yerine)
    userThunks.js
  selectors/
    userSelectors.js
  persist/
    persistConfig.js
  index.js               # createStore ve middleware konfigürasyonu
```

Burada dikkat edilmesi gereken nokta, side-effect yönetiminin projeye göre değişebilmesidir: proje `redux-saga` kullanıyorsa `sagas/`, `redux-thunk` kullanıyorsa `thunks/` klasörü tercih edilir  ikisi birden genelde bulunmaz. Ayrıca `types/` klasörü, action type sabitlerini merkezi tutarak magic string tekrarını önler; `selectors/` katmanı ise state'e erişimi merkezi ve test edilebilir kılar.

**Eğer Redux Toolkit ile yapılmış, güncel bir proje ise** mimarimiz şu şekilde olacaktır:

```
store/
  slices/
    userSlice.js
    cartSlice.js
  api/                  # RTK Query kullanılıyorsa (createApi ile veri çekme katmanı)
    userApi.js
  hooks.js              # TypeScript projelerde typed hook'lar (useAppDispatch, useAppSelector)
  index.js               # configureStore burada tanımlanır
```

RTK'da `reducer`, `action` ve `type` tanımları zaten `createSlice` içinde birleştiği için ayrı klasörlere gerek kalmaz. Eğer veri çekme işlemleri RTK Query ile yönetiliyorsa bunun için ayrı bir `api/` klasörü açılır; TypeScript kullanılan projelerde ise `useDispatch`/`useSelector`'ın tip güvenli versiyonları genelde `hooks.js` dosyasında merkezi olarak tanımlanır.

**Dikkat!** Projenin mimari seçimi, ekip ölçeğiyle doğrudan orantılıdır. Ekip büyüdükçe projenin kapsamı ve karmaşıklığı da artacağından, takımların bağımsız çalışabilmesini sağlayan Feature-Driven Architecture (FDA) gibi modüler mimarilere redux için yönelim gösterilmesi kaçınılmaz hale gelecektir.



