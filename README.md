<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/cf5be75f-2aad-4a50-a00a-947f04ae4ddc" />


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

### Modül Bazlı Stil Dosyalarını Nasıl Tanımlarsın ?
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
